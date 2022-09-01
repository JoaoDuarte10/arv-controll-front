import '../css/main.css';

import { salesService } from '../services/salesService';

import { HTTP_RESPONSE } from '../utils/constants';

import { mask } from '../services/maskMoney';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertSuccess } from '../components/alerts/AlertSuccess';
import { AlertError } from '../components/alerts/AlertError';
import { Breadcumb } from '../components/Breadcumb';
import { ComboBox } from '../components/ComboBox';
import { InputText } from '../components/input/InputText';
import { useSelector } from 'react-redux';
import { useGetClientsQuery } from '../api/ApiSlice';
import { CircularIndeterminate } from '../components/LoaderCircular';

export function NewSale() {
  let navigate = useNavigate();

  const auth = useSelector((state) => state.authenticated);
  const { data: clients = [], isLoading: isLoadingGetClients } =
    useGetClientsQuery();

  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sale, setSale] = useState('');
  const [date, setDate] = useState('');
  const [client, setClient] = useState('');
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
  }, [auth, navigate]);

  const saveSale = async (event) => {
    event.preventDefault();
    const request = await salesService.newSale(
      auth.userId,
      description,
      client.trim(),
      price,
      date,
    );

    if (HTTP_RESPONSE.SUCCESS.includes(request.status)) {
      setClient('');
      setDescription('');
      setPrice('');
      setDate('');
      setSale(true);
      return;
    }

    if (request.status === HTTP_RESPONSE.ERROR || !request.status) {
      setServerError(true);
    }
  };

  const clearFields = (event) => {
    event.preventDefault();

    setDescription('');
    setPrice('');
    setDate('');
    setClient(null);
    const buttonSelector = document.querySelector(
      '#root > div > div.container-main > form > div > div.form-group > div > div > div > div > button',
    );
    if (buttonSelector) buttonSelector.click();
  };

  if (sale) {
    setTimeout(() => setSale(null), 5000);
  }

  if (serverError) {
    setTimeout(() => setServerError(null), 5000);
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
      <h3 className="title-page">Registrar Nova Venda</h3>

      <form onSubmit={saveSale} className="form-sale">
        <div className="card p-3">
          <div className="form-group">
            <label htmlFor="name">Cliente</label>
            {clients ? (
              <ComboBox
                title="Selecionar Cliente"
                options={clients.map((item) => item.name)}
                selectValue={(e, item) => {
                  if (!item) {
                    setClient(null);
                    return;
                  }
                  setClient(item);
                }}
              />
            ) : (
              <ComboBox
                title="Selecionar Cliente"
                options={[]}
                selectValue={(e, item) => {
                  if (!item) {
                    setClient(null);
                    return;
                  }
                  setClient(item);
                }}
              />
            )}
          </div>

          <label htmlFor="name">Descrição</label>
          <InputText
            id="name"
            label="Digite a descrição"
            value={description}
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="form-row mt-2">
            <div className="form-group col">
              <label className="mt-2" htmlFor="price">
                Preço
              </label>
              <InputText
                id="price"
                label="Digite o preço"
                value={price}
                variant="outlined"
                onChange={(ev) => {
                  let val = ev.target.value;
                  const { maskedValue } = mask(val, 2, ',', '.', false, 'R$');
                  setPrice(maskedValue);
                }}
              />
            </div>

            <div className="form-group col">
              <label className="mt-2" htmlFor="price">
                Data
              </label>
              <InputText
                type={'date'}
                label=" "
                value={date}
                id="date"
                variant="outlined"
                onChange={(e) => setDate(e.target.value)}
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
            {sale === true && (
              <AlertSuccess title="Venda registrada com sucesso." />
            )}
            {sale === false && (
              <AlertError title="Erro ao registrar a venda." />
            )}
            {serverError && (
              <AlertError title="Não foi possível processar a requisição." />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
