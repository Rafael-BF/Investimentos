import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  background-color: #e9ecef;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  max-width: 460px;
  margin-top: 20px;
`;

const ResultText = styled.p`
  color: #007bff;
  font-size: 1.2rem;
  margin: 10px 0;
`;

function ResultCard({ result }) {
  return (
    <ResultContainer>
      <ResultText><strong>Valor Final Bruto:</strong> R$ {result.valorFinalBruto}</ResultText>
      <ResultText><strong>Valor Final Líquido:</strong> R$ {result.valorFinalLiquido}</ResultText>
      <ResultText><strong>Alíquota de Taxação:</strong> {result.aliquotaImposto}%</ResultText>
      <ResultText><strong>Lucro Real em R$:</strong> R$ {result.lucroLiquido}</ResultText>
      <ResultText><strong>Percentual Real de Lucro:</strong> {result.percentualRealLucro}%</ResultText>
    </ResultContainer>
  );
}

export default ResultCard;
