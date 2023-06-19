import { BookingSite } from '@/types/BookingSite';
import { GET_BOOKING_SITE } from '@/utility/queries/bookingSiteQueries';
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlineCheck, AiOutlineCopy } from 'react-icons/ai';
import { RxExternalLink } from 'react-icons/rx';
import { Spinner } from '../UI/Spinner/Spinner';
import { TextButton } from '../UI/TextButton/TextButton';
import styles from './tabs.module.scss';

interface BookingSiteOverviewProps {
  bookingSiteId: string,
}

export const BookingSiteOverview: React.FC<BookingSiteOverviewProps> = ({ bookingSiteId }) => {
  const [bookingSite, setBookingSite] = useState<BookingSite>();
  const [copied, setCopied] = useState(false);
  
  const { data: bookingSiteData } = useQuery(GET_BOOKING_SITE,  { variables: { id: bookingSiteId }});
  useEffect(() => bookingSiteData && setBookingSite(bookingSiteData.getBookingSite), [bookingSiteData]);

  const url = useMemo(() => bookingSite ? 'https://bookeasy.vercel.app/book/' + bookingSite.url : '', [bookingSite]); 
  const onCopyLink = useCallback(() => {
    ;(async () => {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    })();
  }, [url]);
  
  if (!bookingSite) return <Spinner />
  return (
    <div className={styles.bookingSiteOverview}>
      <div>
        <p className={styles.path}>/book/</p>
        <p>{bookingSite.url}</p>
      </div>
      
      <div>
        {!copied 
          ? <TextButton icon={<AiOutlineCopy size={12} />} onClick={onCopyLink}>Copy Link</TextButton>
          : <TextButton disabled icon={<AiOutlineCheck size={12} />} >Copied</TextButton>
        }
        <TextButton icon={<RxExternalLink size={12} />} onClick={() => window.open(url)}>View</TextButton>
      </div>
    </div>
  )
}