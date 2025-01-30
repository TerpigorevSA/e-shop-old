import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import styles from './ProductsEditScreen.module.css';
import ProductItem from '../../entities/Product/ui/ProductItem/ProductItem';
import ComponentFetchList from '../../shared/ui/ComponentFetchList/ComponentFetchList';
import withEditMode from '../../shared/hocs/withEditMode';
import Modal from '../../shared/ui/Modal/Modal';
import ProductEditForm from '../../features/forms/ProductEditForm/ProductEditForm';
import { updateProduct, getPartProducts, addProduct } from '../../features/Products/model/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store/store';
import Button from 'src/shared/ui/Button/Button';
import { MutateProductBody, Product } from '../../shared/types/serverTypes';
import { getCategories } from '../../entities/Category/model/thunks';
import { useTranslation } from 'react-i18next';

const EditProductItem = withEditMode(ProductItem);

const ProductsEditScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const productState = useSelector((state: RootState) => state.products);

  const itemsEmpty = useSelector((state: RootState) => state.products.products).length === 0;
  const categoriesEmpty = useSelector((state: RootState) => state.products.categories).length === 0;
  const firstRender = useRef(true);

  useEffect(() => {
    if (itemsEmpty && firstRender.current) {
      dispatch(getPartProducts({ pagination: { pageSize: 10, pageNumber: 1 } }));
    }
    if (categoriesEmpty && firstRender.current) {
      dispatch(getCategories(null));
    }
    firstRender.current = false;
  }, []);

  const items = useSelector((state: RootState) => state.products.products);
  const categories = useSelector((state: RootState) => state.products.categories);
  const pagination = useSelector((state: RootState) => state.products.pagination);
  const productError = useSelector((state: RootState) => state.products.error);

  const [categoryNames, setCategoryNames] = useState(categories.map((category) => category.name));
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    setCategoryNames(categories.map((category) => category.name));
  }, [categories]);

  const pageTotal = Math.ceil(pagination.total / pagination.pageSize);

  const handleEditProduct = useCallback(
    (id: string, data: MutateProductBody) => {
      if (!id) {
        dispatch(addProduct(data));
        return;
      }
      if (id) {
        dispatch(updateProduct({ id, body: data }));
        return;
      }
    },
    [dispatch, items]
  );

  const handleFetchProducts = useCallback(() => {
    if (
      pagination.pageNumber !== pageTotal &&
      pagination.pageNumber !== 0 &&
      productState.status !== 'loading' &&
      productState.status !== 'failed'
    ) {
      dispatch(getPartProducts({ pagination: { pageSize: 10, pageNumber: pagination.pageNumber + 1 } }));
    }
  }, [dispatch, pagination, pageTotal, productState.status]);

  const renderCallback = useCallback(
    (item: Product) => (
      <div className={cn(styles.item)} key={item.id}>
        <EditProductItem
          onEdit={() => setEditingProduct(item)}
          name={item.name}
          desc={item.desc}
          price={item.price}
          photo={item.photo}
          withButton={false}
        />
      </div>
    ),
    []
  );

  const handleAddClick = useCallback(() => {
    setEditingProduct({
      id: null,
      category: categories[0],
      name: '',
      desc: '',
      price: 0,
      photo: '',
      oldPrice: 0,
    } as Product);
  }, [categories]);

  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <Button
            className={styles.addButton}
            lable="Add product"
            onClick={handleAddClick}
            disabled={productState.status === 'loading'}
          />
        </div>
        <div className={styles.content}>
          <ComponentFetchList items={items} doFetch={handleFetchProducts} render={renderCallback} oneObserve={true} />
        </div>
        {productError && (
          <div className={styles.footer}>
            <div className={styles.error}>{(productError as string[]).map((str) => t(str)).join('\n')}</div>
          </div>
        )}
      </div>
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
