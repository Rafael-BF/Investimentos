import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  margin-bottom: 0px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
`;

function Header() {
  return (
    <HeaderContainer>
      <Title>Calculadora de Investimentos</Title>
      <Subtitle>Insira seus dados para calcular o retorno do seu investimento</Subtitle>
    </HeaderContainer>
  );
}

export default Header;
