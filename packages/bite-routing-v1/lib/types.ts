export interface IPathConfig {
  url: string;
  redirect?: string;
  regExp?: RegExp;
  searchParams?: boolean;
}
export interface IRouteConfig {
  main: IPathConfig;
  [key: string]: IPathConfig;
}

export interface IAppRoutesConfig {
  [key: string]: IRouteConfig;
}

export interface IRouterTriggers {
  init: IAppRoutesConfig | null;
  goTo: string; // change currentLocation and window.pushState()
  goBack: null;
  setDestination: string; //change destination to route;
  setCurrentLocation: string;
  setPrevLocation: string;
  setNavigationBlocker: () => boolean;
  throwBlockerReject: null;
  deleteNavigationBlocker: null;
  goToDestination: null; // change currentLocation and window.pushState()
  removeDestination: null; // change destination to null;
  handleRoutes?: IAppRoutesConfig; //Обертка надт goTo
}

export interface IRouterState {
  isBlocked: boolean;
  currentLocation: string;
  destination: string;
  prevLocation: string;
}
