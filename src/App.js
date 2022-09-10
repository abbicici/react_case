import './App.css';
import { useState, useEffect } from 'react';
import Getodo from './components/todos';


function App() {
  const [account, setAccount] = useState('');
  const [logged, setLogged] = useState(false);

  useEffect(() => { localStorage.setItem('account', JSON.stringify(account)) }, [account])

  const isLoggedin = () => {
    if (account === "arda") {
      setLogged(true);
    }
  }

  return (
    <div className="App">
      <div className='diskutu'>
        {logged ?
          <><p>Welcome {account}!</p>
            <Getodo />
          </> :
          <><p>nickname:arda</p><input placeholder='Nickname' onChange={(e) => setAccount(e.target.value)}></input>< br /> <button onClick={isLoggedin} >Log İn</button >

          </>
        }
      </div>
    </div>
  );
}

export default App;
