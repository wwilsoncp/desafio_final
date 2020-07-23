import React from "react";
import Action from "./Action";
import { formatMonetary } from "../helpers/formatHelpers";

export default function TransactionControl(props) {
  // desestruturando de props
  const { transactions, onDelete, onPersist } = props;
  // o className striped é do materialize que já destingue uma linha da outra
  // &nbsp; caractere especial do html que é um caractere não quebrável: non break space

  let oldDay = 0;
  let marginAux = "5px";

  const handleActionClick = (id, type) => {
    const transaction = transactions.find((transaction) => {
      return transaction._id === id;
    });
    if (type === "delete") {
      onDelete(transaction._id);
      return;
    }
    onPersist(transaction);
  };

  return (
    <div style={{ width: "100%" }} className="container">
      {transactions.map((transaction) => {
        const { _id, day, category, value, type, description } = transaction;
        if (oldDay !== day) {
          marginAux = "20px 0px 0px";
          oldDay = day;
        } else {
          marginAux = "5px 0px";
        }

        return (
          <div
            key={_id}
            style={{
              border: "1px solid transparent",
              borderRadius: "4px",
              background: type === "+" ? "#A1F0DC" : "#F0A1A8",
              display: "flex",
              flexDirection: "space-between",
              margin: marginAux,
              padding: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "5%",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{day}</div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                width: "65%",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                {category}
              </div>
              <div>{description}</div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "20%",
                fontSize: "1.6rem",
              }}
            >
              <div>{formatMonetary(value)}</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "10%",
              }}
            >
              <Action id={_id} onActionClick={handleActionClick} type="edit" />
              <Action
                id={_id}
                onActionClick={handleActionClick}
                type="delete"
              />
            </div>
          </div>
        );
      })}
      <div></div>
    </div>
  );
}

const styles = {
  goodGrade: {
    fontWeight: "bold",
    color: "green",
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
