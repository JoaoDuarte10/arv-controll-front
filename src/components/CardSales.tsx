import { randomId } from '../utils/random';
import { ISales } from '../api/types/Sales';

type InputProps = {
  sales: ISales[];
  title: string;
};

export function CardSales(props: InputProps) {
  const { sales, title } = props;

  const nameClient = [
    ...new Set(
      sales.filter((item) => !!item.client).map((item) => item.client),
    ),
  ].map((item) => {
    return (
      <div className="d-inline-block pr-2" key={randomId()}>
        {item},
      </div>
    );
  });

  return (
    <div className="card border-bottom p-2 mb-3" key={randomId()}>
      <div className="card-header">
        <h6 className="font-weight-bold pt-2">{title}</h6>
      </div>
      <div className="card-body border mt-2">
        <h6 className="card-subtitle text-primary pt-2 font-weight-bold pb-3 border-bottom">
          Ganhos:{' '}
          <small className="text-muted h6 mb-3">
            {sales
              .filter((item) => !!item)
              .map(
                (item) =>
                  parseInt(item.price.substring(2).replace(/\.|,/g, '')) / 100,
              )
              .reduce((acc, item) => acc + item, 0)
              .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </small>
        </h6>
        <h6 className="card-subtitle text-primary font-weight-bold pt-2 pb-3 mt-3 border-bottom">
          Vendas: <small className="text-muted h6 mb-3">{sales.length}</small>
        </h6>
        <h6 className="card-subtitle text-primary font-weight-bold pt-2 pb-3 mt-3 border-bottom">
          Média por venda:{' '}
          <small className="text-muted h6 mb-3">
            {Math.round(
              sales
                .filter((item) => !!item)
                .map(
                  (item) =>
                    parseInt(item.price.substring(2).replace(/\.|,/g, '')) /
                    100,
                )
                .reduce((acc, item) => acc + item, 0) / sales.length,
            ).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </small>
        </h6>
        <h6 className="card-subtitle text-primary font-weight-bold pt-2 pb-3 mt-3 border-bottom">
          Maior venda:{' '}
          <small className="text-muted h6 mb-3">
            {sales
              .filter((item) => !!item)
              .map(
                (item) =>
                  parseInt(item.price.substring(2).replace(/\.|,/g, '')) / 100,
              )
              .sort((a, b) => b - a)[0]
              .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </small>
        </h6>
        <h6 className="card-subtitle text-primary font-weight-bold pt-2 pb-3 mt-3 border-bottom">
          Menor venda:{' '}
          <small className="text-muted h6 mb-3">
            {sales
              .filter((item) => !!item)
              .map(
                (item) =>
                  parseInt(item.price.substring(2).replace(/\.|,/g, '')) / 100,
              )
              .sort((a, b) => a - b)[0]
              .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </small>
        </h6>
        <h6 className="card-subtitle text-primary font-weight-bold pt-2 pb-2 mt-3">
          Clientes atendidos:
        </h6>
        <small className="text-muted h6 mb-3">{nameClient}</small>
        <h6 className="card-subtitle text-primary font-weight-bold pt-4 pb-2 mt-3 border-top">
          Número de clientes atendidos:{' '}
          <small className="text-muted h6 mb-3">{nameClient.length}</small>
        </h6>
      </div>
    </div>
  );
}
