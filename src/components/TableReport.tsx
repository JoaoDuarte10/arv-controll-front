import { AlertInfo } from './alerts/AlertInfo';

function TableReport(props) {
  const { clientSales } = props;

  return (
    <div className="collapse table-responsive-sm" id={props.id}>
      {clientSales.length > 0 ? (
        <div>
          <table className="table table-bordered mt-3 mb-0">
            <thead className="thead-dark header-table">
              <tr>
                <th>Cliente</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {clientSales.map((item) => {
                return (
                  <tr>
                    <td className="row-table">
                      <button
                        type="button"
                        className="card border-0 col bg-transparent"
                        data-toggle="modal"
                        data-target="#finalyt-schedule"
                      >
                        {item.client}
                      </button>
                    </td>
                    <td className="row-table">{item.description}</td>
                    <td className="row-table">
                      {new Date(item.date).toLocaleDateString('pt-BR', {
                        timeZone: 'UTC',
                      })}
                    </td>
                    <td className="row-table">{item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <small className="text-muted mb-3">
            Clique no nome do cliente para buscar por ele.
          </small>
        </div>
      ) : (
        <AlertInfo title="Nenhuma venda com clientes foi feita nos últimos 10 dias." />
      )}
    </div>
  );
}

export { TableReport };
