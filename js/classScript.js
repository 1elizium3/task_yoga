'use strict';

// Создаём Класс Options
// Вводим свойства: height, width, bg, fontSize, textAlign
// 

class Options {
    constructor(height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }

 // Создаём метод newBlock(). В методе создаём новый блок(elem) и блок (p)
 // и добавляем их (appenChild) (р - отвечает за текс). 
 //  Создаём переменную (param) добавляя 
 // в него все свойства, при помощи cssText изменяем 
 // свой стиль из переданных параметров.
 // Добавляем текст (p.textContent)

    newBlock() {
        let elem = document.createElement('div'),
            p = document.createElement('p');

        document.body.appendChild(elem);
        elem.appendChild(p);
        
        let param = ( `height:${this.height}px; width:${this.width}px; background-color:${this.bg};
         font-size:${this.fontSize}px; text-align:${this.textAlign}` );        
        elem.style.cssText = param;
        p.textContent = 'sfsdfgsdfas fsdfsd fsdfssfdsfad fasdfasdasd sdfsdfawsr dfljuadaisdu';
    }
}

// Создаём новый (new) объект через класс и присваиваем значения.
// Вызываем его методы и получаем элемент на странице

const newObj = new Options(300, 200, "green", 14, "center");
newObj.newBlock();



let str = "I love JavaScript";

let result = str.match(/HTML/) || [];

console.log(result); // null
console.log(result.length);