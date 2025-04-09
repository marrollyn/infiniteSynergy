import { useEffect } from 'react';
import './App.css';
import { writeFirstPartInDB, writeDataInDB, db } from './db';
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
	const { loading, error } = useSelector(getUsersSliceInfoSelector);
	const users: TUser[] = useSelector(getUsersSelector);

	useEffect(() => {
		async function initDB() {
			await db.open();

			try {
				await writeFirstPartInDB();
			} catch (error) {
				throw new Error(`Ошибка при записи данных в базу: ${error}`);
			}

			try {
				dispatch(fetchUsers({ countToDisplay: 100, currentPage: 0 }));
			} catch (error) {
				throw new Error(`Ошибка при выполнении fetchUsers: ${error}`);
			}

			writeDataInDB();
		}

		initDB();
	}, [dispatch]);

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
