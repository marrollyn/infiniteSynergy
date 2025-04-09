import Dexie from 'dexie';
import { generateUsers } from './utils/generateUsers';
import { TUser } from './types';

export const db = new Dexie('MyDatabase');
db.version(1).stores({
	users: 'userOrderNumber, id, user, online, firstName, lastName, age, email',
});

export async function writeFirstPartInDB(start: number = 1, end: number = 100) {
	const users = generateUsers(start, end);
	await db.table('users').bulkPut(users);
}

export async function writeDataInDB(
	start: number = 101,
	end: number = 500000,
	cancelToken?: { cancelled: boolean }
) {
	const users = generateUsers(start, end);
	const partSize = 500;
	for (let i = 0; i < users.length; i += partSize) {
		if (cancelToken?.cancelled) {
			console.log(`Запись данных отменена на пакете ${i / partSize + 1}`);
			return;
		}
		const part = users.slice(i, i + partSize);
		try {
			await db.table('users').bulkPut(part);
		} catch (error) {
			throw new Error(
				`Ошибка при добавлении пакета данных ${i / partSize + 1}: ${error}`
			);
		}
	}
}

export async function getLastRecord(): Promise<TUser> {
	return await db.table('users').orderBy('userOrderNumber').reverse().first();
}

export async function clearDB() {
	try {
		await db.table('users').clear();
	} catch (error) {
		throw new Error(`Ошибка при добавлении  пакета данных: ${error}`);
	}
}
