import React from 'react';
import { WhatsAppService } from '../services/whatsapp-service';
import { randomId } from '../utils/random';

import { Link } from 'react-router-dom';
import { IClient } from '../api/types/Client';

type InputProps = {
  clients: IClient[];
  setId: any;
};

export function CardClients(props: InputProps) {
  const { clients, setId } = props;

  return (
    <div>
      {clients
        ? clients.map((item) => {
            return (
              <React.Fragment key={randomId()}>
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
                          <small className="text-muted h6 mb-3">
                            {item.phone}
                          </small>
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
                          className="col btn btn-outline-success mb-1 font-weight-bold"
                          onClick={(e) =>
                            WhatsAppService.redirectToWhatsapp(e, item.phone)
                          }
                          key={randomId()}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <div className="pr-2">WhatsApp</div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-whatsapp"
                            viewBox="0 0 16 16"
                          >
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                          </svg>
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
              </React.Fragment>
            );
          })
        : null}
    </div>
  );
}
