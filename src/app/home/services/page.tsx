import { Header } from '@/components/Header';
import { ServicesView } from './ServicesView';

 export default async function Page() {
  
  return (
    <>
      <Header text='Services' />
      <ServicesView />
    </>
  )
}