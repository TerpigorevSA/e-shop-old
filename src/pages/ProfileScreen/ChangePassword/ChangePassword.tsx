import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import cn from 'clsx';
import styles from './ChangePassword.module.css';
import Button from '../../../shared/ui/Button/Button';

export type ChangePasswordFields = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ChangePasswordProps = {
  onSubmit: (data: ChangePasswordFields) => void;
};

const ChangePassword: React.FC<ChangePasswordProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const newPassword = watch('newPassword');
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
      <h2 className={cn(styles.title)}>{t('ChangePassword.title')}</h2>
      <div>
        <label className={cn(styles.label)}>{t('ChangePassword.oldPassword')}</label>
        <input
          className={cn(styles.input, { [styles.error]: errors.oldPassword })}
          type="password"
          {...register('oldPassword', { required: t('ChangePassword.errors.oldPasswordRequired') })}
          placeholder={t('ChangePassword.oldPasswordPlaceholder')}
        />
        {typeof errors.oldPassword?.message === 'string' && (
          <p className={styles.error}>{errors.oldPassword.message}</p>
        )}
      </div>
      <div>
        <label className={cn(styles.label)}>{t('ChangePassword.newPassword')}</label>
        <input
          className={cn(styles.input, { [styles.error]: errors.newPassword })}
          type="password"
          {...register('newPassword', { required: t('ChangePassword.errors.newPasswordRequired') })}
          placeholder={t('ChangePassword.newPasswordPlaceholder')}
        />
        {typeof errors.newPassword?.message === 'string' && (
          <p className={styles.error}>{errors.newPassword.message}</p>
        )}
      </div>
      <div>
        <label className={cn(styles.label)}>{t('ChangePassword.confirmPassword')}</label>
        <input
          className={cn(styles.input, { [styles.error]: errors.confirmPassword })}
          type="password"
          {...register('confirmPassword', {
            required: t('ChangePassword.errors.confirmPasswordRequired'),
            validate: (value) => value === newPassword || t('ChangePassword.errors.confirmPasswordMatch'),
          })}
          placeholder={t('ChangePassword.confirmPasswordPlaceholder')}
        />
        {typeof errors.confirmPassword?.message === 'string' && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}
      </div>
      <Button className={styles.button} lable={t('ChangePassword.button')} type="submit" disabled={false} />
    </form>
  );
};

export default ChangePassword;
