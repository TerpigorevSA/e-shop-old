import { useState, useRef, useEffect, useCallback } from 'react';
import { GetPageResult, MutateRequest, Pagination } from '../types/serverTypes';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  TypedUseMutation,
  TypedUseQuery,
} from '@reduxjs/toolkit/query/react';
import { canCastToExtendedFetchError, canCastToFetchError } from '../lib/errorsCast';
import { errorsToStrings } from '../lib/errorsToStrings';
import { unexpectedErrorBounce } from '../lib/unexpectedErrorBounce';

const PAGE_SIZE = 4;

const useDataListController = <TItem extends { id: string }, TFilters, MutateBody>(
  useQueryHook: TypedUseQuery<
    GetPageResult<TItem>,
    TFilters,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError | string[]>
  >,
  useUpdateMutation: TypedUseMutation<
    TItem,
    MutateRequest<MutateBody>,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError | string[]>
  >,
  useCreateMutation: TypedUseMutation<
    TItem,
    MutateBody,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError | string[]>
  >
) => {
  const [pagination, setPagination] = useState<Pagination>({ pageSize: PAGE_SIZE, pageNumber: 1 });
  const [permanentFilters, setPermanentFilters] = useState<TFilters>({} as TFilters);
  const [items, setItems] = useState<TItem[]>([]);
  const [currentFilters, setCurrentFilters] = useState<TFilters>({} as TFilters);
  const firstRender = useRef(true);
  const [reset, setReset] = useState(true);

  const {
    data: ResponseData,
    isFetching,
    isLoading,
    isError: isErrorQuery,
    isSuccess,
    error: errorQuery,
  } = useQueryHook({ ...currentFilters, pagination, ...permanentFilters });

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

  const [updateItem, { isError: isErrorUpdate, error: errorUpdate }] = useUpdateMutation(); // updateParams: { id: string; body: MutateBody }
  const [createItem, { isError: isErrorCreate, error: errorCreate }] = useCreateMutation(); // createParams: { body: MutateBody }

  const handlerEditItem = useCallback(
    (id: string, data: MutateBody) => {
      if (!id) {
        createItem(data)
          .then((res) => {
            /* nothing */
          })
          .catch((error) => {
            console.error('Create item: ', error);
          });
        return;
      }
      if (id) {
        updateItem({ id:"651c272f8a42911d60f03071", body: data })
          .then((res) => {
            if (res.data) {
              setItems((prev) => prev.map((item) => (item.id === res.data.id ? res.data : item)));
            }
          })
          .catch((error) => {
            console.error('Update item: ', error);
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

  const handlerPermanentFiltersChange = useCallback((filters: TFilters) => {
    setPermanentFilters(filters);
    setPagination((prev) => ({ ...prev, pageNumber: 1 }));
    setItems([]);
    firstRender.current = true;
    setReset((prev) => !prev);
  }, []);


  unexpectedErrorBounce(errorQuery);
  unexpectedErrorBounce(errorCreate);
  unexpectedErrorBounce(errorUpdate);
  
  return {
    items,
    permanentFilters,
    handlerPermanentFiltersChange,
    currentFilters,
    handlerFiltersChange,
    handlerFetchItems,
    isFetching,
    isLoading,
    isError: isErrorQuery || isErrorUpdate || isErrorCreate,
    isSuccess,
    error: [
      ...(isErrorQuery ? (errorQuery as string[]) : []),
      ...(isErrorUpdate ? (errorUpdate as string[]) : []),
      ...(isErrorCreate ? (errorCreate as string[]) : []),
    ],
    editingItem,
    handlerAddClick,
    handlerEditClick,
    clearEditItem,
    handlerEditItem,
  };
};

export default useDataListController;
