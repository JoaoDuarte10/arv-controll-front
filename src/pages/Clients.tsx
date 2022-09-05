import '../css/main.css';

import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { AlertInfo } from '../components/alerts/AlertInfo';
import { AlertError } from '../components/alerts/AlertError';
import { Breadcumb } from '../components/Breadcumb';
import { CardClients } from '../components/CardClient';
import { CircularIndeterminate } from '../components/LoaderCircular';
import { ComboBox } from '../components/ComboBox';
import { TitlePage } from '../components/TitlePage';
import { TopModal } from '../components/TopModal';

import {
  useDeleteClientMutation,
  useGetClientsQuery,
  useGetSegmentsQuery,
} from '../api/ApiSlice';
import { HTTP_RESPONSE, TIMEOUT } from '../utils/constants';
import { ReducerStore } from '../app/store';
import { ISegment } from '../api/types/Segment';
import { IClient } from '../api/types/Client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SearchFilterButton } from '../components/buttons/SearchFilter';
import { ClearSearchFilterButton } from '../components/buttons/ClearSearchFilter';
import { SearchButton } from '../components/buttons/SearchButton';

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

  const [deleteClient, { isLoading: isLoadingDelete }] =
    useDeleteClientMutation();

  const [id, setId] = useState<string | null>(null);
  const [loaderClients, setLoaderClients] = useState<JSX.Element | null>();
  const [clientView, setClientView] = useState<IClient[]>([]);
  const [deletedClientSuccess, setDeletedClientSuccess] =
    useState<boolean>(false);

  const [filterClientById, setFilterClientById] = useState<string>('');
  const [filterClientBySegment, setFilterClientBySegment] =
    useState<string>('');

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

  const onDeleteClient = async (
    event: React.BaseSyntheticEvent,
    id: string,
  ) => {
    event.preventDefault();

    try {
      await deleteClient(id).unwrap();
      setDeletedClientSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const filterClientSelectedById = (
    event: React.BaseSyntheticEvent,
    id: string,
  ) => {
    event.preventDefault();

    if (id) {
      const clientsById = clients.filter((client: IClient) => client.id === id);
      setClientView(clientsById);
      return;
    }
  };

  const filterClientSelectedBySegment = (
    event: React.BaseSyntheticEvent,
    segment: string,
  ) => {
    event.preventDefault();

    if (segment) {
      const clientsBySegment = clients.filter(
        (client: IClient) => client.segment === segment,
      );
      setClientView(clientsBySegment);
      return;
    }
  };

  const clearFilters = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    const inputFilterName = document.querySelector(`
      #searchByName > div > div > div > div > button
    `) as HTMLElement;

    if (inputFilterName) inputFilterName.click();

    const inputFilterSegment = document.querySelector(`
      #searchBySegmento > div > div > div > div > button
    `) as HTMLElement;

    if (inputFilterSegment) inputFilterSegment.click();

    setClientView(clients);
  };

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

      <TitlePage title="Clientes" />

      <div className="pb-2 mb-2">
        <strong>Quantidade de clientes: </strong>
        {clientView.length}
      </div>

      <div
        className="pb-2 mb-4"
        style={{
          overflow: 'auto',
          whiteSpace: 'nowrap',
          display: 'block',
          alignItems: 'center',
        }}
      >
        <SearchFilterButton
          onClick={(e: React.BaseSyntheticEvent) => {
            clearFilters(e);
            const filterBySegmentElement =
              document.getElementById('searchBySegmento');
            const filterByNameElement = document.getElementById('searchByName');

            if (filterBySegmentElement?.style.display === 'flex') {
              filterBySegmentElement.style.display = 'none';
            } else {
              if (filterBySegmentElement)
                filterBySegmentElement.style.display = 'flex';
            }

            if (filterByNameElement) filterByNameElement.style.display = 'none';
          }}
          text="Segmento"
        />

        <SearchFilterButton
          onClick={(e: React.BaseSyntheticEvent) => {
            clearFilters(e);
            const filterBySegmentElement =
              document.getElementById('searchBySegmento');
            const filterByNameElement = document.getElementById('searchByName');

            if (filterByNameElement?.style.display === 'flex') {
              filterByNameElement.style.display = 'none';
            } else {
              if (filterByNameElement)
                filterByNameElement.style.display = 'flex';
            }

            if (filterBySegmentElement)
              filterBySegmentElement.style.display = 'none';
          }}
          text="Nome"
        />

        <ClearSearchFilterButton
          onClick={(e: React.BaseSyntheticEvent) => {
            clearFilters(e);

            const filterClientsElement =
              document.getElementById('searchByName');
            if (filterClientsElement)
              filterClientsElement.style.display = 'none';
            const filerClientElement =
              document.getElementById('searchBySegmento');

            if (filerClientElement) filerClientElement.style.display = 'none';
          }}
        />
      </div>

      <div
        className="mb-4 shadow p-3"
        style={{
          display: 'none',
        }}
        id="searchByName"
      >
        <ComboBox
          title="Digite o nome..."
          options={clients.map((item: IClient) => ({
            label: item.name,
            id: item.id,
          }))}
          selectValue={(
            e: React.BaseSyntheticEvent,
            item: { label: string; id: string },
          ) => setFilterClientById(item ? item.id : '')}
          style={{
            width: '300px',
          }}
        />
        <SearchButton
          onClick={(e: React.BaseSyntheticEvent) =>
            filterClientSelectedById(e, filterClientById)
          }
        />
      </div>
      <div
        className="mb-4 shadow p-3"
        style={{
          display: 'none',
        }}
        id="searchBySegmento"
      >
        <ComboBox
          title="Digite o segmento..."
          options={segments.map((item: ISegment) => ({
            label: item.segment,
            id: item.id,
          }))}
          selectValue={(
            e: React.BaseSyntheticEvent,
            item: { label: string; id: string },
          ) => setFilterClientBySegment(item ? item.label : '')}
          style={{
            width: '300px',
          }}
        />

        <SearchButton
          onClick={(e: React.BaseSyntheticEvent) =>
            filterClientSelectedBySegment(e, filterClientBySegment)
          }
        />
      </div>

      {loader}

      <TopModal
        className="btn btn-danger"
        id="delete-client"
        title="Excluir cliente?"
        body="Tem certeza que deseja excluir esse cliente?"
        click={(e: React.BaseSyntheticEvent) => onDeleteClient(e, id ? id : '')}
        button="Excluir"
      />

      <div className="mt-2">{snniperClient}</div>

      {deletedClientSuccess === true ? (
        <AlertSuccess title="Cliente excluído com sucesso." />
      ) : null}

      <CardClients clients={clientView} setId={setId} />
    </div>
  );
}
