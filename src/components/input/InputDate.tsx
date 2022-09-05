import { InputText } from './InputText';

type InputProps = {
    idComponent: string;
    idInput: string;
    onChange: Function;
    style?: React.CSSProperties;
    className?: string
}

export function InputDate(props: InputProps) {
    return (
        <div
            className={`${props.className}`}
            style={{
                width: '145px',
                ...props.style
            }}
            id={props.idComponent}
        >
            <InputText
                type="date"
                label=" "
                id={props.idInput}
                onChange={props.onChange}
            />
        </div>
    )
}