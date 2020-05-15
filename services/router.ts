export class Router {
  /**
   * returns current query string as URLSearchParams object
   * @return URLSearchParams
   */
  getQuery(): URLSearchParams | undefined {
    return window && new URLSearchParams(window.location.search);
  }

  /**
   * updates current query string with new values
   * @param query
   */
  updateQuery(query: URLSearchParams) {
    if (window) {
      const newURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}${query.toString().length ? `?${query}` : ''}`;
      window.history.pushState({ path:newURL }, '', newURL);
    }
  }
}

export interface Router {
  getQuery: () => URLSearchParams;
  updateQuery: (query: URLSearchParams) => void;
}

export const router = new Router();