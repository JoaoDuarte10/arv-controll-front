import { InputText } from './input/InputText';

export function CardSegment(props) {
  const {
    editSegment,
    title,
    actionCreate,
    actionUpdate,
    actionName,
    clearStates,
    segment,
    setNewSegment,
    alert,
  } = props;

  return (
    <div
      className="modal fade"
      id="modalSegment"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{title}</h5>
            <button
              type="button"
              className="close"
              onClick={clearStates}
              data-dismiss="modal"
              aria-label="Fechar"
              key={0}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <label htmlFor="name">Segmento</label>
            <InputText
              type="text"
              id="procedure"
              value={segment ? segment.name : ''}
              onChange={(e) =>
                setNewSegment({ name: e.target.value, id: segment.id })
              }
              label="Digite o segmento"
              required={true}
            />
            <div className="modal-footer mt-4">
              <button
                type="reset"
                onClick={(e) => {
                  clearStates();
                  setNewSegment('');
                }}
                className="btn btn-outline-secondary col"
                data-dismiss="modal"
                key={3}
              >
                Fechar
              </button>
              <button
                className="btn btn-primary col"
                type="button"
                onClick={(e) => {
                  editSegment
                    ? actionUpdate(e, segment.name, segment.id)
                    : actionCreate(e, segment.name);
                }}
              >
                {actionName}
              </button>
            </div>
            {alert}
          </div>
        </div>
      </div>
    </div>
  );
}
