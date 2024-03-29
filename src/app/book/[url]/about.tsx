import styles from './book.module.scss';
import { NewBusiness } from "@/types/Business"
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { TbWorldWww } from 'react-icons/tb';

interface AboutProps {
  business: NewBusiness,
}

export const About: React.FC<AboutProps> = ({business}) => {

  return (
    <div className={styles.contact}>  
      {/* <SectionLabel label={`About ${business.name}`} />
      {business.bio // to be business.bio
        ? <p className={styles.bio}>{business.bio}</p>
        : <p className={styles.nobio}>No details.</p>
      } */}
      
      <SectionLabel label={`Contact`} />
      <div className={styles.contactLink}>
        <AiOutlinePhone />
        <p>{business.phone ?? 'None'}</p>
      </div>
      <div className={styles.contactLink}>
        <AiOutlineMail className={styles.icon} />
        {business.email 
          ? <a href={`mailto:${business.email}`}>{business.email}</a>
          : <p>None</p>
        }
      </div>
      <div className={styles.contactLink}>
        <TbWorldWww />
        {false // to be business.website 
          ? <a href={''} target={"_blank"}></a>
          : <p>None</p>
        }
      </div>
    </div>
  )
}