import { CardClients } from '../components/CardClient';
import { TopModal } from '../components/TopModal';
import { ClearFields } from '../components/Buttons';
import { CardSegment } from '../components/CardSegment';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { AlertError } from '../components/alerts/AlertError';
import { Breadcumb } from '../components/Breadcumb';
import { ComboBox } from '../components/ComboBox';
import { CircularIndeterminate } from '../components/LoaderCircular';
import { AlertInfo } from '../components/alerts/AlertInfo';

import { clientService } from '../services/clientService';
import { HTTP_RESPONSE } from '../utils/constants';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TitlePage } from '../components/TitlePage';
import {
  useAddNewSegmentMutation,
  useDeleteSegmentMutation,
  useGetClientsQuery,
  useGetSegmentsQuery,
  useUpdateSegmentMutation,
} from '../api/ApiSlice';

export function Segments() {
  let navigate = useNavigate();

  const auth = useSelector((state) => state.authenticated);
  const { data: segments = [] } = useGetSegmentsQuery();
  const { data: clients = [], isLoading: isLoadingClients } =
    useGetClientsQuery();

  const [addSegment, { isLoading: isLoadingAdd }] = useAddNewSegmentMutation();
  const [updateSegment, { isLoading: isLoadingUpdate }] =
    useUpdateSegmentMutation();
  const [deleteSegment, { isLoading: isLoadingDelete }] =
    useDeleteSegmentMutation();

  const [id, setId] = useState(null);
  const [titleCardSegment, setTitleCardSegment] = useState('');
  const [actionName, setActionName] = useState('');
  const [editSegmentName, setEditSegmentName] = useState({ name: '', id: '' });
  const [editSegment, setEditSegment] = useState(null);
  const [segmentActual, setSegmentActual] = useState(null);
  const [clientsInSegment, setClientsInSegment] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
  }, [auth, navigate]);

  const getClientBySegment = async (event, params) => {
    event.preventDefault();
    setSegmentActual(params);

    const query = [...clients.filter((item) => item.segment === params.label)];

    if (query.length === 0) {
      setAlert(<AlertInfo title="Nenhum cliente nesse segmento." />);
      return;
    }
    setClientsInSegment(query);
  };

  const clearStates = () => {
    setEditSegment(null);
  };

  const deleteClient = async (event, id) => {
    event.preventDefault();
    const request = await clientService.deleteClient(auth.userId, id);

    if (request.status === HTTP_RESPONSE.ERROR || !request.status) {
      setAlert(<AlertError title="Não foi possível processar a requisição." />);
      return;
    }

    clearStates();
    setAlert(<AlertSuccess title="Segmento Deletado" />);
    await getClientBySegment(event, segmentActual);
    return;
  };

  const clearFindClients = (event) => {
    event.preventDefault();

    setClientsInSegment([]);
    setClientsInSegment(true);
    setSegmentActual(null);
    const buttonSelector = document.querySelector(
      '#root > div > div.container-main > div.card.shadow-sm.bg-white.pt-3.pl-3.pb-3 > div > div > div > div > div > button',
    );
    if (buttonSelector) buttonSelector.click();
  };

  const onAddNewSegment = async (event, segment) => {
    event.preventDefault();

    if (!segment || !segment.trim()) {
      setAlert(<AlertInfo title="Preencha os campos corretamente." />);
      return;
    }

    try {
      await addSegment({
        segment,
      }).unwrap();
      setEditSegmentName('');
      setAlert(<AlertSuccess title="Segmento criado com sucesso." />);
    } catch (error) {
      if (error.status === HTTP_RESPONSE.CONFLICT) {
        setAlert(<AlertInfo title="Esse segmento já existe." />);
      }
      setAlert(<AlertError title="Não foi possível processar a requisição." />);
    }
  };

  const updateSegmentRequest = async (event, segment, id) => {
    event.preventDefault();

    try {
      await updateSegment({
        id,
        segment,
      });
      setEditSegmentName('');
      setAlert(<AlertSuccess title="Segmento atualizado." />);
    } catch (error) {
      setAlert(<AlertError title="Não foi possível processar a requisição." />);
    }
  };

  const onDeleteSegment = async (event, id, segment) => {
    event.preventDefault();

    try {
      await deleteSegment({
        id,
        segment,
      });
      setAlert(<AlertSuccess title="Segmento deletado." />);
      setSegmentActual('');
    } catch (error) {
      if (error.status === HTTP_RESPONSE.CONFLICT) {
        setAlert(
          <AlertError title="Esse segmento não pode ser excluído, pois existem clientes associados à ele." />,
        );
        return;
      }
      setAlert(<AlertError title="Não foi possível processar a requisição." />);
    }
  };

  const showActions =
    segmentActual && segmentActual.label && segmentActual.label.length > 0;

  let loader = null;
  if (isLoadingClients || isLoadingAdd || isLoadingUpdate || isLoadingDelete) {
    loader = <CircularIndeterminate />;
  } else {
    loader = null;
  }

  if (alert) {
    setTimeout(() => setAlert(null), 5000);
  }

  return (
    <div className="container-main">
      {loader}
      <Breadcumb page={[{ link: false, name: 'Segmentos' }]} />

      <TitlePage title='Segmentos' />

      <TopModal
        className="btn btn-danger"
        id="delete-client"
        title="Excluir cliente?"
        body="Tem certeza que deseja excluir esse cliente?"
        click={(e) => deleteClient(e, id)}
        button="Excluir"
      />

      <TopModal
        className="btn btn-danger"
        id="delete-segment"
        title="Excluir segmento?"
        body="Tem certeza que deseja excluir esse segmento?"
        click={(e) => onDeleteSegment(e, segmentActual.id, segmentActual.label)}
        button="Excluir"
      />

      <CardSegment
        editSegment={editSegment}
        title={titleCardSegment}
        actionName={actionName}
        segment={editSegmentName}
        clearStates={(e) => setEditSegmentName({ name: '', id: '' })}
        actionCreate={(e, segment) => onAddNewSegment(e, segment)}
        actionUpdate={updateSegmentRequest}
        setNewSegment={setEditSegmentName}
        alert={alert}
      />

      <button
        className="btn btn-outline-primary mb-4 p-2 col"
        data-toggle="modal"
        data-target="#modalSegment"
        onClick={(e) => {
          setTitleCardSegment('Novo');
          setActionName('Criar');
          setEditSegment(false);
        }}
      >
        Novo Segmento
      </button>

      <div
        className="card shadow-sm bg-white  pt-3 pl-3 pb-3"
        style={{ borderRadius: '10px' }}
      >
        <h6 className="text-primary font-weight-bold">Busca:</h6>
        <div className="pr-3">
          {segments.length > 0 ? (
            <ComboBox
              title="Selecionar segmento"
              options={segments.map((item) => ({
                label: item.segment,
                id: item.id,
              }))}
              selectValue={(e, item) => {
                getClientBySegment(e, item);
              }}
            />
          ) : (
            <ComboBox
              title="Selecionar segmento"
              options={[]}
              selectValue={(e, item) => {
                getClientBySegment(e, item);
              }}
            />
          )}
        </div>
      </div>

      <h5 className="mt-4">
        Selecionado:
        <small className="text-primary font-weight-bold">
          {segmentActual ? ` ${segmentActual.label}` : ' Nenhum'}
        </small>
      </h5>
      {showActions && (
        <ClearFields
          title="Limpar Pesquisa"
          callback={clearFindClients}
          className="col-12 font-weight-bold"
        />
      )}

      {showActions ? (
        <div className="form-row mt-3 p-3 border mb-3 shadow bg-white">
          <div className="col mb-2">
            <button
              className="col btn btn-outline-primary font-weight-bold"
              data-toggle="modal"
              data-target="#modalSegment"
              onClick={(e) => {
                setTitleCardSegment('Editar');
                setActionName('Salvar');
                setEditSegmentName({
                  name: segmentActual.label,
                  id: segmentActual.id,
                });
                setEditSegment(true);
              }}
            >
              Editar Segmento
            </button>
          </div>
          <div className="col mb-2">
            <button
              className="col btn btn-outline-danger font-weight-bold"
              data-toggle="modal"
              data-target="#delete-segment"
              onClick={(e) => e}
            >
              Deletar Segmento
            </button>
          </div>
        </div>
      ) : null}

      {alert}

      <div>
        {clientsInSegment.length > 0 && (
          <div className="pt-2">
            <div className="d-inline">
              <strong>Clientes nesse segmento: </strong>
              <div className="d-inline mb-3">{clientsInSegment.length}</div>
            </div>

            <CardClients clients={clientsInSegment} setId={setId} />
          </div>
        )}
      </div>
    </div>
  );
}
