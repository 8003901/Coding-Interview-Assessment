import type { Product } from '../types';

export const mockProduct: Product = {
  productId: 'P001',
  name: 'Wireless Noise-Cancelling Headphones',
  description:
    'Premium wireless headphones with active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions. Perfect for travel, work, and immersive listening.',
  images: [
    'https://placehold.co/600x600/e2e8f0/64748b?text=Headphones',
    'https://placehold.co/600x600/f1f5f9/64748b?text=Headphones+2',
  ],
  variants: [
    {
      skuId: 'SKU-001',
      color: 'Black',
      size: '128GB',
      price: 1299,
      stock: 10,
    },
    {
      skuId: 'SKU-002',
      color: 'Black',
      size: '256GB',
      price: 1599,
      stock: 0,
    },
    {
      skuId: 'SKU-003',
      color: 'White',
      size: '128GB',
      price: 1349,
      stock: 5,
    },
    {
      skuId: 'SKU-004',
      color: 'White',
      size: '256GB',
      price: 1649,
      stock: 3,
    },
  ],
};
