import React, { useState } from "react";

export default function TransactionTotalizer(props) {
  const { transactions } = props;
  const [totalLancamentos, setTotalLancamentos] = useState("");
  const [totalReceitas, seTotalReceitas] = useState("");
  const [totalDespesas, setTotalDespesas] = useState("");
  const [totalSaldo, setTotalSaldo] = useState("");

  React.useEffect(() => {
    if (transactions) {
      console.log("transactions");
      console.log(transactions);
      setTotalLancamentos(transactions.length);
      const receitas = transactions.reduce((acc, cur) => {
        const valueSum = cur.type == "+" ? cur.value : 0;
        return acc + valueSum;
      }, 0);
      seTotalReceitas(receitas);
      const despesas = transactions.reduce((acc, cur) => {
        const valueSum = cur.type == "-" ? cur.value : 0;
        return acc + valueSum;
      }, 0);
      setTotalDespesas(despesas);
      const saldo = receitas - despesas;
      setTotalSaldo(saldo);
    }
  }, [transactions]);

  return (
    <div style={styles.divPrincipal}>
      <span>
        <strong>Lançamentos:</strong>
        {totalLancamentos}
      </span>
      <span>
        <strong>Receitas:</strong>
        {totalReceitas}
      </span>
      <span>
        <strong>Despesas:</strong>
        {totalDespesas}
      </span>
      <span>
        <strong>Saldo:</strong>
        {totalSaldo}
      </span>
    </div>
  );
}

const styles = {
  divPrincipal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    border: "1px solid lightgrey",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
  },
  badGrade: {
    fontWeight: "bold",
    color: "red",
  },
  table: {
    margin: "20px",
    padding: "10px",
  },
};
