import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import styles from './CategoriesEditScreen.module.css';
import CategoryItem from '../../entities/Category/ui/CategoryItem/CategoryItem';
import CategoryEditForm from '../../features/forms/CategoryEditForm/CategoryEditForm';
import withEditMode from '../../shared/hocs/withEditMode';
import Modal from '../../shared/ui/Modal/Modal';
import { CategoriesFilters, Category, MutateCategoryBody, Pagination } from '../../shared/types/serverTypes';
import Button from '../../shared/ui/Button/Button';
import ComponentFetchList from '../../shared/ui/ComponentFetchList/ComponentFetchList';
import { useTranslation } from 'react-i18next';
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../entities/Category/api/categoryApi';
import PageLayout from '../../shared/ui/PageLayout/PageLayout';
import CategoriesFiltersForm from './CategoriesFilterForm/CategoriesFilterForm';

const EditCategoryItem = withEditMode(CategoryItem);
const PAGE_SIZE = 10;

const CategoriesEditScreen: React.FC = () => {
  const { t } = useTranslation();

  const [pagination, setPagination] = useState<Pagination>({ pageSize: PAGE_SIZE, pageNumber: 1 });
  const [items, setItems] = useState<Category[]>([]);
  const [currentFilters, setCurrentFilters] = useState<CategoriesFilters>({});
  const firstRender = useRef(true);
  const [reset, setReset] = useState(true);

  const {
    data: ResponseData,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetCategoriesQuery({ ...currentFilters, pagination });

  const data = ResponseData?.data;
  const serverPagination = ResponseData?.pagination;
  // console.log(ResponseData, pagination, currentFilters);
  useEffect(() => {
    // console.log('useEffect', ResponseData, pagination, currentFilters);
    if (data && !isFetching && (serverPagination.pageNumber !== 1 || firstRender.current)) {
      setItems((prevItems) => [...prevItems, ...data]);
      firstRender.current = false;
    }
  }, [data, serverPagination, reset, isFetching]);

  const handleFiltersChange = useCallback((filters: CategoriesFilters) => {
    setCurrentFilters(filters);
    setPagination((prev) => ({ ...prev, pageNumber: 1 }));
    setItems((prev) => []);
    firstRender.current = true;
    setReset((prev) => !prev);
  }, []);

  const handleFetchCategories = useCallback(() => {
    if (serverPagination && items.length < serverPagination.total && !isFetching) {
      setPagination((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
    }
  }, [serverPagination, items.length, isFetching]);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [updateCategory] = useUpdateCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();

  const handleEditCategory = useCallback(
    (id: string, data: MutateCategoryBody) => {
      if (!id) {
        createCategory(data).then((res) => {
          console.log(JSON.stringify(res));
        });
        return;
      }
      if (id) {
        updateCategory({ id: '9b7d0c31-2ed4-4f5a-8b3d-ee0422ce152b', body: data })
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
    setEditingCategory({
      id: null,
      name: '',
      photo: '',
    } as Category);
  }, []);

  const renderCallback = useCallback(
    (item: Category) => (
      <div className={cn(styles.item)} key={item.id}>
        <EditCategoryItem onEdit={() => setEditingCategory(item)} name={item.name} photo={item.photo} />
      </div>
    ),
    []
  );

  return (
    <>
      <PageLayout
        header={
          <Button
            className={styles.addButton}
            lable="Add category" // TODO: add translation
            onClick={handleAddClick}
            disabled={!isSuccess}
          />
        }
        sidebar={
          <>
            <CategoriesFiltersForm initialFilters={{}} onChange={handleFiltersChange} />
          </>
        }
        footer={
          JSON.stringify(currentFilters) ||
          (error && (
            <div className={styles.footer}>
              <div className={styles.error}>{(error as string[]).map((str) => t(str)).join('\n')}</div>
            </div>
          ))
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
