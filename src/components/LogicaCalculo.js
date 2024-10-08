export const calcularValoresInvestimento = (data) => {
  // Extração e formatação dos dados
  const valorAplicado = parseFloat(data.valorInicial.replace(/[^\d,-]/g, '').replace(',', '.'));
  const cdiAnual = parseFloat(data.contribuicaoMensal.replace('%', '').replace(',', '.')); // CDI anual em porcentagem
  const rentabilidadeSobreCDI = parseFloat(data.taxaJuros.replace('%', '').replace(',', '.')) / 100; // Rentabilidade sobre CDI em decimal
  const dias = parseInt(data.anos.replace(' dias', ''));
  const impostoSelecionado = data.imposto; // 'comImposto' ou 'semImposto'

  // Cálculo do juro anual
  const juroAnual = cdiAnual * rentabilidadeSobreCDI;

  // Cálculo do juro diário
  const juroDiario = juroAnual / 360 / 100; // Divisão por 360 e conversão para decimal

  // Cálculo do valor final bruto usando juros compostos diários
  let valorFinalBruto = valorAplicado;
  for (let i = 0; i < dias; i++) {
      valorFinalBruto += valorFinalBruto * juroDiario; // Aplica o juro diário composto ao valor acumulado
  }

  // Cálculo do lucro bruto
  const lucroBruto = valorFinalBruto - valorAplicado;

  // Determinação da alíquota de imposto de acordo com o tempo de investimento
  let aliquotaImposto = 0;
  if (impostoSelecionado === "comImposto") { // Se o usuário escolheu "Com Imposto de Renda"
      if (dias <= 180) {
          aliquotaImposto = 0.225; // 22,5%
      } else if (dias <= 360) {
          aliquotaImposto = 0.20; // 20%
      } else if (dias <= 720) {
          aliquotaImposto = 0.175; // 17,5%
      } else {
          aliquotaImposto = 0.15; // 15%
      }
  } else if (impostoSelecionado === "semImposto") { // Se o usuário escolheu "Sem Imposto de Renda"
      aliquotaImposto = 0; // Alíquota zero
  }

  // Cálculo do imposto sobre o lucro
  const imposto = lucroBruto * aliquotaImposto;

  // Cálculo do lucro líquido
  const lucroLiquido = lucroBruto - imposto;

  // Cálculo do valor final líquido
  const valorFinalLiquido = valorAplicado + lucroLiquido;

  // Percentual Real de Lucro
  const percentualRealLucro = (lucroLiquido / valorAplicado) * 100;

  return {
      valorFinalBruto: valorFinalBruto.toFixed(2),
      valorFinalLiquido: valorFinalLiquido.toFixed(2),
      aliquotaImposto: (aliquotaImposto * 100).toFixed(1), // em porcentagem
      lucroLiquido: lucroLiquido.toFixed(2),
      percentualRealLucro: percentualRealLucro.toFixed(2),
  };
};
