import '../css/main.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { WhatsAppService } from '../services/whatsapp-service';
import { randomId } from '../utils/random';
import { ReducerStore } from '../app/store';

import { Breadcumb } from '../components/Breadcumb';
import { TitlePage } from '../components/TitlePage';
import { validateToken } from '../reducers/authenticatedSlice';

export function Home() {
  const auth = useSelector((state: ReducerStore) => state.authenticated);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const navbar = document.querySelector('.navbar') as HTMLElement;
  if (navbar) navbar.style.display = 'flex';

  useEffect(() => {
    dispatch(validateToken(auth.token));
    if (!auth.token) {
      navigate(auth.redirectLoginPageUri, { replace: true });
    }
  }, [auth, navigate, dispatch]);

  return (
    <div className="container-main">
      <Breadcumb page={[]} />

      <TitlePage title={`Olá, ${auth ? auth.userName : 'Seja Bem Vindo'}!`} />
      <p>
        Este é o <strong>ARV - Controll &copy;</strong>, um Sistema de
        Gerenciamento de Vendas e Agenda.
      </p>
      <p>
        Com ele é simples fazer o gerenciamento de suas vendas, com uma tela
        dedicada para você registrar todas as suas vendas, e outra com a
        listagem delas.
      </p>
      <p>
        Há também uma tela dedicada para sua agenda, com ela você consegue criar
        um novo horário para um determinado cliente, especificando o
        procedimento, data, hora, preço e mais.
      </p>
      <div className="container">
        <h4>O sistema tem as seguintes telas:</h4>
        <ul>
          <li key={randomId()}>
            <h5 className="title-page">Home:</h5>
            <p>
              É a tela inicial do sistema. Nela você encontrará uma breve
              documentação explicando todos os pontos do sistema.
            </p>
          </li>
          <li key={randomId()}>
            <h5 className="title-page">Nova venda:</h5>
            <p>
              Nessa tela você pode registrar uma nova venda, com os seguintes
              campos: <strong>descrição, preço e data.</strong> Todos campos são
              obrigatórios.
            </p>
          </li>
          <li key={randomId()}>
            <h5 className="title-page">Vendas</h5>
            <p>
              Aqui você consegue visualizar todas as suas vendas registradas.{' '}
              <br />
              Ao abrir essa tela aparecerá todas as vendas realizadas no dia.{' '}
              <br />
              Você pode filtrar suas vendas por data, preenchendo o primeiro
              período para realizar as buscas apenas da primeira data escolhida,
              ou preenchendo as duas datas para fazer uma busca pelo período da
              primeira data até a segunda data. <br />
              Será retornada uma tabela com todas as vendas encontradas de
              acordo com as datas selecionadas. Ao final da tela, tem um
              somatória de todas as vendas que estão na tabela, facilitando
              assim a visualização dos seus ganhos.
            </p>
          </li>
          <li key={randomId()}>
            <h5 className="title-page">Agenda</h5>
            <p>
              Nessa tela dedicada, você encontrará todas as opções relacionadas
              à agenda. Aqui você pode criar um novo horário para um determinado
              cliente. <br />
              Você pode adicionar um novo horário clicando no campo{' '}
              <strong>Adicionar Novo Horário</strong>. <br />
              Para visualizar os horários da sua agenda, basta selecionar o dia
              que deseja, e será retornada uma lista com todos os horários
              cadastrados. <br />
              Você terá três opções em cada horário:{' '}
              <strong>
                Finalizar, Editar, Excluir e Confirmar horário pelo WhatsApp.
              </strong>
            </p>
            <ul>
              <li key={randomId()}>
                <strong>Finalizar:</strong>
                <p>
                  Ao clicar em "Finalizar", o horário será registrado como uma
                  nova venda, e será excluído da sua agenda, não podendo ser
                  restaurado.
                </p>
              </li>
              <li key={randomId()}>
                <strong>Editar:</strong>
                <p>
                  Ao clicar em "Editar", um novo modal irá aparecer, com as
                  informações do horário selecionado onde você poderá editar as
                  informações do moesmo.
                </p>
              </li>
              <li key={randomId()}>
                <strong>Excluir:</strong>
                <p>
                  Ao clicar em "Excluir", o horário será excluído da sua agenda
                  e não poderá ser recuperado novamente. Ele não será salvo como
                  uma nova venda.
                </p>
              </li>
              <li key={randomId()}>
                <strong>Confirmar horário pelo WhatsApp:</strong>
                <p>
                  Caso você adicione um número de telefone quando estiver
                  cadastrando um novo horário, essa opção irá aparecer. Ao
                  clicar nela, você será redirecionado para o WhatsApp e
                  iniciará uma conversa com o cliente, com uma mensagem de texto
                  pré-definida que será preenchidas com as seguintes
                  informações:
                  <strong> nome do cliente, data e hora.</strong>
                </p>
              </li>
            </ul>
          </li>
          <li key={randomId()}>
            <h5 className="title-page">Sair</h5>
            <p>
              Ao clicar nessa opção, você sairá do sistema, sendo necessário
              fazer login novamente para entrar. Uma vez fora do sistema, não é
              possível acessar nenhuma informação dentro dele, a não ser que
              esteja logado.
            </p>
          </li>
        </ul>
      </div>
      <div className="container mb-5">
        <h5 className="title-page">Ajuda</h5>
        <p>
          Caso precise de ajuda ou queira tirar dúvidas sobre o sistema, entre
          em contato com o desenvolvedor
        </p>
        <button
          type="button"
          onClick={(e) => WhatsAppService.redirectToWhatsapp(e, '35999554534')}
          className="btn btn-success col"
        >
          Entrar em contato
        </button>
      </div>
      <p className="mt-5 mb-3 text-muted text-center">
        ARV - Controll &copy; 2021-2022
      </p>
    </div>
  );
}
