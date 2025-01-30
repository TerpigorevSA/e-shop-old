import React, { ReactNode, useState } from 'react';
import * as yup from 'yup';
import cn from 'clsx';
import styles from './CommonFiltersForm.module.css';
import { commonFiltersSchema } from './CommonFiltersFormSchema';
import { CommonFilters, Sorting } from '../../../shared/types/serverTypes';
import { useTranslation } from 'react-i18next';

type CommonFilterFormProps<T extends CommonFilters> = {
  onChange: (filters: T) => void;
  initialFilters: T;
  childrenSchema?: yup.ObjectSchema<Omit<T, keyof CommonFilters>>;
  children?:
    | ReactNode
    | ((
        errors: Record<string, string>,
        filters: T,
        handleChange: <K extends keyof T>(key: K, value: T[K]) => void
      ) => ReactNode);
};

export const CommonFiltersForm = <T extends CommonFilters>({
  onChange,
  initialFilters,
  childrenSchema: childrenSchemas,
  children,
}: CommonFilterFormProps<T>) => {
  const isFunction = (
    value: unknown
  ): value is (
    errors: Record<string, string>,
    filters: T,
    handleChange: <K extends keyof T>(key: K, value: T[K]) => void
  ) => ReactNode => typeof value === 'function';
  const filterFormSchema = childrenSchemas ? commonFiltersSchema.concat(childrenSchemas) : commonFiltersSchema;
  const { t } = useTranslation();

  const [localFilters, setLocalFilters] = useState<T>(initialFilters);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = <K extends keyof T>(key: K, value: T[K]) => {
    setLocalFilters({ ...localFilters, [key]: value });
  };

  const handleReset = () => {
    setErrors({});
    const emptyFilters = {} as T;
    setLocalFilters(emptyFilters);
    // setLocalFilters(initialFilters);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    filterFormSchema
      .validate(localFilters, { abortEarly: false })
      .then(() => {
        onChange(localFilters);
      })
      .catch((err) => {
        console.error(t('CommonFiltersForm.errors.validations'), err.errors);
        if (err instanceof yup.ValidationError) {
          const validationErrors: Record<string, string> = {};

          err.inner.forEach((error) => {
            if (error.path) {
              validationErrors[error.path] = error.message;
            }
          });
          setErrors(validationErrors);
        }
      });
  };

  return (
    <form className={cn(styles.form)} onSubmit={handleSubmit}>
      <div>
        <label className={cn(styles.label)}>{t('CommonFiltersForm.createdAt.label')}</label>
        <label className={cn(styles.subLabel)}>{t('CommonFiltersForm.createdAt.from')}</label>
        <div style={{ flexDirection: 'row', display: 'flex' }}>
          <input
            className={cn(styles.input)}
            type="datetime-local"
            value={localFilters?.createdAt?.gte || ''}
            onChange={(e) =>
              handleChange('createdAt', {
                ...localFilters?.createdAt,
                gte: e.target.value,
              })
            }
          />
          <button
            className={cn(styles.clearButton)}
            type="button"
            onClick={() =>
              handleChange('createdAt', {
                ...localFilters?.createdAt,
                gte: undefined,
              })
            }
          >
            X
          </button>
        </div>
        <label className={cn(styles.subLabel)}>{t('CommonFiltersForm.createdAt.by')}</label>
        <div style={{ flexDirection: 'row', display: 'flex' }}>
          <input
            className={cn(styles.input)}
            type="datetime-local"
            value={localFilters?.createdAt?.lte || ''}
            onChange={(e) =>
              handleChange('createdAt', {
                ...localFilters?.createdAt,
                lte: e.target.value,
              })
            }
          />
          <button
            className={cn(styles.clearButton)}
            type="button"
            onClick={() =>
              handleChange('createdAt', {
                ...localFilters?.createdAt,
                lte: undefined,
              })
            }
          >
            X
          </button>
        </div>
        {errors['createdAt.lte'] && <p className={cn(styles.error)}>{t(errors['createdAt.lte'])}</p>}
      </div>

      <div>
        <label className={cn(styles.label)}>{t('CommonFiltersForm.updatedAt.label')}</label>
        <label className={cn(styles.subLabel)}>{t('CommonFiltersForm.updatedAt.from')}</label>
        <div style={{ flexDirection: 'row', display: 'flex' }}>
          <input
            className={cn(styles.input)}
            type="datetime-local"
            value={localFilters?.updatedAt?.gte || ''}
            onChange={(e) =>
              handleChange('updatedAt', {
                ...localFilters?.updatedAt,
                gte: e.target.value,
              })
            }
          />
          <button
            className={cn(styles.clearButton)}
            type="button"
            onClick={() =>
              handleChange('updatedAt', {
                ...localFilters?.updatedAt,
                gte: undefined,
              })
            }
          >
            X
          </button>
        </div>
        <label className={cn(styles.subLabel)}>{t('CommonFiltersForm.updatedAt.by')}</label>
        <div style={{ flexDirection: 'row', display: 'flex' }}>
          <input
            className={cn(styles.input)}
            type="datetime-local"
            value={localFilters?.updatedAt?.lte || ''}
            onChange={(e) =>
              handleChange('updatedAt', {
                ...localFilters?.updatedAt,
                lte: e.target.value,
              })
            }
          />
          <button
            className={cn(styles.clearButton)}
            type="button"
            onClick={() =>
              handleChange('updatedAt', {
                ...localFilters?.updatedAt,
                lte: undefined,
              })
            }
          >
            X
          </button>
        </div>
        {errors['updatedAt.lte'] && <p className={cn(styles.error)}>{t(errors['updatedAt.lte'])}</p>}
      </div>

      <div>
        <label className={cn(styles.label)}>{t('CommonFiltersForm.sorting.label')}</label>
        <label className={cn(styles.subLabel)}>{t('CommonFiltersForm.sorting.byField')}</label>
        <select
          className={cn(styles.select)}
          value={localFilters?.sorting?.field || ''}
          onChange={(e) =>
            handleChange(
              'sorting',
              e.target.value
                ? {
                    field: e.target.value as Sorting['field'],
                    type: localFilters?.sorting?.type || 'ASC',
                  }
                : undefined
            )
          }
        >
          <option value="">{t('CommonFiltersForm.sorting.field.noSorting')}</option>
          <option value="id">{t('CommonFiltersForm.sorting.field.id')}</option>
          <option value="createdAt">{t('CommonFiltersForm.sorting.field.createdAt')}</option>
          <option value="updatedAt">{t('CommonFiltersForm.sorting.field.updatedAt')}</option>
          <option value="name">{t('CommonFiltersForm.sorting.field.')}</option>
        </select>
        {errors['sorting.field'] && <p className={cn(styles.error)}>{t(errors['sorting.field'])}</p>}
        <label className={cn(styles.subLabel)}>{t('CommonFiltersForm.sorting.direction')}</label>
        <select
          className={cn(styles.select)}
          value={localFilters?.sorting?.type || 'ASC'}
          onChange={(e) =>
            handleChange('sorting', {
              field: localFilters?.sorting?.field || 'id',
              type: e.target.value as 'ASC' | 'DESC',
            })
          }
        >
          <option value="ASC">{t('CommonFiltersForm.sorting.type.ASC')}</option>
          <option value="DESC">{t('CommonFiltersForm.sorting.type.DESC')}</option>
        </select>
        {errors['sorting.type'] && <p className={cn(styles.error)}>{t(errors['sorting.type'])}</p>}
      </div>

      {isFunction(children) ? children(errors, localFilters, handleChange) : children}

      <button className={cn(styles.button)} type="button" onClick={handleReset}>
        {t('CommonFiltersForm.resetButton')}
      </button>
      <button className={cn(styles.button)} type="submit">
        {t('CommonFiltersForm.submitButton')}
      </button>
    </form>
  );
};
