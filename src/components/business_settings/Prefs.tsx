import { Setting } from '@/components/UI/Setting/Setting';
import { NewBusiness } from '@/types/Business';
import { GET_BUSINESS, REMOVE_BUSINESS, UPDATE_BUSINESS_PREFS } from '@/utility/queries/businessQueries';
import { GET_USER_BUSINESSES_FRAGMENT } from '@/utility/queries/fragments/userFragments';
import { gql, useMutation } from '@apollo/client';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { Avatar } from '../UI/Avatar/Avatar';
import { Modal } from '../UI/Modal/Modal';
import { BookingSitePrefs } from './BookingSitePrefs';
import styles from './tabs.module.scss';
import { CiWarning } from 'react-icons/ci';
import { Input } from '../UI/Input/Input';
import { useUser } from '@/app/Providers';

interface PrefsProps {
  business: NewBusiness,
  elevated?: boolean,
  userBusinessId?: string,
  isTeams?: boolean,
}

export const Prefs: React.FC<PrefsProps> = ({business, userBusinessId, isTeams, elevated}) => {
  const { id: userId } = useUser();

  const [value, setValue] = useState<string>('');
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [confirmValue, setConfirmValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [updateBusinessPrefs, { 
    data: updateBusinessPrefsData, 
    loading: updateBusinessPrefsLoading,
    reset: updateBusinessPrefsReset,
  }] = useMutation(UPDATE_BUSINESS_PREFS, {
    refetchQueries: !userBusinessId ? [] : [{
      query: GET_BUSINESS,
      variables: { businessId: userBusinessId }
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

  const onChangeInput = useCallback((e: any) => {
    setConfirmValue(e.target.value);
    setErrorMessage('');
  }, []);

  const [removeBusiness, { loading: removeBusinessLoading, data: removeBusinessData, reset: removeBusinessReset }] = useMutation(REMOVE_BUSINESS, {
    update(cache) {
      cache.modify({
        fields: {
          getUserBusinesses(existingBusinesses = [], { readField }) {
            return existingBusinesses.filter((ref: any) => readField('id', ref) !== business.id)
          }
        }
      })
    }
  });

  const onRemoveTeam = useCallback(() => {
    removeBusiness({ variables: { businessId: business.id }});
  }, [business.id, removeBusiness]);

  useEffect(() => {
    if (!removeBusinessData || removeBusinessLoading) return;
    setConfirmDelete(false);
    setConfirmValue('');
    removeBusinessReset();
  }, [removeBusinessData, removeBusinessLoading, removeBusinessReset]);

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
        <Setting label='Contact Email' placeholder='Email' email value={value} setValue={setValue} onSave={() => onSave('email')} onRemove={business.email ? () => onSave('email', null) : undefined}>
          <p>{business.email ?? 'None'}</p>
        </Setting>
        <Setting label='Contact Phone' placeholder='Phone' value={value} setValue={setValue} onSave={() => onSave('phone')} onRemove={business.phone ? () => onSave('phone', null) : undefined}>
          <p>{business.phone ?? 'None'}</p>
        </Setting>
        <Setting label='Website Link' placeholder='Website URL' value={value} setValue={setValue} onSave={() => onSave('website_url')} onRemove={business.website_url ? () => onSave('website_url', null) : undefined}>
          <p>{business.website_url ?? 'None'}</p>
        </Setting>
      </div>

      <BookingSitePrefs business={business} isTeams userBusinessId={userBusinessId} />

      {userId === business.creator_id && isTeams && (
        <>
        <div className={styles.header}>
          <p>Additional Settings</p>
        </div>
        <div className={clsx(styles.settings, styles.adminOptions)}>
          <div className={clsx(styles.iconButton, styles.removeTeam)} onClick={() => setConfirmDelete(true)}>
            <BsTrash />
            <p>Remove this Business</p>
          </div>
        </div>
        </>
      )}

      <Modal 
        open={confirmDelete} 
        onClose={() => {setConfirmDelete(false); setConfirmValue('')}}
        className={styles.confirmDeleteModal}
        actionButtonDisabled={confirmValue !== business.name}
        actionButtonText="Confirm"
        loading={removeBusinessLoading}
        onAction={onRemoveTeam}
      >
        <Modal.Header>Remove Team</Modal.Header>
        <div className={styles.warning}>
          <CiWarning />
          <p>This action cannot be undone.</p>
        </div>
        <p>All clients, services, staff and appointment data will be permanently lost- for everyone.</p>
        <br />
        <p className='noselect'>To confirm, type: {`"${business.name}"`}.</p>
        <Input value={confirmValue} onChange={onChangeInput} onBlur={() => confirmValue && confirmValue !== business.name && setErrorMessage('Input does not match.')} required errorMessage={errorMessage} />
        <br />
      </Modal>
    </div>
  )
} 
