import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import cn from 'clsx';
import styles from './SignUp.module.css';
import Button from '../../../shared/ui/Button/Button';

export type SignUpFields = {
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpProps = {
  onSubmit: (data: SignUpFields) => void;
};

export const SingUp: React.FC<SignUpProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch('password');
  const { t } = useTranslation();
  const passwordLength = 8;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
      <div>
        <label className={styles.label}>{t('SignUp.email')}</label>
        <input
          className={cn(styles.input, { [styles.error]: errors.email })}
          type="email"
          {...register('email', {
            required: t('SignUp.errors.emailRequired'),
            pattern: {
              value: /^\S+@\S+$/i,
              message: t('SignUp.errors.invalidEmail'),
            },
          })}
          placeholder={t('SignUp.emailPlaceholder')}
        />
        {typeof errors?.email?.message === 'string' && <p className={styles.error}>{errors.email.message}</p>}
      </div>
      <div>
        <label className={styles.label}>{t('SignUp.password')}</label>
        <input
          className={cn(styles.input, { [styles.error]: errors.password })}
          type="password"
          {...register('password', {
            required: t('SignUp.errors.passwordRequired'),
            minLength: {
              value: passwordLength,
              message: t('SignUp.errors.passwordLength', { passwordLength }),
            },
          })}
          placeholder={t('SignUp.passwordPlaceholder')}
        />
        {typeof errors?.password?.message === 'string' && <p className={styles.error}>{errors.password.message}</p>}
      </div>
      <div>
        <label className={styles.label}>{t('SignUp.confirmPassword')}</label>
        <input
          className={cn(styles.input, { [styles.error]: errors.confirmPassword })}
          type="password"
          {...register('confirmPassword', {
            required: t('SignUp.errors.confirmPasswordRequired'),
            validate: (value) => value === password || t('SignUp.errors.confirmPasswordMatch'),
          })}
          placeholder={t('SignUp.confirmPasswordPlaceholder')}
        />
        {typeof errors?.confirmPassword?.message === 'string' && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}
      </div>
      <Button className={styles.button} lable={t('SignUp.button')} type="submit" disabled={false} />
    </form>
  );
};
export default SingUp;
