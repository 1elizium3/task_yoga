/*Любое начало проекта начинается с назначения обработчика событий
на всю страницу*/
// Проэкт приведён к стандартам ES6
window.addEventListener('DOMContentLoaded', () => {

    'use strict';
 // Создаём табы на странице 
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    
    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer
 // Создаём таймер обратного отчета
    let deadline = '2019-12-31';

     function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));

 // hours = Math.floor((t/1000/60/60) % 24), Если потребуется 
 // days = Math.floor((t/1000*60*60*24));    расчитать дни

        return { 
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id), 
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timerInterval = setInterval(updateClock, 1000);
 
        function updateClock() {
            let t = getTimeRemaining(endtime);
            // Второй вариант 
            // let addZero = (num) =>{}
            // function addZero(num) {
            let addZero = (num) => {
                if (num <= 9) {
                    return '0' + num;
                } else {
                    return num;
                }
            };
                
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
            // Первый вариант
            // hours.textContent = ('0' + t.hours).slice(-2);
            // minutes.textContent = ('0' + t.minutes).slice(-2);
            // seconds.textContent = ('0' + t.seconds).slice(-2);


            if (t.total <= 0) {
                clearInterval(timerInterval); 
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }
    setClock('timer', deadline);

    // Modal Window
 // Создаем модальное окно и работаем с this
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        description = document.querySelectorAll('.description-btn');
   
    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

 // ОДИН ИЗ ВАРИАНТОВ РЕШЕНИЯ

 //  let desctiption = document.querySelectorAll('.description-btn');
 //     for (let i = 0; i < desctiption.length; i++) {
 //         desctiption[i].addEventListener('click', function () {
 //             Modal(this);
 //         });
 //     }
 // function Modal(t) {
 //         overlay.style.display = 'block';
 //         t.classList.add('more-splash');
 //         document.body.style.overflow = 'hidden';
 //     }

    description.forEach( (item) => {
        item.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Form 
    // Реализация скрипта отправки данных из формы
    // (Modal and Contact)
 // Подключить скрипт отправки данных с формы к Модальному окну!
 // Подключить скрипт отправки данных с формы к Контактной форме!
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Произошол збой...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        contacts = document.getElementById('form');
        statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function(event) {
            event.preventDefault();
            elem.appendChild(statusMessage);
            
           
            let formData = new FormData(elem);
 // Переписываем скрипт для отправки данных с формы, используя промисы(Promise)
            function postData() {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
             
                 // Форма в JSON
                //  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            
                    let obj = {};
                    formData.forEach((value, key) => {
                        obj[key] = value;
                    });
                    let json = JSON.stringify(obj);
            
                    request.send(json);
            
                    request.addEventListener('readystatechange', function() {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState == 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
    
                });
            }
    
            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                    console.log('Ok');
                }
            }
            
            postData(formData)
                .then( () => statusMessage.innerHTML = message.loading)
                .then( () => statusMessage.innerHTML = message.success)
                .catch( () => statusMessage.innerHTML = message.failure)
                .then(clearInput);
        });
    }
    sendForm(form);
    sendForm(contacts);

    // Slider
 //  Параметр текущего слайдера slideIndex

    let slideIndex = 1,   /*Отвечает за слайд который отображается 
                          на текущий момент (Первый)*/
        slides = document.querySelectorAll('.slider-item'),  /*Все слайды*/
        prev = document.querySelector('.prev'),  /*Стрелка вперед*/
        next = document.querySelector('.next'),  /*Стрелка назад*/
        dotsWrap = document.querySelector('.slider-dots'), /*Указываем обёртки точек*/
        dots = document.querySelectorAll('.dot');  /*Все точки*/

    showSlides(slideIndex);

    // Скрываем лишние слайды!
    function showSlides(n) {
    // Через условие указываем переключение слайдов с первого к последнему
    // и от последнего к первому!
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
 //   С помощью перебора скрываем лишние слайды
        slides.forEach( (item) => item.style.display = 'none');
        // // Тоже что и forEach только через for()
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // }
 //  Удаляем лишние активные точки
        dots.forEach((item) => item.classList.remove('dot-active'));   
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    // Увеличиваем параметр (+) slideIndex на 1
    // Определяем текущий слайд и устанавливаем его 
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // Реалезуем стрелку назад <  
    // Реалезуем стрелку вперед >
    prev.addEventListener('click', function() {
        plusSlides(-1);
    });
    next.addEventListener('click', function() {
        plusSlides(1);
    });
// // Переключение таймера через интервал
//     setInterval(function() {
//         plusSlides(1);
//     }, 6000 );

 // Реалезуем управления точками через делегирование (e.target).
  
    dotsWrap.addEventListener('click', function(e) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    // Calc
 // Привязываем кол-во людей, кол-во дней, место поездки и общую сумму.

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

 // На persons и restDays навешиваем обработчик (в данном случае нельзя использовать 
 // стрелочную функцию так как используется контекст вызова this).  
 // Рассчитываем сумму и проверяем на пустые поля.  

    persons.addEventListener('input', function() {
        personsSum = +this.value;
        total = (daysSum * personsSum)*4000; 

        if (restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('input', function() {
        daysSum = +this.value;
        total = (daysSum * personsSum)*4000;

        if (persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

 // Привязываем place к обработчику, проверяем на пустые поля,
 // если поля заполнены выводим сумму. Рассчитываем сумму к месту поездки на отдых.

    place.addEventListener('input', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });


});



