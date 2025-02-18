export function getWeekDays(day) {
    let currentDay = new Date(day);
    let week = [];
    currentDay.setDate((currentDay.getDate() - currentDay.getDay() + 1));
    for (let i = 0; i < 7; i++) {
        week.push(
            new Date(currentDay)  
        ); 
        currentDay.setDate(currentDay.getDate() + 1);
    }
    return week; 
}

export const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];