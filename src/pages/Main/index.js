import React, { useState } from 'react';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from '../../services/api';

import { Container, Form, SubmitButton, List, Table } from './styles';
import GlobalStyle from '../../styles/global';

function Main() {
  const [newCidade, setCidade] = useState('São Paulo');
  const [newEstado, setEstado] = useState('SP');
  const [tempoAgora, setTempoAgora] = useState([]);
  const [cidadesListaId, setCidadesListaId] = useState([]);
  const [cidadesLista15Dias, setCidadesLista15Dias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [estados] = useState([
    'AC',
    'AL',
    'AM',
    'AP',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MG',
    'MS',
    'MT',
    'PA',
    'PB',
    'PE',
    'PI',
    'PR',
    'RJ',
    'RN',
    'RO',
    'RR',
    'RS',
    'SC',
    'SE',
    'SP',
    'TO',
  ]);

  function handleInputChange(e) {
    setCidade(e.target.value);
  }

  function handleSelectChange(e) {
    setEstado(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (newCidade === '' || newEstado === '') {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }

    const responseCidade = await api.get(
      `/api/v1/locale/city?name=${newCidade}&state=${newEstado}&token=bff8d6309c9130485b55469a928b5b25`
    );

    if (responseCidade.data.length === 0) {
      toast.error('Esta Cidade ainda não está em nossa base de dados.');
      toast.error('Certifique-se de digitar corretamente.');
      return;
    }

    const responseClimaCidade = await api.get(
      `/api/v1/forecast/locale/${responseCidade.data[0].id}/hours/72?token=bff8d6309c9130485b55469a928b5b25`
    );

    const responseClimaCidade15Dias = await api.get(
      `/api/v1/forecast/locale/${responseCidade.data[0].id}/days/15?token=bff8d6309c9130485b55469a928b5b25`
    );

    const dataCidade = {
      data72Horas: responseClimaCidade.data.data,
      data15Dias: responseClimaCidade15Dias.data.data,
    };

    if (tempoAgora.length === 0) {
      setTempoAgora(['ok']);
    }

    setCidadesListaId(dataCidade.data72Horas);
    setCidadesLista15Dias(dataCidade.data15Dias);

    setLoading(false);
  }

  /**
   * TEMPERATURA TEXTO E ICON
   */
  const textTempoHoje = cidadesLista15Dias.reduce(function temp(prev, current) {
    const resultadoDia = current.date_br.split('/');
    const data = new Date();

    if (resultadoDia[0] == data.getDate()) {
      if (data.getHours() > 0 && data.getHours() < 13) {
        return current.text_icon.text.phrase.morning;
      }

      if (data.getHours() >= 13 && data.getHours() < 17) {
        return current.text_icon.text.phrase.afternoon;
      }

      if (data.getHours() > 17 || data.getHours() == 0) {
        return current.text_icon.text.phrase.night;
      }
    }

    return prev;
  }, '');

  const textTempoAmanhã = cidadesLista15Dias.reduce(function temp(
    prev,
    current
  ) {
    const resultadoDia = current.date_br.split('/');

    const data = new Date();
    data.setDate(data.getDate() + 1);

    if (resultadoDia[0] == data.getDate()) {
      if (data.getHours() > 0 && data.getHours() < 13) {
        return current.text_icon.text.phrase.morning;
      }

      if (data.getHours() >= 13 && data.getHours() < 17) {
        return current.text_icon.text.phrase.afternoon;
      }

      if (data.getHours() > 17 || data.getHours() == 0) {
        return current.text_icon.text.phrase.night;
      }
    }

    return prev;
  },
  '');

  const textTempoDpsAmanhã = cidadesLista15Dias.reduce(function temp(
    prev,
    current
  ) {
    const resultadoDia = current.date_br.split('/');

    const data = new Date();
    data.setDate(data.getDate() + 2);

    if (resultadoDia[0] == data.getDate()) {
      if (data.getHours() > 0 && data.getHours() < 13) {
        return current.text_icon.text.phrase.morning;
      }

      if (data.getHours() >= 13 && data.getHours() < 17) {
        return current.text_icon.text.phrase.afternoon;
      }

      if (data.getHours() > 17 || data.getHours() == 0) {
        return current.text_icon.text.phrase.night;
      }
    }

    return prev;
  },
  '');

  const iconTempo = cidadesLista15Dias.reduce(function temp(prev, current) {
    const resultadoDia = current.date_br.split('/');

    const data = new Date();

    if (resultadoDia[0] == data.getDate()) {
      if (data.getHours() > 0 && data.getHours() < 13) {
        return current.text_icon.icon.morning;
      }

      if (data.getHours() >= 13 && data.getHours() < 17) {
        return current.text_icon.icon.afternoon;
      }

      if (data.getHours() > 17 || data.getHours() == 0) {
        return current.text_icon.icon.night;
      }
    }

    return prev;
  }, '');

  function diaSemana(soma) {
    const hoje = new Date();
    const dia = hoje.getDay();
    const semana = new Array(6);
    semana[0] = 'DOMINGO';
    semana[1] = 'SEGUNDA';
    semana[2] = 'TERÇA';
    semana[3] = 'QUARTA';
    semana[4] = 'QUINTA';
    semana[5] = 'SEXTA';
    semana[6] = 'SÃBADO';
    if (soma > 6) {
      return semana[-1 + soma];
    }
    return semana[dia + soma];
  }

  /**
   *
   */

  /**
   * TEMPERATURA DE HOJE
   */
  const temperatureAgora = cidadesListaId.reduce(
    function max(prev, current) {
      const resultadoHora = current.date_br.split('/');
      const resultado = current.date_br.split(' ');
      const horaAtual = resultado[1].split(':');

      const data = new Date();

      if (
        resultadoHora[0] == data.getDate() &&
        horaAtual[0] == data.getHours()
      ) {
        return prev.temperature.temperature > current.temperature.temperature
          ? prev
          : current;
      }
      return { temperature: prev.temperature };
    },
    { temperature: 0 }
  );

  /**
   *
   */

  /**
   * TEMPERATURA DE AMANHÃ
   */

  const maxTemperatureAmanhã = cidadesListaId.reduce(
    function max(prev, current) {
      const resultado = current.date_br.split('/');

      const data = new Date();
      data.setDate(data.getDate() + 1);

      if (resultado[0] == data.getDate()) {
        return prev.temperature.temperature > current.temperature.temperature
          ? prev
          : current;
      }
      return { temperature: prev.temperature };
    },
    { temperature: 0 }
  );

  const minTemperatureAmanhã = cidadesListaId.reduce(
    function min(prev, current) {
      const resultado = current.date_br.split('/');

      const data = new Date();
      data.setDate(data.getDate() + 1);

      if (resultado[0] == data.getDate()) {
        return prev.temperature.temperature < current.temperature.temperature
          ? prev
          : current;
      }
      return { temperature: prev.temperature };
    },
    { temperature: 0 }
  );

  /**
   *
   */

  /**
   * TEMPERATURA DE DEPOIS DE AMANHÃ
   */

  const maxTemperatureDpsAmanhã = cidadesListaId.reduce(
    function max(prev, current) {
      const resultado = current.date_br.split('/');

      const data = new Date();
      data.setDate(data.getDate() + 2);

      if (resultado[0] == data.getDate()) {
        return prev.temperature.temperature > current.temperature.temperature
          ? prev
          : current;
      }
      return { temperature: prev.temperature };
    },
    { temperature: 0 }
  );

  const minTemperatureDpsAmanhã = cidadesListaId.reduce(
    function min(prev, current) {
      const resultado = current.date_br.split('/');

      const data = new Date();
      data.setDate(data.getDate() + 2);

      if (resultado[0] == data.getDate()) {
        return prev.temperature.temperature < current.temperature.temperature
          ? prev
          : current;
      }
      return { temperature: prev.temperature };
    },
    { temperature: 0 }
  );

  /**
   *
   */

  return (
    <>
      <Container>
        <div id="climaTempo">
          <h1>Previsão do Tempo</h1>
        </div>

        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Informe a Cidade"
            value={newCidade}
            onChange={handleInputChange}
          />
          <select value={newEstado} onChange={handleSelectChange}>
            <option value="-1">Estado</option>
            {estados.map(state => (
              <option value={state} key={state}>
                {state}
              </option>
            ))}
          </select>

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {tempoAgora.map(ok => (
            <Table>
              <div id="agora">
                <span id="agoraSpan">AGORA</span>
                <img src={`icons/${iconTempo}.png`} alt={iconTempo} />
                <span id="temperaturaAgoraSpan">
                  {temperatureAgora.temperature.temperature}º C
                </span>
                <p>{textTempoHoje}</p>
              </div>
              <div id="amanha">
                <span id="amanhaSpan">AMANHÃ</span>
                <div id="temperaturaAmanha">
                  <div id="temperaturaAmanhaSpan">
                    <span>
                      min: {minTemperatureAmanhã.temperature.temperature}º C
                    </span>
                    <span>
                      máx: {maxTemperatureAmanhã.temperature.temperature}º C
                    </span>
                  </div>
                  <p>{textTempoAmanhã}</p>
                </div>
              </div>
              <div id="dpsAmanha">
                <span id="dpsAmanhaSpan">{diaSemana(2)}</span>
                <div id="temperaturaDpsAmanha">
                  <div id="temperaturaDpsAmanhaSpan">
                    <span>
                      min: {minTemperatureDpsAmanhã.temperature.temperature}º C
                    </span>
                    <span>
                      máx: {maxTemperatureDpsAmanhã.temperature.temperature}º C
                    </span>
                  </div>
                  <p>{textTempoDpsAmanhã}</p>
                </div>
              </div>
            </Table>
          ))}
        </List>
      </Container>

      <GlobalStyle />
    </>
  );
}

export default Main;
