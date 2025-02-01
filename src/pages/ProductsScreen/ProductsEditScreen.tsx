import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import styles from './ProductsEditScreen.module.css';
import ProductItem from '../../entities/Product/ui/ProductItem/ProductItem';
import ComponentFetchList from '../../shared/ui/ComponentFetchList/ComponentFetchList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store/store';
import { Category, MutateProductBody, Pagination, Product, ProductsFilters } from '../../shared/types/serverTypes';
import PageLayout from '../../shared/ui/PageLayout/PageLayout';
import { useCreateProductMutation, useGetProductsQuery, useUpdateProductMutation } from '../../entities/Product/api/productApi';
import { useGetCategoriesQuery } from '../../entities/Category/api/categoryApi';
import { useTranslation } from 'react-i18next';
import withEditMode from '../../shared/hocs/withEditMode';
import Button from '../../shared/ui/Button/Button';
import ProductsFiltersForm from './ProductsFiltersForm/ProductsFiltersForm';
import Modal from '../../shared/ui/Modal/Modal';
import ProductEditForm from '../../features/forms/ProductEditForm/ProductEditForm';

const EditProductItem = withEditMode(ProductItem);

const PAGE_SIZE = 5;

const ProductsEditScreen: React.FC = () => {
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

  const [categoryNames, setCategoryNames] = useState<string[]>([]);

  useEffect(() => {
    setCategoryNames(categories.map((category) => category.name));
  }, [categories]);
  // for categoties only

  const [pagination, setPagination] = useState<Pagination>({ pageSize: PAGE_SIZE, pageNumber: 1 });
  const [items, setItems] = useState<Product[]>([]);
  const [currentFilters, setCurrentFilters] = useState<ProductsFilters>({});
  const firstRender = useRef(true);
  const [reset, setReset] = useState(true);

  const {
    data: ResponseData,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetProductsQuery({ ...currentFilters, pagination });

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
    setItems((prev) => []);
    firstRender.current = true;
    setReset((prev) => !prev);
  }, []);

  const handleFetchProducts = useCallback(() => {
    if (serverPagination && items.length < serverPagination.total && !isFetching) {
      setPagination((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
    }
  }, [serverPagination, items.length, isFetching]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [updateProduct] = useUpdateProductMutation();
  const [createProduct] = useCreateProductMutation();

  const handleEditProduct = useCallback(
    (id: string, data: MutateProductBody) => {
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

  const handleAddClick = useCallback(() => {
    setEditingProduct({
      id: null,
      name: '',
      photo: '',
    } as Product);
  }, []);

  const renderCallback = useCallback(
    (item: Product) => (
      <div className={cn(styles.item)} key={item.id}>
        <EditProductItem
          name={item.name}
          desc={item.desc}
          price={item.price}
          photo={item.photo}
          withButton={false}
          onEdit={() => setEditingProduct(item)}
        />
      </div>
    ),
    []
  );

  return (
    <>
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
        header={<>
          <Button
            className={styles.addButton}
            lable="Add product"
            onClick={handleAddClick}
            disabled={isLoading}
          />
        </>}
        sidebar={
          isSuccessCategories ? (
            <>
              <ProductsFiltersForm
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
      {editingProduct && (
        <Modal setVisible={(visible) => (visible ? null : setEditingProduct(null))} visible={editingProduct !== null}>
          <ProductEditForm
            defaultValues={{
              name: editingProduct.name,
              price: editingProduct.price,
              description: editingProduct.desc,
              category: editingProduct.category.name,
              oldPrice: editingProduct.oldPrice,
              photo: { url: editingProduct.photo },
            }}
            categories={categoryNames}
            onSubmit={(data) => {
              const categoryId = categories.find((category) => category.name === data.category).id;
              const { category: _, description: desc, photo, ...rest } = data;
              handleEditProduct(editingProduct.id, {
                ...rest,
                desc,
                categoryId,
                photo: photo.url,
              });
              setEditingProduct(null);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default ProductsEditScreen;