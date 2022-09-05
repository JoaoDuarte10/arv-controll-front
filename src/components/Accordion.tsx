type InputProps = {
  id: string;
  title: string;
  body1: any;
  body2: any;
};

export function Accordion(props: InputProps) {
  const { id, title, body1, body2 } = props;
  return (
    <div className="accordion" id={id}>
      <div className="card border p-2">
        <div
          className="card-header mb-2"
          id="headingOne"
          data-toggle="collapse"
          data-target={`#${id}`}
          aria-expanded="true"
          aria-controls={id}
        >
          <h5 className="pt-2">{title}</h5>
        </div>
        <div
          className="card-body p-2 collapse"
          id={id}
          aria-labelledby="headingOne"
          data-parent={id}
        >
          {body1}
          {body2}
        </div>
      </div>
    </div>
  );
}
