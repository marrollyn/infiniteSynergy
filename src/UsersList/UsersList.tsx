import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchUsers,
	getUsersSelector,
	getUsersSliceInfoSelector,
} from '../slices/usersSlice';
import { AppDispatch } from '../store/store';
import { TUser } from '../types';
import UserListItem from './UserListItem';

function UsersList() {
	const dispatch = useDispatch<AppDispatch>();
	const users: TUser[] = useSelector(getUsersSelector);
	const {
		loading,
		ableData,
		offset,
		countToDisplay,
		currentPage,
		error,
		nulledDB,
	} = useSelector(getUsersSliceInfoSelector);

	const startList = useMemo(() => offset + 1, [offset]);
	const endList = useMemo(
		() => offset + countToDisplay,
		[offset, countToDisplay]
	);

	const showPreviousRecords = useCallback(() => {
		if (currentPage > 0) {
			dispatch(
				fetchUsers({ countToDisplay, currentPage: currentPage - 1 })
			);
		}
	}, [currentPage, countToDisplay, dispatch]);

	const showNextRecords = useCallback(() => {
		if (ableData) {
			dispatch(
				fetchUsers({ countToDisplay, currentPage: currentPage + 1 })
			);
		}
	}, [ableData, countToDisplay, currentPage, dispatch]);

	// const clearDB = useCallback(() => {
	// 	dispatch(setNulledDB());
	// 	dispatch(clearCurrentUser());
	// 	db.table('users')
	// 		.clear()
	// 		.then(() => {
	// 			console.log('База данных успешно очищена.');
	// 		})
	// 		.catch((error) => {
	// 			console.error('Ошибка при очистке базы данных:', error);
	// 		});
	// }, []);

	return (
		<div>
			{nulledDB ? (
				<p style={{ color: 'red' }}>База данных очищена</p>
			) : loading || users.length === 0 ? (
				<p>Загрузка данных...</p>
			) : (
				<>
					<button
						style={{ marginInlineEnd: '10px' }}
						onClick={showPreviousRecords}
						disabled={currentPage === 0}
					>
						Предыдущие
					</button>
					<button onClick={showNextRecords} disabled={!ableData}>
						Следующие
					</button>
					{/* <button onClick={clearDB}>Очистить DB</button> */}
					<p>
						Показаны записи: {startList} - {endList}
					</p>
					<UserListItem />
				</>
			)}
			{error && (
				<p style={{ color: 'red' }}>Ошибка загрузки данных: {error}</p>
			)}
		</div>
	);
}

export default React.memo(UsersList);
