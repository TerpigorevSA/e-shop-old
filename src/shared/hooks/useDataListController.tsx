import { useState, useRef, useEffect, useCallback } from 'react';
import { GetPageResult, MutateRequest, Pagination } from '../types/serverTypes';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  TypedUseMutation,
  TypedUseQuery,
} from '@reduxjs/toolkit/query/react';

const PAGE_SIZE = 4;

const useDataListController = <TItem extends { id: string }, TFilters, MutateBody>(
  useQueryHook: TypedUseQuery<
    GetPageResult<TItem>,
    TFilters,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
  >, //QueryDefinition<TFilters, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, string, GetPageResult<TItem>, string>>,  //QueryHook<{ filters: TFilters; pagination: Pagination }, GetPageResult<TItem>>,
  useUpdateMutation: TypedUseMutation<
    TItem,
    MutateRequest<MutateBody>,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
  >, //() => any,
  useCreateMutation: TypedUseMutation<TItem, MutateBody, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>> //() => any,
) => {
  const [pagination, setPagination] = useState<Pagination>({ pageSize: PAGE_SIZE, pageNumber: 1 });
  const [items, setItems] = useState<TItem[]>([]);
  const [currentFilters, setCurrentFilters] = useState<TFilters>({} as TFilters);
  const firstRender = useRef(true);
  const [reset, setReset] = useState(true);

  const {
    data: ResponseData,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQueryHook({ ...currentFilters, pagination });

  const data = ResponseData?.data;
  const serverPagination = ResponseData?.pagination;

  useEffect(() => {
    if (data && !isFetching && (serverPagination.pageNumber !== 1 || firstRender.current)) {
      setItems((prevItems) => [...prevItems, ...data]);
      firstRender.current = false;
    }
  }, [data, serverPagination, reset, isFetching]);

  const handlerFiltersChange = useCallback((filters: TFilters) => {
    setCurrentFilters(filters);
    setPagination((prev) => ({ ...prev, pageNumber: 1 }));
    setItems([]);
    firstRender.current = true;
    setReset((prev) => !prev);
  }, []);

  const handlerFetchItems = useCallback(() => {
    if (serverPagination && items.length < serverPagination.total && !isFetching) {
      setPagination((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
    }
  }, [serverPagination, items.length, isFetching]);

  const [updateProduct] = useUpdateMutation(); // updateParams: { id: string; body: MutateBody }
  const [createProduct] = useCreateMutation(); // createParams: { body: MutateBody }

  const handlerEditItem = useCallback(
    (id: string, data: MutateBody) => {
      console.log(JSON.stringify({ id, data }));
      if (!id) {
        createProduct(data).then((res) => {
          console.log(JSON.stringify(res));
        });
        return;
      }
      if (id) {
        updateProduct({ id, body: data })
          // updateProduct({ id: '9b7d0c31-2ed4-4f5a-8b3d-ee0422ce152b', body: data })
          .then((res) => {
            /* nothing*/
            if (res.data) {
              setItems((prev) => prev.map((item) => (item.id === res.data.id ? res.data : item)));
            }
            console.log(JSON.stringify(res));
          })
          .catch((error) => {
            /* nothing*/
            console.error(JSON.stringify(error));
          });
        return;
      }
    },
    [items]
  );

  const [editingItem, setEditingItem] = useState<TItem | null>(null);

  const handlerAddClick = useCallback((defaultItem: TItem) => {
    setEditingItem(defaultItem);
  }, []);

  const handlerEditClick = useCallback((item: TItem) => {
    setEditingItem(item);
  }, []);

  const clearEditItem = useCallback(() => {
    setEditingItem(null);
  }, []);

  return {
    items,
    currentFilters,
    handlerFiltersChange,
    handlerFetchItems,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
    editingItem,
    handlerAddClick,
    handlerEditClick,
    clearEditItem,
    handlerEditItem,
  };
};

export default useDataListController;
