const formatterConfig = {
  style: 'currency',
  currency: 'BRL',
};

const formatter = Intl.NumberFormat('pt-BR');
const formatterMonetary = Intl.NumberFormat('pt-BR', formatterConfig);

function formatNumber(value) {
  return formatter.format(value);
}

function formatMonetary(value) {
  return formatterMonetary.format(value);
}

export { formatNumber, formatMonetary };
