import { CreateOrderData } from '../interfaces/CreateOrderData';

export function serializeNewOrder(newOrder: CreateOrderData) {
  return {
    ...newOrder,
    stashedProductDtos: newOrder.products.map(product => {
      return {
        productId: product.id,
        amountInStash: product.amountInOrder
      };
    })
  };
}