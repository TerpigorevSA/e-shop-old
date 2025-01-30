import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store/store';
import cn from 'clsx';
import styles from './CategoriesEditScreen.module.css';
import CategoryItem from '../../entities/Category/ui/CategoryItem/CategoryItem';
import CategoryEditForm from '../../features/forms/CategoryEditForm/CategoryEditForm';
import withEditMode from '../../shared/hocs/withEditMode';
import Modal from '../../shared/ui/Modal/Modal';
import { addCategory, getPartCategories, updateCategory } from '../../entities/Category/model/thunks';
import { Category, MutateCategoryBody } from '../../shared/types/serverTypes';
import Button from '../../shared/ui/Button/Button';
import ComponentFetchList from '../../shared/ui/ComponentFetchList/ComponentFetchList';
import { useTranslation } from 'react-i18next';

const EditCategoryItem = withEditMode(CategoryItem);

const CategoriesEditScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const categorieState = useSelector((state: RootState) => state.categories);

  const itemsEmpty = useSelector((state: RootState) => state.categories.categories).length === 0;
  const firstRender = useRef(true);

  useEffect(() => {
    if (itemsEmpty && firstRender.current) {
      dispatch(getPartCategories({ pagination: { pageSize: 10, pageNumber: 1 } }));
    }
    firstRender.current = false;
  }, []);

  const items = useSelector((state: RootState) => state.categories.categories);
  const pagination = useSelector((state: RootState) => state.categories.pagination);
  const categoryError = useSelector((state: RootState) => state.categories.error);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const pageTotal = Math.ceil(pagination.total / pagination.pageSize);

  const handleEditCategory = useCallback(
    (id: string, data: MutateCategoryBody) => {
      if (!id) {
        dispatch(addCategory(data));
        return;
      }
      if (id) {
        dispatch(updateCategory({ id, body: data }));
        return;
      }
    },
    [dispatch, items]
  );

  const handleFetchCategories = useCallback(() => {
    if (
      pagination.pageNumber !== pageTotal &&
      pagination.pageNumber !== 0 &&
      categorieState.status !== 'loading' &&
      categorieState.status !== 'failed'
    ) {
      dispatch(getPartCategories({ pagination: { pageSize: 10, pageNumber: pagination.pageNumber + 1 } }));
    }
  }, [dispatch, pagination, pageTotal, categorieState.status]);

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
      <div className={styles.wrapper}>
        <div>
          <Button
            className={styles.addButton}
            lable="Add category"
            onClick={handleAddClick}
            disabled={categorieState.status === 'loading'}
          />
        </div>
        <div className={styles.content}>
          <ComponentFetchList items={items} doFetch={handleFetchCategories} render={renderCallback} oneObserve={true} />
        </div>
        {categoryError && (
          <div className={styles.footer}>
            <div className={styles.error}>{(categoryError as string[]).map((str) => t(str)).join('\n')}</div>
          </div>
        )}
      </div>
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
