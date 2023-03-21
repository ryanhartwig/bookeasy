import { BsCalendar2Range, BsCalendarDate } from 'react-icons/bs';
import { MdOutlineComputer, MdOutlineSpaceDashboard } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { BiBookOpen, BiNetworkChart } from 'react-icons/bi';
import { IconType } from 'react-icons';

const navlinks: [string, string, IconType][] = [
  ['Dashboard', 'dashboard', MdOutlineSpaceDashboard],
  ['Calendar', 'calendar', BsCalendar2Range],
  ['Clients', 'clients', FiUsers],
  ['Services', 'services', MdOutlineComputer],
  ['My Business', 'business', BiBookOpen],
  ['Teams', 'teams', BiNetworkChart],
];

export default navlinks;