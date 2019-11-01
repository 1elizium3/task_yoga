/*Любое начало проекта начинается с назначения обработчика событий
на всю страницу*/

window.addEventListener('DOMContentLoaded', function() {

    'use strict';

 /*Для данного скрипта нужны три вещи: 1) Задать Все табы, каждый пункт (tab). 
 2)Задать Родитель табов, включает в себя все табы (info). 3) Таб контент (tabContent).*/

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

/*Скрываем лишний (определённый) таб Контент. Пишем (на будущее) что бы при переключении
на другие табы все остальные скрывались, те которые не относятся к выбранному.
Манипулируем классами "show", "hide" которые прописаны в CSS */

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

/*Чтобы при загрузке страницы скрыть весь не нужный контент нужно его запустить.
hideTabContent(1); 1 - это кол-во показываемого контента (1, 2, ...)*/

    hideTabContent(1);

/*Этой функцией мы показываем определённый таб контент.
Проверяем, действительно ли контент скрыт. */

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    
 /*Назначаем обработчик событий при клике на каждый из табов 
 (делегирование событий). Применяем к родителю табов.
 Делаем проверку что мы кликнули на элемент ('info-header-tab').
 С помощью цыкла берём все табы, переберём и сравним с тем куда мы кликнули.
 Если(if) "target"(то куда нажали) полностью совпадает с определённым табом 
 который перебераем (i), скрываем все табы hideTabContent(0), 
 теперь показываем только тот который совпал с "tab" showTabContent(i),
 после останавливаем цыкл что бы он дальше не работал */

    info.addEventListener('click', function(event) {
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

 // Задаём конечную дату (дату можем получать с сервера)

    let deadline = '2019-11-31';

 // Вывод даты с точным временем и часовым поясом
    // let deadline="January 01 2018 00:00:00 GMT+0300";

 // Узнаём промежуток времени который лежит между настоящим временем 
 // и между deadline.
 // getTimeRemaining(endtime) в скобки передаём (в будущем) deadline
 // let t помещаем разницу между датами. Берем Дату дедлайна (в будущем)
 // и настоящую Дату и записываем в переменную (t) 

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

 // Этой функцией превращаем статичную вёрстку в динамичную 
 // для того что бы подставлять расчитаные значения 
 // в функции getTimeRemaining в вёрстку
 // В функцию передаём два аргумента ((id) - это где мы его устанавливаем)
 // и deadline через endtime  
 // В timerInterval запускаем updateClock каждую секунду

    function setClock(id, endtime) {
        let timer = document.getElementById(id), 
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timerInterval = setInterval(updateClock, 1000);

 // Обновляем часы каждую секунду.
 // t.hours (t.minutes, t.seconds) каждую секунду получаем обновление 
 // часов (минут, секунд) которое идет с return.
 //Первый вариант. Присваиваем(приклеиваем) '0' к минутам, секундам, часам для получения второго ноля!
 //Подходит если в скрипте есть малое кол-во переменных, например 3 как здесь.  
 // Второй вариант (надёжнее). Присваивем '0' через отдельную функцию.
 // Но если таких применений будет 50,100? И в разных частях программы. 
 // Вот тогда мы и прочувствуем по полной пользу такой функции 
  
        function updateClock() {
            let t = getTimeRemaining(endtime);
            // Второй вариант 
            function addZero(num) {
                if (num <= 9) {
                    return '0' + num;
                } else {
                    return num;
                }
            }
                
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
            // Первый вариант
            // hours.textContent = ('0' + t.hours).slice(-2);
            // minutes.textContent = ('0' + t.minutes).slice(-2);
            // seconds.textContent = ('0' + t.seconds).slice(-2);

 // Останавливаем таймер на странице после окончания времени.
 // Присваиваем нули после окончания времени иначе будет некоректно. 

            if (t.total <= 0) {
                clearInterval(timerInterval); 
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }
 // Запускаем функ., передаём два параметра через id = timer и сам deadline
    setClock('timer', deadline);

    // Modal Window
 // 1)Через селектор (querySelector) привязываем .more (Узнать больше).
 // 2)Привязываем Модальное окно .overlay.
 // 3)Привязываем кнопку Закрыть .popup-close. 
 //4)Привязываем модальное окно к кнопкам “Узнать подробнее” (.description-btn) 
 // в Табах через querySelectorAll так как Табов несколько.

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        description = document.querySelectorAll('.description-btn');
 
 // На кнопку .more навешиваем обработчик событий Клик.
 // При Клике .overlay изменяем стиль на Блочную модель.
 // При Клике задаем анимацию которая прописана в CSS.
 // Запрещаем прокрутку страницы во время запуска окна "Узнать больше/подробнее"   
    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

 // Привязываем модальное окно к кнопкам “Узнать подробнее” в табах
 // черезquerySelectorAll так как Табов несколько.

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

    description.forEach(function(item) {
        item.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });

 // На кнопку .close навешиваем обработчик событий Клик.
 // Задаем обратную операцию чем в .more для закрытия окна.  
 // При закрытии (ставим more. место this.) удаляем анимацию .remove('more-splash').
 // Включаем прокрутку страницы после закрытия окна "Узнать больше/подробнее"

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

});


// Вводим на экран правильное сообщение, которое берет значение из input!

// 'use strict'

let age = document.getElementById('age');
function showUser(surname, name) {
	alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
}

// // Первый Вариант

// let showUserAge = showUser.bind(age);
// showUserAge('Bulya', 'Tony');

// Второй вариант

showUser.apply(age, ['Bulya', 'Tony']); 
