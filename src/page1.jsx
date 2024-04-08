import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function App() {
  const [valor, setValor] = useState('');
  const [parcelas, setParcelas] = useState([]);

  // Função para formatar o valor para o formato de moeda brasileira (R$)
  const formatarValor = (value) => {
    const floatValue = parseFloat(value.replace(/[^\d]/g, '')) / 100;
    if (isNaN(floatValue)) return '';
    return `R$ ${floatValue.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  // Função para calcular as parcelas
  const calcularParcelas = (value) => {
    const valorFloat = parseFloat(value.replace(/[^\d]/g, '')) / 100;
    if (isNaN(valorFloat)) return [];
    const jurosPorParcela = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0];
    const parcelasCalculadas = [];
    let valorRestante = valorFloat;
    for (let i = 1; i <= 12; i++) {
      const valorPorParcela = valorFloat / i * (1 + jurosPorParcela[i - 1] / 100);
      parcelasCalculadas.push({
        parcela: i,
        valorParcela: `R$ ${(valorPorParcela).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
        valorTotal: `R$ ${(valorPorParcela * i).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
        juros: jurosPorParcela[i - 1]
      });
    }
    return parcelasCalculadas;
  };

  const handleValorChange = (e) => {
    const newValue = e.target.value;
    setValor(formatarValor(newValue));
    setParcelas(calcularParcelas(newValue));
  };

  const compartilharViaWhatsApp = () => {
    const mensagem = `Confira o detalhamento do parcelamento:\n\n${parcelas.map((parcela) => `Parcela ${parcela.parcela}: ${parcela.valorParcela} - Valor Total: ${parcela.valorTotal}`).join('\n')}`;
    const link = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
  };

  const gerarPDF = () => {
    const input = document.getElementById('tabela-parcelas');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('detalhamento_parcelamento.pdf');
      });
  };

  return (
    <div className="mx-auto flex flex-col items-center h-screen bg-gray-200">
      <h1 className="text-3xl font-semibold mb-8">Simulador de Parcelamento</h1>
      <div class="max-w-3xl p-6 bg-white border border-gray-100 rounded-lg shadow dark:bg-gray-100 dark:border-gray-200">
        <h2 className="text-3xl- font-semibold mb-6">Faça sua simulação aqui</h2>

        <div className="max-w-md">
          <div className="mb-4">
            <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
              Valor Total:
            </label>
            <input
              type="text"
              id="valor"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="R$ 1.250,00"
              value={valor}
              onChange={handleValorChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col items-center mt-8">
          <h2 className="text-xl font-semibold mb-4">Detalhes do Parcelamento:</h2>
          <table id="tabela-parcelas" className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Nº de Parcelas</th>
                <th className="px-4 py-2">Valor das Parcelas</th>
                <th className="px-4 py-2">Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {parcelas.map((parcela, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{parcela.parcela}</td>
                  <td className="border px-4 py-2">{parcela.valorParcela}</td>
                  <td className="border px-4 py-2">{parcela.valorTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-4 rounded"
            onClick={compartilharViaWhatsApp}
          >
            Compartilhar via WhatsApp
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={gerarPDF}
          >
            Gerar PDF
          </button>
        </div>
      </div>
    </div>
  );
}