import { InputText } from './input/InputText';
import { ISegment } from '../api/types/Segment';

type InputProps = {
  editSegment: Function;
  title: string;
  actionCreate: Function;
  actionUpdate: Function;
  actionName: string;
  clearStates: any;
  segment: ISegment;
  setNewSegment: Function;
  alert: JSX.Element;
}

export function CardSegment(props: InputProps) {
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
      tabIndex={-1}
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
              onChange={(e: React.BaseSyntheticEvent) =>
                setNewSegment({ name: e.target.value, id: segment.id })
              }
              label="Digite o segmento"
              required={true}
            />
            <div className="modal-footer mt-4">
              <button
                type="reset"
                onClick={() => {
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
