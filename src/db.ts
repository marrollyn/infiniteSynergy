import Dexie, { Table } from 'dexie';
import { generateUsers } from './utils/generateUsers';

export const db = new Dexie('MyDatabase');
db.version(1).stores({
    users: 'userOrderNumber, id, user, online, firstName, lastName, age, email',
});

export async function writeFirstPartInDB() {
    const countDB = await db.table('users').count();
    const users = generateUsers(1, 500);
    await db.table('users').bulkPut(users);
    console.log('Первый пакет успешно записан.');
}

export async function writeDataInDB() {
    const users = generateUsers(501, 1000000);
    const partSize = 500;
    for (let i = 0; i < users.length; i += partSize) {
        const part = users.slice(i, i + partSize);
        try {
            await db.table('users').bulkPut(part);
            console.log(`Пакет ${(i / partSize) + 1} успешно добавлен.`);
        } catch (error) {
            throw new Error(`Ошибка при добавлении  пакета данных ${i / partSize + 1}: ${error}`);
        }
    }
}

// db.table('users').clear();

// export async function writeUsersInDB() {
//     const users = generateUsers();
//     const partSize = 500;

//     const countDB = await db.table('users').count();

//     if (countDB === 0 || countDB < 1000000) {
//         await db.table('users').clear();
//     }

//     for (let i = 0; i < users.length; i += partSize) {
//         const part = users.slice(i, i + partSize);

//         try {
//             await db.table('users').bulkPut(part);
//             console.log(`Пакет ${i / partSize + 1} успешно добавлен.`);
//         } catch (error) {
//             throw new Error(`Ошибка при добавлении  пакета данных ${i / partSize + 1}: ${error}`);
//         }
//     }
// }