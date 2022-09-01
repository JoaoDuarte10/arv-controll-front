import '../css/main.css';

import React from 'react';

function TopModal(props) {
  return (
    <div
      className="modal fade"
      id={props.id}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-toggle="modal"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {props.title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Fechar"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body mb-2 mt-2">{props.body}</div>
          <div className="modal-footer">
            {props.button && (
              <button
                type="button"
                onClick={props.click}
                data-target={props.data_target}
                className={props.className}
                data-dismiss="modal"
              >
                {props.button}
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { TopModal };
