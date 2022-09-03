import { Link } from 'react-router-dom';
import { randomId } from '../utils/random';

type InputProps = {
  page: {
    link: boolean | string,
    name: string
  }[]
}

export function Breadcumb(props: InputProps) {
  const { page } = props;

  return (
    <div className="mb-4">
      <nav aria-label="breadcrumb mb-4">
        <ol className="breadcrumb remove-style-link">
          <li className="breadcrumb-item" key={randomId()}>
            <Link to="/home">Home</Link>
          </li>
          {page.map((item) => {
            if (item.link) {
              return (
                <li
                  className="breadcrumb-item active"
                  aria-current="page"
                  key={randomId()}
                >
                  <Link to={item.link as string}>{item.name}</Link>
                </li>
              );
            }
            return (
              <li
                className="breadcrumb-item active"
                aria-current="page"
                key={randomId()}
              >
                {item.name}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
