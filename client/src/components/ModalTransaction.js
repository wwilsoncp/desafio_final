import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import * as api from "../api/apiServiceTransaction";

Modal.setAppElement("#root");

export default function ModalTransaction({
  onSave,
  onClose,
  selectedTransaction,
}) {
  const {
    _id,
    category,
    value,
    type,
    description,
    yearMonthDay,
  } = selectedTransaction;

  // const [gradeValue, setGradeValue] = useState(selectedTransaction.value);

  const [newType, setNewType] = useState(type);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] = useState(category);
  const [newValue, setNewValue] = useState(value);
  const [newDate, setNewDate] = useState(yearMonthDay);
  const [transactionValidation, setTransactionValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationValue();
      setTransactionValidation(validation);
    };
    getValidation();
  }, []);

  useEffect(() => {
    const { minValue, maxValue } = transactionValidation;
    if (newValue < minValue || newValue > maxValue) {
      setErrorMessage(
        `O valor da transação deve ser entre ${minValue} e ${maxValue} (inclusive)`
      );
      return;
    }
    setErrorMessage("");
  }, [newValue, transactionValidation]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    var arrDataExclusao = newDate.split("-");
    var dataFormatada =
      arrDataExclusao[1] + "-" + arrDataExclusao[2] + "-" + arrDataExclusao[0];
    const newDateAux = new Date(dataFormatada);

    const _day = parseInt(arrDataExclusao[2]);
    const _month = newDateAux.getMonth() + 1;
    const _year = newDateAux.getFullYear();

    const formDataTransaction = {
      _id,
      category: newCategory,
      day: _day,
      description: newDescription,
      month: _month,
      type: newType,
      value: newValue,
      year: _year,
      yearMonth: _year.toString() + "-" + _month.toString().padStart(2, "0"),
      yearMonthDay: newDate,
    };
    console.log("formDataTransaction");
    console.log(formDataTransaction);
    onSave(formDataTransaction);
  };

  const handleInputTransactionValueChange = (event) => {
    setNewValue(+event.target.value);
  };

  const handleChangeInputCategory = (event) => {
    setNewCategory(event.target.value);
  };

  const handleChangeInputDescription = (event) => {
    setNewDescription(event.target.value);
  };

  const handleModalClose = () => {
    onClose(null);
  };

  const handleChangeInputDate = (event) => {
    setNewDate(event.target.value);
  };
  const handleSave = () => {};

  const handleChangeRadio = (event) => {
    setNewType(event.target.value);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Transação</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <p>
            <label>
              <input
                name="groupType"
                type="radio"
                onChange={handleChangeRadio}
                value="-"
                checked={newType === "-"}
                disabled={_id !== ""}
              />
              <span>Despesa</span>
            </label>
            <label>
              <input
                name="groupType"
                type="radio"
                onChange={handleChangeRadio}
                value="+"
                checked={newType === "+"}
                disabled={_id !== ""}
              />
              <span>Receita</span>
            </label>
          </p>
          <div className="input-field">
            <input
              id="inputStudent"
              type="text"
              value={newDescription}
              onChange={handleChangeInputDescription}
            />
            <label className="active" htmlFor="inputStudent">
              Descrição:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputSubject"
              type="text"
              value={newCategory}
              onChange={handleChangeInputCategory}
            />
            <label className="active" htmlFor="inputSubject">
              Categoria:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputGrade"
              type="number"
              min={transactionValidation.minValue}
              max={transactionValidation.maxValue}
              step={0.01}
              autoFocus
              value={newValue}
              onChange={handleInputTransactionValueChange}
            />
            <label className="active" htmlFor="inputGrade">
              Valor:
            </label>
          </div>
          <div className="input-field">
            <input
              style={{ marginTop: "15px" }}
              id="inputDataTransaction"
              placeholder="Data da Transação"
              type="date"
              className="browser-default"
              required=""
              onChange={handleChangeInputDate}
              value={newDate}
            />
            <label
              style={{ marginBottom: "10px" }}
              className="active"
              htmlFor="inputDataTransaction"
            >
              Data:
            </label>
          </div>

          <div style={styles.flexRow}>
            <button
              className="waves-effect waves-lights btn"
              disabled={errorMessage.trim() !== ""}
              onClick={handleSave}
            >
              Salvar
            </button>
            <span style={styles.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
  flexStart: {
    justifyContent: "flex-start",
  },
  title: {
    fontSize: "1.3rem",
    fontWright: "bold",
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
  },
};
