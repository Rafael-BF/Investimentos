import React from 'react';
import Header from './components/Header';
import InvestmentForm from './components/InvestmentForm';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <InvestmentForm />
    </AppContainer>
  );
}

export default App;
