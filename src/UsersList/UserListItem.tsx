import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getUsersSelector,
	getUsersSliceInfoSelector,
} from '../slices/usersSlice';
import { setUser } from '../slices/currentUserSlice';
import { AppDispatch } from '../store/store';
import { TUser } from '../types';

function UserListItem() {
	const dispatch = useDispatch<AppDispatch>();
	const users: TUser[] = useSelector(getUsersSelector);
	const { loading, ableData } = useSelector(getUsersSliceInfoSelector);

	const handleUserButtonClick = useCallback(
		(user: TUser) => {
			dispatch(setUser(user));
		},
		[dispatch]
	);

	return (
		<div style={{ height: '100%', overflowY: 'auto' }}>
			{users.map((user) => (
				<div
					className={'userListItem'}
					key={user.id}
					style={{ padding: '10px', borderBottom: '1px solid #ccc' }}
				>
					<button
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: 'transparent',
							border: 'none',
						}}
						onClick={() => handleUserButtonClick(user)}
					>
						{`${user.user}`}
					</button>
				</div>
			))}
			{!loading && !ableData && <p>Все данные загружены</p>}
		</div>
	);
}

export default React.memo(UserListItem);
