import '../css/main.css';
import { authService } from '../services/authService';

import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function hidenNavBar() {
  const links = document.querySelectorAll(".navbar-nav li a:not([href='#'])") as any;

  for (let x = 0; x < links.length; x++) {
    links[x].onclick = function () {

      const buttonToggler = document.querySelector('button.navbar-toggler') as any;
      if (buttonToggler) buttonToggler.click()
    };
  }
}

export default function NavBar() {
  useEffect(() => {
    if (document.readyState !== 'loading') {
      hidenNavBar();
    }
  }, []);

  return (
    <div id="menu" className="navbar navbar-dark bg-dark navbar-expand-lg">
      <h3 id="title-navbar">ARV - Controll</h3>
      <button
        className="navbar-toggler ml-auto custom-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="true"
        aria-label="Toggle navigation"
        aria-hidden="true"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav justify-content-end">
          <li className="nav-item" data-dismiss="modal" key="0">
            <div>
              <Link to="/home">Home</Link>
            </div>
          </li>
          {/* <li className="nav-item" data-dismiss="modal" key="1">
            <div className="input-group">
              <div className="pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-calendar-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
              </div>
              <div className="d-flex">
                <Link to="/schedule-client">Pedido de horários</Link>
                {scheduleClients === 0 ? null : (
                  <div
                    className="text-white text-center ml-3 pl-1 pr-1 font-weight-bold"
                    style={{
                      backgroundColor: 'red',
                      borderRadius: '50%',
                      width: '25px',
                      height: '25px',
                    }}
                  >
                    {scheduleClients === 0 ? null : scheduleClients}
                  </div>
                )}
              </div>
            </div>
          </li> */}
          {/* <li className="nav-item" data-dismiss="modal" key="234">
            <div>
              <Link to="/schedule">Agenda</Link>
            </div>
          </li> */}

          <div className="nav-item dropdown m-0 ml-2" key="25234">
            <div>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Agenda
              </a>
              <div
                className="dropdown-menu bg-secondary border-0"
                aria-labelledby="navbarDropdown"
              >
                <li className="nav-item" data-dismiss="modal" key="2369874">
                  <div>
                    <Link to="/create-schedule">Nova Agenda</Link>
                  </div>
                </li>
                <li className="nav-item" data-dismiss="modal" key="278534">
                  <div>
                    <Link to="/schedule">Suas Agendas</Link>
                  </div>
                </li>
              </div>
            </div>
          </div>

          <div className="nav-item dropdown m-0 ml-2" key="254">
            <div>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Clientes
              </a>
              <div
                className="dropdown-menu bg-secondary border-0"
                aria-labelledby="navbarDropdown"
              >
                <li className="nav-item" data-dismiss="modal" key="33745">
                  <div>
                    <Link to="/create-client">Novo Cliente</Link>
                  </div>
                </li>
                <li className="nav-item" data-dismiss="modal" key="3345">
                  <div>
                    <Link to="/client">Seus Clientes</Link>
                  </div>
                </li>
                <li className="nav-item" data-dismiss="modal" key="434">
                  <div>
                    <Link to="/segments-clients">Segmentos</Link>
                  </div>
                </li>
              </div>
            </div>
          </div>
          <div className="nav-item dropdown m-0 ml-2" key="34535">
            <div>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Vendas
              </a>
              <div
                className="dropdown-menu bg-secondary border-0"
                aria-labelledby="navbarDropdown"
              >
                <li className="nav-item" data-dismiss="modal" key="6948">
                  <div>
                    <Link to="/new-sale">Nova Venda</Link>
                  </div>
                </li>
                <li className="nav-item" data-dismiss="modal" key="3445">
                  <div>
                    <Link to="/sales">Suas Vendas</Link>
                  </div>
                </li>
                <li className="nav-item" data-dismiss="modal" key="346346">
                  <div>
                    <Link to="/reports">Relatórios</Link>
                  </div>
                </li>
              </div>
            </div>
          </div>
          <div className="nav-item dropdown m-0 ml-2" key="0358">
            <div>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Atendimentos
              </a>
              <div
                className="dropdown-menu bg-secondary border-0"
                aria-labelledby="navbarDropdown"
              >
                <li className="nav-item" data-dismiss="modal" key="9837458">
                  <div>
                    <Link to="/create-history">Criar Novo</Link>
                  </div>
                </li>
                <li className="nav-item" data-dismiss="modal" key="83450">
                  <div>
                    <Link to="/history">Histórico</Link>
                  </div>
                </li>
              </div>
            </div>
          </div>
          <li className="nav-item" data-dismiss="modal" key="53453">
            <div>
              <Link to="/login" onClick={authService.cleanUserInLocalStorange}>
                Sair
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
