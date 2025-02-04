import React, { useCallback, useState } from 'react';
import cn from 'clsx';
import styles from './CategoriesEditScreen.module.css';
import CategoryItem from '../../entities/Category/ui/CategoryItem/CategoryItem';
import CategoryEditForm from '../../features/forms/CategoryEditForm/CategoryEditForm';
import withEditMode from '../../shared/hocs/withEditMode';
import Modal from '../../shared/ui/Modal/Modal';
import { CategoriesFilters, Category, MutateCategoryBody } from '../../shared/types/serverTypes';
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
import useDataListController from '../../shared/hooks/useDataListController';

const EditCategoryItem = withEditMode(CategoryItem);

const CategoriesEditScreen: React.FC = () => {
  const { t } = useTranslation();

  const [defaultItem] = useState<Category>({ id: '', name: '', photo: '' } as Category);

  const {
    items,
    handlerFiltersChange,
    handlerFetchItems,
    isSuccess,
    error,
    editingItem,
    handlerEditItem,
    handlerAddClick,
    handlerEditClick,
    clearEditItem,
  } = useDataListController<Category, CategoriesFilters, MutateCategoryBody>(
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
    useCreateCategoryMutation
  );

  const renderCallback = useCallback(
    (item: Category) => (
      <div className={cn(styles.item)} key={item.id}>
        <EditCategoryItem onEdit={() => handlerEditClick(item)} name={item.name} photo={item.photo} />
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
            onClick={() => handlerAddClick(defaultItem)}
            disabled={!isSuccess}
          />
        }
        sidebar={
          <>
            <CategoriesFiltersForm initialFilters={{}} onChange={handlerFiltersChange} />
          </>
        }
        footer={
          error && (
            <div className={styles.footer}>
              <div className={styles.error}>{(error as string[]).map((str) => t(str)).join('\n')}</div>
            </div>
          )
        }
      >
        <ComponentFetchList items={items} doFetch={handlerFetchItems} render={renderCallback} oneObserve={true} />
      </PageLayout>
      {editingItem && (
        <Modal setVisible={(visible) => (visible ? null : clearEditItem())} visible={editingItem !== null}>
          <CategoryEditForm
            defaultValues={{
              name: editingItem.name,
              photo: { url: editingItem.photo },
            }}
            onSubmit={(data) => {
              const { photo, ...rest } = data;
              handlerEditItem(editingItem.id, {
                ...rest,
                photo: photo.url,
              });
              clearEditItem();
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default CategoriesEditScreen;
