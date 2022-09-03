import '../css/main.css';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { salesService } from '../services/salesService';
import { HTTP_RESPONSE } from '../utils/constants';
import { useGetClientsQuery } from '../api/ApiSlice';
import { ReducerStore } from '../app/store';
import { ISales } from '../api/types/Sales';

import { AlertError } from '../components/alerts/AlertError';
import { AlertInfo } from '../components/alerts/AlertInfo';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { Breadcumb } from '../components/Breadcumb';
import { CircularIndeterminate } from '../components/LoaderCircular';
import { ClearFields } from '../components/Buttons';
import { TableSales } from '../components/TableSales';
import { TitlePage } from '../components/TitlePage';
import { SelectPeriod } from '../components/SelectPeriod';

export function Sales() {
  let navigate = useNavigate();

  const auth = useSelector((state: ReducerStore) => state.authenticated);
  const { data: clients = [], isLoading: isLoadingGetClients } =
    useGetClientsQuery('');

  const [date1, setDate1] = useState<string | null>('');
  const [date2, setDate2] = useState<string | null>('');
  const [sales, setSales] = useState<ISales[]>([]);
  const [errorSales, setErrorSales] = useState<boolean | null>(null);
  const [serverError, setServerError] = useState<boolean | null>(null);
  const [salesTodayNotFound, setSalesTodayNotFound] = useState<boolean | null>(null);
  const [clearFields, setClearFields] = useState<boolean | null>(null);

  const [clientSelected, setClientSelected] = useState<string | null>(null);
  const [invalidParams, setInvalidParams] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
    Promise.all([getSalesTodayResponse()]);

    async function getSalesTodayResponse() {
      const request = await salesService.getSalesToday(auth.userId);

      if (HTTP_RESPONSE.SUCCESS.includes(request.status) && isMounted) {
        setSales(request.data);
      }

      if (request.status === HTTP_RESPONSE.NOT_FOUND && isMounted) {
        setSalesTodayNotFound(true);
      }

      if (request.status === HTTP_RESPONSE.ERROR || !request.status) {
        if (isMounted) setServerError(true);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [auth, navigate]);

  const getSalesInPeriodResponse = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    if ((!clientSelected && !date1 && !date2) || (!date1 && date2)) {
      setInvalidParams(true);
      setSales([]);
      return;
    }

    let request = null;

    if ((clientSelected && date1) || (clientSelected && date1 && date2)) {
      request = await salesService.getSalesByAllFilters(
        auth.userId,
        clientSelected,
        date1,
        date2,
      );
    } else if (clientSelected) {
      request = await salesService.getSalesByClients(
        auth.userId,
        clientSelected,
      );
    } else {
      request = await salesService.getSalesInPeriod(auth.userId, date1 as string, date2 as string);
    }

    if (date1 === '' || !date1) {
      setErrorSales(true);
    }

    if (request.status === HTTP_RESPONSE.NOT_FOUND) {
      setErrorSales(true);
      setSales([]);
      return;
    }

    if (request.status === HTTP_RESPONSE.ERROR || !request.status) {
      setServerError(true);
      return;
    }

    setSales(request.data);
    setErrorSales(false);
  };

  const clearSales = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    setSales([]);
    clearDates();
    setClearFields(true);
    setClientSelected(null);
  };

  const clearDates = () => {
    const date1Element = document.getElementById('date1') as HTMLInputElement | null;
    const date2Element = document.getElementById('date2') as HTMLInputElement | null;
    if (date1Element) date1Element.value = '';
    if (date2Element) date2Element.value = '';
    setDate1('');
    setDate2('');
  }

  const clearFilters = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setClientSelected(null);
    clearDates();
    const buttonSelector = document.querySelector(
      '#root > div > div.container-main > div.card.mb-4.p-3.shadow.bg-white.rounded > form > div.mb-4 > div > div > div > div > button',
    ) as HTMLElement | null;;
    if (buttonSelector) buttonSelector.click();

  };

  if (errorSales === false || errorSales === true) {
    setTimeout(() => setErrorSales(null), 5000);
  }

  if (serverError === false || serverError === true) {
    setTimeout(() => setServerError(null), 5000);
  }

  if (salesTodayNotFound) {
    setTimeout(() => setSalesTodayNotFound(null), 5000);
  }

  if (clearFields) {
    setTimeout(() => setClearFields(null), 5000);
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
      <Breadcumb page={[{ link: false, name: 'Suas Vendas' }]} />

      <TitlePage title='Suas Vendas' />

      <SelectPeriod
        getSalesInPeriodResponse={getSalesInPeriodResponse}
        setDate1={setDate1}
        setDate2={setDate2}
        filterByClient={clients}
        setDataClient={(e: React.BaseSyntheticEvent, item: string) => setClientSelected(item)}
        clearFields={(e: React.BaseSyntheticEvent) => clearFilters(e)}
      />

      {errorSales === true ? (
        <AlertInfo title="Nenhuma venda encontrada." />
      ) : null}
      {errorSales === false ? (
        <AlertSuccess title="Período atualizado." />
      ) : null}
      {serverError === true ? (
        <AlertError title="Não foi possível processar a requisição." />
      ) : null}
      {salesTodayNotFound === true ? (
        <AlertInfo title="Nenhuma venda encontrada hoje." />
      ) : null}
      {clearFields === true ? (
        <AlertSuccess title="A pesquisa foi limpa." />
      ) : null}
      {invalidParams && <AlertError title="Preencha os campos corretamente." />}

      {sales.length > 0 ? (
        <div>
          {(date1 || date2) && (
            <div className="d-inline">
              <strong>Período: </strong>
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
            </div>
          )}

          {clientSelected && (
            <div className="d-inline">
              <strong>Cliente: </strong>
              <div className="d-inline">
                {clientSelected}
              </div>
            </div>
          )}

          <ClearFields title="Limpar Pesquisa" callback={clearSales} />

          <TableSales sales={sales} />

          <div className="inline">
            <p>
              <strong>Quantidade de vendas:</strong>{' '}
              {sales.length > 0 ? sales.length : null}
            </p>
          </div>
          <div className="total-sale">
            <h4>Total:</h4>
            <h4>
              {sales.length > 0
                ? salesService.countTotalValueSales(sales)
                : null}
            </h4>
          </div>
        </div>
      ) : (
        <h4>Faça uma busca.</h4>
      )}
    </div>
  );
}
