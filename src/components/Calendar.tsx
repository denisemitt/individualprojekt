import type {Day} from '@prisma/client'
import  {  useState, useEffect} from 'react' 
import type { FC } from 'react'
import {format, formatISO, isBefore, parse } from "date-fns"
import { INTERVAL } from 'src/constants/config'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import type { DateTime } from 'src/utils/types.d'
import {now} from 'src/constants/config'
import { getOpeningTimes, roundToNearestMinutes } from 'src/utils/helper'


const DynamicReactCalendar = dynamic(() => import('react-calendar'), { ssr: false });


interface CalendarProps {
    days: Day[]
    closedDays: string[] 
  }
  
  const CalendarComponent: FC<CalendarProps> = ({ days, closedDays }) => {
    const router = useRouter()
  
    
    const today = days.find((d) => d.dayOfWeek === now.getDay())



    if (!today) {
      return (
        <div className="flex h-screen flex-col items-center justify-center text-red-500">
          <p>No matching day found for the current day of the week.</p>
        </div>
      );
    }
    
    const rounded = roundToNearestMinutes(now, INTERVAL)
    const closing = parse(today!.closeTime, 'kk:mm', now)
    const tooLate = !isBefore(rounded, closing)
    if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)))
  
    const [date, setDate] = useState<DateTime>({
      justDate: null,
      dateTime: null,
    })
  
    useEffect(() => {
      if (date.dateTime) {
        localStorage.setItem('selectedTime', date.dateTime.toISOString())
        router.push('/menu')
      }
    }, [date.dateTime, router])
  
    const times = date.justDate && getOpeningTimes(date.justDate, days)
  
    return (
      <div className='flex h-screen flex-col items-center justify-center'>
        {date.justDate ? (
          <div className='flex max-w-lg flex-wrap gap-4'>
            {times?.map((time, i) => (
              <div className='rounded-sm bg-gray-100 p-2' key={`time-${i}`}>
                <button onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))} type='button'>
                  {format(time, 'kk:mm')}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <DynamicReactCalendar
            minDate={now}
            className='REACT-CALENDAR p-2'
            view='month'
            tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
            onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
          />
        )}
      </div>
    )
  }
  
  export default CalendarComponent



