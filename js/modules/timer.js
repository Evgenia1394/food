function timer(id, deadline) {
        //Timer

        //ф-я определяющая разницу между текущим временем и дедлайном
        function getTimeRemaining(endTime) {
            const t = Date.parse(endTime) - Date.parse(new Date()),//вычли из даты дедлайна тек время системы, млсек
                    days = Math.floor(t / (1000 * 60 * 60 * 24)),//полученные млсек переводим в дни
                    hours = Math.floor(t / (1000 * 60 * 60) % 24),
                    minutes = Math.floor((t / 1000 / 60) % 60),
                    seconds = Math.floor((t / 1000 ) % 60);
    //делаем объект для вывода значений переменных наружу
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds,
            };
        }
    //ф-я для подстановки 0 в одиночных числах таймера
        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
               return num;
            }
        }
    
    //делаем ф-ю для установки таймера на страницу
        function setClock (selector, endtime) {
            const timer = document.querySelector(selector),//ищем первый таймер на странице
                    days = timer.querySelector('#days'),//получим все эл-ты со страницы
                    hours = timer.querySelector('#hours'),
                    minutes = timer.querySelector('#minutes'),
                    seconds = timer.querySelector('#seconds'),
                    timeInterval = setInterval(upDateClock, 1000); //запуск через каждую сек
    
            upDateClock();
    
            //ф-я будет обновлять таймер каждую секунду
            function upDateClock () {
                const t = getTimeRemaining(endtime);
    
                //расчетные величины помещаем на страницу
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
    
                //остановка таймера
                if (t.totaal <= 0) {
                    clearInterval(timeInterval);
                }
            }
        }
    
        setClock(id, deadline);
}

export default timer;