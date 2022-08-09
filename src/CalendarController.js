import moment from "moment";
import { useState } from 'react'
import { Calendar } from "./Calendar"

export const CalendarControler = () => {
    const today = moment();
    const [currentMonthMoment, setCurrentMonthMoment] = useState(today)

    const incrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.add(1, 'months')))
    }

    const decrementMonth = () => {
        setCurrentMonthMoment(moment(currentMonthMoment.subtract(1, 'months')))
    }

    return (
        <Calendar
            month={currentMonthMoment.format('MM')}
            year={currentMonthMoment.format('YYYY')}
            onPrev={decrementMonth}
            onNext={incrementMonth} />
    )
}