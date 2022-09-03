import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { scheduleClientService } from '../services/scheduleClientService';
import { scheduleService } from '../services/scheduleService';
import { TopModal } from '../components/TopModal';
import moment from 'moment';

import { NewSchedule } from '../components/newSchedule';
import { useSelector } from 'react-redux';
import { TitlePage } from '../components/TitlePage';

function ScheduleClient() {
  const auth = useSelector((state) => state.authenticated);
  let navigate = useNavigate();

  const [scheduleClients, setScheduleClients] = useState([]);
  const [id, setId] = useState(null);

  const [client, setClient] = useState('');
  const [procedure, setProcedure] = useState('');
  const [dateNewSchedule, setDateNewSchedule] = useState(null);
  const [time, setTime] = useState(null);
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');
  const [errorClientSchedule, setErrorClientSchedule] = useState(null);

  useEffect(() => {
    if (!auth.userId) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }

    getScheduleClient();
  }, [auth, navigate]);

  const clearStates = () => {
    setClient('');
    setProcedure('');
    setDateNewSchedule('');
    setTime('');
    setPrice('');
    setContact('');
    setId('');
  };

  async function getScheduleClient() {
    const findSchedules = await scheduleClientService.getClientsSchedule(
      auth.userId,
    );
    setScheduleClients(findSchedules);
  }

  const redirectToWhatsapp = (event: React.BaseSyntheticEvent, contact: string) => {
    event.preventDefault();
    const URL = `https://api.whatsapp.com/send?phone=55${contact}`;
    const redirect = window.encodeURIComponent();
    window.open(URL + redirect, '_blank');
  };

  const deleteScheduleClient = async (event: React.BaseSyntheticEvent, id: string) => {
    event.preventDefault();
    const deleteClient = await scheduleClientService.deleteClientSchedule(
      auth.userId,
      id,
    );

    if (deleteClient.type === 'success') {
      getScheduleClient();
      return;
    }
  };

  const addNewClientSchedule = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    const errorTypes = ['inputs_invalids', 'error'];
    const postClientsSchedule = await scheduleService.addClientSchedule(
      auth.userId,
      client,
      procedure,
      dateNewSchedule,
      time,
      price,
      contact,
    );

    if (postClientsSchedule.type === 'success') {
      setErrorClientSchedule(false);
      clearStates();
      deleteScheduleClient(event, id);
    }

    if (errorTypes.includes(postClientsSchedule.type)) {
      setErrorClientSchedule(true);
    }
  };

  const addNewSchedule = (
    event: React.BaseSyntheticEvent,
    id: string,
    itemClient: string,
    itemProcedure: string,
    itemDate: string,
    itemTime: string,
    itemPhone: string,
  ) => {
    event.preventDefault();
    setClient(itemClient);
    setProcedure(itemProcedure);
    setDateNewSchedule(itemDate);
    setTime(itemTime);
    setContact(itemPhone);
    setId(id);
  };

  return (
    <div className="container-main">

      <TitlePage title='Agendar Novo Horário' />

      <TopModal
        className="btn btn-danger"
        id="delete-client"
        title="Excluir horário?"
        body="Tem certeza que deseja excluir esse horário?"
        click={(e) => deleteScheduleClient(e, id)}
        button="Excluir"
      />

      <div
        className="modal fade"
        id="ExemploModalCentralizado"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="TituloModalCentralizado"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="TituloModalCentralizado">
                Adicionar Novo Horário
              </h5>
              <button
                type="button"
                className="close"
                onClick={clearStates}
                data-dismiss="modal"
                aria-label="Fechar"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <NewSchedule
              client={client}
              setClient={setClient}
              procedure={procedure}
              setProcedure={setProcedure}
              dateNewSchedule={dateNewSchedule}
              setDateNewSchedule={setDateNewSchedule}
              time={time}
              setTime={setTime}
              price={price}
              setPrice={setPrice}
              contact={contact}
              setContact={setContact}
              clearStates={clearStates}
              addNewClientSchedule={(e) => addNewClientSchedule(e)}
              errorClientSchedule={errorClientSchedule}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="d-inline">
          <strong>Quantidade de pedidos: </strong>
          <div className="d-inline mb-3">{scheduleClients.length}</div>
        </div>
        {scheduleClients.length > 0 ? (
          scheduleClients.map((item) => {
            return (
              <div className="card p-2 border-bottom mb-2 mt-2">
                <div
                  className="card-header"
                  id="headingOne"
                  data-toggle="collapse"
                  data-target={`#${item._id}`}
                  aria-expanded="false"
                  aria-controls={`${item._id}`}
                >
                  <h6 className="text-primary font-weight-bold pt-2">
                    Cliente:{' '}
                    <small className="text-muted h6">{item.name}</small>
                  </h6>
                </div>
                <div
                  id={`${item._id}`}
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div className="list-group-item p-3 mt-2">
                    <h6 className="card-subtitle text-primary font-weight-bold border-bottom pb-3 pt-2 mb-3">
                      Serviço:{' '}
                      <small className="text-muted h6 mb-3">
                        {item.service}
                      </small>
                    </h6>
                    <h6 className="card-subtitle text-primary font-weight-bold pt-2">
                      Telefone:{' '}
                      <small className="text-muted h6 mb-3">{item.phone}</small>
                    </h6>
                    <h6 className="card-subtitle text-primary font-weight-bold pt-3 pb-2 mt-3 border-top ">
                      Data:{' '}
                      <small className="text-muted h6 mb-3">
                        {new Date(item.date).toLocaleDateString('pt-BR', {
                          timeZone: 'UTC',
                        })}
                      </small>
                    </h6>
                    <h6 className="card-subtitle text-primary font-weight-bold pt-3 pb-2 mt-3 border-top ">
                      Horário:{' '}
                      <small className="text-muted h6 mb-3">
                        {item.time} hrs
                      </small>
                    </h6>
                    <h6 className="card-subtitle text-primary font-weight-bold pt-3 pb-2 mt-3 border-top ">
                      Horário do pedido:{' '}
                      <small className="text-muted h6 mb-3">
                        {moment(new Date(item.createdAt)).format(
                          'DD/MM/YYYY - HH:mm',
                        )}
                      </small>
                    </h6>
                  </div>
                  <button
                    type="submit"
                    className="col mt-4 btn btn-outline-success"
                    onClick={(e) => redirectToWhatsapp(e, item.phone)}
                  >
                    WhatsApp
                  </button>
                  <div className="form-row mt-1">
                    <button
                      type="submit"
                      className="col m-1 btn btn-outline-primary"
                      data-toggle="modal"
                      data-target="#ExemploModalCentralizado"
                      onClick={(e) =>
                        addNewSchedule(
                          e,
                          item._id,
                          item.name,
                          item.service,
                          item.date,
                          item.time,
                          item.phone,
                        )
                      }
                    >
                      Agendar
                    </button>
                    <button
                      type="button"
                      className="col m-1 btn btn-outline-danger"
                      data-toggle="modal"
                      data-target="#delete-client"
                      onClick={(e) => setId(item._id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h5 className="mt-3">Não há nenhum novo horário!</h5>
        )}
      </div>
    </div>
  );
}

export { ScheduleClient };
