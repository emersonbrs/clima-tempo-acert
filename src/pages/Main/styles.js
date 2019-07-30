import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgab(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  p {
    font-size: 14px;
    font-weight: bold;
    color: #fff;

    width: 90%;
  }

  div#climaTempo {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
  select {
    background-color: #fff;
    color: black;
    padding: 12px;
    margin-left: 12px;
    border-radius: 5px;
    border-color: #eee;
    outline: none;
    overflow: hidden;
  }
  option {
  }
`;

// Animação para o button
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #145799;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
  text-align: center;

  & + li {
  }

  li {
  }
`;

export const Table = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 250px;

  div#agora {
    display: flex;
    align-items: center;
    flex-direction: column;

    width: 100%;
    background-image: linear-gradient(#148999, #145799);

    margin-right: 25px;
    border-radius: 5px 5px;

    span {
      justify-content: center;
      align-items: center;

      width: 100%;
      color: #fff;
      padding: 10px;
    }
    span#agoraSpan {
      width: 90%;
      margin-top: 5px;

      font-size: 16px;
      font-weight: bold;

      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
    }
    img {
      width: 50%;
    }
    span#temperaturaAgoraSpan {
      font-size: 16px;
      font-weight: bold;
    }
  }
  div#amanha {
    display: flex;
    align-items: center;
    flex-direction: column;

    width: 100%;
    background-image: linear-gradient(#148999, #145799);

    margin-right: 25px;
    border-radius: 5px 5px;

    span {
      justify-content: center;
      align-items: center;

      width: 100%;
      color: #fff;
      padding: 10px;
    }
    span#amanhaSpan {
      width: 90%;
      margin-top: 5px;

      font-size: 16px;
      font-weight: bold;

      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
    }
    #temperaturaAmanha {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;

      align-items: center;
      justify-content: center;
    }
    #temperaturaAmanhaSpan {
      display: flex;
      flex-direction: column;
      margin-top: -40px;
      margin-bottom: 30px;
      font-size: 16px;
      font-weight: bold;
    }
    span#temperaturaAmanhaText {
      font-size: 16px;
      font-weight: bold;
    }
  }
  div#dpsAmanha {
    display: flex;
    align-items: center;
    flex-direction: column;

    width: 100%;
    background-image: linear-gradient(#148999, #145799);

    margin-right: 25px;
    border-radius: 5px 5px;

    span {
      justify-content: center;
      align-items: center;

      width: 100%;
      color: #fff;
      padding: 10px;
    }
    span#dpsAmanhaSpan {
      width: 90%;
      margin-top: 5px;

      font-size: 16px;
      font-weight: bold;

      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
    }
    #temperaturaDpsAmanha {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;

      align-items: center;
      justify-content: center;
    }
    #temperaturaDpsAmanhaSpan {
      display: flex;
      flex-direction: column;
      margin-top: -40px;
      margin-bottom: 30px;
      font-size: 16px;
      font-weight: bold;
    }
    span#temperaturaDpsAmanhaText {
      font-size: 16px;
      font-weight: bold;
    }
  }
`;
