import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import cn from 'clsx';
import styles from './CategoryEditForm.module.css';
import Button from '../../../shared/ui/Button/Button';
import { API_BASE_URL } from '../../../shared/configs/api';
import { getTokenFromLocalStorage } from '../../../shared/lib/localStorage';

type CategoryEditFormFields = {
  name: string;
  photo?: { url: string };
};

type CategoryEditFormProps = {
  onSubmit: (data: CategoryEditFormFields) => void;
  defaultValues?: CategoryEditFormFields;
  categories?: string[];
};

const CategoryEditForm: React.FC<CategoryEditFormProps> = ({ onSubmit, defaultValues }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const token = getTokenFromLocalStorage();
    if (!token) throw new Error('No token');

    const [file] = e.target.files;
    if (!file) return;

    const body = new FormData();
    body.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body,
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки файла');
      }

      const { url } = await response.json();
      setValue('photo.url', url);
      clearErrors('photo.url');
    } catch (err) {
      setError('photo.url', {
        type: 'manual',
        message: t('CategoryEdit.errors.uploadError'),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
      <div>
        <label className={cn(styles.label)}>{t('CategoryEdit.name')}</label>
        <input
          className={cn(styles.input, { [styles.error]: errors.name })}
          type="text"
          {...register('name', { required: t('CategoryEdit.errors.nameRequired') })}
          placeholder={t('CategoryEdit.namePlaceholder')}
        />
        {typeof errors?.name?.message === 'string' && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div>
        <label className={cn(styles.label)}>{t('CategoryEdit.photo')}</label>
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '10px' }}>
          <input
            className={cn(styles.input, { [styles.error]: errors.photo })}
            type="text"
            {...register('photo.url', {
              validate: (value) =>
                value === undefined ||
                value === null ||
                value === '' ||
                value.trim().startsWith('http') ||
                t('CategoryEdit.errors.photosInvalid'),
            })}
            placeholder={t('CategoryEdit.photoPlaceholder')}
          />

          <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: 'none' }} />
          <label htmlFor="file-upload" className={styles.customFileButton} style={{ whiteSpace: 'nowrap' }}>
            Выберите файл
          </label>
        </div>
        {errors.photo && errors.photo?.url && <p className={styles.error}>{errors.photo?.url?.message}</p>}
      </div>

      <Button className={styles.button} lable={t('CategoryEdit.button')} type="submit" disabled={false} />
    </form>
  );
};

export default CategoryEditForm;
