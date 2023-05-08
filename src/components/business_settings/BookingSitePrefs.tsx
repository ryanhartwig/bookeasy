import { Setting } from '@/components/UI/Setting/Setting';
import styles from './tabs.module.scss';

import { NewBusiness } from '@/types/Business';
import { formatTimePeriod } from '@/utility/functions/formatting/formatTimePeriod';
import { Modal } from '../UI/Modal/Modal';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '../UI/Input/Input';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { formatPrefPeriod } from '@/utility/functions/formatting/formatPrefPeriod';
import { PeriodSelectForm } from './PeriodSelectForm';
import { gql, useMutation } from '@apollo/client';
import { GET_BUSINESS, UPDATE_BUSINESS_PREFS } from '@/utility/queries/businessQueries';
import { GET_USER_OWN_BUSINESS } from '@/utility/queries/userQueries';
import { NEW_APPOINTMENT_FRAGMENT } from '@/utility/queries/fragments/appointmentFragments';
import { GET_USER_BUSINESSES_FRAGMENT } from '@/utility/queries/fragments/userFragments';

interface BookingSitePrefsProps {
  business: NewBusiness,
  userId?: string,
  isTeams?: boolean,
}

export const BookingSitePrefs: React.FC<BookingSitePrefsProps> = ({business, userId, isTeams}) => {

  const [initialValue, setInitialValue] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [updateProperty, setUpdateProperty] = useState<string>('');

  const [updateBusinessPrefs, { data, loading}] = useMutation(UPDATE_BUSINESS_PREFS, {
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

  // If total is truthy, form has been submitted
  useEffect(() => {
    if (total === undefined) return;
    updateBusinessPrefs({variables: { 
      patch: { [updateProperty]: total.toString() }, 
      businessId: business.id ,
    }});
  }, [business.id, total, updateBusinessPrefs, updateProperty]);

  // On mutation complete
  useEffect(() => {
    if (loading || !data) return;
    setInitialValue(undefined);
    setTotal(undefined);
  }, [data, loading]);

  const onEdit = useCallback((init: string, property: string) => {
    setInitialValue(Number(init));
    setUpdateProperty(property);
  }, []);

  return (
    <div className={styles.BookingSitePrefs}>
      <div className={styles.header}>
        <p>Booking Site Preferences</p>
      </div>
      <div className={styles.settings}>
        <Setting label="Minimum Book Ahead" onEditClick={() => onEdit(business.min_booking_notice, 'min_booking_notice')} >
          <p>{Number(business.min_booking_notice) ? formatPrefPeriod(Number(business.min_booking_notice)).text : 'None'}</p>
        </Setting>
        <Setting label="Maximum Book Ahead" onEditClick={() => onEdit(business.max_book_ahead, 'max_book_ahead')} >
          <p>{Number(business.max_book_ahead) ? formatPrefPeriod(Number(business.max_book_ahead)).text : 'None'}</p>
        </Setting>
        <Setting label="Minimum Cancellation Notice" onEditClick={() => onEdit(business.min_cancel_notice, 'min_cancel_notice')} >
          <p>{Number(business.min_cancel_notice) ? formatPrefPeriod(Number(business.min_cancel_notice)).text : 'None'}</p>
        </Setting>
        {/* <Setting label="Booking Site Url" onAction={() => setInitialValue(Number(business.min_cancel_notice))}>
          <p>{business.min_cancel_notice ? formatPrefPeriod(Number(business.min_cancel_notice)).text : 'None'}</p>
        </Setting> */}

        {Number(business.min_booking_notice) >= Number(business.max_book_ahead) && 
          <p className={styles.bookingWarning}>* minimum book ahead is greater than or equal to maximum book ahead, preventing client bookings</p>
        }
      </div>
      {initialValue !== undefined && 
        <PeriodSelectForm 
          open={initialValue !== undefined} 
          onClose={() => { setInitialValue(undefined); setTotal(undefined); }} 
          initialValue={initialValue} 
          setTotal={setTotal} 
          loading={loading}
        />
      }
    </div>
  )
}


