import { ProductsFilters } from '../../../shared/types/serverTypes';
import { handleApiError } from '../../../shared/lib/errorHandler';
import { useGetProductsQuery } from '../api/productApi';
import { getAccessToken } from '../../../shared/lib/localStorage';

type UseProductOptions = {
  skip?: boolean;
};

export const useProducts = (filters: ProductsFilters, options?: UseProductOptions) => {
  const {
    data: productsResponse,
    refetch,
    isUninitialized,
    isError,
    error,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetProductsQuery(filters, {
    skip: !getAccessToken() || (!!options && !!options?.skip),
  });

  if (isError) {
    handleApiError(error);
  }

  return { productsResponse, isLoading, isFetching, isUninitialized, isSuccess, isError, error, refetch };
};
