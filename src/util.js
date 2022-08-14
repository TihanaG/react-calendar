export const momentToNumbers = moment => {
    return [moment.format('DD'), moment.format('MM'), moment.format('YYYY')]
}

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

export const getDaysForWeeksInMonth = monthMoment => {
    const firstDayInMonth = monthMoment.clone().startOf('month')
    const sundayBeforeMonth = firstDayInMonth.clone().startOf('week')
    
    const lastDayInMonth = monthMoment.clone().endOf('month')
    const sundayAfterMonth = lastDayInMonth.clone()
        .endOf('week')
        .add(1, 'days')
        .startOf('day')
    
    const currentDay = sundayBeforeMonth.clone()
    let days = []
    
    while(!currentDay.isSame(sundayAfterMonth, 'date')) {
        days.push(currentDay.clone())
        currentDay.add(1, 'days')
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
export const padWeekFront = (week, padWith = null) => {
    return [...Array(7 - week.length).fill(padWith), ...week]
}

export const padWeekBack = (week, padWith= null) => {
    return [...week, ...Array(7 - week.length).fill(padWith)]
}

export const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']