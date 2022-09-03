import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AlertError } from '../components/alerts/AlertError';
import { AlertInfo } from '../components/alerts/AlertInfo';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { Breadcumb } from '../components/Breadcumb';
import { FormClients } from '../components/FormClients';
import { CircularIndeterminate } from '../components/LoaderCircular';

import { HTTP_RESPONSE } from '../utils/constants';
import { useAddNewClientMutation } from '../api/ApiSlice';
import { ReducerStore } from '../app/store';
import { TitlePage } from '../components/TitlePage';


export function CreateClient() {
  let navigate = useNavigate();

  const auth = useSelector((state: ReducerStore) => state.authenticated);
  const [addNewClient, { isLoading }] = useAddNewClientMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [segmentSelect, setSegmentSelect] = useState(null);
  const [alert, setAlert] = useState<JSX.Element>(<div></div>);

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
  }, [auth, navigate]);

  const clearStates = () => {
    setName('');
    setEmail('');
    setPhone('');
    setSegmentSelect(null);
    const buttonSelector = document.querySelector(
      '#root > div > div.container-main > div:nth-child(3) > div > div.modal-body > form > div:nth-child(7) > div > div > div > div > button',
    ) as HTMLElement;
    if (buttonSelector) buttonSelector.click();
  };

  const onSaveClient = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    if (!name || !phone) {
      setAlert(<AlertInfo title="Preencha os campos corretamente." />);
      return;
    }

    const segmentSelected = segmentSelect ? segmentSelect : null;

    try {
      await addNewClient({
        name: name.trim(),
        email: email.trim(),
        phone: phone,
        segment: segmentSelected,
      }).unwrap();
      clearStates();
      setAlert(<AlertSuccess title="Cliente adicionado com sucesso." />);
    } catch (err) {
      if (err.status === HTTP_RESPONSE.CONFLICT) {
        setAlert(<AlertInfo title="Esse cliente já existe." />);
        return;
      }
      setAlert(<AlertError title="Não foi possível processar a requisição." />);
    }
  };

  let loader = null;
  if (isLoading) {
    loader = <CircularIndeterminate />;
  } else {
    loader = null;
  }

  if (alert) {
    setTimeout(() => setAlert(<div></div>), 5000);
  }

  return (
    <div className="container-main">
      {loader}
      <Breadcumb
        page={[
          { link: '/client', name: 'Clientes' },
          { link: false, name: 'Novo Clientes' },
        ]}
      />

      <TitlePage title='Novo Cliente' />

      <div>
        <FormClients
          clearStates={clearStates}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          setSegmentSelect={setSegmentSelect}
          segmentSelect={segmentSelect ?? ''}
          onChangeClient={onSaveClient}
          alert={alert as JSX.Element}
        />
      </div>
    </div>
  );
}
