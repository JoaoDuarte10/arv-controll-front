import { IClientHistory } from '../api/types/ClientHistory';

type InputProps = {
  clientHistory: IClientHistory[];
};

export function TableHistory(props: InputProps) {
  const { clientHistory } = props;

  return (
    <div className="table-responsive-sm">
      <table className="table table-bordered mt-3 mb-0">
        <thead className="thead-dark header-table">
          <tr>
            <th>Cliente</th>
            <th>Descrição</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {clientHistory.map((item) => {
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
