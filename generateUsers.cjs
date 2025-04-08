'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var fs = require('fs');
var uuid_1 = require('uuid');
var users = [];
var domains = [
	'@example.com',
	'@mail.ru',
	'@test.com',
	'@domain.com',
	'@random.com',
	'@ya.ru',
];
var firtsNames = [
	'Артем',
	'Александр',
	'Роман',
	'Евгений',
	'Иван',
	'Максим',
	'Виктор',
	'Алексей',
	'Антон',
	'Степан',
	'Дмитрий',
	'Данил',
	'Павел',
	'Игорь',
	'Константин',
	'Олег',
	'Борис',
	'Илья',
	'Кирилл',
	'Михаил',
];
var lastNames = [
	'Иванов',
	'Смирнов',
	'Сидоров',
	'Петров',
	'Егоров',
	'Павлов',
	'Васильев',
	'Кузнецов',
	'Попов',
	'Михайлов',
	'Новиков',
	'Федоров',
	'Козлов',
	'Антонов',
	'Алексеев',
	'Борисов',
	'Николаев',
	'Степанов',
	'Орлов',
	'Андреев',
];
for (var i = 1; i <= 1000000; i++) {
	var id = (0, uuid_1.v4)();
	var user =
		'\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C '.concat(
			i
		);
	var firstName = firtsNames[Math.floor(Math.random() * firtsNames.length)];
	var lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
	var age = Math.floor(Math.random() * 100);
	var email =
		''.concat(i) +
		''.concat(domains[Math.floor(Math.random() * domains.length)]);
	users.push({
		id: id,
		user: user,
		firstName: firstName,
		lastName: lastName,
		age: age,
		email: email,
	});
}
fs.writeFileSync('data.json', JSON.stringify(users), 'utf-8');
