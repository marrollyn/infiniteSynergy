
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, getUsersSelector, getUsersSliceInfoSelector } from './../slices/usersSlice';
import { AppDispatch } from '../store/store';
import { TUser } from '../types';

function UserListItem() {

  const dispatch = useDispatch<AppDispatch>();
  const users: TUser[] = useSelector(getUsersSelector);
  const { offset, countToDisplay, currentPage, loading, ableData } = useSelector(getUsersSliceInfoSelector);


  function handleUserButtonClick() {
    console.log(`Пользователь был нажат`);
  };


  return (
    <div style={{ height: '600px', overflowY: 'auto' }}>
      {users.map((user) => (
        <div key={user.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
          <button style={{ width: '100%'}}
          onClick={() => console.log(`${user.user} был нажат`)}>
            {`${user.user}`}
          </button>
        </div>
      ))}
      {!loading && !ableData && <p>Все данные загружены</p>}
    </div>
  );
};

export default UserListItem;