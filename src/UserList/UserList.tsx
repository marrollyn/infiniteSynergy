import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, getUsersSelector, getUsersSliceInfoSelector } from './../slices/usersSlice';
import { AppDispatch } from '../store/store';
import { TUser } from '../types';
import UserListItem from './UserListItem';

function UserList() {
    const dispatch = useDispatch<AppDispatch>();
    const users: TUser[] = useSelector(getUsersSelector);
    const { loading, ableData, offset, countToDisplay, currentPage, error } = useSelector(getUsersSliceInfoSelector);

    const startList = offset + 1;
    const endList = offset + countToDisplay;

    useEffect(() => {

    }, []);

    function showPreviousRecords() {
        if (currentPage > 0) {
            dispatch(fetchUsers({ countToDisplay, currentPage: currentPage - 1 }));
        }
    }

    function showNextRecords() {
        if (ableData) {
            dispatch(fetchUsers({ countToDisplay, currentPage: currentPage + 1 }));
        }
    }

    return (
        <>

            {(loading || users.length === 0) ? (
                <p>Загрузка данных...</p>
            ) : (
                <>
                    <button
                        onClick={showPreviousRecords}
                        disabled={currentPage === 0}>
                        Показать предыдущие записи</button>
                    <button
                        onClick={showNextRecords}
                        disabled={!ableData}>Показать следующие записи
                    </button>
                    <p>Показаны записи: {startList} - {endList}</p>
                    <UserListItem />
                </>
            )}
            {error && <p style={{ color: 'red' }}>Ошибка загрузки данных: {error}</p>}


        </>
    )

}

export default UserList;
