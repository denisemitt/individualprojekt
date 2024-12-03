import { FC, useState, useEffect} from 'react' 
import ReactCalendar from 'react-calendar'
import {add, format} from "date-fns"
import { time } from 'console'
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from '~/constants/config'
import Calendar from 'react-calendar'
import dynamic from 'next/dynamic'

const DynamicReactCalendar = dynamic(() => import('react-calendar'), { ssr: false });


interface indexProbs {}

interface DateType {
    justDate: Date | null
    dateTime: Date | null
}

const index: FC<indexProbs> = ({}) => {
    const [date,setDate] = useState<DateType>({
        justDate: null,
        dateTime: null,
    })

    const [isClient, setIsClient] = useState(false);

  
  useEffect(() => {
    setIsClient(true);
  }, []);


    const getTimes = () => {
        if(!date.justDate) return

        const {justDate} =date

        const beginning = add(justDate, { hours: STORE_OPENING_TIME})
        const end = add(justDate, { hours: STORE_CLOSING_TIME})
        const interval = INTERVAL //in minuten

        const times = []
        for (let i = beginning; i <=end; i= add(i, {minutes:interval})) {
            times.push(i)
        }

        return times
    }

    const times =getTimes()



    return <div className = 'h-screen flex  col justify center items center'> 
        {date.justDate ? (<div className='flex gap-4'> 

            {times?.map((time, i) =>  (
                <div key={`time- ${i}` } className= 'rounded-sm bg-gray-100 p-2' >
                    <button type='button' onClick={() => setDate((prev) => ({...prev, dateTime: time}))}
                        >
                        {format(time, 'kk: mm')}
                    </button>
                </div>
            ))}
        </div>
        )
        : (
         <ReactCalendar  
            minDate={typeof window !== 'undefined' ? new Date() : undefined}
            className=  "react-calendar p-2" 
            view= 'month' 
            onClickDay={(date) => setDate ((prev) => ({ ...prev, justDate: date}))}
            />
        )}

</div>
   
};

export default index



