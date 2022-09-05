import { ComboBox } from './ComboBox';
import { InputText } from './input/InputText';
import InputMask from 'react-input-mask';
import { useGetSegmentsQuery } from '../api/ApiSlice';
import { ISegment } from '../api/types/Segment';
import { LabelForm } from './labels/LabelForm';

type InputProps = {
  edit?: boolean;
  clearStates: any;
  name: string;
  setName: any;
  email: string;
  setEmail: any;
  phone: string;
  setPhone: any;
  setSegmentSelect: any;
  segmentSelect: string;
  onChangeClient: any;
  alert: JSX.Element | null;
};

export function FormClients(props: InputProps) {
  const { data: segments = [] } = useGetSegmentsQuery('');

  const {
    edit,
    clearStates,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    setSegmentSelect,
    segmentSelect,
    onChangeClient,
    alert,
  } = props;

  return (
    <div className="modal-content">
      <div className="modal-header">
        {edit ? (
          <h5 className="modal-title">Editar</h5>
        ) : (
          <h5 className="modal-title">Criar</h5>
        )}
      </div>
      <div className="modal-body">
        <form>
          <LabelForm text="Nome" />

          <InputText
            type="text"
            className="mb-3"
            id="client"
            value={name}
            onChange={(e: React.BaseSyntheticEvent) => setName(e.target.value)}
            label="Digite o nome do cliente"
          />
          <LabelForm text="E-mail" />

          <InputText
            type="text"
            className="mb-2"
            id="procedure"
            value={email}
            onChange={(e: React.BaseSyntheticEvent) => setEmail(e.target.value)}
            label="Digite o email"
          />
          <LabelForm text="Telefone" />

          <InputMask
            type="text"
            form="currency"
            className="form-control mb-2 p-3"
            value={phone}
            id="contact"
            mask="(99) 9 9999-9999"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(__) _ ____ - ____"
            required={true}
          />
          {segments && segments.length > 0 && (
            <div>
              <LabelForm text="Segmento" />
              <ComboBox
                title="Selecionar Segmento"
                options={segments.map((item: ISegment) => item.segment)}
                selectValue={(e: React.BaseSyntheticEvent, item: string) =>
                  setSegmentSelect(item)
                }
              />
            </div>
          )}

          {segmentSelect && (
            <div className="text-primary font-weight-bold ml-1 mt-3 mb-2">
              Selecionado:{' '}
              <small className="text-muted h6 mb-3">
                {segmentSelect || 'Nenhum'}
              </small>
            </div>
          )}
          <div className="form-row mt-4">
            <div className="form-group col">
              <button
                type="reset"
                onClick={clearStates}
                className="btn btn-outline-secondary col"
                data-dismiss="modal"
                key={3}
              >
                Limpar campos
              </button>
            </div>
            <div className="form-group col">
              <button
                type="button"
                onClick={onChangeClient}
                className="btn btn-primary col"
                key={5}
              >
                Salvar
              </button>
            </div>
          </div>
          {alert}
        </form>
      </div>
    </div>
  );
}
