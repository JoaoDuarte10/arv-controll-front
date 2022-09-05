import { TopModal } from '../components/TopModal';
import { CardSegment } from '../components/CardSegment';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { AlertError } from '../components/alerts/AlertError';
import { Breadcumb } from '../components/Breadcumb';
import { ComboBox } from '../components/ComboBox';
import { CircularIndeterminate } from '../components/LoaderCircular';
import { AlertInfo } from '../components/alerts/AlertInfo';

import { HTTP_RESPONSE, TIMEOUT } from '../utils/constants';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TitlePage } from '../components/TitlePage';
import { ReducerStore } from '../app/store';
import { SearchFilterButton } from '../components/buttons/SearchFilter';
import { ClearSearchFilterButton } from '../components/buttons/ClearSearchFilter';
import { ButtonFilterAction } from '../components/buttons/ButtonFilterAction';
import React from 'react';
import { SearchButton } from '../components/buttons/SearchButton';
import {
  useAddNewSegmentMutation,
  useDeleteSegmentMutation,
  useGetSegmentsQuery,
  useUpdateSegmentMutation,
} from '../api/ApiSlice';

export function Segments() {
  let navigate = useNavigate();

  const auth = useSelector((state: ReducerStore) => state.authenticated);
  const { data: segments = [] } = useGetSegmentsQuery('');

  const [addSegment, { isLoading: isLoadingAdd }] = useAddNewSegmentMutation();
  const [updateSegment, { isLoading: isLoadingUpdate }] =
    useUpdateSegmentMutation();
  const [deleteSegment, { isLoading: isLoadingDelete }] =
    useDeleteSegmentMutation();

  const [titleCardSegment, setTitleCardSegment] = useState<string>('');
  const [actionName, setActionName] = useState<string>('');
  const [editSegmentName, setEditSegmentName] = useState<any>({
    name: '',
    id: '',
  });
  const [editSegment, setEditSegment] = useState<boolean | null>(null);
  const [segmentActual, setSegmentActual] = useState<
    { label: string; id: string } | any
  >(null);
  const [alert, setAlert] = useState<JSX.Element | null>(null);

  const [selectSegment, setSelectSegment] = useState<{
    label: string;
    id: string;
  }>({ label: '', id: '' });

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
  }, [auth, navigate]);

  const getSegment = async (
    event: React.BaseSyntheticEvent,
    params: { label: string; id: string },
  ) => {
    event.preventDefault();
    setSegmentActual(params);
  };

  const clearFindClients = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    setSegmentActual(null);
  };

  const onAddNewSegment = async (
    event: React.BaseSyntheticEvent,
    segment: any,
  ) => {
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

  const updateSegmentRequest = async (
    event: React.BaseSyntheticEvent,
    segment: any,
    id: string,
  ) => {
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

  const onDeleteSegment = async (
    event: React.BaseSyntheticEvent,
    id: string,
    segment: string,
  ) => {
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
  if (isLoadingAdd || isLoadingUpdate || isLoadingDelete) {
    loader = <CircularIndeterminate />;
  } else {
    loader = null;
  }

  if (alert) {
    setTimeout(() => setAlert(null), TIMEOUT.FIVE_SECCONDS);
  }

  return (
    <div className="container-main">
      {loader}
      <Breadcumb page={[{ link: false, name: 'Segmentos' }]} />

      <TitlePage title="Segmentos" />

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
            const filterBySegmentElement =
              document.getElementById('searchBySegment');
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

        <ButtonFilterAction
          onClick={(e: React.BaseSyntheticEvent) => {
            const filterBySegmentElement =
              document.getElementById('searchBySegment');
            if (filterBySegmentElement)
              filterBySegmentElement.style.display = 'none';

            setTitleCardSegment('Novo');
            setActionName('Criar');
            setEditSegment(false);
          }}
          text="Novo"
          className="pl-3 pr-3"
          dataToggle="modal"
          dataTarget="modalSegment"
        />

        <ClearSearchFilterButton
          onClick={(e: React.BaseSyntheticEvent) => {
            clearFindClients(e);

            const filterClientsElement =
              document.getElementById('searchByName');
            if (filterClientsElement)
              filterClientsElement.style.display = 'none';
            const filerClientElement =
              document.getElementById('searchBySegment');

            if (filerClientElement) filerClientElement.style.display = 'none';

            const buttonSelector = document.querySelector(
              '#searchBySegment > div > div > div > div > div > button',
            ) as HTMLElement;
            if (buttonSelector) buttonSelector.click();
          }}
        />

        {showActions && (
          <ButtonFilterAction
            onClick={clearFindClients}
            text="Limpar Pesquisa"
            className="pl-3 pr-3 btn-outline-warning"
          />
        )}
      </div>

      <div
        style={{
          display: 'none',
        }}
        id="searchBySegment"
        className="pb-4"
      >
        {segments.length > 0 ? (
          <div
            style={{
              display: 'flex',
            }}
          >
            <ComboBox
              title="Selecionar segmento"
              options={segments.map((item: any) => ({
                label: item.segment,
                id: item.id,
              }))}
              selectValue={(e: React.BaseSyntheticEvent, item: any) => {
                setSelectSegment(item || {});
              }}
              style={{
                width: '300px',
              }}
            />
            <SearchButton
              onClick={(e: React.BaseSyntheticEvent) =>
                getSegment(e, selectSegment)
              }
            />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
            }}
          >
            <ComboBox
              title="Selecionar segmento"
              options={[]}
              selectValue={(e: React.BaseSyntheticEvent, item: any) => {
                setSelectSegment(item || {});
              }}
              style={{
                width: '300px',
              }}
            />
            <SearchButton
              onClick={(e: React.BaseSyntheticEvent) =>
                getSegment(e, selectSegment)
              }
            />
          </div>
        )}
      </div>

      <TopModal
        className="btn btn-danger"
        id="delete-segment"
        title="Excluir segmento?"
        body="Tem certeza que deseja excluir esse segmento?"
        click={(e: React.BaseSyntheticEvent) => {
          if (segmentActual) {
            onDeleteSegment(e, segmentActual.id, segmentActual.label);
          }
        }}
        button="Excluir"
      />

      <CardSegment
        editSegment={editSegment as any}
        title={titleCardSegment}
        actionName={actionName}
        segment={editSegmentName}
        clearStates={(e: React.BaseSyntheticEvent) =>
          setEditSegmentName({ name: '', id: '' })
        }
        actionCreate={(e: React.BaseSyntheticEvent, segment: any) =>
          onAddNewSegment(e, segment)
        }
        actionUpdate={updateSegmentRequest}
        setNewSegment={setEditSegmentName}
        alert={alert}
      />

      {showActions ? (
        <div className="card p-2 mt-4">
          <div className="card-header">
            <h6 className="text-primary font-weight-bold pt-2">
              Segmento:{' '}
              <small className="text-dark text-muted font-weight-bold h6">
                {segmentActual.label}
              </small>
            </h6>
          </div>
          <div className="pt-4 form-row">
            <div className="col">
              <button
                className="col btn btn-outline-primary font-weight-bold"
                data-toggle="modal"
                data-target="#modalSegment"
                onClick={(e: React.BaseSyntheticEvent) => {
                  setTitleCardSegment('Editar');
                  setActionName('Salvar');
                  setEditSegmentName({
                    name: segmentActual.label,
                    id: segmentActual.id,
                  });
                  setEditSegment(true);
                }}
              >
                Editar
              </button>
            </div>
            <div className="col">
              <button
                className="col btn btn-outline-danger font-weight-bold col"
                data-toggle="modal"
                data-target="#delete-segment"
                onClick={(e: React.BaseSyntheticEvent) => e}
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h5 className="border-top pt-4">Nenhum segmento selecionado</h5>
      )}
      {alert}
    </div>
  );
}
