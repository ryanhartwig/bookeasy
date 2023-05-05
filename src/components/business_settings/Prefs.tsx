import { Setting } from '@/components/UI/Setting/Setting';
import { NewBusiness } from '@/types/Business';
import { UPDATE_BUSINESS_PREFS } from '@/utility/queries/businessQueries';
import { GET_USER_OWN_BUSINESS } from '@/utility/queries/userQueries';
import { useMutation } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { Avatar } from '../UI/Avatar/Avatar';
import styles from './tabs.module.scss';

interface PrefsProps {
  business: NewBusiness,
  userId?: string,
}

export const Prefs: React.FC<PrefsProps> = ({business, userId}) => {

  const [value, setValue] = useState<string>('');

  const [updateBusinessPrefs, { 
    data: updateBusinessPrefsData, 
    loading: updateBusinessPrefsLoading,
    reset: updateBusinessPrefsReset,
  }] = useMutation(UPDATE_BUSINESS_PREFS, {
    refetchQueries: !userId ? [] : [{
      query: GET_USER_OWN_BUSINESS,
      variables: { userId }
    }],
  });

  const onSave = (key: string) => {
    return updateBusinessPrefs({variables: { businessId: business.id, patch: {
      [key]: value,
    }}})
  } 

  useEffect(() => {
    if (!updateBusinessPrefsData) return;
    if (updateBusinessPrefsLoading) return;
    updateBusinessPrefsReset();
  }, [updateBusinessPrefsData, updateBusinessPrefsLoading, updateBusinessPrefsReset]);

  return (
    <div className={styles.Prefs}>
      <div className={styles.header}>
        <p>General Business Prefs</p>
      </div>

      <div className={styles.settings}>
        <Setting label='Business Photo' placeholder='Enter valid url' value={value} setValue={setValue} onSave={() => onSave('avatar')}>
          <Avatar src={business.avatar} size={50} alt='Business logo' />
        </Setting>
        <Setting label='Business Name' placeholder='Name' value={value} setValue={setValue} onSave={() => onSave('name')}>
          <p>{business.name}</p>
        </Setting>
        <Setting label='Business Email' placeholder='Email' value={value} setValue={setValue} onSave={() => onSave('email')}>
          <p>{business.email ?? 'None'}</p>
        </Setting>
        <Setting label='Business Phone' placeholder='Phone' value={value} setValue={setValue} onSave={() => onSave('phone')}>
          <p>{business.phone ?? 'None'}</p>
        </Setting>
      </div>
    </div>
  )
} 
