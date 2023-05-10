<p>test</p>
import { Setting } from '@/components/UI/Setting/Setting';
import { NewBusiness } from '@/types/Business';
import { UPDATE_BUSINESS_PREFS } from '@/utility/queries/businessQueries';
import { GET_USER_BUSINESSES_FRAGMENT } from '@/utility/queries/fragments/userFragments';
import { GET_USER_OWN_BUSINESS } from '@/utility/queries/userQueries';
import { gql, useMutation } from '@apollo/client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { Avatar } from '../UI/Avatar/Avatar';
import { BookingSitePrefs } from './BookingSitePrefs';
import styles from './tabs.module.scss';

interface PrefsProps {
  business: NewBusiness,
  elevated?: boolean,
  userId?: string,
  isTeams?: boolean,
}

export const Prefs: React.FC<PrefsProps> = ({business, userId, isTeams, elevated}) => {

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
    update(cache, { data: { updateBusinessPrefs }}) {
      if (!isTeams) return;
      cache.modify({
        fields: {
          getUserBusinesses(existingBusinesses = [], { readField }) {
            const newBusinessRef = cache.writeFragment({
              data: updateBusinessPrefs,
              fragment: gql`
                ${GET_USER_BUSINESSES_FRAGMENT}
              `
            }); 
            return existingBusinesses.map((ref: any) => readField('id', ref) === business.id ? newBusinessRef : ref)
          }
        }
      })
    }
  });

  const onSave = (key: string, override?: string | null) => {
    return updateBusinessPrefs({variables: { businessId: business.id, patch: {
      [key]: override !== undefined ? override : value,
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
        <Setting label='Business Photo' placeholder='Enter valid url' value={value} setValue={setValue} onSave={() => onSave('avatar')} onRemove={business.avatar ? () => onSave('avatar', null) : undefined}>
          <Avatar src={business.avatar} size={50} alt='Business logo' useTeamIcon={isTeams} />
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

      <BookingSitePrefs business={business} isTeams />

      {isTeams && elevated && (
        <>
        <div className={styles.header}>
          <p>Additional Settings</p>
        </div>
        <div className={clsx(styles.settings, styles.adminOptions)}>
          <div className={clsx(styles.iconButton, styles.removeTeam)}>
            <BsTrash />
            <p>Remove this Business</p>
          </div>
        </div>
        </>
      )}
    </div>
  )
} 
