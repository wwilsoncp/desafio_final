import React, { useEffect } from "react";
import M from "materialize-css";
import { PERIODS } from "./helpers/periods";
import * as api from "./api/apiServiceTransaction";
import TransactionControl from "./components/TransactionControl.js";
import ModalTransaction from "./components/ModalTransaction";
import TransactionTotalizer from "./components/TransactionTotalizer";
import Spinner from "./components/Spinner";

export default function App() {
  const [fullTransactions, setFullTransaction] = React.useState([]);
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);
  const [indexCurrentPeriod, setIndexCurrentPeriod] = React.useState(0);
  const [currentPeriod, setCurrentPeriod] = React.useState(PERIODS[0]);
  const [selectedTransaction, setSelectedTransaction] = React.useState({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [propDisabledMesAnterior, setPropDisabledMesAnterior] = React.useState(
    true
  );
  const [propDisabledMesSeguinte, setPropDisabledMesSeguinte] = React.useState(
    false
  );
  const [filterValue, setFilterValue] = React.useState("");

  const getTransactions = async () => {
    const localTransactions = await api.getTransactionByPeriod(currentPeriod);
    setFullTransaction(localTransactions);
    setFilteredTransactions(
      localTransactions.filter((transaction) => {
        return transaction.description
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      })
    );
  };

  const defineDisabledButton = () => {
    setPropDisabledMesAnterior(indexCurrentPeriod === 0);
    setPropDisabledMesSeguinte(indexCurrentPeriod === PERIODS.length - 1);
  };

  useEffect(() => {
    setFilteredTransactions([]);
    setTimeout(() => {
      getTransactions();
    }, 1000);
  }, [currentPeriod]);

  useEffect(() => {
    defineDisabledButton();
    setCurrentPeriod(PERIODS[indexCurrentPeriod]);
  }, [indexCurrentPeriod]);

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    console.log(filterValue);
    setFilteredTransactions(
      fullTransactions.filter((transaction) => {
        return transaction.description
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      })
    );
  }, [filterValue]);

  const handlePeriodChange = (event) => {
    let index = PERIODS.findIndex((per) => {
      return per === event.target.value;
    });
    setIndexCurrentPeriod(index);
    setCurrentPeriod(event.target.value);
    setFilterValue("");
  };

  const handleOnClickButtonMesAnterior = async () => {
    if (indexCurrentPeriod > 0) {
      let newIndex = indexCurrentPeriod - 1;
      setIndexCurrentPeriod(newIndex);
      setFilterValue("");
    }
  };

  const handleOnClickButtonMesSeguinte = async () => {
    if (indexCurrentPeriod < PERIODS.length) {
      let newIndex = indexCurrentPeriod + 1;
      setIndexCurrentPeriod(newIndex);
      setFilterValue("");
    }
  };

  const handleOnClickButtonNovoLancamento = async () => {
    setSelectedTransaction({
      _id: "",
      category: "",
      value: 0,
      type: "-",
      description: "",
      yearMonthDay: new Date(),
    });
    setIsModalOpen(true);
  };

  const handlePersist = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handlePersistTransaction = async (formDataTransaction) => {
    if (formDataTransaction) {
      // se o _id não for undefined, significa que é uma atualização
      if (formDataTransaction._id !== "") {
        await api.updateTransaction(formDataTransaction);
        M.toast({
          html: "Transação atualizada com sucesso.",
        });
      } else {
        delete formDataTransaction._id;
        console.log("formDataTransaction");
        console.log(formDataTransaction);
        const newId = await api.insertTransaction(formDataTransaction);
        if (newId !== "") {
          M.toast({
            html: "Transação inserida com sucesso.",
          });
        }
      }
    }
    setIsModalOpen(false);
    getTransactions();
  };

  const handleOnClickButtonDelete = async (id) => {
    const transactionDeleted = await api.deleteTransaction(id);
    if (transactionDeleted) {
      M.toast({
        html: "Transação excluída com sucesso.",
      });
      getTransactions();
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOnChangeFilter = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div className="container center">
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      <h4>Controle Financeiro Pessoal</h4>

      {!isModalOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="waves-effect waves-lights btn"
            onClick={handleOnClickButtonMesAnterior}
            disabled={propDisabledMesAnterior}
          >
            Mês Anterior
          </button>

          <select
            className="browser-default"
            style={{ width: "150px", marginRight: "10px", marginLeft: "10px" }}
            onChange={handlePeriodChange}
            value={currentPeriod}
          >
            {PERIODS.map((period) => {
              return (
                <option key={period} value={period}>
                  {period}
                </option>
              );
            })}
          </select>

          <button
            className="waves-effect waves-lights btn"
            onClick={handleOnClickButtonMesSeguinte}
            disabled={propDisabledMesSeguinte}
          >
            Mês Seguinte
          </button>
        </div>
      )}

      {filteredTransactions.length === 0 && (
        <div style={{ marginTop: "10px" }}>
          <Spinner>Carregando transações...</Spinner>
        </div>
      )}

      {filteredTransactions.length > 0 && (
        <TransactionTotalizer
          transactions={filteredTransactions}
        ></TransactionTotalizer>
      )}

      {!isModalOpen && filteredTransactions.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <button
            className="waves-effect waves-lights btn"
            style={{ width: "250px", marginRight: "10px" }}
            // disabled={errorMessage.trim() !== ""}
            onClick={handleOnClickButtonNovoLancamento}
            disabled={filterValue !== ""}
          >
            + Novo Lançamento
          </button>
          <input
            id="inputFilter"
            placeholder="Filtro"
            type="text"
            value={filterValue}
            onChange={handleOnChangeFilter}
          ></input>
        </div>
      )}

      <div>
        {filteredTransactions && (
          <TransactionControl
            transactions={filteredTransactions}
            onDelete={handleOnClickButtonDelete}
            onPersist={handlePersist}
          ></TransactionControl>
        )}
      </div>

      {isModalOpen && (
        <ModalTransaction
          onSave={handlePersistTransaction}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
        ></ModalTransaction>
      )}
    </div>
  );
}
