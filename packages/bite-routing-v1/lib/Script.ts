/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */

export class RoutingScript {
  private checkIfCanLeaveFromLocation: () => boolean;
  private preventedDest: string | null = null;

  constructor(private opts) {}

  private currentHref = null;
  private sliceName: string;
  private biteName: string;
  private config;

  public init(payload) {
    const sliceName = this.opts.sliceName;
    const biteName = this.opts.biteName;
    this.sliceName = sliceName;
    this.biteName = biteName;

    this.config = payload;

    this.currentHref = window.location.href.replace(window.location.origin, '');
    this.opts.setStatus('setCurrentLocation', this.currentHref);

    window.addEventListener('popstate', (event) => {
      event.preventDefault();
      const routerState = this.opts.getCurrentState()[sliceName][biteName];
      //if (!routerState.destination) {
      //@ts-ignore
      const destination = event.currentTarget?.location?.href;
      if (typeof destination === 'string') {
        this.opts.setStatus('setDestination', destination);
        const canLeave =
          !this.checkIfCanLeaveFromLocation ||
          this.checkIfCanLeaveFromLocation();
        if (canLeave) {
          this.opts.setStatus('goToDestination', null);
        } else {
          this.preventedDest = destination;
          window.history.pushState({}, '', this.currentHref);
          this.opts.setStatus('throwBlockerReject', null);
        }
      } else {
        throw Error('Browser does not support');
      }
      //}
    });
  }

  private handleGoToDestination(dest: string) {
    const routerState =
      this.opts.getCurrentState()[this.sliceName][this.biteName];
    this.opts.setStatus('setPrevLocation', routerState.currentLocation);
    this.opts.setStatus('setCurrentLocation', dest);
    this.opts.setStatus('removeDestination', null);
  }

  private handleRoutes() {
    const config = this.config;
    const parsedURL = new URL(window.location.href);
    const pathname = parsedURL.pathname;

    let currentRouteConfig = null;

    for (const upperKey in config) {
      for (const innerKey in config[upperKey]) {
        if (config[upperKey][innerKey].url === pathname) {
          currentRouteConfig = config[upperKey][innerKey];

          break;
        } else if (
          pathname.includes(config[upperKey][innerKey].url) &&
          config[upperKey][innerKey]?.regExp
        ) {
          currentRouteConfig = config[upperKey][innerKey];

          break;
        }
      }
    }

    if (currentRouteConfig) {
      this.handleRoute(currentRouteConfig);
    } else {
      this.handleRoute(config.users.main);
    }
  }

  private handleRoute(config) {
    const parsedURL = new URL(window.location.href);
    const pathname = parsedURL.pathname;

    if (config.searchParams) {
      const redirectPath = `${pathname}${parsedURL.search}`;
      this.opts.setStatus('goTo', redirectPath);

      return;
    }

    if (config.regExp) {
      const isDetailedView = config.regExp.test(pathname);

      if (isDetailedView) {
        this.opts.setStatus('goTo', config.url);

        return;
      }
    }

    if (config.redirect) {
      this.opts.setStatus('goTo', config.redirect);
    } else {
      this.opts.setStatus('goTo', config.url);
    }
  }

  public watch(args) {
    const goBackEvent = this.opts.catchStatus('goBack', args);
    if (goBackEvent.isCatched) {
      const prevLocation =
        this.opts.getCurrentState()[this.sliceName][this.biteName]?.prevLocation;
      if (prevLocation) {
        this.opts.setStatus('goTo', prevLocation);
      }
    }

    const goToEvent = this.opts.catchStatus('goTo', args);
    if (goToEvent.isCatched) {
      const dest = args.payload;
      this.opts.setStatus('setDestination', args.payload);
      const canLeave =
        !this.checkIfCanLeaveFromLocation || this.checkIfCanLeaveFromLocation();
      if (canLeave) {
        this.currentHref = dest;
        window.history.pushState({}, '', dest);
        this.opts.setStatus('goToDestination', null);
      } else {
        this.preventedDest = dest;
        this.opts.setStatus('throwBlockerReject', null);
      }
    }

    const goToDestinationEvent = this.opts.catchStatus('goToDestination', args);
    if (goToDestinationEvent.isCatched) {
      const routerState = this.opts.getCurrentState()[this.sliceName][this.biteName];
      if (this.preventedDest) {
        window.history.pushState({}, '', this.preventedDest);
        this.preventedDest = null;
      }
      if (typeof routerState.destination === 'string') {
        this.handleGoToDestination(routerState.destination);
      }
    }

    const handleRoutesEvent = this.opts.catchStatus('handleRoutes', args);
    if (handleRoutesEvent.isCatched) {
      this.handleRoutes();
    }

    const setNavigationBlockerEvent = this.opts.catchStatus(
      'setNavigationBlocker',
      args
    );
    if (setNavigationBlockerEvent.isCatched) {
      this.checkIfCanLeaveFromLocation = args.payload;
    }

    const deleteNavigationBlockerEvent = this.opts.catchStatus(
      'deleteNavigationBlocker',
      args
    );
    if (deleteNavigationBlockerEvent.isCatched) {
      this.checkIfCanLeaveFromLocation = null;
    }
  }
}
