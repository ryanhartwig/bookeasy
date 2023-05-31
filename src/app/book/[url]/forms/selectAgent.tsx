import { Avatar } from '@/components/UI/Avatar/Avatar';
import { TextButton } from '@/components/UI/TextButton/TextButton';
import { Staff } from '@/types/User';
import styles from './forms.module.scss';

interface SelectAgentProps {
  staff: Staff[],
}

export const SelectAgent: React.FC<SelectAgentProps> = ({staff}) => {

  return (
    <div className={styles.selectAgent}>
      {staff.map(s => (
        <div key={s.id} className={styles.staffCard}>
          <Avatar size={100} src={s.avatar} />
          <h2>{s.name}</h2>
          <p className={styles.credentials}>Credentials</p>
          <p className={styles.bio}>What happens if the bio is really long? Like reeeeaaally long and then the text is forced to overflow</p>
          <TextButton>Availability</TextButton>
        </div>
      ))}
    </div>
  )
}