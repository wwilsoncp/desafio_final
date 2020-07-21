const express = require("express");
const transactionRouter = express.Router();
const TransactionModel = require("../models/TransactionModel.js");

const app = express();
app.use(express.json());

// requisição de validação caso o cliente não passe o período
transactionRouter.get("/period", async (req, res) => {
  try {
    if (!req.params.period) {
      throw new Error(
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm.'
      );
    }
    res.send("Passou");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// item ?? - listar todas as agências e contas
transactionRouter.get("/period/:period", async (req, res) => {
  try {
    const lancamentos = await TransactionModel.find({
      yearMonth: req.params.period,
    }).sort({ day: 1 });
    res.send(lancamentos);

    console.log(req.params.period);
    res.send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

transactionRouter.post("/period/", async (req, res) => {
  try {
    const transacao = new TransactionModel(req.body);
    await transacao.save();
    res.send(transacao);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

transactionRouter.put("/period/", async (req, res) => {
  try {
    // new: true, no 3º parâmetro é pra indicar que deverá retornar o objeto atualizado
    const student = await TransactionModel.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      req.body,
      { new: true }
    );
    res.send(student);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

transactionRouter.delete("/period/:id", async (req, res) => {
  try {
    const transacao = await TransactionModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (!transacao) {
      res.status(400).send("Transação não encontrada.");
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = transactionRouter;
