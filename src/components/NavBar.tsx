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
