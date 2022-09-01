import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertError } from '../components/alerts/AlertError';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { ComeBack } from '../components/ComeBack';
import { ScheduleForm } from '../components/ScheduleForm';
import { scheduleService } from '../services/scheduleService';
import { HTTP_RESPONSE } from '../utils/constants';

export function EditScheduleForm() {
  let navigate = useNavigate();
  const { scheduleId } = useParams();
  const auth = useSelector((state) => state.authenticated);
  const schedule = useSelector((state) => state.schedule);

  const [pacote, setPacote] = useState(schedule.pacote);
  const [client, setClient] = useState(schedule.client);
  const [qtdTotalAtendimento, setQtdTotalAtendimento] = useState(
    schedule.qtdTotalAtendimento,
  );
  const [procedure, setProcedure] = useState(schedule.procedure);
  const [dateNewSchedule, setDateNewSchedule] = useState(schedule.date);
  const [time, setTime] = useState(schedule.time);
  const [price, setPrice] = useState(schedule.price);
  const [contact, setContact] = useState(schedule.phone);
  const [alert, setAlert] = useState(null);

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
    setPacote(null);
    setQtdTotalAtendimento(null);
    const buttonSelector = document.querySelector(
      '#root > div > div.container-main > div.card > div > div > form > div.mb-3 > div > div > div > div > div > button',
    );
    if (buttonSelector) buttonSelector.click();
  };

  const onChangeSchedule = async (event) => {
    event.preventDefault();

    const request = await scheduleService.updateClientSchedule(
      auth.userId,
      scheduleId,
      client,
      procedure,
      dateNewSchedule,
      time,
      price,
      contact,
      pacote,
      qtdTotalAtendimento,
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
    setTimeout(() => setAlert(null), 5000);
  }

  return (
    <div className="container-main">
      <ComeBack />

      <div className="card">
        <ScheduleForm
          setDataClient={(client) => setClient(client)}
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
          clearStates={(e) => clearStates()}
          edit={true}
          addNewClientSchedule={(e) => onChangeSchedule(e)}
          setPacoteFunc={(e, pacote) => setPacote(pacote)}
          pacote={pacote}
          setQtdTotalAtendimentoFuncion={(e, qtd) =>
            setQtdTotalAtendimento(qtd)
          }
          qtdTotalAtendimento={qtdTotalAtendimento}
          alert={alert}
        />
      </div>
    </div>
  );
}
