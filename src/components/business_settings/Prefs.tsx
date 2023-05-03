import { Setting } from '@/components/UI/Setting/Setting';
import { NewBusiness } from '@/types/Business';
import { GET_BUSINESS, UPDATE_BUSINESS_NAME } from '@/utility/queries/businessQueries';
import { GET_USER_OWN_BUSINESS } from '@/utility/queries/userQueries';
import { useMutation } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { Avatar } from '../UI/Avatar/Avatar';
import styles from './tabs.module.scss';

interface PrefsProps {
  business: NewBusiness,
  userId: string,
}

export const Prefs: React.FC<PrefsProps> = ({business, userId}) => {

  const [businessName, setBusinessName] = useState<string>(business.name);
  const [editingName, setEditingName] = useState<boolean>(false);

  const [updateBusinessName, { 
    data: updateBusinessNameData, 
    loading: updateBusinessNameLoading,
    reset: updateBusinessNameReset,
  }] = useMutation(UPDATE_BUSINESS_NAME, {
    refetchQueries: [{
      query: GET_USER_OWN_BUSINESS,
      variables: { userId }
    }],
  });

  const onUpdateName = useCallback(() => {
    updateBusinessName({variables: { businessId: business.id, name: businessName }});
  }, [business.id, businessName, updateBusinessName]);

  useEffect(() => {
    if (!updateBusinessNameData) return;
    if (updateBusinessNameLoading) return;
    setEditingName(false);
    updateBusinessNameReset();
  }, [updateBusinessNameData, updateBusinessNameLoading, updateBusinessNameReset]);

  return (
    <div className={styles.Prefs}>
      <div className={styles.header}>
        <p>General Business Prefs</p>
      </div>

      <div className={styles.settings}>
        <Setting label='Business Photo' onAction={() => {}}>
          <Avatar src={business.avatar} size={50} alt='Business logo' />
        </Setting>
        <Setting label='Business Name' editing={editingName} setEditing={setEditingName} value={businessName} setValue={setBusinessName} onSave={onUpdateName}>
          <p>{business.name}</p>
        </Setting>
        <Setting label='Business Email'>
          <p>{business.email ?? 'None'}</p>
        </Setting>
        <Setting label='Business Phone'>
          <p>{business.phone ?? 'None'}</p>
        </Setting>
      </div>
      
    </div>
  )
} 
