import { ComboBox } from './ComboBox';
import { InputText } from './input/InputText';

export function SelectPeriod(props) {
  const {
    getSalesInPeriodResponse,
    setDate1,
    setDate2,
    filterByClient,
    setDataClient,
    clearFields,
  } = props;

  return (
    <div className="card mb-4 p-3 shadow bg-white rounded">
      <h4 className="border-bottom pb-2 mb-3">Busca</h4>
      <form onSubmit={(e) => getSalesInPeriodResponse(e)}>
        <div className="form-row d-flex align-items-center">
          <div className="mb-3 col">
            <label>Primeira data</label>
            <InputText
              type="date"
              label=" "
              id="date1"
              onChange={(e) => setDate1(e.target.value)}
            />
          </div>
          <div className="mb-3 col">
            <label>Segunda data</label>
            <InputText
              type="date"
              label=" "
              id="date2"
              onChange={(e) => setDate2(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          {filterByClient !== null ? (
            <ComboBox
              title="Selecionar Cliente"
              options={filterByClient.map((item) => item.name)}
              selectValue={(e, item) => setDataClient(e, item)}
            />
          ) : (
            <ComboBox
              title="Selecionar Cliente"
              options={[]}
              selectValue={(e, item) => setDataClient(e, item)}
            />
          )}
        </div>
        <div className="form-row">
          <div className="col">
            <button
              type="button"
              className="btn btn-outline-secondary mb-1 col"
              onClick={clearFields}
            >
              Limpar filtros
            </button>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary mb-1 col">
              Buscar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
