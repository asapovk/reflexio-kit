import {getActionType} from '@reflexio/core-v1/lib/utils'

export class EventManagerScript  {
  constructor(private opts) {}
   
  init(payload) {

  }

  private forwardMap = {};
  private muteMap = {};
  private connectMap: {};

  private getActionTypeFromMap(from) {
    const keys = Object.keys(from);
    const trigger = keys[0];
    const status = from[trigger];
    return {trigger, status}
  }

  private handleForward({from, to, payload}) {
    const triggerAndStatusFrom = this.getActionTypeFromMap(from);
    const triggerAndStatusTo = this.getActionTypeFromMap(to);
    const eventName = getActionType(triggerAndStatusFrom.trigger, triggerAndStatusFrom.status);
    if(this.forwardMap[eventName]) {
        delete this.forwardMap[eventName]
    }
    this.forwardMap[eventName] = {...triggerAndStatusTo, payload}
  }

  private handleMute(eventName) {
    if(this.forwardMap[eventName]) {
        delete this.forwardMap[eventName]
    }
    this.muteMap[eventName] = true
  }

  private handleUnbind(eventName) {
    delete this.forwardMap[eventName];
    delete this.muteMap[eventName];
  }
  
  private handleConnect({from, to}) {
    delete this.connectMap[from]
    delete this.connectMap[to]
    this.connectMap[from] = to
    this.connectMap[to] = from
  }

  private handleExternalEvent(watchArgs) {
    const eventName = getActionType(watchArgs.trigger, watchArgs.status)
    if(this.muteMap[eventName]) {
        watchArgs.hangOn();
        return
    }
    if(this.forwardMap[eventName]) {
        watchArgs.hangOn();
        const triggerAndStatus = this.forwardMap[eventName];
        const ownPayload = typeof triggerAndStatus.payload !== 'undefined';
        this.opts.trigger(triggerAndStatus.trigger, triggerAndStatus.status, ownPayload ? triggerAndStatus.payload : watchArgs.payload)
    }
    if(this.connectMap[watchArgs.trigger]) {
      watchArgs.hangOn();
      const triggerBite = this.connectMap[watchArgs.trigger];
      this.opts.trigger(triggerBite, watchArgs.status, watchArgs.payload)
    }
  }

  watch(args) {
    if(args.trigger !== this.opts.biteName) {
        return this.handleExternalEvent(args)
    }
    const forwardEvent = this.opts.catchStatus('forward', args);
    if(forwardEvent.isCatched) {
        const payload = forwardEvent.payload;
        return this.handleForward(payload);
    }
    const muteEvent = this.opts.catchStatus('mute', args);
    if(muteEvent.isCatched) {
        const payload = muteEvent.payload;
        return this.handleMute(payload);
    }
    const unbindEvent = this.opts.catchStatus('unbind', args);
    if(unbindEvent.isCatched) {
        const payload = unbindEvent.payload;
        const triggerAndStatusFrom = this.getActionTypeFromMap(payload);
        const actionType = getActionType(triggerAndStatusFrom.trigger, triggerAndStatusFrom.status);
        return this.handleUnbind(actionType);
    }
    const connectBiteEvent = this.opts.catchStatus('connectBite', args);
    if(connectBiteEvent.isCatched) {
      this.handleConnect(args);
    }
    const clearConnectEvent = this.opts.catchStatus('clearConnect', args);
    if(clearConnectEvent.isCatched) {
      this.connectMap = {};
    }
    const clearEvent = this.opts.catchStatus('clear', args);
    if(clearEvent.isCatched) {
      this.connectMap = {};
      this.muteMap = {};
      this.forwardMap= {};
    }
  }
}
