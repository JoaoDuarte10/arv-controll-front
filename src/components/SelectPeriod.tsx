import { IClient } from '../api/types/Client';
import { ComboBox } from './ComboBox';
import { SearchFilterButton } from './buttons/SearchFilter';
import { ClearSearchFilterButton } from './buttons/ClearSearchFilter';
import { InputDate } from './input/InputDate';

type InputProps = {
  getSalesInPeriodResponse: Function;
  setDate1: Function;
  setDate2: Function;
  filterByClient: IClient[];
  setDataClient: any;
  clearFields: any;
}

function clearAllFilters() {
  const filterByDateElement = document.getElementById('filterByDate');
  const filterByPeriod = document.getElementById('filterByPeriod');
  const filterByDateInPeriod = document.getElementById('filterByDateInPeriod');
  const filterByDateInPeriod2 = document.getElementById('filterByDateInPeriod2');
  const filterByClient = document.getElementById('filterByClient');
  const date1Element = document.getElementById('date1Period') as HTMLInputElement | null;

  if (filterByClient) filterByClient.style.display = 'none';
  if (filterByPeriod) filterByPeriod.style.display = 'none';
  if (filterByDateInPeriod) filterByDateInPeriod.style.display = 'none';
  if (filterByDateInPeriod2) filterByDateInPeriod2.style.display = 'none';
  if (filterByDateElement) filterByDateElement.style.display = 'none';
  if (date1Element) date1Element.value = '';
}

function FetchSalesButton(props: { onClick: any }) {
  return (
    <button
      className="btn btn-primary mb-1"
      onClick={props.onClick}
    >
      Buscar
    </button>
  )
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
    <div className="mb-4 rounded">
      <div className="pb-2"
        style={{
          overflow: 'auto',
          whiteSpace: 'nowrap',
          display: 'block',
          alignItems: 'center'
        }}
      >
        <SearchFilterButton
          onClick={(e: React.BaseSyntheticEvent) => {
            const filterByDateElement = document.getElementById('filterByDate');
            const filterByPeriod = document.getElementById('filterByPeriod');
            const filterByDateInPeriod = document.getElementById('filterByDateInPeriod');
            const filterByDateInPeriod2 = document.getElementById('filterByDateInPeriod2');
            const filterByClient = document.getElementById('filterByClient');

            if (filterByDateElement) filterByDateElement.style.display = 'block';
            if (filterByPeriod) filterByPeriod.style.display = 'none';
            if (filterByDateInPeriod) filterByDateInPeriod.style.display = 'none';
            if (filterByDateInPeriod2) filterByDateInPeriod2.style.display = 'none';
            if (filterByClient) filterByClient.style.display = 'none';
          }}
          text='Data'
        />

        <SearchFilterButton
          onClick={(e: React.BaseSyntheticEvent) => {
            const filterByDateElement = document.getElementById('filterByDate');
            const filterByPeriod = document.getElementById('filterByPeriod');
            const filterByDateInPeriod = document.getElementById('filterByDateInPeriod');
            const filterByDateInPeriod2 = document.getElementById('filterByDateInPeriod2');
            const filterByClient = document.getElementById('filterByClient');

            if (filterByDateElement) filterByDateElement.style.display = 'none';
            if (filterByDateInPeriod) filterByDateInPeriod.style.display = 'block';
            if (filterByDateInPeriod2) filterByDateInPeriod2.style.display = 'block';
            if (filterByPeriod) filterByPeriod.style.display = 'flex';
            if (filterByClient) filterByClient.style.display = 'none';
          }}
          text='Período'
        />

        <SearchFilterButton
          onClick={(e: React.BaseSyntheticEvent) => {
            const filterByDateElement = document.getElementById('filterByDate');
            const filterByPeriod = document.getElementById('filterByPeriod');
            const filterByDateInPeriod = document.getElementById('filterByDateInPeriod');
            const filterByDateInPeriod2 = document.getElementById('filterByDateInPeriod2');
            const filterByClient = document.getElementById('filterByClient');

            if (filterByDateInPeriod) filterByDateInPeriod.style.display = 'none';
            if (filterByPeriod) filterByPeriod.style.display = 'none';
            if (filterByDateInPeriod2) filterByDateInPeriod2.style.display = 'none';
            if (filterByDateElement) filterByDateElement.style.display = 'none';
            if (filterByClient) filterByClient.style.display = 'block';
          }}
          text='Cliente'
        />

        <ClearSearchFilterButton
          onClick={(e: React.BaseSyntheticEvent) => {
            clearFields(e)
            clearAllFilters()
          }}
        />
      </div>

      <div
        // className="form-row d-flex align-items-center"
        style={{
          display: 'none',
          flexDirection: 'column'
          // maxWidth: '360px',
        }}
        id='filterByPeriod'
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '300px',
          }}
        >
          <InputDate
            idComponent='filterByDateInPeriod'
            idInput='date1Period'
            text='Início'
            onChange={(e: React.BaseSyntheticEvent) => setDate1(e.target.value)}
          // style={{ display: 'none' }}
          />

          <InputDate
            idComponent='filterByDateInPeriod2'
            idInput='date2'
            text='Término'
            onChange={(e: React.BaseSyntheticEvent) => setDate2(e.target.value)}
          // style={{ display: 'none' }}
          />
        </div>
        <div style={{
          display: 'flex'
        }}>
          <FetchSalesButton onClick={(e: React.BaseSyntheticEvent) => {
            getSalesInPeriodResponse(e)
            clearAllFilters()
          }} />
        </div>
      </div>


      <div
        style={{
          display: 'none',
        }}
        id='filterByDate'
      >
        <InputDate
          idComponent='date1InputDate'
          idInput='date1'
          text='Data'
          onChange={(e: React.BaseSyntheticEvent) => setDate1(e.target.value)}
        />
        <FetchSalesButton onClick={(e: React.BaseSyntheticEvent) => {
          getSalesInPeriodResponse(e)
          clearAllFilters()
        }} />
      </div>

      <div
        style={{
          maxWidth: '330px',
          display: 'none'
        }}
        className="mt-4 mb-4"
        id='filterByClient'
      >
        {filterByClient !== null ? (
          <div>
            <ComboBox
              title="Digite o nome do cliente..."
              options={filterByClient.map((item) => item.name)}
              selectValue={(e: React.BaseSyntheticEvent, item: string) => setDataClient(e, item)}
              className='mb-3'
            />
            <FetchSalesButton onClick={(e: React.BaseSyntheticEvent) => {
              getSalesInPeriodResponse(e)
              clearAllFilters()
            }} />
          </div>
        ) : (
          <ComboBox
            title="Digite o nome do cliente..."
            options={[]}
            selectValue={(e: React.BaseSyntheticEvent, item: string) => setDataClient(e, item)}
          />
        )}
      </div>
    </div>
  );
}
