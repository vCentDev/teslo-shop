import { tesloApi } from '@/api/tesloApi';
import type { ProductsResponse } from '@/interfaces/products.response';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Options {
  limit?: number | string;
  offset?: number | string;
}

export const getProductAction = async (
  options: Options,
): Promise<ProductsResponse> => {
  const { limit, offset } = options;

  const { data } = await tesloApi.get<ProductsResponse>('/products', {
    params: {
      limit,
      offset,
    },
  });

  const productsWithImageUrls = data.products.map((product) => ({
    ...product,
    images: product.images.map((image) => `${BASE_URL}/files/product/${image}`),
  }));

  return {
    ...data,
    products: productsWithImageUrls,
  };
};
