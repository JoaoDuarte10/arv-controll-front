import '../css/main.css';

import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { AlertInfo } from '../components/alerts/AlertInfo';
import { AlertError } from '../components/alerts/AlertError';
import { Breadcumb } from '../components/Breadcumb';
import { CardClients } from '../components/CardClient';
import { CircularIndeterminate } from '../components/LoaderCircular';
import { TitlePage } from '../components/TitlePage';
import { TopModal } from '../components/TopModal';

import { useDeleteClientMutation, useGetClientsQuery, useGetSegmentsQuery } from '../api/ApiSlice';
import { HTTP_RESPONSE, TIMEOUT } from '../utils/constants';
import { ReducerStore } from '../app/store';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ComboBox } from '../components/ComboBox';
import { IClient } from '../api/types/Client';
import { ISegment } from '../api/types/Segment';

export function Clients() {
  let navigate = useNavigate();

  const auth = useSelector((state: ReducerStore) => state.authenticated);

  const {
    data: clients = [],
    isLoading,
    isSuccess,
    error: errorFetchClients = {} as any,
  } = useGetClientsQuery('');

  const { data: segments = [] } = useGetSegmentsQuery('');

  const [
    deleteClient,
    { isLoading: isLoadingDelete },
  ] = useDeleteClientMutation();

  const [id, setId] = useState<string | null>(null);
  const [loaderClients, setLoaderClients] = useState<JSX.Element | null>();
  const [clientView, setClientView] = useState<IClient[]>([]);
  const [deletedClientSuccess, setDeletedClientSuccess] = useState<boolean>(false);

  const [filterClientById, setFilterClientById] = useState<string>('');
  const [filterClientBySegment, setFilterClientBySegment] = useState<string>('');

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
    if (clients.length > 0) setClientView(clients);
  }, [auth, navigate, clients]);

  let loader;

  if (isLoading || isLoadingDelete) {
    loader = <CircularIndeterminate />;
  } else if (isSuccess) {
    loader = null;
  }

  const onDeleteClient = async (event: React.BaseSyntheticEvent, id: string) => {
    event.preventDefault();

    try {
      await deleteClient(id).unwrap();
      setDeletedClientSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const filterClientSelectedById = (event: React.BaseSyntheticEvent, id: string) => {
    event.preventDefault();

    if (id) {
      const clientsById = clients.filter((client: IClient) => client.id === id);
      setClientView(clientsById);
      return;
    }
  }

  const filterClientSelectedBySegment = (event: React.BaseSyntheticEvent, segment: string) => {
    event.preventDefault();

    if (segment) {
      const clientsBySegment = clients.filter((client: IClient) => client.segment === segment);
      setClientView(clientsBySegment);
      return;
    }
  }

  const clearFilters = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    const inputFilterName = document.querySelector(`
      #root > div > div.container-main > div.form-row.mb-4 > div:nth-child(1) > div > div > div > div > div > button
    `) as HTMLElement;

    if (inputFilterName) inputFilterName.click();

    const inputFilterSegment = document.querySelector(`
    #root > div > div.container-main > div.form-row.mb-4 > div:nth-child(2) > div > div > div > div > div > button
    `) as HTMLElement;

    if (inputFilterSegment) inputFilterSegment.click();

    setClientView(clients);
  }

  if (deletedClientSuccess) {
    setDeletedClientSuccess(true);
  }

  if (loaderClients) {
    setTimeout(() => setLoaderClients(null), TIMEOUT.FIVE_SECCONDS);
  }

  let snniperClient = null;

  if (errorFetchClients.status === HTTP_RESPONSE.NOT_FOUND) {
    snniperClient = <AlertInfo title="Nenhum cliente foi retornado." />;
  } else if (errorFetchClients.status === HTTP_RESPONSE.ERROR) {
    snniperClient = (
      <AlertError title="Não foi possível processar a requisição." />
    );
  }

  return (
    <div className="container-main">
      <Breadcumb page={[{ link: false, name: 'Clientes' }]} />

      <TitlePage title='Clientes' />

      {loader}

      <TopModal
        className="btn btn-danger"
        id="delete-client"
        title="Excluir cliente?"
        body="Tem certeza que deseja excluir esse cliente?"
        click={(e: React.BaseSyntheticEvent) => onDeleteClient(e, id ? id : '')}
        button="Excluir"
      />

      <div className='form-row mb-4'
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className='form-group'
          style={{
            minWidth: '200px',
            maxWidth: '400px'
          }}
        >
          <div className='form-row'>
            <ComboBox
              title="Filtrar por nome"
              options={clients.map((item: IClient) => ({ label: item.name, id: item.id }))}
              selectValue={(e: React.BaseSyntheticEvent, item: { label: string, id: string }) => setFilterClientById(item.id)}
              className='col'
            />
            <button
              className='btn btn-primary'
              onClick={e => filterClientSelectedById(e, filterClientById)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className='form-group'
          style={{
            minWidth: '200px',
            maxWidth: '400px'
          }}
        >
          <div className='form-row'>
            <ComboBox
              title="Filtrar por segmento"
              options={segments.map((item: ISegment) => ({ label: item.segment, id: item.id }))}
              selectValue={(e: React.BaseSyntheticEvent, item: { label: string, id: string }) => setFilterClientBySegment(item.label)}
              className='col'
            />
            <button
              className='btn btn-primary'
              onClick={e => filterClientSelectedBySegment(e, filterClientBySegment)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </div>

        <button
          className='btn btn-outline-primary'
          style={{
            maxWidth: '150px'
          }}
          onClick={(e: React.BaseSyntheticEvent) => clearFilters(e)}
        >
          Limpar Filtros
        </button>
      </div>

      <strong>Quantidade de clientes: </strong>
      {clientView.length}

      <div className="mt-2">{snniperClient}</div>

      {deletedClientSuccess === true ? (
        <AlertSuccess title="Cliente excluído com sucesso." />
      ) : null}

      <CardClients clients={clientView} setId={setId} />
    </div>
  );
}
