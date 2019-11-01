// 'use strict'

// Вводим на экран правильное сообщение, которое берет значение из input

let age = document.getElementById('age');
function showUser(surname, name) {
	alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
}

// // Первый Вариант

// let showUserAge = showUser.bind(age);
// showUserAge('Bulya', 'Tony');

// Второй вариант

showUser.apply(age, ['Bulya', 'Tony']); 