import React, { useCallback } from 'react';
import EditProfile, { EditProfileFields } from './EditProfile/EditProfile';
import ChangePassword, { ChangePasswordFields } from './ChangePassword/ChangePassword';
import cn from 'clsx';
import styles from './ProfileScreen.module.css';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store/store';
import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../entities/Profile/api/profileApi';

const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();

  const { data: currentUser, isLoading: profileIsLoading, isUninitialized, error: profileError } = useGetProfileQuery();
  const [updateProfile, { error: updateProfileError }] = useUpdateProfileMutation();
  const [changePassword, { error: changePasswordError }] = useChangePasswordMutation();

  const dispatch: AppDispatch = useDispatch();

  const handleEditProfileSubmit = useCallback(async (data: EditProfileFields) => {
    await updateProfile({ name: data.userName });
  }, []);

  const handleChangePasswordSubmit = useCallback(async (data: ChangePasswordFields) => {
    await changePassword({ password: data.oldPassword, newPassword: data.newPassword });
  }, []);

  if (isUninitialized || profileIsLoading) {
    return <div>{'loading'}</div>;
  }

  const error = [
    ...(profileError ? (profileError as string[]) : []),
    ...(updateProfileError ? (updateProfileError as string[]) : []),
    ...(changePasswordError ? (changePasswordError as string[]) : []),
  ];

  return (
    <div className={cn(styles.page)}>
      <h1 className={cn(styles.title)}>{t('ProfileScreen.title')}</h1>
      <div>
        <EditProfile
          onSubmit={handleEditProfileSubmit}
          defaultValues={currentUser && { userName: currentUser?.name }}
        />
      </div>
      <div>
        <ChangePassword onSubmit={handleChangePasswordSubmit} />
      </div>
      {error && <div className={styles.error}>{(error as string[]).map((str) => t(str)).join('\n')}</div>}
    </div>
  );
};

export default ProfileScreen;
