import React, { Component } from 'react';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import { Provider } from 'react-redux';

import api from './services/api';

import { Container, Form, SubmitButton, List, Table } from './styles';
import GlobalStyle from './styles/global';

import store from './store';

export default class App extends Component {
  state = {
    newCidade: '',
    cidadesListaId: [],
    cidadeClima: [],
    loading: false,
  };

  handleInputChange = e => {
    this.setState({ newCidade: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newCidade, cidadesListaId, cidadeClima } = this.state;

    const responseCidade = await api.get(
      `/api/v1/locale/city?name=${newCidade}&state=SP&token=bff8d6309c9130485b55469a928b5b25`
    );

    const dataCidade = {
      name: responseCidade.data[0].name,
      id: responseCidade.data[0].id,
    };

    const responseClimaCidade = await api.get(
      `/api/v1/forecast/locale/${dataCidade.id}/hours/72?token=bff8d6309c9130485b55469a928b5b25`
    );

    const dataCidadeClima = {
      data: responseClimaCidade.data.data,
      name: 'Oi',
    };

    // console.log(dataCidadeClima.data[0].temperature.temperature);
    console.log(dataCidadeClima.data);

    this.setState({
      cidadesListaId: [...cidadesListaId, dataCidade],
      cidadeClima: dataCidadeClima.data,
      newCidade: '',
      loading: false,
    });
  };

  render() {
    const { newCidade, loading, cidadesListaId, cidadeClima } = this.state;
    return (
      <Provider store={store}>
        <Container>
          <h1>Clima Tempo</h1>
          <Form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Informe a Cidade"
              value={newCidade}
              onChange={this.handleInputChange}
            />

            <SubmitButton loading={loading ? 1 : 0}>
              {loading ? (
                <FaSpinner color="#FFF" size={14} />
              ) : (
                <FaPlus color="#fff" size={14} />
              )}
            </SubmitButton>
          </Form>

          <List>
            {cidadesListaId.map(cidade => (
              <li key={cidade.name}>
                <span>{cidade.name}</span>

                <Table>
                  {cidadeClima.map(clima => (
                    <div key={clima.date} id="agora">
                      {}
                      <span>{clima.temperature.temperature}</span>
                    </div>
                  ))}

                  <div id="amanha">
                    <span>Amanhã</span>
                  </div>
                  <div id="dpsAmanha">
                    <span>Depois de Amanhã</span>
                  </div>
                </Table>
              </li>
            ))}
          </List>
        </Container>

        <GlobalStyle />
      </Provider>
    );
  }
}
