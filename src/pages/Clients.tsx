import '../css/main.css';

import { CardClients } from '../components/CardClient';
import { TopModal } from '../components/TopModal';
import { Breadcumb } from '../components/Breadcumb';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { AlertInfo } from '../components/alerts/AlertInfo';
import { AlertError } from '../components/alerts/AlertError';
import { CircularIndeterminate } from '../components/LoaderCircular';

import { useDeleteClientMutation, useGetClientsQuery } from '../api/ApiSlice';
import { HTTP_RESPONSE } from '../utils/constants';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Clients() {
  let navigate = useNavigate();

  const auth = useSelector((state) => state.authenticated);

  const {
    data: clients = [],
    isLoading,
    isSuccess,
    error = {},
  } = useGetClientsQuery();

  const [
    deleteClient,
    { isLoading: isLoadingDelete, isSuccess: isSuccessDeleted },
  ] = useDeleteClientMutation();

  const [id, setId] = useState(null);
  const [loaderClients, setLoaderClients] = useState('');

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

  const onDeleteClient = async (event, id) => {
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

      <h3 className="title-page">Clientes</h3>

      {content}

      <TopModal
        className="btn btn-danger"
        id="delete-client"
        title="Excluir cliente?"
        body="Tem certeza que deseja excluir esse cliente?"
        click={(e) => onDeleteClient(e, id)}
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
