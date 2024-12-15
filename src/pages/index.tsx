
import {type NextPage } from 'next'
import CalendarComponent from "@components/Calendar";
import type {Day} from '@prisma/client'
import {prisma} from '../server/db/client'
import {formatISO} from 'date-fns'
import  Head  from "next/head";

  
interface HomeProps {
  days: Day []
  closedDays: string[] 
}


const Home: NextPage<HomeProps> = ({days, closedDays}) => {
  return (
    <>
      <Head>
        <title>Buchungssystem</title>
        <meta name= 'description' content= 'von Denise' />
        <link rel = 'icon' href='/favicon.ico' />

      </Head>  


      <main>
          <CalendarComponent days={days} closedDays={[]}/>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const days = await prisma.day.findMany()
  const closedDays = (await prisma.closedDay.findMany()).map((d) => formatISO(d.date))
  return { props: { days, closedDays } }
}

export default Home
