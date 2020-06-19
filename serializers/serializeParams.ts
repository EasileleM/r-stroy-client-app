export function serializeParams(params): string {
  const result = [];
  for (const param in params) {
    // eslint-disable-next-line no-prototype-builtins
    if (params.hasOwnProperty(param)) {
      if (Array.isArray(params[param])) {
        for (const item of params[param]) {
          result.push(`${param}=${item}`);
        }
      } else {
        result.push(`${param}=${params[param]}`);
      }
    }
  }
  return result.join('&');
}