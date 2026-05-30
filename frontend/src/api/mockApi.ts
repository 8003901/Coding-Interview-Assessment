import type { Product, CartRequest, CartResponse } from '../types';
import { mockProduct } from '../data/product';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let totalCartCount = 0;

export async function getProductDetail(
  _productId: string,
): Promise<Product> {
  await delay(800);
  return { ...mockProduct, variants: mockProduct.variants.map((v) => ({ ...v })) };
}

export async function addToCart(
  _req: CartRequest,
): Promise<CartResponse> {
  await delay(500);

  // 90% success, 10% failure to demonstrate error handling
  if (Math.random() < 0.9) {
    totalCartCount += _req.quantity;
    return { success: true, cartCount: totalCartCount };
  }

  return { success: false, message: 'Insufficient stock' };
}
