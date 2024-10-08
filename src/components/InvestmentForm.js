import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ResultCard from './ResultCard';
import { calcularValoresInvestimento } from './LogicaCalculo'; 
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 16px 50px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const RadioGroup = styled.div`
  margin: 10px 0;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-right: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

function InvestmentForm() {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  const [days, setDays] = useState(0); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Função para calcular a diferença de dias entre duas datas
  const calculateDaysBetweenDates = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

  // Calcula a diferença em milissegundos e converte para dias
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  // Atualiza a quantidade de dias quando a data inicial ou final é alterada
  useEffect(() => {
    if (startDate && endDate) {
      const diffDays = calculateDaysBetweenDates(startDate, endDate);
      setDays(diffDays);
      setValue('anos', `${diffDays} dias`); 
    }
  }, [startDate, endDate, setValue]);

  const onSubmit = (data) => {
    const resultados = calcularValoresInvestimento(data);
    setResult(resultados);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Valor Aplicado (R$)"
          {...register('valorInicial', { required: true })}
          onChange={(e) => setValue('valorInicial', e.target.value)}
        />
        {errors.valorInicial && <ErrorMessage>Campo obrigatório</ErrorMessage>}

        <Input
          type="text"
          placeholder="Valor Anual CDI (% Previsão)"
          {...register('contribuicaoMensal', { required: true })}
          onChange={(e) => setValue('contribuicaoMensal', e.target.value)}
        />
        {errors.contribuicaoMensal && <ErrorMessage>Campo obrigatório</ErrorMessage>}

        <Input
          type="text"
          placeholder="Rentabilidade Anual Sobre CDI (%)"
          {...register('taxaJuros', { required: true })}
          onChange={(e) => setValue('taxaJuros', e.target.value)}
        />
        {errors.taxaJuros && <ErrorMessage>Campo obrigatório</ErrorMessage>}

        {/* Campo para selecionar se a rentabilidade inclui ou não o imposto de renda */}
        <RadioGroup>
          <Label>
            <input
              type="radio"
              value="comImposto"
              {...register('imposto', { required: true })}
            />
            Com Tarifa de IR
          </Label>
          <Label>
            <input
              type="radio"
              value="semImposto"
              {...register('imposto', { required: true })}
            />
            Sem Tarifa de IR
          </Label>
          {errors.imposto && <ErrorMessage>Selecione uma opção</ErrorMessage>}
        </RadioGroup>

        {/* Campo para Data Inicial */}
        <Label>Data Inicial:</Label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        {errors.startDate && <ErrorMessage>Campo obrigatório</ErrorMessage>}

        {/* Campo para Data Final */}
        <Label>Data Final:</Label>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {errors.endDate && <ErrorMessage>Campo obrigatório</ErrorMessage>}

        {/* Campo para mostrar a quantidade de dias */}
        <Label>Quantidade de dias:</Label>
        <Input
          type="text"
          value={days}
          readOnly
        />

        <ButtonContainer>
          <Button type="submit">Calcular</Button>
        </ButtonContainer>
      </form>
      {result && <ResultCard result={result} />}
    </FormContainer>
  );
}

export default InvestmentForm;
