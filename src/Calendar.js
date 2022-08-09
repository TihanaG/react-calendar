import moment from "moment"

export const getDaysInMonth = monthMoment => {
    const monthCopy = monthMoment.clone()
    monthCopy.startOf('month')

    let days = []
    
    while(monthCopy.month() === monthMoment.month()) {
        days.push(monthCopy.clone())
        monthCopy.add(1, 'days')
    }

    return days;
}

export const segmentIntoWeeks = dayMoments => {
    let weeks = []
    let currentWeek = []
    for (let day of dayMoments) {
        currentWeek.push(day.clone())

        if (day.format('dddd') === 'Saturday') {
            weeks.push(currentWeek)
            currentWeek = []
        }
    }

    if (currentWeek.length > 0) {
        weeks.push(currentWeek)
    }

    return weeks
}

// Funkcija kako bi se prikazala prazna mjesta ako prvi ne pocinjeu nedjelju
const padWeekFront = (week, padWith = null) => {
    return [...Array(7 - week.length).fill(padWith), ...week]
}

const padWeekBack = (week, padWith= null) => {
    return [...week, ...Array(7 - week.length).fill(padWith)]
}

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const Calendar = ({ month, year, onPrev, onNext }) => {
    const currentMonthMoment = moment(`${month}${year}`, 'MMYYYY')

    const weeks = segmentIntoWeeks(getDaysInMonth(currentMonthMoment))

    return (
        <>
            <h1>{currentMonthMoment.format('MMMM YYYY')}</h1>
            <button onClick={onPrev}>Prev</button>
            <button onClick={onNext}>Next</button>
            <table>
                <thead>
                    <tr>{daysOfTheWeek.map(day => <th key={day}>{day}</th>)}</tr>
                </thead>
                <tbody>
                    {weeks.map((week, i) => {
                        const displayWeek = i === 0
                            ? padWeekFront(week)
                            : i === weeks.length - 1
                                ? padWeekBack(week)
                                : week
                        return (
                            <tr key={i}>
                                {displayWeek.map((dayMoment, j) => dayMoment
                                    ? <td key={dayMoment.format('D')}>{dayMoment.format('D')}</td>
                                    : <td key={`${i}${j}`}></td>)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}