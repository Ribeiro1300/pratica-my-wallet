import * as financialRepository from "../repositories/financialRepository";

async function newEvent(id, value, type) {
  await financialRepository.newEvent(id, value, type);
}

async function getEvents() {}

export { newEvent, getEvents };
