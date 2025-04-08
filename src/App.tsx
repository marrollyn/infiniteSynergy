import { useEffect, } from 'react';
import './App.css';
import { db, writeFirstPartInDB, writeDataInDB, getLastRecord } from './db';
import UsersList from './UsersList/UsersList';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchUsers,
	getUsersSliceInfoSelector,
	getUsersSelector,
} from './slices/usersSlice';
import { AppDispatch } from './store/store';
import UserCard from './UserCard/UserCard';
import { TUser } from './types';

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, nulledDB } = useSelector(getUsersSliceInfoSelector);
	const users: TUser[] = useSelector(getUsersSelector);


	useEffect(() => {

		const cancelToken = { cancelled: false };

		if (nulledDB) {
			console.log('Инициализация базы прекращена, т.к. nulledDB равен true');
			cancelToken.cancelled = true;
			return;
		}

		async function initDB() {

			await db.open();
			const countDB = await db.table('users').count();

			try {
				if (cancelToken.cancelled) return;
				
				if (countDB === 0) {
					await writeFirstPartInDB();
					if (cancelToken.cancelled) return;
					console.log('Первые данные пользователей записаны в базу данных');

					dispatch(fetchUsers({ countToDisplay: 100, currentPage: 0 }));
					if (cancelToken.cancelled) return;

					writeDataInDB();
					if (cancelToken.cancelled) return;

				} else {
					dispatch(fetchUsers({ countToDisplay: 100, currentPage: 0 }));
					if (cancelToken.cancelled) return;

					const lastRecord = await getLastRecord();

					if (countDB === lastRecord.userOrderNumber) {
						const newStart = countDB - 1;
						await writeDataInDB(newStart, 500000, cancelToken);
						if (cancelToken.cancelled) return;

					} else {
						await writeFirstPartInDB();
						if (cancelToken.cancelled) return;
						await writeDataInDB();
						if (cancelToken.cancelled) return;
					}

				}
			} catch (error) {
				throw new Error(`Ошибка при добавлении  пакета данных: ${error}`);
			}
		}

		initDB();
	}, [dispatch, nulledDB]);

	return (
		<>
			<h1>Список пользователей</h1>
			{loading || users.length === 0 ? (
				<p>Загрузка данных...</p>
			) : (
				<div
					style={{
						height: '500px',
						display: 'flex',
						flexDirection: 'row',
						gap: '20px',
					}}
				>
					<UsersList />
					<UserCard />
				</div>
			)}
			{error && (
				<p style={{ color: 'red' }}>Ошибка загрузки данных: {error}</p>
			)}
		</>
	);
}

export default App;
