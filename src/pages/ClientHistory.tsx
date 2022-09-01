import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcumb } from '../components/Breadcumb';
import { SelectPeriod } from '../components/SelectPeriod';
import { clientHistoryService } from '../services/clientHistoryService';
import { HTTP_RESPONSE } from '../utils/constants';
import { TableHistory } from '../components/TableHistory';
import { ClearFields } from '../components/Buttons';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { AlertError } from '../components/alerts/AlertError';
import { AlertInfo } from '../components/alerts/AlertInfo';
import { useSelector } from 'react-redux';
import { useGetClientsQuery } from '../api/ApiSlice';
import { CircularIndeterminate } from '../components/LoaderCircular';

export default function ClientHistory() {
  let navigate = useNavigate();

  const auth = useSelector((state) => state.authenticated);
  const { data: clients = [], isLoading: isLoadingGetClients } =
    useGetClientsQuery();

  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  const [errorHistory, setErrorHistory] = useState(null);
  const [clientHistory, setClientHistory] = useState([]);

  const [clientSelected, setClientSelected] = useState(null);

  const [clearSchedule, setClearSchedule] = useState(null);
  const [invalidParams, setInvalidParams] = useState(null);

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
  }, [auth.userId, auth.redirectLoginPageUri, navigate]);

  const getHistoryInPeriodResponse = async (event) => {
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
        date2,
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

    if (request.status === HTTP_RESPONSE.NOT_FOUND) {
      setErrorHistory(true);
      setClientHistory([]);
      return;
    }

    if (request.status === HTTP_RESPONSE.ERROR || !request.status) {
      setErrorHistory(true);
      return;
    }

    setClientHistory(request.data);
  };

  const clearFields = (event) => {
    event.preventDefault();
    setClientHistory([]);
    setClientSelected(null);
    setDate1(null);
    setDate2(null);
    setClearSchedule(true);
  };

  const clearFilters = (event) => {
    event.preventDefault();
    setClientSelected(null);
    setDate1(null);
    setDate2(null);
    document.getElementById('date1').value = '';
    document.getElementById('date2').value = '';
    const buttonSelector = document.querySelector(
      '#root > div > div.container-main > div.card.mb-4.p-3.shadow.bg-white.rounded > form > div.mb-4 > div > div > div > div > button',
    );
    if (buttonSelector) buttonSelector.click();
  };

  if (errorHistory) {
    setTimeout(() => setErrorHistory(null), 5000);
  }

  if (clearSchedule) {
    setTimeout(() => setClearSchedule(null), 5000);
  }

  if (invalidParams === true) {
    setTimeout(() => setInvalidParams(null), 5000);
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
      <Breadcumb page={[{ link: false, name: 'Histórico' }]} />
      <h3 className="title-page">Histórico</h3>

      <SelectPeriod
        getSalesInPeriodResponse={getHistoryInPeriodResponse}
        setDate1={setDate1}
        setDate2={setDate2}
        filterByClient={clients}
        setDataClient={(e, item) => setClientSelected(item)}
        clearFields={(e) => clearFilters(e)}
      />

      {errorHistory === true ? (
        <AlertInfo title="Nenhum histórico encontrado." />
      ) : null}
      {clearSchedule === true ? (
        <AlertSuccess title="A pesquisa foi limpa." />
      ) : null}
      {invalidParams && <AlertError title="Preencha os campos corretamente." />}

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
