import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useGetClientsQuery } from '../api/ApiSlice';
import { clientHistoryService } from '../services/clientHistoryService';
import { ReducerStore } from '../app/store';
import { HTTP_RESPONSE, TIMEOUT } from '../utils/constants';

import { AlertError } from '../components/alerts/AlertError';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { Breadcumb } from '../components/Breadcumb';
import { CircularIndeterminate } from '../components/LoaderCircular';
import { IClient } from '../api/types/Client';
import { ComboBox } from '../components/ComboBox';
import { InputText } from '../components/input/InputText';
import { TitlePage } from '../components/TitlePage';
import { LabelForm } from '../components/labels/LabelForm';

export function CreateHistory() {
  let navigate = useNavigate();

  const auth = useSelector((state: ReducerStore) => state.authenticated);
  const { data: clients = [], isLoading: isLoadingGetClients } =
    useGetClientsQuery('');

  const [client, setClient] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const [serverError, setServerError] = useState<boolean>(false);
  const [invalidParams, setInvalidParams] = useState<boolean>(false);

  const [historyResgisterSuccess, setHistoryRegisterSuccess] = useState<boolean>(false);
  const [historyRegisterFail, setHistoryRegisterFail] = useState<boolean>(false);

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
  }, [auth, navigate]);

  const saveSale = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    const request = await clientHistoryService.createClientHistory(
      auth.userId,
      client.trim(),
      description,
      date,
    );

    if (HTTP_RESPONSE.SUCCESS.includes(request.status)) {
      setClient('');
      setDescription('');
      setDate('');
      setHistoryRegisterSuccess(true);
      return;
    }

    if (request.status === HTTP_RESPONSE.BAD_REQUEST) {
      setInvalidParams(true);
      return;
    }

    if (request.status === HTTP_RESPONSE.ERROR || !request.status) {
      setServerError(true);
    }
  };

  const clearFields = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    setDescription('');
    setDate('');
    const buttonSelector = document.querySelector(
      '#root > div > div.container-main > form > div > div:nth-child(1) > div > div > div > div > div > button',
    ) as HTMLElement;
    if (buttonSelector) buttonSelector.click();
  };

  if (serverError) {
    setTimeout(() => setServerError(false), TIMEOUT.FIVE_SECCONDS);
  }

  if (historyResgisterSuccess === true || historyResgisterSuccess === false) {
    setTimeout(() => setHistoryRegisterSuccess(false), TIMEOUT.FIVE_SECCONDS);
  }

  if (historyRegisterFail) {
    setTimeout(() => setHistoryRegisterFail(false), TIMEOUT.FIVE_SECCONDS);
  }

  if (invalidParams === true) {
    setTimeout(() => setInvalidParams(false), TIMEOUT.FIVE_SECCONDS);
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
      <Breadcumb
        page={[
          { link: '/history', name: 'Atendimentos' },
          { link: false, name: 'Criar Novo' },
        ]}
      />
      <TitlePage title='Criar Novo' />

      <form onSubmit={saveSale} className="form-sale">
        <div className="card p-3">
          <div className="form-group">
            <LabelForm text='Cliente' />
            <div>
              {clients ? (
                <ComboBox
                  title="Selecionar Cliente"
                  options={clients.map((item: IClient) => item.name)}
                  selectValue={(e: React.BaseSyntheticEvent, item: IClient) => setClient(item.name)}
                />
              ) : (
                <ComboBox
                  title="Selecionar Cliente"
                  options={[]}
                  selectValue={(e: React.BaseSyntheticEvent, item: string) => setClient(item)}
                />
              )}
            </div>
          </div>
          <div className="form-group">
            <LabelForm text='Descrição' />

            <InputText
              type="text"
              value={description}
              onChange={(e: React.BaseSyntheticEvent) => setDescription(e.target.value)}
              id="name"
              label="Digite a descrição"
            />
          </div>
          <div className="form-group">
            <LabelForm text='Data' />

            <InputText
              type="date"
              id="date"
              label=" "
              value={date}
              onChange={(e: React.BaseSyntheticEvent) => setDate(e.target.value)}
            />
          </div>
          <div className="form-row mt-3">
            <div className="form-group col">
              <button
                type="button"
                className="btn btn-outline-secondary btn-entrar p-2"
                onClick={(e: React.BaseSyntheticEvent) => clearFields(e)}
              >
                Limpar campos
              </button>
            </div>
            <div className="form-group col">
              <button type="submit" className="btn btn-primary btn-entrar p-2">
                Registrar
              </button>
            </div>
          </div>
          <div className="mt-3">
            {historyResgisterSuccess === true && (
              <AlertSuccess title="Atendimento registrado com sucesso." />
            )}
            {historyRegisterFail === true && (
              <AlertError title="Erro ao registrar o atendimento." />
            )}
            {serverError === true && (
              <AlertError title="Não foi possível processar a requisição." />
            )}
            {invalidParams === true && (
              <AlertError title="Preencha os campos corretamente." />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
