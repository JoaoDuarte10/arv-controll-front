import { LabelForm } from '../labels/LabelForm';
import { InputText } from './InputText';

type InputProps = {
    idComponent: string;
    idInput: string;
    text: string;
    onChange: Function;
    style?: React.CSSProperties
}

export function InputDate(props: InputProps) {
    return (
        <div
            className="mb-3"
            style={{
                width: '145px',
                ...props.style
            }}
            id={props.idComponent}
        >
            <LabelForm text={props.text} />

            <InputText
                type="date"
                label=" "
                id={props.idInput}
                onChange={props.onChange}
            />
        </div>
    )
}