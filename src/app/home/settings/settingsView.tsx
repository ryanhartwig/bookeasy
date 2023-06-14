'use client';

import { useUser } from '@/app/Providers';
import { HoursList } from '@/components/SelectLists/Hours';
import { MinutesList } from '@/components/SelectLists/Minutes';
import { PeriodList } from '@/components/SelectLists/Period';
import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { Modal } from '@/components/UI/Modal/Modal';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Select } from '@/components/UI/Select/Select';
import { Setting } from '@/components/UI/Setting/Setting';
import { User } from '@/types/User';
import { formatMilitaryTime } from '@/utility/functions/formatting/formatMilitaryTime';
import { GET_USER_WITH_PREFS, PATCH_USER, PATCH_USER_PREFS } from '@/utility/queries/userQueries';
import { useMutation, useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import Loading from './loading';
import styles from './settings.module.scss';

export const SettingsView = () => {
  const { id } = useUser();

  const [user, setUser] = useState<User>();
  const [value, setValue] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [hours, setHours] = useState<number>();
  const [min, setMin] = useState<number>();
  const [period, setPeriod] = useState<'am' | 'pm'>('am');

  useEffect(() => {
    if (!hours || min === undefined) return;
    setValue(`${period === 'am' ? hours : hours + 12}:${min === 0 ? '00' : min}`)
  }, [hours, min, period]);

  const { data } = useQuery(GET_USER_WITH_PREFS, { variables: { userId: id }, skip: !id});
  useEffect(() => data && setUser(data.getUser), [data]);

  const refetchQueries = [{ query: GET_USER_WITH_PREFS, variables: { userId: user?.id } }]
  const [patchUser] = useMutation(PATCH_USER, { refetchQueries });
  const [patchUserPrefs] = useMutation(PATCH_USER_PREFS, { refetchQueries });

  const onPatchUser = useCallback((key: string) => 
    patchUser({ variables: { userId: user?.id, patch: { [key]: value || null }}})
  , [patchUser, user?.id, value]);
  const onPatchPrefs = useCallback((key: string, value: boolean | string) => 
    patchUserPrefs({ variables: { userId: user?.id, patch: { [key]: value }}})
  , [patchUserPrefs, user?.id]);

  const onModalSubmit = useCallback((key: string) => {
    setLoading(true);
    ;(async () => {
      await onPatchPrefs('notification_overview_time', value);
      setLoading(false);
      setHours(undefined);
      setMin(undefined);
      setPeriod('am');
      setValue('');
      setModalOpen(false);
    })();
  }, [onPatchPrefs, value]);
  
  return (
    <>
      {user && user.prefs 
      ? <div className={styles.Settings}>
        <Card className={styles.card}>
          <SectionLabel label="Profile Settings" className={styles.label} />
          <div className={styles.setting_block}>
            <Setting label='Picture' 
              onRemove={user?.avatar ? () => onPatchUser('avatar') : undefined}  
              value={value} 
              setValue={setValue} 
              onSave={() => onPatchUser('avatar')} 
              allowEmptyValue 
            >
              <Avatar src={user?.avatar} size={60} />
            </Setting>
            <Setting label='Name' value={value} setValue={setValue} onSave={() => onPatchUser('name')}>
              <p>{user.name}</p>
            </Setting>
            <Setting label='Email' value={value} setValue={setValue} onSave={() => onPatchUser('email')} email >
              <p>{user.email}</p>
            </Setting>
            <Setting label='Phone' value={value} setValue={setValue} onSave={() => onPatchUser('phone')}>
              <p>{user.phone ?? 'None'}</p>
            </Setting>
          </div>

          <SectionLabel label="Privacy Settings" className={styles.label} />
          <div className={styles.setting_block}>
            <Setting label='Hide my profile picture on booking sites' 
              toggleState={user.prefs.private_photo} 
              onSave={() => onPatchPrefs('private_photo', !user.prefs!.private_photo)}
            />
          </div>

          <SectionLabel label="Notification Settings (Coming soon)" className={styles.label} />
          <div className={clsx(styles.setting_block, styles.disabled)}>
            <Setting label='Receive email notification when an appointment is booked or cancelled' 
              toggleState={user.prefs.notification_booking} 
              onSave={() => onPatchPrefs('notification_booking', !user.prefs!.notification_booking)}
            />
            <Setting label='Receive email reminders for upcoming appointments' 
              toggleState={user.prefs.notification_reminder} 
              onSave={() => onPatchPrefs('notification_reminder', !user.prefs!.notification_reminder)}
            />
            <Setting label='Receive appointments overview email on work days' 
              toggleState={user.prefs.notification_overview} 
              onSave={() => onPatchPrefs('notification_overview', !user.prefs!.notification_overview)}
            />
            <Setting label='Receive at:' className={clsx(styles.receiveAt, {[styles.enabled]: !!user.prefs!.notification_overview})}
              onEditOverride={() => setModalOpen(true)}
            >
              <p>{formatMilitaryTime(user.prefs!.notification_overview_time)}</p>
            </Setting>
          </div>
        </Card>
        <Modal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)}
          actionButtonText="Confirm"
          actionButtonDisabled={!value}
          onAction={onModalSubmit}
          loading={loading}
        >
          <Modal.Header>Select Time</Modal.Header>
          <div className={styles.modal}>
            <p>Select a time to receive the overview:</p>
            <div className={styles.timeSelect}>
              <Select list={HoursList(setHours)} selected={<p>{hours}</p> } placeholder="hr" hasSelected={!!hours} />
              <p>:</p>
              <Select list={MinutesList(setMin)} selected={<p>{min === 0 ? '00' : min}</p>} placeholder="min" hasSelected={min !== undefined} />
              <Select list={PeriodList(setPeriod)} selected={<p>{period}</p>} hasSelected />
            </div>
          </div>
        </Modal>
      </div>
      : <Loading skipHeader />}
    </>
  )
}