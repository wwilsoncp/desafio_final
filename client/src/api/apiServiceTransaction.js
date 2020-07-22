import axios from "axios";
import M from "materialize-css";

// const API_URL = "http://localhost:3001/api/transaction/period/";
const API_URL =
  "https://controlefinanceirodesafiofinal.herokuapp.com/api/transaction/period/";

async function getTransactionByPeriod(period) {
  try {
    const res = await axios.get(`${API_URL}${period}`);
    return res.data;
  } catch (error) {
    M.toast({ html: error.message });
  }
}

async function insertTransaction(transacao) {
  try {
    const res = await axios.post(API_URL, transacao);
    return res.data._id;
  } catch (error) {
    M.toast({ html: error.message });
    return "";
  }
}

async function updateTransaction(transacao) {
  try {
    const res = await axios.put(API_URL, transacao);
    return res.data._id;
  } catch (error) {
    M.toast({ html: error.message });
    return "";
  }
}

async function deleteTransaction(id) {
  try {
    const res = await axios.delete(`${API_URL}${id}`);
    return res.status !== 400;
  } catch (error) {
    M.toast({ html: error.message });
    return false;
  }
}

async function getValidationValue() {
  return {
    minValue: 0,
    maxValue: 999999,
  };
}

export {
  getTransactionByPeriod,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  getValidationValue,
};
