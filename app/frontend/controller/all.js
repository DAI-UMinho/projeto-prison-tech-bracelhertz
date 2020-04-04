const AVAILABLE_WEEK_DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const localStorageName = 'calendar-events';
let userLogado = localStorage.getItem("userLogado");
var listaa = {};
var data = {};

var faz;

Agenda();


async function Agenda() {

    const response1 = await fetch('http://127.0.0.1:8080/api/schedules', {
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
    });
    const agendas = await response1.json();
    console.log(agendas)
    var pi = ""
    for (var agenda of agendas) {
        if (agenda.user.userId == userLogado) {
            pi = "";
            pi = getDate(new Date(agenda.date))
            if (typeof listaa[pi] == 'undefined') {
                listaa[pi] = [agenda.description];
            } else {
                listaa[pi].push(agenda.description);
            }

        }

    }
    console.log(listaa)



    class CALENDAR {
        constructor(options) {
            this.options = options;
            this.elements = {
                days: this.getFirstElementInsideIdByClassName('calendar-days'),
                week: this.getFirstElementInsideIdByClassName('calendar-week'),
                month: this.getFirstElementInsideIdByClassName('calendar-month'),
                year: this.getFirstElementInsideIdByClassName('calendar-current-year'),
                eventList: this.getFirstElementInsideIdByClassName('current-day-events-list'),
                eventField: this.getFirstElementInsideIdByClassName('add-event-day-field'),
                eventAddBtn: this.getFirstElementInsideIdByClassName('add-event-day-field-btn'),
                currentDay: this.getFirstElementInsideIdByClassName('calendar-left-side-day'),
                currentWeekDay: this.getFirstElementInsideIdByClassName('calendar-left-side-day-of-week'),
                prevYear: this.getFirstElementInsideIdByClassName('calendar-change-year-slider-prev'),
                nextYear: this.getFirstElementInsideIdByClassName('calendar-change-year-slider-next')
            };
            this.eventList = listaa || {};
            this.date = +new Date();
            this.options.maxDays = 37;
            this.init();
        }

        // App methods
        init() {
            if (!this.options.id) return false;
            this.eventsTrigger();
            this.drawAll();
        }

        // draw Methods
        drawAll() {
            this.drawWeekDays();
            this.drawMonths();
            this.drawDays();
            this.drawYearAndCurrentDay();
            this.drawEvents();

        }

        drawEvents() {
            let calendar = this.getCalendar();
            let eventList = this.eventList[calendar.active.formatted] || ['Não há eventos neste dia'];
            let eventTemplate = "";
            eventList.forEach(item => {
                eventTemplate += `<li>${item}</li>`;
            });

            this.elements.eventList.innerHTML = eventTemplate;
        }

        drawYearAndCurrentDay() {
            let calendar = this.getCalendar();
            this.elements.year.innerHTML = calendar.active.year;
            this.elements.currentDay.innerHTML = calendar.active.day;
            this.elements.currentWeekDay.innerHTML = AVAILABLE_WEEK_DAYS[calendar.active.week];
        }

        drawDays() {
            let calendar = this.getCalendar();

            let latestDaysInPrevMonth = this.range(calendar.active.startWeek).map((day, idx) => {
                return {
                    dayNumber: this.countOfDaysInMonth(calendar.pMonth) - idx,
                    month: new Date(calendar.pMonth).getMonth(),
                    year: new Date(calendar.pMonth).getFullYear(),
                    currentMonth: false
                }
            }).reverse();


            let daysInActiveMonth = this.range(calendar.active.days).map((day, idx) => {
                let dayNumber = idx + 1;
                let today = new Date();
                return {
                    dayNumber,
                    today: today.getDate() === dayNumber && today.getFullYear() === calendar.active.year && today.getMonth() === calendar.active.month,
                    month: calendar.active.month,
                    year: calendar.active.year,
                    selected: calendar.active.day === dayNumber,
                    currentMonth: true
                }
            });


            let countOfDays = this.options.maxDays - (latestDaysInPrevMonth.length + daysInActiveMonth.length);
            let daysInNextMonth = this.range(countOfDays).map((day, idx) => {
                return {
                    dayNumber: idx + 1,
                    month: new Date(calendar.nMonth).getMonth(),
                    year: new Date(calendar.nMonth).getFullYear(),
                    currentMonth: false
                }
            });

            let days = [...latestDaysInPrevMonth, ...daysInActiveMonth, ...daysInNextMonth];

            days = days.map(day => {
                let newDayParams = day;
                let formatted = this.getFormattedDate(new Date(`${Number(day.month) + 1}/${day.dayNumber}/${day.year}`));
                newDayParams.hasEvent = this.eventList[formatted];
                return newDayParams;
            });

            let daysTemplate = "";
            days.forEach(day => {
                daysTemplate += `<li class="${day.currentMonth ? '' : 'another-month'}${day.today ? ' active-day ' : ''}${day.selected ? 'selected-day' : ''}${day.hasEvent ? ' event-day' : ''}" data-day="${day.dayNumber}" data-month="${day.month}" data-year="${day.year}"></li>`
            });

            this.elements.days.innerHTML = daysTemplate;
        }

        drawMonths() {
            let availableMonths = ["Jan", "Feb", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
            let monthTemplate = "";
            let calendar = this.getCalendar();
            availableMonths.forEach((month, idx) => {
                monthTemplate += `<li class="${idx === calendar.active.month ? 'active' : ''}" data-month="${idx}">${month}</li>`
            });

            this.elements.month.innerHTML = monthTemplate;
        }

        drawWeekDays() {
            let weekTemplate = "";
            AVAILABLE_WEEK_DAYS.forEach(week => {
                weekTemplate += `<li>${week.slice(0, 3)}</li>`
            });

            this.elements.week.innerHTML = weekTemplate;
        }

        // Service methods
        eventsTrigger() {
            this.elements.prevYear.addEventListener('click', e => {
                let calendar = this.getCalendar();
                this.updateTime(calendar.pYear);
                this.drawAll()
            });

            this.elements.nextYear.addEventListener('click', e => {
                let calendar = this.getCalendar();
                this.updateTime(calendar.nYear);
                this.drawAll()
            });

            this.elements.month.addEventListener('click', e => {
                let calendar = this.getCalendar();
                let month = e.srcElement.getAttribute('data-month');
                if (!month || calendar.active.month == month) return false;

                let newMonth = new Date(calendar.active.tm).setMonth(month);
                this.updateTime(newMonth);
                this.drawAll()
            });


            this.elements.days.addEventListener('click', e => {
                let element = e.srcElement;
                let day = element.getAttribute('data-day');
                let month = element.getAttribute('data-month');
                let year = element.getAttribute('data-year');
                if (!day) return false;
                let strDate = `${Number(month) + 1}/${day}/${year}`;
                this.updateTime(strDate);
                this.drawAll()
            });


            this.elements.eventAddBtn.addEventListener('click', e => {
                let fieldValue = this.elements.eventField.value;
                if (!fieldValue) return false;
                let dateFormatted = new Date(this.date);
                if (!this.eventList[dateFormatted]) this.eventList[dateFormatted] = [];
                this.eventList[dateFormatted].push(fieldValue);

                data.user = { userId: userLogado };
                data.description = fieldValue;
                data.date = getDate2(dateFormatted);
                console.log(data)

                localStorage.setItem(localStorageName, JSON.stringify(this.eventList));
                enviar();


                async function enviar() {

                    await fetch('http://127.0.0.1:8080/api/schedules', {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        mode: 'cors',
                        method: 'POST',
                        credentials: 'include',
                        body: JSON.stringify(data)

                    }).then(function (response) {
                        if (!response.ok) {
                            alert(response);
                            throw new Error("ERRO");
                        }

                        return response.json();
                    }).then(async function (result) {

                        if (result) {

                            console.log("1");

                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 500,
                                timerProgressBar: true,
                                onOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })

                            Toast.fire({
                                icon: 'success',
                                title: 'Adicionado com sucesso'
                            })
                            .then(() => {
                                location.reload();
                            })
                           

                        }
                    }).catch(function (err) {
                        swal("Erro!", err, "error");
                    })


                }


                
                this.elements.eventField.value = '';
                this.drawAll()
                console.log("3");


            });


        }


        updateTime(time) {
            this.date = +new Date(time);
        }

        getCalendar() {
            let time = new Date(this.date);

            return {
                active: {
                    days: this.countOfDaysInMonth(time),
                    startWeek: this.getStartedDayOfWeekByTime(time),
                    day: time.getDate(),
                    week: time.getDay(),
                    month: time.getMonth(),
                    year: time.getFullYear(),
                    formatted: this.getFormattedDate(time),
                    tm: +time
                },
                pMonth: new Date(time.getFullYear(), time.getMonth() - 1, 1),
                nMonth: new Date(time.getFullYear(), time.getMonth() + 1, 1),
                pYear: new Date(new Date(time).getFullYear() - 1, 0, 1),
                nYear: new Date(new Date(time).getFullYear() + 1, 0, 1)
            }
        }

        countOfDaysInMonth(time) {
            let date = this.getMonthAndYear(time);
            return new Date(date.year, date.month + 1, 0).getDate();
        }

        getStartedDayOfWeekByTime(time) {
            let date = this.getMonthAndYear(time);
            return new Date(date.year, date.month, 1).getDay();
        }

        getMonthAndYear(time) {
            let date = new Date(time);
            return {
                year: date.getFullYear(),
                month: date.getMonth()
            }
        }

        getFormattedDate(date) {
            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        }

        range(number) {
            return new Array(number).fill().map((e, i) => i);
        }

        getFirstElementInsideIdByClassName(className) {
            return document.getElementById(this.options.id).getElementsByClassName(className)[0];
        }

    }


    (function () {
        new CALENDAR({
            id: "calendar"
        })
    })();



}




//--------------------------------------------------------------------------------------

function getDate(date) {
    var today = new Date(date);
    var d = today.getDate();
    var mo = today.getMonth()
    var a = today.getFullYear();


    return d + "/" + mo + "/" + a;
}

function getDate2(date) {
    var today = new Date(date);
    var d = today.getDate();
    var mo = today.getMonth()
    var a = today.getFullYear();
    d = checkTime(d);
    mo = checkTime(mo+1);
    return a + "-" + mo + "-" + d;
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
