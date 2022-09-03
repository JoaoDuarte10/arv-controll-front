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
    error = {} as any,
  } = useGetClientsQuery('');

  const { data: segments = [] } = useGetSegmentsQuery('');

  const [
    deleteClient,
    { isLoading: isLoadingDelete, isSuccess: isSuccessDeleted },
  ] = useDeleteClientMutation();

  const [id, setId] = useState<string | null>(null);
  const [loaderClients, setLoaderClients] = useState<JSX.Element | string | null>('');
  const [clientView, setClientView] = useState<IClient[]>([]);

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
    if (clients.length > 0) setClientView(clients);
  }, [auth, navigate, clients]);

  let content;

  if (isLoading || isLoadingDelete) {
    content = <CircularIndeterminate />;
  } else if (isSuccess) {
    content = null;
  }

  const onDeleteClient = async (event: React.BaseSyntheticEvent, id: string) => {
    event.preventDefault();

    try {
      await deleteClient(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const filterClientSelectedById = (event: React.BaseSyntheticEvent, item: { label: string, id: string }) => {
    event.preventDefault();

    if (item) {
      const clientsById = clients.filter((client: IClient) => client.id === item.id);
      setClientView(clientsById);
      return;
    }

    setClientView(clients);
  }

  const filterClientSelectedBySegment = (event: React.BaseSyntheticEvent, item: { label: string, id: string }) => {
    event.preventDefault();

    if (item) {
      const clientsBySegment = clients.filter((client: IClient) => client.segment === item.label);
      setClientView(clientsBySegment);
      return;
    }

    setClientView(clients);
  }

  if (isSuccessDeleted) {
    setLoaderClients(<AlertSuccess title="Cliente excluído com sucesso." />);
  }

  if (loaderClients) {
    setTimeout(() => setLoaderClients(null), TIMEOUT.FIVE_SECCONDS);
  }

  let snniperClient = null;

  if (error.status === HTTP_RESPONSE.NOT_FOUND) {
    snniperClient = <AlertInfo title="Nenhum cliente foi retornado." />;
  } else if (error.status === HTTP_RESPONSE.ERROR) {
    snniperClient = (
      <AlertError title="Não foi possível processar a requisição." />
    );
  }

  return (
    <div className="container-main">
      <Breadcumb page={[{ link: false, name: 'Clientes' }]} />

      <TitlePage title='Clientes' />

      {content}

      <TopModal
        className="btn btn-danger"
        id="delete-client"
        title="Excluir cliente?"
        body="Tem certeza que deseja excluir esse cliente?"
        click={(e: React.BaseSyntheticEvent) => onDeleteClient(e, id ? id : '')}
        button="Excluir"
      />

      <div className='form-row mb-2'
        style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        <div className='form-group col'
          style={{
            minWidth: '200px'
          }}
        >
          <ComboBox
            title="Buscar cliente por nome"
            options={clients.map((item: IClient) => ({ label: item.name, id: item.id }))}
            selectValue={(e: React.BaseSyntheticEvent, item: { label: string, id: string }) => filterClientSelectedById(e, item)}
          />
        </div>

        <div className='form-group col'
          style={{
            minWidth: '200px'
          }}
        >
          <ComboBox
            title="Buscar cliente por segmento"
            options={segments.map((item: ISegment) => ({ label: item.segment, id: item.id }))}
            selectValue={(e: React.BaseSyntheticEvent, item: { label: string, id: string }) => filterClientSelectedBySegment(e, item)}
          />
        </div>
      </div>

      <strong>Quantidade de clientes: </strong>
      {clientView.length}

      <div className="mt-2">{snniperClient}</div>

      <CardClients clients={clientView} setId={setId} />
    </div>
  );
}
