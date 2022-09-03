import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { scheduleService } from '../services/scheduleService';
import { HTTP_RESPONSE, TIMEOUT } from '../utils/constants';
import { ReducerStore } from '../app/store';

import { AlertError } from '../components/alerts/AlertError';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { ComeBack } from '../components/ComeBack';
import { ScheduleForm } from '../components/ScheduleForm';

export function EditScheduleForm() {
  let navigate = useNavigate();
  const { scheduleId } = useParams();
  const auth = useSelector((state: ReducerStore) => state.authenticated);
  const schedule = useSelector((state: ReducerStore) => state.schedule);

  const [pacote, setPacote] = useState<boolean>(schedule.pacote);
  const [client, setClient] = useState<string>(schedule.client);
  const [qtdTotalAtendimento, setQtdTotalAtendimento] = useState<number | null>(
    schedule.qtdTotalAtendimento,
  );
  const [procedure, setProcedure] = useState<string>(schedule.procedure);
  const [dateNewSchedule, setDateNewSchedule] = useState<string>(schedule.date);
  const [time, setTime] = useState<string>(schedule.time);
  const [price, setPrice] = useState<string>(schedule.price);
  const [contact, setContact] = useState<string>(schedule.phone);
  const [alert, setAlert] = useState<JSX.Element>(<div></div>);

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
    if (!schedule.id) {
      navigate(-1);
    }
  }, [auth, navigate, schedule.id]);

  const clearStates = () => {
    setClient('');
    setProcedure('');
    setDateNewSchedule('');
    setTime('');
    setPrice('');
    setContact('');
    setPacote(false);
    setQtdTotalAtendimento(null);
    const buttonSelector = document.querySelector(
      '#root > div > div.container-main > div.card > div > div > form > div.mb-3 > div > div > div > div > div > button',
    ) as HTMLElement;
    if (buttonSelector) buttonSelector.click();
  };

  const onChangeSchedule = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    const request = await scheduleService.updateClientSchedule(
      auth.userId,
      scheduleId as string,
      client,
      procedure,
      dateNewSchedule,
      time,
      price,
      contact,
      pacote as boolean,
      qtdTotalAtendimento as number,
      schedule.qtdAtendimento,
    );

    if (HTTP_RESPONSE.SUCCESS.includes(request.status)) {
      setAlert(<AlertSuccess title="Horário atualizado com sucesso." />);
      setTimeout(() => navigate(-1), 1000);
    }

    if (
      request.status === HTTP_RESPONSE.BAD_REQUEST ||
      request.status === HTTP_RESPONSE.ERROR ||
      !request.status
    ) {
      setAlert(<AlertError title="Erro ao atualizar o horário" />);
    }
  };

  if (alert) {
    setTimeout(() => setAlert(<div></div>), TIMEOUT.FIVE_SECCONDS);
  }

  return (
    <div className="container-main">
      <ComeBack />

      <div className="card">
        <ScheduleForm
          setDataClient={(client: string) => setClient(client)}
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
          edit={true}
          addNewClientSchedule={(e: React.BaseSyntheticEvent) => onChangeSchedule(e)}
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
