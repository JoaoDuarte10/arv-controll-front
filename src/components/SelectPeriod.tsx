import { IClient } from '../api/types/Client';
import { ComboBox } from './ComboBox';
import { SearchFilterButton } from './buttons/SearchFilter';
import { ClearSearchFilterButton } from './buttons/ClearSearchFilter';
import { InputDate } from './input/InputDate';
import { SearchButton } from './buttons/SearchButton';
import { LabelForm } from './labels/LabelForm';

type InputProps = {
  getSalesInPeriodResponse: Function;
  setDate1: Function;
  setDate2: Function;
  filterByClient: IClient[];
  setDataClient: any;
  clearFields: any;
};

function clearDate1() {
  const date1Element = document.getElementById(
    'date1Period',
  ) as HTMLInputElement | null;
  if (date1Element) date1Element.value = '';
}

function clearAllFilters() {
  const filterByDateElement = document.getElementById('filterByDate');
  const filterByPeriod = document.getElementById('filterByPeriod');
  const filterByDateInPeriod = document.getElementById('filterByDateInPeriod');
  const filterByDateInPeriod2 = document.getElementById(
    'filterByDateInPeriod2',
  );
  const filterByClient = document.getElementById('filterByClient');
  const inputClientElement = document.querySelector(
    '#filterByClient > div > div > div > div > div > button',
  ) as HTMLElement;

  if (inputClientElement) inputClientElement.click();
  if (filterByClient) filterByClient.style.display = 'none';
  if (filterByPeriod) filterByPeriod.style.display = 'none';
  if (filterByDateInPeriod) filterByDateInPeriod.style.display = 'none';
  if (filterByDateInPeriod2) filterByDateInPeriod2.style.display = 'none';
  if (filterByDateElement) filterByDateElement.style.display = 'none';
  clearDate1();
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
      <div
        className="pb-2"
        style={{
          overflow: 'auto',
          whiteSpace: 'nowrap',
          display: 'block',
          alignItems: 'center',
        }}
      >
        <SearchFilterButton
          onClick={(e: React.BaseSyntheticEvent) => {
            clearFields(e);
            clearDate1();
            const filterByDateElement = document.getElementById('filterByDate');
            const filterByPeriod = document.getElementById('filterByPeriod');
            const filterByDateInPeriod = document.getElementById(
              'filterByDateInPeriod',
            );
            const filterByDateInPeriod2 = document.getElementById(
              'filterByDateInPeriod2',
            );
            const filterByClient = document.getElementById('filterByClient');

            if (filterByDateElement?.style.display === 'block') {
              filterByDateElement.style.display = 'none';
            } else {
              if (filterByDateElement)
                filterByDateElement.style.display = 'block';
            }

            if (filterByPeriod) filterByPeriod.style.display = 'none';
            if (filterByDateInPeriod)
              filterByDateInPeriod.style.display = 'none';
            if (filterByDateInPeriod2)
              filterByDateInPeriod2.style.display = 'none';
            if (filterByClient) filterByClient.style.display = 'none';
          }}
          text="Data"
        />

        <SearchFilterButton
          onClick={(e: React.BaseSyntheticEvent) => {
            clearFields(e);
            clearDate1();
            const filterByDateElement = document.getElementById('filterByDate');
            const filterByPeriod = document.getElementById('filterByPeriod');
            const filterByDateInPeriod = document.getElementById(
              'filterByDateInPeriod',
            );
            const filterByDateInPeriod2 = document.getElementById(
              'filterByDateInPeriod2',
            );
            const filterByClient = document.getElementById('filterByClient');

            if (filterByDateElement) filterByDateElement.style.display = 'none';

            if (filterByPeriod?.style.display === 'flex') {
              filterByPeriod.style.display = 'none';
            } else {
              if (filterByPeriod) filterByPeriod.style.display = 'flex';
              if (filterByDateInPeriod)
                filterByDateInPeriod.style.display = 'block';
              if (filterByDateInPeriod2)
                filterByDateInPeriod2.style.display = 'block';
            }

            if (filterByClient) filterByClient.style.display = 'none';
          }}
          text="Período"
        />

        <SearchFilterButton
          onClick={(e: React.BaseSyntheticEvent) => {
            clearFields(e);
            clearDate1();
            const filterByDateElement = document.getElementById('filterByDate');
            const filterByPeriod = document.getElementById('filterByPeriod');
            const filterByDateInPeriod = document.getElementById(
              'filterByDateInPeriod',
            );
            const filterByDateInPeriod2 = document.getElementById(
              'filterByDateInPeriod2',
            );
            const filterByClient = document.getElementById('filterByClient');

            if (filterByDateInPeriod)
              filterByDateInPeriod.style.display = 'none';
            if (filterByPeriod) filterByPeriod.style.display = 'none';
            if (filterByDateInPeriod2)
              filterByDateInPeriod2.style.display = 'none';
            if (filterByDateElement) filterByDateElement.style.display = 'none';

            if (filterByClient?.style.display === 'block') {
              filterByClient.style.display = 'none';
            } else {
              if (filterByClient) filterByClient.style.display = 'block';
            }
          }}
          text="Cliente"
        />

        <ClearSearchFilterButton
          onClick={(e: React.BaseSyntheticEvent) => {
            clearFields(e);
            clearAllFilters();
          }}
        />
      </div>

      <div
        style={{
          display: 'none',
        }}
        id="filterByDate"
        className="shadow-sm p-3"
      >
        <LabelForm text="Data" />
        <div
          style={{
            display: 'flex',
          }}
        >
          <InputDate
            idComponent="date1InputDate"
            idInput="date1"
            onChange={(e: React.BaseSyntheticEvent) => setDate1(e.target.value)}
            className=""
          />
          <SearchButton
            onClick={(e: React.BaseSyntheticEvent) => {
              getSalesInPeriodResponse(e);
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'none',
          flexDirection: 'column',
        }}
        id="filterByPeriod"
        className="shadow-sm p-3"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '360px',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'block',
            }}
          >
            <LabelForm text="Inicial" />
            <InputDate
              idComponent="filterByDateInPeriod"
              idInput="date1Period"
              onChange={(e: React.BaseSyntheticEvent) =>
                setDate1(e.target.value)
              }
            />
          </div>

          <div
            style={{
              display: 'block',
            }}
          >
            <LabelForm text="Final" />
            <InputDate
              idComponent="filterByDateInPeriod2"
              idInput="date2"
              onChange={(e: React.BaseSyntheticEvent) =>
                setDate2(e.target.value)
              }
            />
          </div>
          <SearchButton
            onClick={(e: React.BaseSyntheticEvent) => {
              getSalesInPeriodResponse(e);
            }}
            style={{
              height: '55px',
            }}
          />
        </div>
      </div>

      <div
        className="mt-4 mb-4 shadow p-3"
        style={{
          display: 'none',
        }}
        id="filterByClient"
      >
        {filterByClient !== null ? (
          <div
            style={{
              display: 'flex',
            }}
          >
            <ComboBox
              title="Digite o nome do cliente..."
              options={filterByClient.map((item) => item.name)}
              selectValue={(e: React.BaseSyntheticEvent, item: string) =>
                setDataClient(e, item)
              }
              style={{
                width: '300px',
              }}
            />
            <SearchButton
              onClick={(e: React.BaseSyntheticEvent) => {
                getSalesInPeriodResponse(e);
              }}
            />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
            }}
          >
            <ComboBox
              title="Digite o nome do cliente..."
              options={[]}
              selectValue={(e: React.BaseSyntheticEvent, item: string) =>
                setDataClient(e, item)
              }
              style={{
                width: '300px',
              }}
            />
            <SearchButton
              onClick={(e: React.BaseSyntheticEvent) => {
                getSalesInPeriodResponse(e);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
