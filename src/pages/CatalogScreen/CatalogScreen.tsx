import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import styles from './CatalogScreen.module.css';
import ProductItem from '../../entities/Product/ui/ProductItem/ProductItem';
import ComponentFetchList from '../../shared/ui/ComponentFetchList/ComponentFetchList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store/store';
import { Category, Pagination, Product, ProductsFilters } from '../../shared/types/serverTypes';
import { setQuantity } from '../../features/Cart/model/slice';
import PageLayout from '../../shared/ui/PageLayout/PageLayout';
import CatalogFiltersForm from './CatalogFiltersForm/CatalogFiltersForm';
import { useGetProductsQuery } from '../../entities/Product/api/productApi';
import { useGetCategoriesQuery } from '../../entities/Category/api/categoryApi';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 5;

const CatalogScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  // for categoties only
  const [categories, setCategories] = useState<Category[]>([]);
  const firstCategoryRender = useRef(true);
  const {
    data: categoryResponseData,
    isFetching: isFetchingCategories,
    isSuccess: isSuccessCategories,
  } = useGetCategoriesQuery(null, {
    skip: !firstCategoryRender.current,
  });

  const categoryData = categoryResponseData?.data;
  const categoryServerPagination = categoryResponseData?.pagination;

  useEffect(() => {
    if (
      categoryData &&
      !isFetchingCategories &&
      (categoryServerPagination.pageNumber !== 1 || firstCategoryRender.current)
    ) {
      setCategories((prev) => [...prev, ...categoryData]);
      firstCategoryRender.current = false;
    }
  }, [categoryData, categoryServerPagination, isFetchingCategories]);
  // for categoties only

  const [pagination, setPagination] = useState<Pagination>({ pageSize: PAGE_SIZE, pageNumber: 1 });
  const [items, setItems] = useState<Product[]>([]);
  const [currentFilters, setCurrentFilters] = useState<ProductsFilters>({});
  const firstRender = useRef(true);
  const [reset, setReset] = useState(true);

  const { data: ResponseData, isFetching, error } = useGetProductsQuery({ ...currentFilters, pagination });

  const data = ResponseData?.data;
  const serverPagination = ResponseData?.pagination;
  useEffect(() => {
    if (data && !isFetching && (serverPagination.pageNumber !== 1 || firstRender.current)) {
      setItems((prevItems) => [...prevItems, ...data]);
      firstRender.current = false;
    }
  }, [data, serverPagination, reset, isFetching]);

  const handleFiltersChange = useCallback((filters: ProductsFilters) => {
    setCurrentFilters(filters);
    setPagination((prev) => ({ ...prev, pageNumber: 1 }));
    setItems([]);
    firstRender.current = true;
    setReset((prev) => !prev);
  }, []);

  const handleFetchProducts = useCallback(() => {
    if (serverPagination && items.length < serverPagination.total && !isFetching) {
      setPagination((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
    }
  }, [serverPagination, items.length, isFetching]);

  const currentCart = useSelector((state: RootState) => state.cart.currentCartEntries);

  const handleSetQuantity = useCallback(
    (product: Product, quantity: number) => {
      dispatch(setQuantity({ product, quantity }));
    },
    [dispatch]
  );

  const renderCallback = useCallback(
    (item: Product) => (
      <div className={cn(styles.item)} key={item.id}>
        <ProductItem
          name={item.name}
          desc={item.desc}
          price={item.price}
          photo={item.photo}
          count={currentCart.find(({ product }) => product.id === item.id)?.quantity ?? 0}
          onCountChange={(count) => handleSetQuantity(item, count)}
        />
      </div>
    ),
    [currentCart, handleSetQuantity]
  );

  return (
    <PageLayout
      footer={
        <>
          (
          {error && (
            <div className={styles.footer}>
              {/* <div className={styles.error}>{JSON.stringify(error)}</div> */}
              <div className={styles.error}>{(error as string[]).map((str) => t(str)).join('\n')}</div>
            </div>
          )}
          )
        </>
      }
      header={<></>}
      sidebar={
        isSuccessCategories ? (
          <>
            <CatalogFiltersForm
              initialFilters={currentFilters}
              onChange={handleFiltersChange}
              categories={categories}
            />
          </>
        ) : (
          <div>Loading...</div>
        )
      }
    >
      <div className={cn(styles.list)}>
        <ComponentFetchList items={items} doFetch={handleFetchProducts} render={renderCallback} oneObserve={true} />
      </div>
    </PageLayout>
  );
};

export default CatalogScreen;
