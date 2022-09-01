import { AlertError } from '../components/alerts/AlertError';
import { AlertInfo } from '../components/alerts/AlertInfo';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { Breadcumb } from '../components/Breadcumb';
import { FormClients } from '../components/FormClients';
import { CircularIndeterminate } from '../components/LoaderCircular';

import { HTTP_RESPONSE } from '../utils/constants';
import { useAddNewClientMutation } from '../api/ApiSlice';

import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function CreateClient() {
  let navigate = useNavigate();

  const auth = useSelector((state) => state.authenticated);
  const [addNewClient, { isLoading }] = useAddNewClientMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [segmentSelect, setSegmentSelect] = useState(null);
  const [alert, setAlert] = useState(null);

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
    );
    if (buttonSelector) buttonSelector.click();
  };

  const onSaveClient = async (event) => {
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
    setTimeout(() => setAlert(null), 5000);
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

      <h3 className="title-page">Novo Cliente</h3>

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
          segmentSelect={segmentSelect}
          onChangeClient={onSaveClient}
          alert={alert}
        />
      </div>
    </div>
  );
}
