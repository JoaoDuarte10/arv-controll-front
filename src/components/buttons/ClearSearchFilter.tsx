type InputProps = {
  onClick: any;
};

export function ClearSearchFilterButton(props: InputProps) {
  return (
    <div
      className="mt-2 mr-2 mb-2"
      style={{
        display: 'inline-block',
      }}
    >
      <button
        className="btn btn-outline-warning font-weight-bold"
        style={{
          borderRadius: '15px',
          border: '2px solid'
        }}
        onClick={props.onClick}
      >
        Limpar fitros
      </button>
    </div>
  );
}
