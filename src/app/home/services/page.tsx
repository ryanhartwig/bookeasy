import { Header } from '@/components/Header';
import { ServicesView } from './ServicesView';

export default async function Page() {
  // await (() => new Promise((res) => setTimeout(() => res('true'), 3000)))()
  return (
    <>
      <Header text='Services' />
      <ServicesView />
    </>
  )
}