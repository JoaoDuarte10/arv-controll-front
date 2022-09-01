import { randomId } from '../utils/random';

export function TableSales(props) {
  const { sales } = props;

  return (
    <div className="table-responsive-sm" style={{ maxHeight: '700px' }}>
      <table className="table table-bordered mt-3">
        <thead className="thead-dark header-table">
          <tr>
            <th>Cliente</th>
            <th>Descrição</th>
            <th>Data</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((item) => {
            return (
              <tr key={randomId()}>
                <td className="row-table">{item.client}</td>
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
    </div>
  );
}
