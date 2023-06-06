import { Spinner } from '@/components/UI/Spinner/Spinner';
import { TextButton } from '@/components/UI/TextButton/TextButton';
import { NewBusiness } from '@/types/Business';
import { Service } from '@/types/Service';
import { Staff } from '@/types/User';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import styles from './book.module.scss';
import { Confirm } from './forms/confirm';
import { SelectAgent } from './forms/selectAgent';
import { SelectService } from './forms/selectService';
import { SelectTime } from './forms/selectTime';
import { Details, SelectedState } from './page';

interface BookProps {
  selected: SelectedState,
  setSelected: React.Dispatch<React.SetStateAction<SelectedState>>,
  business?: NewBusiness,
  staff: Staff[],
  services: Service[],
  setSuccessDetails: React.Dispatch<React.SetStateAction<Details | null>>
  loadingData?: boolean,
}

export const Book: React.FC<BookProps> = ({selected, setSelected, business, staff, services, loadingData = false, setSuccessDetails}) => {

  const [formTab, setFormTab] = useState(0);
  useEffect(() => setFormTab(Object.values(selected).filter(v => !!v).length), [selected]);

  const tabs = useMemo(() => {
    if (!business) return [];
    
    const tabs = [];
    tabs.push(<SelectService key="selectService" services={services} setSelected={setSelected} />)

    if (!selected.service) return tabs;
    const filteredStaff = staff.filter(s => selected.service!.assigned_staff.find(staff => staff.id === s.id));
    tabs.push(<SelectAgent key="selectAgent" setSelected={setSelected} businessId={business.id} staff={filteredStaff} />)

    if (!selected.staff) return tabs;
    tabs.push(<SelectTime key="selectTime" setSelected={setSelected} business={business} selectedStaff={selected.staff} selectedService={selected.service} />);

    if (!selected.startDate) return tabs;
    tabs.push(<Confirm setSuccessModal={setSuccessDetails} setSelected={setSelected} business={business} selected={selected} key="confirm" />)

    return tabs;
  }, [business, selected, services, setSelected, setSuccessDetails, staff]);
  
  return (
    <>
      <div className={styles.formProgress}>
        {['Select a Service', 'Select an Agent', 'Select a Time', 'Confirm Booking'].map((label, i) => 
          <div key={label} className={styles.progressLabel}>
            <p key={label} className={clsx({[styles.current]: formTab === i})}>{label}</p>
            {i !== 3 && <hr />}
          </div>
        )}
      </div>
      <div className={styles.formShowing}>
        {loadingData ? <Spinner style={{margin: 30}} /> : tabs[formTab]}
      </div>
      <div className={clsx(styles.formNavigate, 'noselect')}>
        {!formTab || loadingData ? <div /> : 
          <TextButton className={styles.back}
            onClick={() => {
              setSelected(p => ({
                ...p,
                [Object.keys(p)[formTab - 1]]: null,
              }))
              setFormTab(p => p - 1);
            }}
          >
            Go Back
          </TextButton>
        }
      </div>
    </>
  )
}