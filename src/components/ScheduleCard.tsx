import { WhatsAppService } from '../services/whatsapp-service';

import moment from 'moment';
import { Paper } from '@material-ui/core';
import { randomId } from '../utils/random';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onEditClient } from '../reducers/scheduleSlice';

type InputProps = {
  item: any;
  setId: any;
  setIdScheduleDeleted: any;
  expired: boolean;
}

export function ScheduleCard(props: InputProps) {
  const { item, setId, setIdScheduleDeleted, expired } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Paper elevation={3} key={randomId()}>
      <div className="mb-2 mt-3">
        <div className="card p-2 card-schedule">
          {expired ? (
            <div className="card-header border-bottom pb-2 mb-2">
              <div className="form-row">
                <h6 className="col text-danger font-weight-bold mb-2">
                  Horário Expirado!
                </h6>
              </div>
            </div>
          ) : null}
          <div className="card-header border-bottom pb-2 mb-3">
            <div className="form-row">
              <h6 className="text-primary col font-weight-bold">
                Cliente:{' '}
                <small className="text-muted h6 mb-3">{item.client}</small>
              </h6>
              {item.pacote && (
                <h6 className="col card-subtitle col text-danger font-weight-bold pt-2">
                  Pacote
                </h6>
              )}
            </div>
          </div>
          <div className="list-group-item pb-2">
            <h6 className="card-subtitle text-primary font-weight-bold border-bottom pb-3 pt-2 mb-3">
              Procedimento:{' '}
              <small className="text-muted h6 mb-3">{item.procedure}</small>
            </h6>
            <div className="form-row pt-2 pb-2 mb-2">
              <h6 className="card-subtitle col text-primary font-weight-bold">
                Horário:{' '}
                <small className="text-muted h6 mb-2">{item.time}hrs</small>
              </h6>
              <h6 className="card-subtitle col text-primary font-weight-bold">
                Preço:{' '}
                <small className="text-muted h6 mb-2">
                  {item.price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </small>
              </h6>
            </div>
            <div className="border-top form-row">
              <h6 className="col text-primary font-weight-bold mb-2 pb-2 pt-2 mt-2">
                Data:{' '}
                <small className="text-muted h6 mb-3">
                  {moment(item.date).format('DD/MM/YYYY')}
                </small>
              </h6>
              {item.pacote && (
                <h6 className="col card-subtitle text-primary font-weight-bold pb-2 pt-2 mt-2">
                  Atendimento:{' '}
                  <small className="text-muted h6 mb-2">
                    {item.qtdAtendimento}
                  </small>
                </h6>
              )}
            </div>
          </div>
          <div className="mt-3">
            {item.phone && !item.isDefeated && (
              <button
                type="submit"
                className="col btn btn-outline-success mb-1"
                onClick={(e: React.BaseSyntheticEvent) =>
                  WhatsAppService.redirectToWhatsappWithMessage(
                    e,
                    item.client,
                    item.phone,
                    item.date,
                    item.time,
                    item.qtdTotalAtendimento,
                    item.qtdAtendimento,
                    item.procedure,
                  )
                }
              >
                Confirmar pelo WhatsApp
              </button>
            )}
            <div className="form-row">
              <button
                type="button"
                className="col m-1 btn btn-outline-primary"
                data-toggle="modal"
                data-target="#finalyt-schedule"
                onClick={(e) => setId(item.id)}
              >
                Finalizar
              </button>
              <button
                type="button"
                className="col m-1 btn btn-outline-primary"
                onClick={(e) => {
                  dispatch(
                    onEditClient({
                      id: item.id,
                      client: item.client,
                      procedure: item.procedure,
                      date: item.date,
                      time: item.time,
                      price: item.price,
                      phone: item.phone,
                      pacote: item.pacote,
                      qtdTotalAtendimento: item.qtdTotalAtendimento,
                      qtdAtendimento: item.qtdAtendimento,
                    }),
                  );
                  navigate(`/edit-schedule/${item.id}`);
                }}
              >
                Editar
              </button>
              <button
                type="button"
                className="col m-1 btn btn-outline-danger"
                data-toggle="modal"
                data-target="#delete-client-schedule"
                onClick={(e) => {
                  setIdScheduleDeleted(item.id)
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}
