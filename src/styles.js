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
  background: #145780;
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
  background: #eead0e;
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
    justify-content: center;
    align-items: flex-start;

    width: 100%;
    background: #478182;

    span {
      background: #00008b;
      justify-content: center;
      align-items: center;

      width: 100%;
      color: #fff;
      padding: 10px;
    }
  }
  div#amanha {
    display: flex;
    justify-content: center;
    align-items: flex-start;

    width: 100%;
    background: #478182;

    span {
      background: #00008b;
      justify-content: center;
      align-items: center;

      width: 100%;
      color: #fff;
      padding: 10px;
    }
  }
  div#dpsAmanha {
    display: flex;
    justify-content: center;
    align-items: flex-start;

    width: 100%;
    background: #478182;

    span {
      background: #00008b;
      justify-content: center;
      align-items: center;

      width: 100%;
      color: #fff;
      padding: 10px;
    }
  }
`;
