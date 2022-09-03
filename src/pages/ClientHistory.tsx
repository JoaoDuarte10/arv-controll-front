import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { clientHistoryService } from '../services/clientHistoryService';
import { ReducerStore } from '../app/store';
import { useGetClientsQuery } from '../api/ApiSlice';

import { HTTP_RESPONSE, TIMEOUT } from '../utils/constants';

import { AlertError } from '../components/alerts/AlertError';
import { AlertInfo } from '../components/alerts/AlertInfo';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { Breadcumb } from '../components/Breadcumb';
import { CircularIndeterminate } from '../components/LoaderCircular';
import { ClearFields } from '../components/Buttons';
import { SelectPeriod } from '../components/SelectPeriod';
import { TableHistory } from '../components/TableHistory';
import { TitlePage } from '../components/TitlePage';
import { IClientHistory } from '../api/types/ClientHistory';

export function ClientHistory() {
  let navigate = useNavigate();

  const auth = useSelector((state: ReducerStore) => state.authenticated);
  const { data: clients = [], isLoading: isLoadingGetClients } =
    useGetClientsQuery('');

  const [date1, setDate1] = useState<string>('');
  const [date2, setDate2] = useState<string>('');

  const [serverError, setServerError] = useState<boolean>(false);
  const [historyNotFound, setHistoryNotFound] = useState<boolean>(false);

  const [clientHistory, setClientHistory] = useState<IClientHistory[]>([]);
  const [clientSelected, setClientSelected] = useState<string>('');

  const [clearSchedule, setClearSchedule] = useState<boolean>(false);
  const [invalidParams, setInvalidParams] = useState<boolean>(false);

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
  }, [auth.userId, auth.redirectLoginPageUri, navigate]);

  const getHistoryInPeriodResponse = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if ((!clientSelected && !date1 && !date2) || (!date1 && date2)) {
      setInvalidParams(true);
      setClientHistory([]);
      return;
    }

    let request = null;

    if ((clientSelected && date1) || (clientSelected && date1 && date2)) {
      request = await clientHistoryService.getHistoryByAllFilters(
        auth.userId,
        clientSelected,
        date1,
        date2 as string,
      );
    } else if (clientSelected !== null) {
      request = await clientHistoryService.getHistoryByClient(
        auth.userId,
        clientSelected,
      );
    } else if (date1 && !date2) {
      request = await clientHistoryService.getHistoryByDate(auth.userId, date1);
    } else if (date1 && date2) {
      request = await clientHistoryService.getHistoryByPeriod(
        auth.userId,
        date1,
        date2,
      );
    }

    if (!request) return;

    if (request.status === HTTP_RESPONSE.NOT_FOUND) {
      setHistoryNotFound(true);
      setClientHistory([]);
      return;
    }

    if (request.status === HTTP_RESPONSE.ERROR || !request.status) {
      setServerError(true);
      return;
    }

    setClientHistory(request.data);
  };

  const clearFields = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setClientHistory([]);
    setClientSelected('');
    setDate1('');
    setDate2('');
    setClearSchedule(true);
  };

  const clearFilters = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setClientSelected('');
    clearDates();
    const buttonSelector = document.querySelector(
      '#root > div > div.container-main > div.card.mb-4.p-3.shadow.bg-white.rounded > form > div.mb-4 > div > div > div > div > button',
    ) as HTMLElement;
    if (buttonSelector) buttonSelector.click();
  };

  const clearDates = () => {
    const date1Element = document.getElementById('date1') as HTMLInputElement | null;
    const date2Element = document.getElementById('date2') as HTMLInputElement | null;
    if (date1Element) date1Element.value = '';
    if (date2Element) date2Element.value = '';
    setDate1('');
    setDate2('');
  }

  if (historyNotFound) {
    setTimeout(() => setHistoryNotFound(false), TIMEOUT.FIVE_SECCONDS);
  }

  if (serverError) {
    setTimeout(() => setServerError(false), TIMEOUT.FIVE_SECCONDS);
  }

  if (clearSchedule) {
    setTimeout(() => setClearSchedule(false), TIMEOUT.FIVE_SECCONDS);
  }

  if (invalidParams === true) {
    setTimeout(() => setInvalidParams(false), TIMEOUT.FIVE_SECCONDS);
  }

  let loader = null;
  if (isLoadingGetClients) {
    loader = <CircularIndeterminate />;
  } else {
    loader = null;
  }

  return (
    <div className="container-main">
      {loader}
      <Breadcumb page={[{ link: false, name: 'Histórico' }]} />
      <TitlePage title='Histórico'/>

      <SelectPeriod
        getSalesInPeriodResponse={getHistoryInPeriodResponse}
        setDate1={setDate1}
        setDate2={setDate2}
        filterByClient={clients}
        setDataClient={(e: React.BaseSyntheticEvent, item: string) => setClientSelected(item)}
        clearFields={(e: React.BaseSyntheticEvent) => clearFilters(e)}
      />

      {historyNotFound === true ? (
        <AlertInfo title="Nenhum histórico encontrado." />
      ) : null}
      {serverError === true ? (
        <AlertError title="Não foi possível processar a requisição." />
      ) : null}
      {clearSchedule === true ? (
        <AlertSuccess title="A pesquisa foi limpa." />
      ) : null}
      {invalidParams === true && <AlertError title="Preencha os campos corretamente." />}

      {clientHistory.length > 0 ? (
        <div>
          <div className="d-inline">
            <strong>Período: </strong>
            {(date1 || date2) && (
              <div className="d-inline">
                {date1 &&
                  new Date(date1).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                  })}
                {date2 &&
                  ' - ' +
                  new Date(date2).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                  })}
              </div>
            )}
          </div>

          <ClearFields title="Limpar Pesquisa" callback={clearFields} />

          <TableHistory clientHistory={clientHistory} />

          <div className="inline mt-4">
            <p>
              <strong>Quantidade de atendimentos:</strong>{' '}
              {clientHistory.length > 0 ? clientHistory.length : null}
            </p>
          </div>
        </div>
      ) : (
        <h4>Faça uma busca</h4>
      )}
    </div>
  );
}
