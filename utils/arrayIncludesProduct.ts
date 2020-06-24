export function arrayIncludesProduct(favoritesProducts, product): boolean {
  return Boolean(favoritesProducts.find(({ id }) => id === product.id));
}