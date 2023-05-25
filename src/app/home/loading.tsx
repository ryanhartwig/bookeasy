import './home.scss';

import { Navigator } from '@/components/Navigator';
import { Header } from '@/components/Header';

export default async function Loading() {

  return (
    <div className='main'>
      <Navigator />
      <div className='Content'>
        <Header text='' loading />
      </div>
    </div>
  )
}