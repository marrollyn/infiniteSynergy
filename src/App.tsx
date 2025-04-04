import { useState, useEffect, use } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { db, writeFirstPartInDB, writeDataInDB } from './db';
import UserList from './UserList/UserList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, } from './slices/usersSlice';
import { AppDispatch } from './store/store';

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {

    async function initDB() {
      try {
        await writeFirstPartInDB();
        console.log('Первые данные пользователей записаны в базу данных');
      } catch (error) {
        throw new Error(`Ошибка при записи данных в базу: ${error}`);
      }
    
      try {
        dispatch(fetchUsers({ countToDisplay: 200, currentPage: 0 }));
      } catch (error) {
        throw new Error(`Ошибка при выполнении fetchUsers: ${error}`);
      }

      writeDataInDB();
    }
    
    initDB();

  }, [dispatch]);


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <UserList />
    </>
  )
}

export default App
