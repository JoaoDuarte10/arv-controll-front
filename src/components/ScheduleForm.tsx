import { mask } from '../services/maskMoney';

import InputMask from 'react-input-mask';
import { AlertInfo } from './alerts/AlertInfo';
import { AlertSuccess } from './alerts/AlertSuccess';
import { ComboBox } from './ComboBox';
import { InputText } from './input/InputText';

export function ScheduleForm(props) {
  const {
    clientSaves,
    setDataClient,
    client,
    procedure,
    setProcedure,
    dateNewSchedule,
    setDateNewSchedule,
    time,
    setTime,
    price,
    setPrice,
    contact,
    setContact,
    clearStates,
    edit,
    addNewClientSchedule,
    errorClientSchedule,
    setPacoteFunc,
    pacote,
    setQtdTotalAtendimentoFuncion,
    qtdTotalAtendimento,
    alert,
  } = props;

  return (
    <div>
      <div className="modal-body">
        <form>
          {edit && (
            <h5 className="modal-title border-bottom mb-4 pb-2">Editar</h5>
          )}
          <label htmlFor="name">Cliente</label>
          <div className="mb-3">
            {edit ? (
              <ComboBox
                title="Selecione o cliente"
                options={[]}
                selectValue={(e, item) => {
                  if (!item) {
                    setDataClient(item);
                    return;
                  }
                  setDataClient(item);
                }}
                value={client}
              />
            ) : (
              <div>
                {clientSaves && clientSaves.length > 0 ? (
                  <ComboBox
                    title="Selecione o cliente"
                    options={clientSaves.map((item) => ({
                      label: item.name,
                      phone: item.phone,
                    }))}
                    selectValue={(e, item) => {
                      if (!item) {
                        setDataClient(e, item);
                        return;
                      }
                      setDataClient(e, item);
                    }}
                  />
                ) : (
                  <ComboBox
                    title="Selecione o cliente"
                    options={[]}
                    selectValue={(e: React.BaseSyntheticEvent, item) => {
                      if (!item) {
                        setDataClient(e, item);
                        return;
                      }
                      setDataClient(e, item);
                    }}
                  />
                )}
              </div>
            )}
          </div>

          <label htmlFor="name">Procedimento</label>
          <InputText
            type="text"
            id="procedure"
            value={procedure}
            onChange={(e: React.BaseSyntheticEvent) => setProcedure(e.target.value)}
            label="Digite o procedimento"
          />

          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="name">Pacote</label>
              <div className="card">
                <button
                  className="btn bg-white text-left"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="form-row">
                    <div className="col p-1">
                      {pacote === true && 'Sim'}
                      {pacote === false && 'Não'}
                      {pacote === null || pacote === '' ? 'Escolha...' : null}
                    </div>
                    <div className="dropdown-toggle col-end" />
                  </div>
                </button>
                <div
                  className="dropdown-menu col"
                  aria-labelledby="dropdownMenuButton"
                  id="select-clients"
                >
                  <div className="dropdown-item">
                    <button
                      type="button"
                      onClick={(e) => setPacoteFunc(e, true)}
                      className="card p-2 mb-2 border-0 col"
                    >
                      Sim
                    </button>
                  </div>
                  <div className="dropdown-item">
                    <button
                      type="button"
                      onClick={(e) => setPacoteFunc(e, false)}
                      className="card p-2 mb-2 border-0 col"
                    >
                      Não
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group col">
              <label htmlFor="name">Nº de Atendimentos</label>
              <div className="card">
                <button
                  className="btn bg-white text-left"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="form-row p-1">
                    <div className="col">
                      {qtdTotalAtendimento ? qtdTotalAtendimento : 'Escolha...'}
                    </div>
                    <div className="dropdown-toggle col-end" />
                  </div>
                </button>
                <div
                  className="dropdown-menu col"
                  aria-labelledby="dropdownMenuButton"
                  id="select-clients"
                >
                  <div className="dropdown-item">
                    <div className="dropdown-item">
                      <button
                        type="button"
                        onClick={(e) => setQtdTotalAtendimentoFuncion(e, 1)}
                        className="card p-2 border-0 col"
                      >
                        1
                      </button>
                    </div>
                  </div>
                  <div className="dropdown-item">
                    <div className="dropdown-item">
                      <button
                        type="button"
                        onClick={(e) => setQtdTotalAtendimentoFuncion(e, 2)}
                        className="card p-2 border-0 col"
                      >
                        2
                      </button>
                    </div>
                  </div>
                  <div className="dropdown-item">
                    <div className="dropdown-item">
                      <button
                        type="button"
                        onClick={(e) => setQtdTotalAtendimentoFuncion(e, 3)}
                        className="card p-2 border-0 col"
                      >
                        3
                      </button>
                    </div>
                  </div>
                  <div className="dropdown-item">
                    <div className="dropdown-item">
                      <button
                        type="button"
                        onClick={(e) => setQtdTotalAtendimentoFuncion(e, 4)}
                        className="card p-2 border-0 col"
                      >
                        4
                      </button>
                    </div>
                  </div>
                  <div className="dropdown-item">
                    <div className="dropdown-item">
                      <button
                        type="button"
                        onClick={(e) => setQtdTotalAtendimentoFuncion(e, 5)}
                        className="card p-2 border-0 col"
                      >
                        5
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="name">Data</label>
              <InputText
                type="date"
                label=" "
                id="date"
                value={dateNewSchedule}
                onChange={(e) => setDateNewSchedule(e.target.value)}
              />
              <small className="form-text text-muted">Selecione a data.</small>
            </div>
            <div className="form-group col">
              <label htmlFor="name">Horário</label>
              <InputText
                type="time"
                label=" "
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <small className="form-text text-muted">Selecione horário.</small>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="name">Preço</label>
              <InputText
                type="text"
                format="currency"
                className="mb-3"
                value={price}
                onChange={(ev) => {
                  let val = ev.target.value;
                  const { maskedValue } = mask(val, 2, ',', '.', false, 'R$');
                  setPrice(maskedValue);
                }}
                id="price"
                label="Digite o preço"
              />
            </div>
            <div className="form-group col">
              <label htmlFor="name">Telefone</label>
              <InputMask
                type="text"
                format="currency"
                className="p-3 form-control"
                value={contact}
                id="contact"
                mask="(99) 9 9999-9999"
                onChange={(e) => setContact(e.target.value)}
                placeholder="(__) _ ____ - ____"
              />
              <small className="form-text text-muted mb-3">
                Telefone de contato do whatsapp.
              </small>
            </div>
          </div>
        </form>
        <div className="form-row">
          <div className="form-group col">
            <button
              type="button"
              onClick={clearStates}
              className="btn btn-outline-secondary col"
              data-dismiss="modal"
            >
              Limpar campos
            </button>
          </div>
          <div className="form-froup col">
            <button
              type="button"
              onClick={addNewClientSchedule}
              className="btn btn-primary col"
            >
              Adicionar
            </button>
          </div>
        </div>

        {alert}

        {errorClientSchedule === true ? (
          <AlertInfo title="Preencha os campos corretmente." />
        ) : null}

        {errorClientSchedule === false ? (
          <AlertSuccess title="Horário adicionado com sucesso." />
        ) : null}
      </div>
    </div>
  );
}
