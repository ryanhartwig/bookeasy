import { Header } from '@/components/Header';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { getAllBusinesses } from '@/utility/functions/fetch/getAllBusinesses';
import { getAllServices } from '@/utility/functions/fetch/getAllServices';
import { sample_businesses } from '@/utility/sample_data/sample_businesses';
import { sample_services } from '@/utility/sample_data/sample_services';
import { sample_user } from '@/utility/sample_data/sample_user';
import { userId } from '@/utility/sample_data/sample_userId';
import ServiceCard from './service';
import styles from './services.module.scss';

export default async function Page() {
  
  const { data: businesses } = await getAllBusinesses(userId);
  const { data: services } = await getAllServices(userId);
  
  return (
    <>
      <Header text='Services' />
      <div className={styles.services_page}>
        <div className={styles.labels}>
          {['Name', 'Duration', 'Provider', 'Assignee(s)', 'Cost'].map((t) => 
            <p key={t}>{t}</p>
          )}
        </div>
        {businesses.map(b => {
          const filteredServices = services.filter(s => s.businessId === b.id);
          
          return (
            <div key={b.id} className={styles.services_wrapper}>
              <SectionLabel label={b.id === sample_user.own_business_id ? 'My Services' : b.name} />
              {filteredServices.map(s => 
              <>
                {/* @ts-expect-error Server Component */}
                <ServiceCard key={s.id} service={s} />
              </>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}