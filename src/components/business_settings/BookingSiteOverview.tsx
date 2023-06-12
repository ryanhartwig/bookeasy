import { GET_BOOKING_SITE } from '@/utility/queries/bookingSiteQueries';
import { useQuery } from '@apollo/client';
import styles from './tabs.module.scss';

interface BookingSiteOverviewProps {
  bookingSiteId: string,
}

export const BookingSiteOverview: React.FC<BookingSiteOverviewProps> = ({ bookingSiteId }) => {

  const { data: bookingSiteData } = useQuery(GET_BOOKING_SITE,  { variables: { bookingSiteId }});

  console.log(bookingSiteData);

  return (
    <div className={styles.bookingSiteOverview}>
      <p>/book/{bookingSiteData?.getBookingSite?.url}</p>
    </div>
  )
}