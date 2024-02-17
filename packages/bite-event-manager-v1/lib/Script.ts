import {getActionType} from '@reflexio/core-v1/lib/utils'

export class EventManagerScript  {
  constructor(private opts) {}
   
  init(payload) {

  }

  private forwardMap = {};
  private muteMap = {};

  private getActionTypeFromMap(from) {
    const keys = Object.keys(from);
    const trigger = keys[0];
    const status = from[trigger];
    return {trigger, status}
  }

  private handleForward({from, to}) {
    const triggerAndStatusFrom = this.getActionTypeFromMap(from);
    const triggerAndStatusTo = this.getActionTypeFromMap(to);
    const eventName = getActionType(triggerAndStatusFrom.trigger, triggerAndStatusFrom.status);
    if(this.forwardMap[eventName]) {
        delete this.forwardMap[eventName]
    }
    this.forwardMap[eventName] = triggerAndStatusTo
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

  private handleExternalEvent(watchArgs) {
    const eventName = getActionType(watchArgs.trigger, watchArgs.status)
    if(this.muteMap[eventName]) {
        watchArgs.hangOn();
        return
    }
    if(this.forwardMap[eventName]) {
        const triggerAndStatus = this.forwardMap[eventName];
        this.opts.trigger(triggerAndStatus.trigger, triggerAndStatus.status, watchArgs.payload)
    }
  }

  watch(args) {
    if(args.trigger !== this.opts.biteName) {
        return this.handleExternalEvent(args)
    }
    const forwardEvent = this.opts.catchStatus('forward', args);
    if(forwardEvent.idCatched) {
        const payload = forwardEvent.payload;
        return this.handleForward(payload);
    }
    const muteEvent = this.opts.catchStatus('mute', args);
    if(muteEvent.idCatched) {
        const payload = muteEvent.payload;
        return this.handleMute(payload);
    }
    const unbindEvent = this.opts.catchStatus('unbind', args);
    if(unbindEvent.idCatched) {
        const payload = unbindEvent.payload;
        return this.handleUnbind(payload);
    }
  }
}
