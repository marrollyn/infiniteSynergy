// import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { TUser } from '../types';

export function generateUsers(start: number, end: number): TUser[] {
    const users: TUser[] = [];

    const onlineUsers = [true, false];

    const domains = ["@example.com", "@mail.ru", "@test.com", "@domain.com", "@random.com", "@ya.ru"];

    const firtsNames = ["Артем", "Александр", "Роман", "Евгений", "Иван", "Максим", "Виктор", "Алексей", "Антон", "Степан", "Дмитрий", "Данил", "Павел", "Игорь", "Константин", "Олег", "Борис", "Илья", "Кирилл", "Михаил"];

    const lastNames = ["Иванов", "Смирнов", "Сидоров", "Петров", "Егоров", "Павлов", "Васильев", "Кузнецов", "Попов", "Михайлов", "Новиков", "Федоров", "Козлов", "Антонов", "Алексеев", "Борисов", "Николаев", "Степанов", "Орлов", "Андреев"];

    for (let i = start; i <= end; i++) {
        const id = uuidv4();
        const user = `Пользователь ${i}`;
        const firstName = firtsNames[Math.floor(Math.random() * firtsNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const age = Math.floor(Math.random() * 100);
        const email = `${i}` + `${domains[Math.floor(Math.random() * domains.length)]}`;
        const online = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];

        users.push({
            id,
            user,
            online,
            firstName,
            lastName,
            age,
            email,
            userOrderNumber: i,
        });
    }

    return users;
}

// fs.writeFileSync('data.json', JSON.stringify(users), 'utf-8');