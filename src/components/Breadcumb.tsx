import { Link } from 'react-router-dom';
import { randomId } from '../utils/random';

export function Breadcumb(props) {
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
                  <Link to={item.link}>{item.name}</Link>
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
