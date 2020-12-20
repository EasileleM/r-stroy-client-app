export function shortString(str: string) {
  return str.length > 16 ? `${str.substr(0, 13)}...` : str;
}