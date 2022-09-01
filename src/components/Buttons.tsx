export function ClearFields(props) {
  const { callback, title, className } = props;

  return (
    <button
      type="button"
      className={`col mt-2 btn btn-outline-primary mb-2 ${className}`}
      data-toggle="modal"
      onClick={(e) => callback(e)}
    >
      {title}
    </button>
  );
}
