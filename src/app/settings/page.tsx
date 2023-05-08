
'use client';

import { Header } from '@/components/Header';
import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Setting } from '@/components/UI/Setting/Setting';
import { User } from '@/types/User';
import { formatMilitaryTime } from '@/utility/functions/formatting/formatMilitaryTime';
import { GET_USER_WITH_PREFS, PATCH_USER, PATCH_USER_PREFS } from '@/utility/queries/userQueries';
import { userId } from '@/utility/sample_data/sample_userId';
import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import styles from './settings.module.scss';

export default function Page() {
  const [user, setUser] = useState<User>();
  const [value, setValue] = useState<string>('');
  
  const { data } = useQuery(GET_USER_WITH_PREFS, { variables: { userId }});
  useEffect(() => data && setUser(data.getUser), [data])

  const refetchQueries = [{ query: GET_USER_WITH_PREFS, variables: { userId } }]
  const [patchUser, { loading: patchUserLoading }] = useMutation(PATCH_USER, { refetchQueries });
  const [patchUserPrefs, { loading: patchUserPrefsLoading }] = useMutation(PATCH_USER_PREFS, { refetchQueries });

  const onPatchUser = useCallback((key: string) => patchUser({ variables: { userId, patch: { [key]: value }}})
  , [patchUser, value]);
  const onPatchPrefs = useCallback((key: string) => patchUserPrefs({ variables: { userId, patch: { [key]: value }}})
  , [patchUserPrefs, value]);
  
  return (
    <>
      <Header text="Settings" />
      {user && user.prefs && <div className={styles.Settings}>
        <Card className={styles.card}>
          <SectionLabel label="Profile Settings" className={styles.label} />
          <div className={styles.setting_block}>
            <Setting label='Picture' value={value} setValue={setValue} onSave={() => onPatchUser('avatar')}>
              <Avatar src={user?.avatar} size={60} />
            </Setting>
            <Setting label='Name' value={value} setValue={setValue} onSave={() => onPatchUser('name')}>
              <p>{user.name}</p>
            </Setting>
            <Setting label='Email' value={value} setValue={setValue} onSave={() => onPatchUser('email')}>
              <p>{user.email}</p>
            </Setting>
            <Setting label='Phone' value={value} setValue={setValue} onSave={() => onPatchUser('phone')}>
              <p>{user.phone ?? 'None'}</p>
            </Setting>
          </div>

          <SectionLabel label="Privacy Settings" className={styles.label} />
          <div className={styles.setting_block}>
            <Setting label='Hide my profile picture on booking sites' toggleState={user.prefs.private_photo} />
            <Setting label='Hide my email on booking sites' toggleState={user.prefs.private_email} />
            <Setting label='Hide my phone number on booking sites' toggleState={user.prefs.private_phone} />
          </div>
          <SectionLabel label="Notification Settings" className={styles.label} />
          <div className={styles.setting_block}>
            <Setting label='Receive email notification when an appointment is booked or cancelled' toggleState={user.prefs.notification_booking} />
            <Setting label='Receive email reminders for upcoming appointments' toggleState={user.prefs.notification_reminder} />
            <Setting label='Receive appointments overview email on work days' toggleState={user.prefs.notification_overview} />
            <Setting label='Receive at:' style={{ paddingLeft: 50, opacity: user.prefs.notification_overview ? 1 : 0.5, pointerEvents: user.prefs.notification_overview ? 'all' : 'none' }}>
              <p>{user.prefs.notification_overview_time ? formatMilitaryTime(user.prefs.notification_overview_time) : 'Unset'}</p>
            </Setting>
          </div>
        </Card>
      </div>}
    </>
  )
}