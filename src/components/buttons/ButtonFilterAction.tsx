type InputProps = {
    onClick: any;
    text: string;
    className?: string;
    style?: React.CSSProperties;
    dataToggle?: string;
    dataTarget?: string;
};

export function ButtonFilterAction(props: InputProps) {
    return (
        <button
            className={`btn btn-outline-primary mr-2 font-weight-bold ${props.className}`}
            onClick={props.onClick}
            style={{
                borderRadius: '15px',
                ...props.style
            }}
            data-toggle={props.dataToggle}
            data-target={`#${props.dataTarget}`}
        >
            {props.text}
        </button>
    )
}