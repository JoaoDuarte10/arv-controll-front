import '../css/main.css';

type InputProps = {
  id: string;
  title: string;
  button: string;
  click: any;
  data_target?: string;
  body: any;
  className: string;
}

export function TopModal(props: InputProps) {
  const {
    id,
    title,
    button,
    click,
    data_target,
    body,
    className
  } = props;

  return (
    <div
      className="modal fade"
      id={id}
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
              {title}
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
          <div className="modal-body mb-2 mt-2">{body}</div>
          <div className="modal-footer">
            {button && (
              <button
                type="button"
                onClick={click}
                data-target={data_target}
                className={className}
                data-dismiss="modal"
              >
                {button}
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
