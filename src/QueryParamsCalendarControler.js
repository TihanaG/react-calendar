import { useLocation, useNavigate } from "react-router";
import moment from "moment";
import { useState } from 'react'
import { Calendar } from "./Calendar"
import { Modal } from "./Modal";
import { NewEventForm } from "./NewEventForm";

export const QueryParamsCalendarControler = () => {
    const [events, setEvents] = useState([])
    const [showNewEventsModal, setShowNewEventsModal] = useState(false) //hidden
    const [selectedDate, setSelectedDate] = useState(null)
    
    const { search } = useLocation()
    const navigate = useNavigate()
    const month = new URLSearchParams(search).get('m')
    const year = new URLSearchParams(search).get('y')
    
    const today = moment();
    const [currentMonthMoment, setCurrentMonthMoment] = useState(
        (month && year)
            ? moment(`${month}${year}`, 'MMYYYY')
            : today
    )

    const incrementMonth = () => {
        const newMonth = moment(currentMonthMoment.add(1, 'months'))
        navigate(`?m=${newMonth.format('MM')}&y=${newMonth.format('YYYY')}`)
        setCurrentMonthMoment(newMonth)
    }

    const decrementMonth = () => {
        const newMonth = moment(currentMonthMoment.subtract(1, 'months'))
        navigate(`?m=${newMonth.format('MM')}&y=${newMonth.format('YYYY')}`)
        setCurrentMonthMoment(newMonth)
    }

    const createNewEvent = name => {
        setEvents(events.concat({ name, date: selectedDate }))
        setShowNewEventsModal(false)
        setSelectedDate(null)
    }

    const displayModal = (date, month, year) => {
        console.log({ date, month, year })
        setSelectedDate(moment(`${date}${month}${year}`, 'DDMMYYYY'))
        setShowNewEventsModal(true)
    }

    return (
        <>
        <Modal
            shouldShow={showNewEventsModal}
            onRequestClose={() => {
                setShowNewEventsModal(false)
            }}>
            <h3>New Event for {selectedDate && selectedDate.format('MM/DD/YYYY')}</h3>
            <NewEventForm onSubmit={createNewEvent} />
        </Modal>
        <Calendar
            events={events}
            onCellClicked={displayModal}
            month={currentMonthMoment.format('MM')}
            year={currentMonthMoment.format('YYYY')}
            onPrev={decrementMonth}
            onNext={incrementMonth} />
        </>
    )
}