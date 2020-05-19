export class RouterService {
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

  /**
   * Redirects to given URL.
   */
  redirect(URL: string) {
    if (window) {
      window.location.replace(URL);
    }
  }
}

export const routerService = new RouterService();