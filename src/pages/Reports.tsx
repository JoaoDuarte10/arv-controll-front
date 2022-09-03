import { clientService } from '../services/clientService';
import { salesService } from '../services/salesService';

import { CardSales } from '../components/CardSales';
import { TableSales } from '../components/TableSales';
import { ClearFields } from '../components/Buttons';

import { HTTP_RESPONSE } from '../utils/constants';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AlertError } from '../components/alerts/AlertError';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { Breadcumb } from '../components/Breadcumb';
import { ComboBox } from '../components/ComboBox';
import { useSelector } from 'react-redux';
import { TitlePage } from '../components/TitlePage';

function Reports() {
  const auth = useSelector((state) => state.authenticated);
  let navigate = useNavigate();

  const [clientSaves, setClientSaves] = useState([]);
  const [salesForClient, setSalesForClient] = useState([]);
  const [segment, setSegment] = useState('');
  const [emptySale, setEmptySale] = useState(null);
  const [serverError, setServerError] = useState(false);
  const [salesLastWeek, setSalesLastWeek] = useState([]);
  const [salesActualtWeek, setSalesActualWeek] = useState([]);
  const [salesLastMonth, setSalesLastMonth] = useState([]);
  const [salesActualMonth, setSalesActualMonth] = useState([]);
  const [clearTableSalesForClient, setClearTableSalesForClient] =
    useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
    Promise.all([getClients(), getSalesWeek(), getSaleMonth()]);

    async function getClients() {
      const request = await clientService.findAllClient(auth.userId);

      if (!request.status) return;

      if (request.status === HTTP_RESPONSE.ERROR) {
        return;
      }

      if (isMounted) setClientSaves(request.data);
    }

    async function getSalesWeek() {
      const primaryDateLastWeek = moment()
        .subtract(7, 'day')
        .day(0)
        .format('YYYY-MM-DD');
      const lastDateLastWeek = moment()
        .subtract(7, 'day')
        .day(6)
        .format('YYYY-MM-DD');

      const primaryDateWeek = moment().day(0).format('YYYY-MM-DD');
      const lastDateWeek = moment().day(6).format('YYYY-MM-DD');

      const getSalesLastWeek = await salesService.getSalesInPeriod(
        auth.userId,
        primaryDateLastWeek,
        lastDateLastWeek,
      );
      const getSalesActualWeek = await salesService.getSalesInPeriod(
        auth.userId,
        primaryDateWeek,
        lastDateWeek,
      );

      if (!getSalesLastWeek.status || !getSalesActualWeek.status) return;

      if (
        getSalesLastWeek === HTTP_RESPONSE.NOT_FOUND ||
        getSalesLastWeek === HTTP_RESPONSE.ERROR
      ) {
        if (isMounted) setSalesLastWeek([]);
      }

      if (
        getSalesActualWeek === HTTP_RESPONSE.NOT_FOUND ||
        getSalesActualWeek === HTTP_RESPONSE.ERROR
      ) {
        if (isMounted) setSalesActualWeek([]);
      }

      if (isMounted) setSalesLastWeek(getSalesLastWeek.data);
      if (isMounted) setSalesActualWeek(getSalesActualWeek.data);
    }

    async function getSaleMonth() {
      const dateStartLastMonth = moment()
        .subtract(1, 'month')
        .startOf('month')
        .format('YYYY-MM-DD');
      const dateEndLastMonth = moment()
        .subtract(1, 'month')
        .endOf('month')
        .format('YYYY-MM-DD');

      const dateStartActualMonth = moment()
        .startOf('month')
        .format('YYYY-MM-DD');
      const dateEndActualMonth = moment().endOf('month').format('YYYY-MM-DD');

      const getSalesLastMonth = await salesService.getSalesInPeriod(
        auth.userId,
        dateStartLastMonth,
        dateEndLastMonth,
      );
      const getSalesActualMonth = await salesService.getSalesInPeriod(
        auth.userId,
        dateStartActualMonth,
        dateEndActualMonth,
      );

      if (!getSalesLastMonth.status || !getSalesActualMonth.status) return;

      if (
        getSalesLastMonth.status === HTTP_RESPONSE.NOT_FOUND ||
        getSalesLastMonth.status === HTTP_RESPONSE.ERROR
      ) {
        if (isMounted) setSalesLastMonth([]);
      }

      if (
        getSalesActualMonth.status === HTTP_RESPONSE.NOT_FOUND ||
        getSalesActualMonth.status === HTTP_RESPONSE.ERROR
      ) {
        if (isMounted) setSalesActualMonth([]);
      }

      if (isMounted) setSalesLastMonth(getSalesLastMonth.data);
      if (isMounted) setSalesActualMonth(getSalesActualMonth.data);
    }

    return () => {
      isMounted = false;
    };
  }, [auth.userId, auth, navigate]);

  const reportClientInfo = async (event: React.BaseSyntheticEvent, params) => {
    event.preventDefault();

    if (!params) return;

    const request = await salesService.getSalesByClients(
      auth.userId,
      params.label.trim(),
    );

    if (request.status === HTTP_RESPONSE.NOT_FOUND) {
      setEmptySale(true);
      setSalesForClient([]);
      return;
    }

    if (request.status === HTTP_RESPONSE.ERROR) {
      setServerError(true);
      setSalesForClient([]);
      return;
    }

    setSegment('');
    if (params.segment) {
      setSegment(params.segment);
    }

    setSalesForClient(request.data);
  };

  const clearSalesForClient = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setSalesForClient([]);
    setClearTableSalesForClient(true);
  };

  if (emptySale) {
    setTimeout(() => setEmptySale(false), 5000);
  }

  if (serverError) {
    setTimeout(() => serverError(false), 5000);
  }

  if (clearTableSalesForClient) {
    setTimeout(() => setClearTableSalesForClient(null), 5000);
  }

  return (
    <div className="container-main">
      <Breadcumb
        page={[
          { link: false, name: 'Vendas' },
          { link: false, name: 'Relatórios' },
        ]}
      />

      <TitlePage title='Relatórios'/>

      <div className="mb-3 pb-2">
        <div className="card p-2 shadow-sm bg-white rounded">
          <h6 className=" card-header p-3 text-primary font-weight-bold">
            Visualizar vendas por cliente
          </h6>
          <div className="mt-3">
            {clientSaves !== null && clientSaves.length > 0 ? (
              <ComboBox
                title="Selecionar Cliente"
                options={clientSaves.map((item) => ({
                  label: item.name,
                  segment: item.segment,
                }))}
                selectValue={(e, item) => reportClientInfo(e, item)}
              />
            ) : (
              <ComboBox
                title="Selecionar Cliente"
                options={[]}
                selectValue={(e, item) => reportClientInfo(e, item)}
              />
            )}
            <small className="text-muted">
              Selecionar um cliente que você tem salvo
            </small>
          </div>
        </div>

        {salesForClient.length > 0 ? (
          <div className="pt-2">
            <ClearFields
              title="Limpar Pesquisa"
              callback={clearSalesForClient}
            />

            <TableSales sales={salesForClient} />

            <div className="card p-2 mt-3">
              <div className="card-header">
                <h6 className="font-weight-bold pt-2">Dados do cliente</h6>
              </div>
              <div className="card-body border mt-2">
                <h6 className="card-subtitle text-primary pt-2 font-weight-bold pb-3 border-bottom">
                  Primeira venda:{' '}
                  <small className="text-muted h6 mb-3">
                    {new Date(
                      salesForClient
                        .map((item) => item.date)
                        .sort((a, b) => parseInt(b) - parseInt(a))[0],
                    ).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                  </small>
                </h6>
                <h6 className="card-subtitle text-primary font-weight-bold pt-2 pb-3 mt-3 border-bottom">
                  Última venda:{' '}
                  <small className="text-muted h6 mb-3">
                    {new Date(
                      salesForClient
                        .map((item) => item.date)
                        .sort((a, b) => parseInt(a[1]) - parseInt(b))[0],
                    ).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                  </small>
                </h6>
                <h6 className="card-subtitle text-primary font-weight-bold pt-2 pb-3 mt-3 border-bottom">
                  Gasto total:{' '}
                  <small className="text-muted h6 mb-3">
                    {salesForClient
                      .filter((item) => !!item)
                      .map(
                        (item) =>
                          parseInt(
                            item.price.substring(2).replace(/\.|,/g, ''),
                          ) / 100,
                      )
                      .reduce((acc, item) => acc + item, 0)
                      .toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                  </small>
                </h6>
                <h6 className="card-subtitle text-primary font-weight-bold pt-2 pb-3 mt-3 border-bottom">
                  Gasto médio:{' '}
                  <small className="text-muted h6 mb-3">
                    {Math.round(
                      salesForClient
                        .filter((item) => !!item)
                        .map(
                          (item) =>
                            parseInt(
                              item.price.substring(2).replace(/\.|,/g, ''),
                            ) / 100,
                        )
                        .reduce((acc, item) => acc + item, 0) /
                        salesForClient.length,
                    ).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </small>
                </h6>
                <h6 className="card-subtitle text-primary font-weight-bold pt-2 pb-3 mt-3 border-bottom">
                  Maior venda:{' '}
                  <small className="text-muted h6 mb-3">
                    {salesForClient
                      .filter((item) => !!item)
                      .map(
                        (item) =>
                          parseInt(
                            item.price.substring(2).replace(/\.|,/g, ''),
                          ) / 100,
                      )
                      .sort((a, b) => b - a)[0]
                      .toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                  </small>
                </h6>
                <h6 className="card-subtitle text-primary font-weight-bold pt-2 pb-3 mt-3 border-bottom">
                  Menor venda:{' '}
                  <small className="text-muted h6 mb-3">
                    {salesForClient
                      .filter((item) => !!item)
                      .map(
                        (item) =>
                          parseInt(
                            item.price.substring(2).replace(/\.|,/g, ''),
                          ) / 100,
                      )
                      .sort((a, b) => a - b)[0]
                      .toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                  </small>
                </h6>
                <h6 className="card-subtitle text-primary font-weight-bold pt-2 pb-3 mt-3 border-bottom">
                  Qtd de vendas:{' '}
                  <small className="text-muted h6 mb-3">
                    {salesForClient.length}
                  </small>
                </h6>
                <h6 className="card-subtitle text-primary font-weight-bold pt-2 mt-3 ">
                  Já fez pacote:{' '}
                  <small className="text-muted h6 mb-3">
                    {salesForClient.filter((item) => item.price === 'R$80,00')
                      .length > 0
                      ? 'Sim'
                      : 'Não'}
                  </small>
                </h6>
                {segment ? (
                  <h6 className="card-subtitle text-primary font-weight-bold pt-3 mt-3 border-top">
                    Segmento:{' '}
                    <small className="text-muted h6 mb-3">{segment}</small>
                  </h6>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {emptySale === true && (
          <AlertError title="Nenhuma venda encontrada com esse cliente." />
        )}
        {serverError === true && (
          <AlertError title="Erro ao processar a requisição." />
        )}
        {clearTableSalesForClient === true && (
          <AlertSuccess title="A pesquisa foi limpa." />
        )}
      </div>
      <div className="accordion mb-3" id="accordionWeek">
        <div className="card border p-2">
          <HeaderModal title="Relatório Semanal" idCollapse="collapseOne" />
          <div
            className="card-body p-2 collapse"
            id="collapseOne"
            aria-labelledby="headingOne"
            data-parent="#accordionWeek"
          >
            {salesLastWeek.length > 0 ? (
              <CardSales
                sales={salesLastWeek}
                title="Vendas da última semana"
              />
            ) : null}
            {salesActualtWeek.length > 0 ? (
              <CardSales sales={salesActualtWeek} title="Vendas dessa semana" />
            ) : null}
          </div>
        </div>
      </div>
      <div className="accordion" id="accordionMonth">
        <div className="card border p-2">
          <HeaderModal title="Relatório Mensal" idCollapse="collapseTwo" />
          {/* <div
            className="card-header mb-2"
            id="headingOne"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <h6 className="pt-2 text-primary font-weight-bold">
              Relatório Mensal
            </h6>
          </div> */}
          <div
            className="card-body p-2 collapse"
            id="collapseTwo"
            aria-labelledby="headingOne"
            data-parent="#accordionMonth"
          >
            {salesLastMonth.length > 0 ? (
              <CardSales sales={salesLastMonth} title="Vendas do último mês" />
            ) : null}
            {salesActualMonth.length > 0 ? (
              <CardSales sales={salesActualMonth} title="Vendas desse mês" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderModal(props) {
  const { title, idCollapse } = props;
  return (
    <div className="card-header">
      <div
        className="form-row"
        id="headingOne"
        data-toggle="collapse"
        data-target={`#${idCollapse}`}
        aria-expanded="true"
        aria-controls={idCollapse}
      >
        <h6 className="pt-2 text-primary font-weight-bold col">{title}</h6>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#0d6efd"
          className="bi bi-arrows-angle-expand col-end"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"
          />
        </svg>
      </div>
    </div>
  );
}

export { Reports };
