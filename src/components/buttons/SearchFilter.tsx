import { randomId } from '../../utils/random';

type InputProps = {
    text: string;
    onClick: any
}

export function SearchFilterButton(props: InputProps) {
    return (
        <div className="mt-2 mr-2 mb-2"
            style={{
                display: 'inline-block'
            }}
        >
            <button className='btn btn-outline-dark'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '15px'
                }}
                onClick={props.onClick}
                key={randomId()}
            >
                <div className='mr-3 font-weight-bold'>
                    {props.text}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="dark" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </button>
        </div>
    )
}