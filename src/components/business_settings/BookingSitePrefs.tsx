import { Setting } from '@/components/UI/Setting/Setting';
import styles from './tabs.module.scss';

import { NewBusiness } from '@/types/Business';
import { useCallback, useEffect, useState } from 'react';
import { formatPrefPeriod } from '@/utility/functions/formatting/formatPrefPeriod';
import { PeriodSelectForm } from './PeriodSelectForm';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_BUSINESS, UPDATE_BUSINESS_PREFS } from '@/utility/queries/businessQueries';
import { GET_USER_BUSINESSES_FRAGMENT } from '@/utility/queries/fragments/userFragments';
import { CREATE_BOOKING_SITE, GET_BOOKING_SITE } from '@/utility/queries/bookingSiteQueries';
import { BookingSite } from '@/types/BookingSite';
import { Button } from '../UI/Button/Button';
import { CgWebsite } from 'react-icons/cg';
import { BookingSiteOverview } from './BookingSiteOverview';
interface BookingSitePrefsProps {
  business: NewBusiness,
  userBusinessId?: string,
  isTeams?: boolean,
}

export const BookingSitePrefs: React.FC<BookingSitePrefsProps> = ({business, userBusinessId, isTeams}) => {

  const [initialValue, setInitialValue] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [updateProperty, setUpdateProperty] = useState<string>('');
  const [bookingSite, setBookingSite] = useState<BookingSite>();
  const [loadingBookingSite, setLoadingBookingSite] = useState<boolean>(false);

  const { data: bookingSiteData, loading: loadingBookingSiteData } = useQuery(GET_BOOKING_SITE, { variables: { url: business.booking_site_id }, skip: !business.booking_site_id });
  useEffect(() => bookingSiteData && setBookingSite(bookingSiteData.getBookingSite), [bookingSiteData]);
  
  const [createBookingSite] = useMutation(CREATE_BOOKING_SITE);
  const [updateBusinessPrefs, { data, loading}] = useMutation(UPDATE_BUSINESS_PREFS, {
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
            return existingBusinesses.map((ref: any) => readField('id', ref) === business.id ? newBusinessRef : ref);
          }
        }
      })
    }
  });

  // If total is truthy, form has been submitted
  useEffect(() => {
    if (total === undefined) return;
    updateBusinessPrefs({variables: { 
      patch: { [updateProperty]: total.toString() || null }, 
      businessId: business.id ,
    }});
  }, [business.id, total, updateBusinessPrefs, updateProperty]);

  // On mutation complete
  useEffect(() => {
    if (loadingBookingSite || !data) return;
    setInitialValue(undefined);
    setTotal(undefined);
  }, [data, loadingBookingSite]);

  const onEdit = useCallback((init: string, property: string) => {
    setInitialValue(Number(init));
    setUpdateProperty(property);
  }, []);

  const onCreateBookingSite = useCallback(() => {
    setLoadingBookingSite(true);

    ;(async () => {
      const { data: bookingSiteData } = await createBookingSite({ variables: { businessId: business.id }});
      await updateBusinessPrefs({ variables: { businessId: business.id, patch: { booking_site_id: bookingSiteData.createBookingSite.id }}});
      setLoadingBookingSite(false);
    })();
  }, [business.id, createBookingSite, updateBusinessPrefs]);

  return (
    <div className={styles.BookingSitePrefs}>
      <div className={styles.header}>
        <p>Booking Site Preferences</p>
      </div>

      {
        bookingSite 
          ? <div className={styles.settings}>
              <BookingSiteOverview bookingSiteId={bookingSite.id} />
              <Setting label="Minimum Book Ahead" onEditOverride={() => onEdit(business.min_booking_notice ?? '0', 'min_booking_notice')} >
                <p>{Number(business.min_booking_notice) ? formatPrefPeriod(Number(business.min_booking_notice)).text : 'None'}</p>
              </Setting>
              <Setting label="Maximum Book Ahead" onEditOverride={() => onEdit(business.max_book_ahead ?? '0', 'max_book_ahead')} >
                <p>{Number(business.max_book_ahead) ? formatPrefPeriod(Number(business.max_book_ahead)).text : 'None'}</p>
              </Setting>
              <Setting label="Minimum Cancellation Notice" onEditOverride={() => onEdit(business.min_cancel_notice ?? '0', 'min_cancel_notice')} >
                <p>{Number(business.min_cancel_notice) ? formatPrefPeriod(Number(business.min_cancel_notice)).text : 'None'}</p>
              </Setting>
      
              {business.min_booking_notice && business.max_book_ahead && Number(business.min_booking_notice) >= Number(business.max_book_ahead) && 
                <p className={styles.bookingWarning}>* minimum book ahead is greater than or equal to maximum book ahead, preventing client bookings</p>
              }
            </div> 
          : <div className={styles.createBookingSite}>
            <Button onClick={onCreateBookingSite} loading={loadingBookingSite} light icon={<CgWebsite />} fontSize={13} >Create Booking Site</Button>
          </div> 
      }
      
      {initialValue !== undefined && 
        <PeriodSelectForm 
          open={initialValue !== undefined} 
          onClose={() => { setInitialValue(undefined); setTotal(undefined); }} 
          initialValue={initialValue} 
          setTotal={setTotal} 
          loading={loadingBookingSite}
        />
      }
    </div>
  )
}


