import React, { useState } from "react";
import { formatMonetary } from "../helpers/formatHelpers";

export default function TransactionTotalizer(props) {
  const { transactions } = props;
  const [totalLancamentos, setTotalLancamentos] = useState("");
  const [totalReceitas, seTotalReceitas] = useState("");
  const [totalDespesas, setTotalDespesas] = useState("");
  const [totalSaldo, setTotalSaldo] = useState("");
  const [saldoPositivo, setSaldoPositivo] = useState(true);

  React.useEffect(() => {
    if (transactions) {
      console.log("transactions");
      console.log(transactions);
      setTotalLancamentos(transactions.length);
      const receitas = transactions.reduce((acc, cur) => {
        const valueSum = cur.type == "+" ? cur.value : 0;
        return acc + valueSum;
      }, 0);
      seTotalReceitas(formatMonetary(receitas));
      const despesas = transactions.reduce((acc, cur) => {
        const valueSum = cur.type == "-" ? cur.value : 0;
        return acc + valueSum;
      }, 0);

      setTotalDespesas(formatMonetary(despesas));
      const saldo = receitas - despesas;
      setSaldoPositivo(saldo >= 0);
      if (saldo >= 0) {
        setTotalSaldo(formatMonetary(saldo));
      } else {
        setTotalSaldo(formatMonetary(saldo * -1));
      }
    }
  }, [transactions]);

  return (
    <div style={styles.divPrincipal}>
      <div>
        <span>
          <strong style={styles.spanStrong}>Lançamentos:</strong>
        </span>
        <span>
          <strong style={styles.spanStrong}>{totalLancamentos}</strong>
        </span>
      </div>

      <div>
        <span>
          <strong style={styles.spanStrong}>Receitas:</strong>
          <span style={styles.spanReceitas}>{totalReceitas}</span>
        </span>
      </div>
      <div>
        <span>
          <strong style={styles.spanStrong}>Despesas:</strong>
          <span style={styles.spanDespesas}>{totalDespesas}</span>
        </span>
      </div>
      <div>
        <span>
          <strong style={styles.spanStrong}>Saldo:</strong>
          <span
            style={saldoPositivo ? styles.spanReceitas : styles.spanDespesas}
          >
            {totalSaldo}
          </span>
        </span>
      </div>
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
  spanStrong: {
    marginRight: "10px",
  },
  spanReceitas: {
    fontWeight: "bold",
    color: "rgb(22, 160, 133)",
  },
  spanDespesas: {
    fontWeight: "bold",
    color: "rgb(192, 57, 43)",
  },
};
