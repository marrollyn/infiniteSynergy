import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersSliceInfoSelector } from '../slices/usersSlice';
import { updateUserDB, getCurrentUsersState } from '../slices/currentUserSlice';
import { AppDispatch } from '../store/store';
import { TUser } from '../types';

function UserCard() {
	const dispatch = useDispatch<AppDispatch>();

	const { currentUser, error } = useSelector(getCurrentUsersState);
	const { nulledDB } = useSelector(getUsersSliceInfoSelector);

	const [editableUser, setEditableUser] = useState<TUser>({
		id: '',
		user: '',
		online: null,
		firstName: '',
		lastName: '',
		age: null,
		email: '',
		userOrderNumber: 0,
	});

	useEffect(() => {
		if (currentUser) {
			setEditableUser({
				id: currentUser.id || '',
				user: currentUser.user || '',
				online: currentUser.online || null,
				firstName: currentUser.firstName || '',
				lastName: currentUser.lastName || '',
				age: currentUser.age || null,
				email: currentUser.email || '',
				userOrderNumber: currentUser.userOrderNumber || 0,
			});
		}
	}, [currentUser]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setEditableUser((prev: TUser) => ({
				...prev,
				[name]: name === 'age' ? Number(value) : value,
			}));
		},
		[]
	);

	const handleSave = useCallback(() => {
		dispatch(updateUserDB(editableUser));
	}, [dispatch, editableUser]);

	return (
		<>
			<>
				{!nulledDB && currentUser ? (
					<div style={{ padding: '10px' }}>
						<div
							style={{ paddingTop: '18px', marginBottom: '18px' }}
						>
							<label>
								<strong>
									Выбран пользователь:{' '}
									{editableUser.userOrderNumber}
								</strong>
								<br />
							</label>
						</div>
						<img
							src="URL"
							alt={'аватар'}
							style={{
								backgroundColor: '#c2c2c2',
								width: '150px',
								height: '150px',
								borderRadius: '50%',
								objectFit: 'cover',
								display: 'block',
								margin: '0 auto',
							}}
						/>
						<div style={{ paddingTop: '18px' }}>
							<label>
								<strong>Имя:</strong>
								<br />
								<input
									type="text"
									name="firstName"
									value={editableUser.firstName}
									onChange={handleChange}
									style={{ width: '100%' }}
								/>
							</label>
						</div>
						<div style={{ paddingTop: '8px' }}>
							<label>
								<strong>Фамилия:</strong>
								<br />
								<input
									type="text"
									name="lastName"
									value={editableUser.lastName}
									onChange={handleChange}
									style={{ width: '100%' }}
								/>
							</label>
						</div>
						<div style={{ marginBottom: '8px' }}>
							<label>
								<strong>Email:</strong>
								<br />
								<input
									type="email"
									name="email"
									value={editableUser.email}
									onChange={handleChange}
									style={{ width: '100%' }}
								/>
							</label>
						</div>
						<div style={{ marginBottom: '8px' }}>
							<label>
								<strong>Возраст:</strong>
								<br />
								<input
									type="number"
									name="age"
									value={
										editableUser.age === null
											? ''
											: editableUser.age
									}
									onChange={handleChange}
									style={{ width: '100%' }}
								/>
							</label>
						</div>
						<button onClick={handleSave}>Сохранить</button>
					</div>
				) : (
					!nulledDB && <p>Пользователь не выбран</p>
				)}
			</>
			{error && (
				<p style={{ color: 'red' }}>Ошибка загрузки данных: {error}</p>
			)}
		</>
	);
}

export default React.memo(UserCard);
