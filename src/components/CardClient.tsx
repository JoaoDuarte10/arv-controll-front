import { Paper } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { WhatsAppService } from '../services/whatsapp-service';
import { randomId } from '../utils/random';

export function CardClients(props) {
  const { clients, setId } = props;

  return clients
    ? clients.map((item) => {
        return (
          <Paper elevation={3} key={randomId()}>
            <div
              className="accordion mt-2 mb-3"
              id="accordionExample"
              key={randomId()}
            >
              <div className="card p-2 border-bottom">
                <div className="card-header">
                  <div
                    className="form-row"
                    id="headingOne"
                    data-toggle="collapse"
                    data-target={`#${item.id}`}
                    aria-expanded="false"
                    aria-controls={`${item.id}`}
                  >
                    <h6 className="text-primary font-weight-bold pt-2 col">
                      Cliente:{' '}
                      <small className="text-muted h6">{item.name}</small>
                    </h6>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="#0d6efd"
                      className="bi bi-arrows-angle-expand col-end"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  id={`${item.id}`}
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div className="list-group-item p-3 mt-2">
                    {item.email ? (
                      <h6 className="card-subtitle text-primary font-weight-bold border-bottom pb-3 pt-2 mb-3">
                        E-mail:{' '}
                        <small className="text-muted h6 mb-3">
                          {item.email}
                        </small>
                      </h6>
                    ) : null}
                    <h6 className="card-subtitle text-primary font-weight-bold pt-2">
                      Telefone:{' '}
                      <small className="text-muted h6 mb-3">{item.phone}</small>
                    </h6>
                    {item.segment ? (
                      <h6 className="card-subtitle text-primary font-weight-bold pt-3 pb-2 mt-3 border-top ">
                        Segmento:{' '}
                        <small className="text-muted h6 mb-3">
                          {item.segment}
                        </small>
                      </h6>
                    ) : null}
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="col btn btn-outline-success mb-1"
                      onClick={(e) =>
                        WhatsAppService.redirectToWhatsapp(e, item.phone)
                      }
                      key={randomId()}
                    >
                      Chamar no WhatsApp
                    </button>
                    <div className="form-row">
                      <Link className="col" to={`/editClient/${item.id}`}>
                        <button
                          type="button"
                          className="col mt-1 btn btn-outline-primary"
                          key={randomId()}
                        >
                          Editar
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="col m-1 btn btn-outline-danger"
                        data-toggle="modal"
                        data-target="#delete-client"
                        onClick={(e) => setId(item.id)}
                        key={randomId()}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        );
      })
    : null;
}
