/*Любое начало проекта начинается с назначения обработчика событий
на всю страницу*/
window.addEventListener('DOMContentLoaded', function() {

    'use strict';
 /*Для данного скрипта нужны три вещи: 1) ЗАдать Все табы, каждый пункт (tab). 
 2) Родитель табов, включает в себя все табы (info). 3) Таб контент (tabContent).*/
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
});