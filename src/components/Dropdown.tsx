import { randomId } from '../utils/random';

type InputProps = {
  title: string;
  options: any[];
  selectValue: any;
  className?: string;
  style?: React.CSSProperties
}

export function Dropdown(props: InputProps) {
  const { title, options, selectValue, className, style } = props;

  return (
    <div className="card border-0">
      <button
        style={style}
        className={`btn btn-outline-primary text-left p-2 ${className}`}
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <div className="form-row">
          <div className="col">{title}</div>
          <div className="dropdown-toggle col-end"></div>
        </div>
      </button>
      <div
        className="dropdown-menu col"
        aria-labelledby="dropdownMenuButton"
        id="select-clients"
      >
        <div className="dropdown-item">
          {options
            ? options.map((item) => {
                return (
                  <button
                    type="button"
                    onClick={(e) => selectValue(e, item)}
                    className="card p-2 mb-2 border-0 col"
                    data-toggle="collapse"
                    data-target="#collapseSelectForClient"
                    aria-expanded="false"
                    aria-controls="collapseSelectForClient"
                    key={randomId()}
                  >
                    {item.name}
                  </button>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
