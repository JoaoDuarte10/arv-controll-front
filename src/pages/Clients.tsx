import '../css/main.css';

import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { AlertInfo } from '../components/alerts/AlertInfo';
import { AlertError } from '../components/alerts/AlertError';
import { Breadcumb } from '../components/Breadcumb';
import { CardClients } from '../components/CardClient';
import { CircularIndeterminate } from '../components/LoaderCircular';
import { TitlePage } from '../components/TitlePage';
import { TopModal } from '../components/TopModal';

import { useDeleteClientMutation, useGetClientsQuery } from '../api/ApiSlice';
import { HTTP_RESPONSE } from '../utils/constants';
import { ReducerStore } from '../app/store';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function Clients() {
  let navigate = useNavigate();

  const auth = useSelector((state: ReducerStore) => state.authenticated);

  const {
    data: clients = [],
    isLoading,
    isSuccess,
    error = {} as any,
  } = useGetClientsQuery('');

  const [
    deleteClient,
    { isLoading: isLoadingDelete, isSuccess: isSuccessDeleted },
  ] = useDeleteClientMutation();

  const [id, setId] = useState<string | null>(null);
  const [loaderClients, setLoaderClients] = useState<JSX.Element | string | null>('');

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
  }, [auth, navigate]);

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

  if (isSuccessDeleted) {
    setLoaderClients(<AlertSuccess title="Cliente excluído com sucesso." />);
  }

  if (loaderClients) {
    setTimeout(() => setLoaderClients(null), 5000);
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

      <TitlePage title='Clientes'/>

      {content}

      <TopModal
        className="btn btn-danger"
        id="delete-client"
        title="Excluir cliente?"
        body="Tem certeza que deseja excluir esse cliente?"
        click={(e: React.BaseSyntheticEvent) => onDeleteClient(e, id ? id : '')}
        button="Excluir"
      />

      <h4 className="mt-4 mb-3">Seus clientes</h4>

      <strong>Quantidade de clientes: </strong>
      {clients.length}

      <div className="mt-2">{snniperClient}</div>

      <CardClients clients={clients} setId={setId} />
    </div>
  );
}
