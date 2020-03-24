import React, { useEffect, useState } from 'react';
import api from './services/api';

import './Global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

export default function App() {

  const [devs, setDevs] = useState([]);

  const [infoMessage, setInfoMessage] = useState(null);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data.reverse());

    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    let userExist = false;
    if (response.data === null) {
      setInfoMessage({ status: 'error', message: 'Usuário não encontrado no Github!' });
    } else {
      await devs.map(dev => {
        if (dev._id === response.data._id) {
          userExist = true;
        }
        return null;
      });
      if (!userExist) {

        setDevs([response.data, ...devs]);
        setInfoMessage({ status: 'success', message: 'O usuário foi cadastrado!' });
      } else {
        setInfoMessage({ status: 'alert', message: 'Este usuário já existe!' });
      }
    }
    return infoMessage;
  };

  return (
    <div id='app'>
      <aside>
        <strong> Cadastrar </strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {
            devs.map(dev => (
              <DevItem key={dev._id} dev={dev} infoMessage={infoMessage} />
            ))
          }
        </ul>
      </main>
    </div >
  );
}
