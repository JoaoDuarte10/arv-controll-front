import { AlertError } from '../components/alerts/AlertError';
import { AlertInfo } from '../components/alerts/AlertInfo';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { Breadcumb } from '../components/Breadcumb';
import { CircularIndeterminate } from '../components/LoaderCircular';
import { ScheduleForm } from '../components/ScheduleForm';

import { useAddNewScheduleMutation, useGetClientsQuery } from '../api/ApiSlice';
import { HTTP_RESPONSE, TIMEOUT } from '../utils/constants';
import { ReducerStore } from '../app/store';
import { TitlePage } from '../components/TitlePage';

import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function CreateSchedule() {
  let navigate = useNavigate();

  const auth = useSelector((state: ReducerStore) => state.authenticated);
  const { data: clients = [], isLoading: isLoadingGetClients } =
    useGetClientsQuery('');

  const [addNewSchedule, { isLoading: isLoadingNewSchedule }] =
    useAddNewScheduleMutation();

  const [client, setClient] = useState('');
  const [pacote, setPacote] = useState<boolean | null>(null);
  const [qtdTotalAtendimento, setQtdTotalAtendimento] = useState<number | null>(null);
  const [procedure, setProcedure] = useState('');
  const [dateNewSchedule, setDateNewSchedule] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');
  const [alert, setAlert] = useState<JSX.Element>(<div></div>);

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
  }, [auth, navigate]);

  const setDataClient = (params: any) => {
    if (!params) {
      setClient('');
      setContact('');
      return;
    }

    if (params.label && params.phone) {
      setClient(params.label);
      setContact(params.phone);
      return;
    }

    setClient(params);
  };

  const clearStates = () => {
    setClient('');
    setProcedure('');
    setDateNewSchedule('');
    setTime('');
    setPrice('');
    setContact('');
    setPacote(null);
    setQtdTotalAtendimento(null);
    const buttonSelector = document.querySelector(
      '#root > div > div.container-main > div.card > div > div > form > div.mb-3 > div > div > div > div > div > button',
    ) as HTMLElement;
    if (buttonSelector) buttonSelector.click();
  };

  const addNewClientSchedule = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    try {
      await addNewSchedule({
        client: client,
        procedure: procedure,
        date: dateNewSchedule,
        time: time,
        price: price,
        contact: contact,
        pacote: pacote,
        qtdTotalAtendimento: qtdTotalAtendimento,
      }).unwrap();
      clearStates();
      setAlert(<AlertSuccess title="Horário adicionado com sucesso." />);
    } catch (err) {
      if (err.status === HTTP_RESPONSE.CONFLICT) {
        setAlert(<AlertInfo title="Esse horário já existe." />);
        return;
      }
      if (err.status === HTTP_RESPONSE.BAD_REQUEST) {
        setAlert(<AlertInfo title="Preencha os campos corretamente." />);
        return;
      }
      setAlert(<AlertError title="Não foi possível processar a requisição." />);
    }
  };

  let content = null;
  if (isLoadingGetClients || isLoadingNewSchedule) {
    content = <CircularIndeterminate />;
  } else {
    content = null;
  }

  if (alert) {
    setTimeout(() => setAlert(<div></div>), TIMEOUT.FIVE_SECCONDS);
  }

  return (
    <div className="container-main">
      {content}
      <Breadcumb
        page={[
          { link: '/schedule', name: 'Agenda' },
          { link: false, name: 'Nova Agenda' },
        ]}
      />
      <TitlePage title='Nova Agenda'/>

      <div className="card">
        <ScheduleForm
          clientSaves={clients}
          setDataClient={(e: React.BaseSyntheticEvent, item: any) => setDataClient(item)}
          client={client}
          setClient={setClient}
          procedure={procedure}
          setProcedure={setProcedure}
          dateNewSchedule={dateNewSchedule}
          setDateNewSchedule={setDateNewSchedule}
          time={time}
          setTime={setTime}
          price={price}
          setPrice={setPrice}
          contact={contact}
          setContact={setContact}
          clearStates={(e: React.BaseSyntheticEvent) => clearStates()}
          edit={false}
          addNewClientSchedule={(e: React.BaseSyntheticEvent) => addNewClientSchedule(e)}
          setPacoteFunc={(e: React.BaseSyntheticEvent, pacote: boolean) => setPacote(pacote)}
          pacote={pacote}
          setQtdTotalAtendimentoFuncion={(e: React.BaseSyntheticEvent, qtd: number) =>
            setQtdTotalAtendimento(qtd)
          }
          qtdTotalAtendimento={qtdTotalAtendimento}
          alert={alert}
        />
      </div>
    </div>
  );
}
