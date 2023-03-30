import { Header } from '@/components/Header';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { sample_businesses } from '@/utility/sample_data/sample_businesses';
import { sample_services } from '@/utility/sample_data/sample_services';
import { sample_user } from '@/utility/sample_data/sample_user';
import { ServiceCard } from './service';
import styles from './services.module.scss';

export default function Page() {


  
  return (
    <>
      <Header text='Services' />
      <div className={styles.services_page}>
        <div className={styles.labels}>
          {['Name', 'Duration', 'Provider', 'Assignee(s)', 'Cost'].map((t) => 
            <p key={t}>{t}</p>
          )}
        </div>
        {sample_businesses.map(b => {
          const services = sample_services.filter(s => s.businessId === b.id);
          
          return (
            <div key={b.id} className={styles.services_wrapper}>
              <SectionLabel label={b.id === sample_user.own_business_id ? 'My Services' : b.name} />
              {services.map(s => 
                <ServiceCard key={s.id} service={s} />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}