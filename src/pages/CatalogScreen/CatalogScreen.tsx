import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import styles from './CatalogScreen.module.css';
import ProductItem from '../../entities/Product/ui/ProductItem/ProductItem';
import ComponentFetchList from '../../shared/ui/ComponentFetchList/ComponentFetchList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store/store';
import { Product, ProductsFilters } from '../../shared/types/serverTypes';
import { setQuantity } from '../../features/Cart/model/slice';
import PageLayout from '../../shared/ui/PageLayout/PageLayout';
import CatalogFiltersForm from './CatalogFiltersForm/CatalogFiltersForm';
import { useGetProductsQuery } from '../../entities/Product/api/productApi';
import { getPartCategories } from 'src/entities/Category/model/thunks';

const PAGE_SIZE = 10;

const CatalogScreen: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  // for categoties only
  const categoriesEmpty = useSelector((state: RootState) => state.categories.categories).length === 0;
  const firstRender = useRef(true);

  useEffect(() => {
    if (categoriesEmpty && firstRender.current) {
      dispatch(getPartCategories(null));
    }
    firstRender.current = false;
  }, []);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const categoriesState = useSelector((state: RootState) => state.categories.status);
  // for categoties only
  const [currentFilters, setCurrentFilters] = useState<ProductsFilters>({});

  // const { products: items, status, pagination, categories } = useSelector((state: RootState) => state.products);

  const currentCart = useSelector((state: RootState) => state.cart.currentCartEntries);

  const loadedPages = useRef<number[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const { data, isFetching, isLoading, isError, refetch } = useGetProductsQuery(
    { ...currentFilters, pagination: { pageSize: PAGE_SIZE, pageNumber: pageNumber } },
    {
      // Пропуск для 0 и для уже загруженных (первую страницу может повторно, из-за React.StrickMode)
      skip: pageNumber === 0 || loadedPages.current.includes(pageNumber),
    }
  );

  const handleFetchProducts = useCallback(() => {
    console.log('handleFetchProducts');
    if (!hasMore || isFetching) return;
    setPageNumber((prev) => {
      return prev + 1;
    });
  }, [hasMore, isFetching]);

  useEffect(() => {
    if (isLoading && isFetching) {
      setProducts([]);
    }
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (
      data &&
      data.data.length > 0 &&
      !loadedPages.current.includes(pageNumber) &&
      data.pagination.pageNumber === pageNumber
    ) {
      loadedPages.current.push(pageNumber);
      setProducts((prev) => [...prev, ...data.data]);
    } else if (data && data.data.length < PAGE_SIZE) {
      setHasMore(false);
    }
  }, [data, pageNumber]);

  // const handleFetchProducts = useCallback(() => {
  //   console.log('handleFetchProducts')
  //   if (status === 'succeeded' && pagination.pageNumber < Math.ceil(pagination.total / pagination.pageSize)) {
  //     console.log('handleFetchProducts', pagination);
  //     dispatch(
  //       getPartProducts({
  //         ...currentFilters,
  //         pagination: { pageSize: 10, pageNumber: pagination.pageNumber + 1 },
  //       })
  //     );
  //   }
  // }, [status, pagination, dispatch]);

  const handleFiltersChange = useCallback(
    (filters: ProductsFilters) => {
      setCurrentFilters(filters);
      loadedPages.current = [];
      setPageNumber(1);
      setHasMore(true);
      setProducts([]);
      // setLocalItems([]);
      // dispatch(clearCurrentProducts());
      // firstRender.current = true;
    },
    [dispatch]
  );

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
      footer={<></>}
      header={<></>}
      sidebar={
        categoriesState === 'succeeded' ? (
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
        <ComponentFetchList
          items={products}
          doFetch={handleFetchProducts}
          render={renderCallback}
          oneObserve={true}
          // needObserve={pagination.pageNumber < Math.ceil(pagination.total / pagination.pageSize)}
        />
      </div>
    </PageLayout>
  );
};

export default CatalogScreen;
