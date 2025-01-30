import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store/store';
import cn from 'clsx';
import styles from './CategoriesEditScreen.module.css';
import CategoryItem from '../../entities/Category/ui/CategoryItem/CategoryItem';
import CategoryEditForm from '../../features/forms/CategoryEditForm/CategoryEditForm';
import withEditMode from '../../shared/hocs/withEditMode';
import Modal from '../../shared/ui/Modal/Modal';
import { addCategory } from '../../entities/Category/model/thunks';
import { Category, MutateCategoryBody, Pagination } from '../../shared/types/serverTypes';
import Button from '../../shared/ui/Button/Button';
import ComponentFetchList from '../../shared/ui/ComponentFetchList/ComponentFetchList';
import { useTranslation } from 'react-i18next';
import { useGetCategoriesQuery, useUpdateCategoryMutation } from '../../entities/Category/api/categoryApi';
import PageLayout from '../../shared/ui/PageLayout/PageLayout';

const EditCategoryItem = withEditMode(CategoryItem);

const CategoriesEditScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const [pagination, setPagination] = useState<Pagination>({ pageSize: 3, pageNumber: 1 });
  const [items, setItems] = useState<Category[]>([]);
  const firstRender = useRef(true);

  const {
    data: ResponseData,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetCategoriesQuery({ pagination });

  const data = ResponseData?.data;
  const serverPagination = ResponseData?.pagination;
  console.log(ResponseData);
  useEffect(() => {
    if (data && (serverPagination.pageNumber !== 1 || firstRender.current)) {
      console.log(pagination.pageNumber, serverPagination.pageNumber, firstRender.current, data);
      setItems((prevItems) => [...prevItems, ...data]);
      firstRender.current = false;
    }
  }, [data, serverPagination]);

  const handleFetchCategories = useCallback(() => {
    if (serverPagination && items.length < serverPagination.total && !isFetching) {
      setPagination((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
    }
  }, [serverPagination, items.length, isFetching]);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [updateCategory] = useUpdateCategoryMutation();

  const handleEditCategory = useCallback(
    (id: string, data: MutateCategoryBody) => {
      if (!id) {
        dispatch(addCategory(data));
        return;
      }
      if (id) {
        updateCategory({ id, body: data })
          .then((res) => {
            /* nothing*/
          })
          .catch((error) => {
            /* nothing*/
          });
        // dispatch(updateCategory({ id, body: data }));
        return;
      }
    },
    [dispatch, items]
  );

  // const handleFetchCategories = useCallback(() => {
  //   if (
  //     pagination.pageNumber !== pageTotal &&
  //     pagination.pageNumber !== 0 &&
  //     categorieState.status !== 'loading' &&
  //     categorieState.status !== 'failed'
  //   ) {
  //     dispatch(getPartCategories({ pagination: { pageSize: 10, pageNumber: pagination.pageNumber + 1 } }));
  //   }
  // }, [dispatch, pagination, pageTotal, categorieState.status]);

  const renderCallback = useCallback(
    (item: Category) => (
      <div className={cn(styles.item)} key={item.id}>
        <EditCategoryItem onEdit={() => setEditingCategory(item)} name={item.name} photo={item.photo} />
      </div>
    ),
    []
  );

  const handleAddClick = useCallback(() => {
    setEditingCategory({
      id: null,
      name: '',
      photo: '',
    } as Category);
  }, []);

  return (
    <>
      {/* <div className={styles.wrapper}>
        <div>
          <Button
            className={styles.addButton}
            lable="Add category"
            onClick={handleAddClick}
            disabled={!isSuccess}
          />
        </div>
        <div className={styles.content}>
          <ComponentFetchList items={items} doFetch={handleFetchCategories} render={renderCallback} oneObserve={true} />
        </div>
        {error && (
          <div className={styles.footer}>
            <div className={styles.error}>{(error as string[]).map((str) => t(str)).join('\n')}</div>
          </div>
        )}
      </div> */}
      <PageLayout
        header={
          <Button
            className={styles.addButton}
            lable="Add category" // TODO: add translation
            onClick={handleAddClick}
            disabled={!isSuccess}
          />
        }
        sidebar={<></>}
        footer={
          error && (
            <div className={styles.footer}>
              <div className={styles.error}>{(error as string[]).map((str) => t(str)).join('\n')}</div>
            </div>
          )
        }
      >
        <ComponentFetchList items={items} doFetch={handleFetchCategories} render={renderCallback} oneObserve={true} />
      </PageLayout>
      {editingCategory && (
        <Modal setVisible={(visible) => (visible ? null : setEditingCategory(null))} visible={editingCategory !== null}>
          <CategoryEditForm
            defaultValues={{
              name: editingCategory.name,
              photo: { url: editingCategory.photo },
            }}
            onSubmit={(data) => {
              const { photo, ...rest } = data;
              handleEditCategory(editingCategory.id, {
                ...rest,
                photo: photo.url,
              });
              setEditingCategory(null);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default CategoriesEditScreen;
