import { IClient } from '../api/types/Client';
import { ComboBox } from './ComboBox';
import { InputText } from './input/InputText';
import { LabelForm } from './labels/LabelForm';

type InputProps = {
  getSalesInPeriodResponse: Function;
  setDate1: Function;
  setDate2: Function;
  filterByClient: IClient[];
  setDataClient: any;
  clearFields: any;
}

export function SelectPeriod(props: InputProps) {
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
            <LabelForm text='Primeira data' />

            <InputText
              type="date"
              label=" "
              id="date1"
              onChange={(e: React.BaseSyntheticEvent) => setDate1(e.target.value)}
            />
          </div>
          <div className="mb-3 col">
            <LabelForm text='Segunda data' />

            <InputText
              type="date"
              label=" "
              id="date2"
              onChange={(e: React.BaseSyntheticEvent) => setDate2(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          {filterByClient !== null ? (
            <ComboBox
              title="Selecionar Cliente"
              options={filterByClient.map((item) => item.name)}
              selectValue={(e: React.BaseSyntheticEvent, item: string) => setDataClient(e, item)}
            />
          ) : (
            <ComboBox
              title="Selecionar Cliente"
              options={[]}
              selectValue={(e: React.BaseSyntheticEvent, item: string) => setDataClient(e, item)}
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
