import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import cn from 'clsx';
import styles from './SignIn.module.css';
import Button from '../../../shared/ui/Button/Button';

export type SignInFields = {
  email: string;
  password: string;
};

type SignInProps = {
  onSubmit: (data: SignInFields) => void;
};
export const SingIn: React.FC<SignInProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  const passwordLength = 8;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
      <div>
        <label className={cn(styles.label)}>{t('SignIn.email')}</label>
        <input
          className={cn(styles.input, { [styles.error]: errors.email })}
          type="email"
          {...register('email', {
            required: t('SignIn.errors.emailRequired'),
            pattern: {
              value: /^\S+@\S+$/i,
              message: t('SignIn.errors.invalidEmail'),
            },
          })}
          placeholder={t('SignIn.emailPlaceholder')}
        />
        {typeof errors?.email?.message === 'string' && <p className={styles.error}>{errors.email.message}</p>}
      </div>
      <div>
        <label className={cn(styles.label)}>{t('SignIn.password')}</label>
        <input
          className={cn(styles.input, { [styles.error]: errors.password })}
          type="password"
          {...register('password', {
            required: t('SignIn.errors.passwordRequired'),
          })}
          placeholder={t('SignIn.passwordPlaceholder')}
        />
        {typeof errors?.password?.message === 'string' && <p className={styles.error}>{errors.password.message}</p>}
      </div>
      <Button className={styles.button} lable={t('SignIn.button')} type="submit" disabled={false} />
    </form>
  );
};

export default SingIn;
