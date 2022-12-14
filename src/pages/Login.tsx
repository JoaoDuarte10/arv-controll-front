import '../css/main.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import logo from '../img/raise-value.png';

import { authService } from '../services/authService';
import { loginAdded } from '../reducers/authenticatedSlice';
import { HTTP_RESPONSE, TIMEOUT } from '../utils/constants';

import { AlertError } from '../components/alerts/AlertError';
import { LabelForm } from '../components/labels/LabelForm';
import { CircularIndeterminate } from '../components/LoaderCircular';

function LoginPage() {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState({
    password: '',
    showPassword: false,
  });
  const [credentials, setCredentials] = useState<boolean | null>(null);
  const [serverError, setServerError] = useState<boolean | null>(null);

  const [loadFetchClient, setLoadFetchClient] = useState<boolean>(false);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    const navbar = document.querySelector('#menu') as HTMLElement;
    if (navbar) navbar.style.display = 'none';
  }, []);

  let loader = null;
  if (loadFetchClient) {
    loader = <CircularIndeterminate />;
  } else {
    loader = null;
  }

  const saveLoginUser = (login: { token: string; refreshToken: string }) => {
    dispatch(
      loginAdded({ token: login.token, refreshToken: login.refreshToken }),
    );
    navigate('/home', { replace: true });
    setLoadFetchClient(false);
  };

  const login = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setLoadFetchClient(true);

    const request = await authService.sendLogin(
      user.trim(),
      password.password.trim(),
    );

    if (HTTP_RESPONSE.SUCCESS.includes(request.status)) {
      saveLoginUser(request.data);
      return;
    }

    if (request.status === HTTP_RESPONSE.ERROR || !request.status) {
      setServerError(true);
    }

    if (request.status === HTTP_RESPONSE.UNAUTHORIZED) {
      setCredentials(false);
    }

    setLoadFetchClient(false);
  };

  if (credentials === false) {
    setTimeout(() => setCredentials(null), TIMEOUT.FIVE_SECCONDS);
  }

  if (serverError === true) {
    setTimeout(() => setServerError(null), TIMEOUT.FIVE_SECCONDS);
  }

  const handlePasswordChange =
    (prop: any) => (event: React.BaseSyntheticEvent) => {
      event.preventDefault();
      setPassword({ ...password, [prop]: event.target.value });
    };

  return (
    <div className="login_container">
      {loader}
      <div className="text-center pt-5">
        <img className="img-logo" alt="logo_raise_value" src={logo}></img>
      </div>
      <div className="form-login">
        <div className="card-body card-login">
          <form onSubmit={login}>
            <div className="text-center">
              <h2 className="text-center">Fa??a seu Login</h2>
              <p className="text-primary font-weight-bold">
                Seja Bem-Vindo!
                <small className="form-text text-muted mb-2">
                  Fa??a Login para entrar no sistema.
                </small>
              </p>
            </div>
            <div className="form-group">
              <LabelForm text="Usu??rio" />

              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">@</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  id="name"
                  placeholder="Digite o nome do usu??rio"
                  required={true}
                />
              </div>
            </div>
            <div className="form-group">
              <LabelForm text="Senha" />

              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-key"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                      <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </div>
                </div>
                <input
                  type={password.showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password.password}
                  onChange={handlePasswordChange('password')}
                  id="password"
                  placeholder="Digite a senha"
                  required={true}
                />
                <div className="input-group-append">
                  <IconButton
                    onClick={(e) =>
                      setPassword({
                        ...password,
                        showPassword: !password.showPassword,
                      })
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    className="input-group-text"
                  >
                    {password.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-entrar mt-4 p-2"
            >
              Entrar
            </button>
          </form>
          <div className="credentials">
            {credentials === false ? (
              <AlertError title="Usu??rio ou senha incorretos!" />
            ) : null}
            {serverError === true ? (
              <AlertError title="Erro ao processar sua requisi????o." />
            ) : null}
          </div>
        </div>
      </div>
      <p className="mt-5 mb-3 text-muted text-center">
        ARV - Controll &copy; 2022
      </p>
    </div>
  );
}

export { LoginPage };
