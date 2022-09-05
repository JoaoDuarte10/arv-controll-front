import '../css/main.css';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { HTTP_RESPONSE, TIMEOUT } from '../utils/constants';
import { mask } from '../services/maskMoney';
import { salesService } from '../services/salesService';
import { useGetClientsQuery } from '../api/ApiSlice';
import { ReducerStore } from '../app/store';

import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { AlertError } from '../components/alerts/AlertError';
import { Breadcumb } from '../components/Breadcumb';
import { CircularIndeterminate } from '../components/LoaderCircular';
import { IClient } from '../api/types/Client';
import { ComboBox } from '../components/ComboBox';
import { InputText } from '../components/input/InputText';
import { TitlePage } from '../components/TitlePage';
import { LabelForm } from '../components/labels/LabelForm';

export function NewSale() {
  let navigate = useNavigate();

  const auth = useSelector((state: ReducerStore) => state.authenticated);
  const { data: clients = [], isLoading: isLoadingGetClients } =
    useGetClientsQuery('');

  const [clientName, setClientName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const [serverError, setServerError] = useState<boolean>(false);
  const [saleRegisterSuccess, setSaleRegisterSuccess] =
    useState<boolean>(false);
  const [saleRegisterFail, setSaleRegisterFail] = useState<boolean>(false);

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
  }, [auth, navigate]);

  const saveSale = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    clearFields(event);

    const request = await salesService.newSale(
      auth.userId,
      description,
      clientName ? clientName.trim() : '',
      price,
      date as string,
    );

    if (HTTP_RESPONSE.SUCCESS.includes(request.status)) {
      setClientName('');
      setDescription('');
      setPrice('');
      setDate('');
      setSaleRegisterSuccess(true);
      return;
    }

    if (request.status === HTTP_RESPONSE.ERROR || !request.status) {
      setServerError(true);
    }
  };

  const clearFields = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    setDescription('');
    setPrice('');
    setDate('');
    setClientName('');
    const buttonSelector = document.querySelector(
      '#root > div > div.container-main > form > div > div.form-group > div > div > div > div > button',
    ) as HTMLElement;
    if (buttonSelector) buttonSelector.click();
  };

  if (saleRegisterSuccess) {
    setTimeout(() => setSaleRegisterSuccess(false), TIMEOUT.FIVE_SECCONDS);
  }

  if (saleRegisterFail) {
    setTimeout(() => setSaleRegisterFail(false), TIMEOUT.FIVE_SECCONDS);
  }

  if (serverError) {
    setTimeout(() => setServerError(false), TIMEOUT.FIVE_SECCONDS);
  }

  let loader;
  if (isLoadingGetClients) {
    loader = <CircularIndeterminate />;
  } else {
    loader = null;
  }

  return (
    <div className="container-main">
      {loader}
      <Breadcumb
        page={[
          { link: '/sales', name: 'Vendas' },
          { link: false, name: 'Nova Venda' },
        ]}
      />
      <TitlePage title="Registrar Nova Venda" />

      <form onSubmit={saveSale} className="form-sale">
        <div className="card p-3">
          <div className="form-group mb-2">
            <LabelForm text="Cliente" />

            {clients ? (
              <ComboBox
                title="Selecionar Cliente"
                options={clients.map((item: IClient) => item.name)}
                selectValue={(e: React.BaseSyntheticEvent, item: string) => {
                  if (!item) {
                    setClientName('');
                    return;
                  }
                  setClientName(item);
                }}
              />
            ) : (
              <ComboBox
                title="Selecionar Cliente"
                options={[]}
                selectValue={(e: React.BaseSyntheticEvent, item: string) => {
                  if (!item) {
                    setClientName('');
                    return;
                  }
                  setClientName(item);
                }}
              />
            )}
          </div>

          <LabelForm text="Descrição" />
          <InputText
            id="name"
            label="Digite a descrição"
            value={description}
            variant="outlined"
            onChange={(e: React.BaseSyntheticEvent) =>
              setDescription(e.target.value)
            }
          />

          <div className="form-row mt-2">
            <div className="form-group col">
              <LabelForm text="Preço" />

              <InputText
                id="price"
                label="Digite o preço"
                value={price}
                variant="outlined"
                onChange={(ev: React.BaseSyntheticEvent) => {
                  let val = ev.target.value;
                  const { maskedValue } = mask(val, 2, ',', '.', false, 'R$');
                  setPrice(maskedValue);
                }}
              />
            </div>

            <div className="form-group col">
              <LabelForm text="Data" />

              <InputText
                type={'date'}
                label=" "
                value={date}
                id="date"
                variant="outlined"
                onChange={(e: React.BaseSyntheticEvent) =>
                  setDate(e.target.value)
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <button
                type="submit"
                className="btn btn-outline-secondary btn-entrar mt-4 p-2"
                onClick={(e) => clearFields(e)}
              >
                Limpar campos
              </button>
            </div>
            <div className="form-group col">
              <button
                type="submit"
                className="btn btn-primary btn-entrar mt-4 p-2"
              >
                Salvar
              </button>
            </div>
          </div>
          <div className="mt-2">
            {saleRegisterSuccess === true && (
              <AlertSuccess title="Venda registrada com sucesso." />
            )}
            {saleRegisterFail === true && (
              <AlertError title="Erro ao registrar a venda." />
            )}
            {serverError === true && (
              <AlertError title="Não foi possível processar a requisição." />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
