import '../css/main.css';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReducerStore } from '../app/store';
import { HTTP_RESPONSE, TIMEOUT } from '../utils/constants';
import { scheduleService } from '../services/scheduleService';
import { ScheduleCard } from '../components/ScheduleCard';
import { randomId } from '../utils/random';
import { useGetClientsQuery } from '../api/ApiSlice';

import { AlertError } from '../components/alerts/AlertError';
import { AlertInfo } from '../components/alerts/AlertInfo';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { Breadcumb } from '../components/Breadcumb';
import { CircularIndeterminate } from '../components/LoaderCircular';
import { ClearFields } from '../components/Buttons';
import { ComboBox } from '../components/ComboBox';
import { InputText } from '../components/input/InputText';
import { TopModal } from '../components/TopModal';
import { TitlePage } from '../components/TitlePage';
import { LabelForm } from '../components/labels/LabelForm';

export function Schedule() {
  let navigate = useNavigate();

  const auth = useSelector((state: ReducerStore) => state.authenticated);

  const { data: clients = [], isLoading: isLoadingGetClients } =
    useGetClientsQuery('');

  const [schedules, setSchedule] = useState<any>([]);
  const [id, setId] = useState<any>('');
  const [date, setDate] = useState<any>('');
  const [errorSchedule, setErrorSchedule] = useState<any>(null);
  const [errorClientSchedule, setErrorClientSchedule] = useState<any>(null);
  const [serverError, setServerError] = useState<any>(null);
  const [finalitySchedule, setFinalitySchedule] = useState<any>(null);
  const [deleted, setDeleted] = useState<any>(null);

  const [expiredSchedules, setExpiredSchedules] = useState<any>([]);

  const [clearSchedule, setClearSchedule] = useState<any>(null);
  const [scheduleFinish, setScheduleFinish] = useState<any>(null);

  const [clientSelected, setClientSelected] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
    Promise.all([
      scheduleService.getAllExpiredSchedules(auth.userId).then((result) => {
        if (!result.status) return;
        if (result.status === HTTP_RESPONSE.NOT_FOUND) return;
        if (isMounted) setExpiredSchedules(result.data);
      }),
    ]);
    return () => {
      isMounted = false;
    };
  }, [auth, navigate]);

  const clearStates = () => {
    setId('');
  };

  const getScheduleResponse = async (event?: React.BaseSyntheticEvent) => {
    if (event) event.preventDefault();

    if (!clientSelected && !date) {
      setErrorSchedule(true);
      return;
    }

    scheduleService.getAllExpiredSchedules(auth.userId).then((result) => {
      if (!result.status) return;
      if (result.status === HTTP_RESPONSE.NOT_FOUND) return;
      setExpiredSchedules(result.data);
    });

    let request = null;

    if ((clientSelected && date) || clientSelected) {
      request = await scheduleService.getScheduleByClient(
        auth.userId,
        clientSelected,
      );
    } else {
      request = await scheduleService.getClientsSchedule(auth.userId, date);
    }

    if (request.status === HTTP_RESPONSE.ERROR || !request.status) {
      setServerError(true);
      return;
    }

    if (request.status === HTTP_RESPONSE.NOT_FOUND) {
      setErrorSchedule(true);
      setSchedule([]);
      return;
    }

    setSchedule(request.data);
    setErrorSchedule(false);
  };

  const finishScheduleResponse = async (event: React.BaseSyntheticEvent, id: any) => {
    event.preventDefault();

    const scheduleFinish = schedules
      .map((item: any) => item)
      .filter((item: { id: any; }) => item.id === id);

    const expiredScheduleFinish = expiredSchedules
      .map((item: any) => item)
      .filter((item: { id: any; }) => item.id === id);

    scheduleFinish.push(...expiredScheduleFinish);

    const request = await scheduleService.finishClientSchedule(
      auth.userId,
      scheduleFinish[0].id,
    );

    if (!request.status || request.status === HTTP_RESPONSE.ERROR) {
      setServerError(true);
      return;
    }

    setScheduleFinish(true);
    await getScheduleResponse(event);
    scheduleService.getAllExpiredSchedules(auth.userId).then((result) => {
      if (!result.status) return;
      if (result.status === HTTP_RESPONSE.NOT_FOUND) return;
      setExpiredSchedules(result.data);
    });
  };

  const deleteClientScheduleResponse = async (event: React.BaseSyntheticEvent, id: string) => {
    event.preventDefault();
    const result = await scheduleService.deleteClientSchedule(auth.userId, id);

    if (HTTP_RESPONSE.SUCCESS.includes(result.status)) {
      setErrorClientSchedule(false);
      clearStates();
    }

    if (!result.status) {
      setErrorClientSchedule(true);
    }

    await getScheduleResponse(event);
    scheduleService.getAllExpiredSchedules(auth.userId).then((result) => {
      if (!result.status) return;
      if (result.status === HTTP_RESPONSE.NOT_FOUND) return;
      setExpiredSchedules(result.data);
    });
  };

  const clearFindSchedule = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    setSchedule([]);
    setClearSchedule(true);
  };

  const clearFilters = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    const dateLoad = document.getElementById('dateLoadSchedule') as HTMLInputElement;
    if (dateLoad) dateLoad.value = '';
    const clickButtonSelect = document.querySelector(
      '#root > div > div.container-main > div.card.p-3.mt-4.mb-4.shadow-sm.bg-white > form > div.form-row.mb-3 > div.col-sm-6 > div > div > div > div > button',
    ) as HTMLElement;
    if (clickButtonSelect) clickButtonSelect.click();

    setDate('');
    setClientSelected(null);
  };

  if (errorSchedule === false || errorSchedule) {
    setTimeout(() => setErrorSchedule(null), TIMEOUT.FIVE_SECCONDS);
  }

  if (errorClientSchedule === false || errorClientSchedule) {
    setTimeout(() => setErrorClientSchedule(null), TIMEOUT.FIVE_SECCONDS);
  }

  if (serverError) {
    setTimeout(() => setServerError(null), TIMEOUT.FIVE_SECCONDS);
  }

  if (deleted === false) {
    setTimeout(() => setDeleted(null), TIMEOUT.FIVE_SECCONDS);
  }

  if (clearSchedule) {
    setTimeout(() => setClearSchedule(null), TIMEOUT.FIVE_SECCONDS);
  }

  if (scheduleFinish) {
    setTimeout(() => setScheduleFinish(null), TIMEOUT.FIVE_SECCONDS);
  }

  if (finalitySchedule) {
    setSchedule([]);
    setFinalitySchedule(null);
    getScheduleResponse();
  }

  let content = null;
  if (isLoadingGetClients) {
    content = <CircularIndeterminate />;
  } else {
    content = null;
  }

  return (
    <div className="container-main">
      {content}
      <Breadcumb page={[{ link: false, name: 'Agenda' }]} />

      <TopModal
        id="finality-client-schedule"
        title="Horário finalizado com sucesso!"
        body="Você finalizou esse horário e ele já foi salvo nas suas vendas!"
      />

      <TopModal
        className="btn btn-danger"
        id="delete-client-schedule"
        title="Excluir horário?"
        body="Tem certeza que deseja excluir esse horário?"
        click={(e: React.BaseSyntheticEvent<object, any, any>) => deleteClientScheduleResponse(e, deleted)}
        button="Excluir"
      />

      <TopModal
        className="btn btn-primary"
        id="finalyt-schedule"
        title="Finalizar horário?"
        data_target="#finality-client-schedule"
        body="Tem certeza que deseja finalizar esse horário?"
        click={(e: React.BaseSyntheticEvent<object, any, any>) => finishScheduleResponse(e, id)}
        button="Finalizar"
      />

      <TitlePage title='Agenda' />

      <div className="card p-3 mt-4 mb-4 shadow-sm bg-white">
        <h4 className="border-bottom pb-2">Busca</h4>

        <form onSubmit={getScheduleResponse}>
          <div className="form-row mb-3">
            <div className="col mb-2">
              <LabelForm text='Selecionar data' />

              <InputText
                type="date"
                label=" "
                id="dateLoadSchedule"
                value={date}
                onChange={(e: { target: { value: any; }; }) => setDate(e.target.value)}
              />
            </div>

            <div className="col-sm-6">
              <LabelForm text='Selecionar cliente' />

              {clients !== null ? (
                <ComboBox
                  title="Clientes..."
                  options={clients.map((item: { name: any; }) => item.name)}
                  selectValue={(e: any, item: any) => {
                    if (!item) {
                      setClientSelected(item);
                      return;
                    }
                    setClientSelected(item);
                  }}
                />
              ) : (
                <ComboBox
                  title="Clientes..."
                  options={[]}
                  selectValue={(e: any, item: any) => {
                    if (!item) {
                      setClientSelected(item);
                      return;
                    }
                    setClientSelected(item);
                  }}
                />
              )}
            </div>
          </div>

          <div className="form-row mt-2 pt-3">
            <div className="col mb-2">
              <button
                type="button"
                className="col btn btn-outline-secondary"
                onClick={(e) => clearFilters(e)}
                key={randomId()}
              >
                Limpar campos
              </button>
            </div>
            <div className="col mb-2">
              <button
                type="submit"
                className="col btn btn-primary"
                key={randomId()}
              >
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>

      {errorSchedule === true ? (
        <AlertInfo title="Nenhum horário encontrado." />
      ) : null}
      {errorSchedule === false ? (
        <AlertSuccess title="Pesquisa atualizada." />
      ) : null}
      {serverError ? (
        <AlertError title="Nenhum horário foi retornado." />
      ) : null}
      {deleted === false ? (
        <AlertSuccess title="Horário excluído com sucesso." />
      ) : null}
      {clearSchedule === true ? (
        <AlertSuccess title="A pesquisa foi limpa." />
      ) : null}
      {scheduleFinish === true ? (
        <AlertSuccess title="Horário finalizado com sucesso." />
      ) : null}

      <h4 className="mb-3">Horários agendados</h4>

      {schedules.length > 0 && (
        <ClearFields title="Limpar Pesquisa" callback={clearFindSchedule} />
      )}

      {expiredSchedules
        ? expiredSchedules.map((item: any) => {
          return (
            <div key={randomId()}>
              <ScheduleCard
                item={item}
                setId={setId}
                setDeleted={setDeleted}
                expired={true}
              />
            </div>
          );
        })
        : null}

      <br />

      {schedules.length > 0 && (
        <div>
          {schedules
            .filter(
              (item: { id: any; }) =>
                !expiredSchedules.map((expire: { id: any; }) => expire.id).includes(item.id),
            )
            .map((item: any) => {
              return (
                <div key={randomId()}>
                  <ScheduleCard
                    item={item}
                    setId={setId}
                    setDeleted={setDeleted}
                    expired={false}
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
