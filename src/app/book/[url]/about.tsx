import styles from './book.module.scss';
import { NewBusiness } from "@/types/Business"
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Avatar } from '@/components/UI/Avatar/Avatar';

interface AboutProps {
  business: NewBusiness,
}

export const About: React.FC<AboutProps> = ({business}) => {

  return (
    <div className={styles.contact}>  
      <SectionLabel label={`Contact ${business.name}`} />
      <div className={styles.contactLink}>
        <p>{business.phone ?? 'None'}</p>
      </div>
      <div className={styles.contactLink}>
        {business.email 
          ? <a href={`mailto:${business.email}`}>{business.email}</a>
          : <p>None</p>
        }
      </div>
      <div className={styles.contactLink}>
        {false // to be business.website 
          ? <a href={''} target={"_blank"}>http://www.tobeimplemented.ca</a>
          : <p>None</p>
        }
      </div>
    </div>
  )
}