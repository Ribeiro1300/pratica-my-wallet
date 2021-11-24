import * as financialService from "../services/financialService.js";
import jwt from "jsonwebtoken";

async function postFinancialEvent(req, res) {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.split("Bearer ")[1];

    if (!token) {
      return res.sendStatus(401);
    }

    let user;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.sendStatus(401);
    }

    const { value, type } = req.body;

    if (!value || !type) {
      return res.sendStatus(400);
    }

    if (!["INCOME", "OUTCOME"].includes(type)) {
      return res.sendStatus(400);
    }

    if (value < 0) {
      return res.sendStatus(400);
    }

    await financialService.newEvent(user.id, value, type);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function getFinancialEvent(req, res) {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.split("Bearer ")[1];

    if (!token) {
      return res.sendStatus(401);
    }

    let user;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.sendStatus(401);
    }

    const events = await financialService.getEvents(user.id);

    res.send(events.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function sumFinancialEvents(req, res) {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.split("Bearer ")[1];

    if (!token) {
      return res.sendStatus(401);
    }

    let user;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.sendStatus(401);
    }

    const events = await financialService.getEvents(user.id);

    const sum = events.rows.reduce(
      (total, event) => (event.type === "INCOME" ? total + event.value : total - event.value),
      0
    );

    res.send({ sum });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
export { postFinancialEvent, getFinancialEvent, sumFinancialEvents };
