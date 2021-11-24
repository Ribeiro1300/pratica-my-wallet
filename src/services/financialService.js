import * as financialRepository from "../repositories/financialRepository.js";

async function newEvent(id, value, type) {
  await financialRepository.newEvent(id, value, type);
}

async function getEvents(id) {
  const events = await financialRepository.getEvent(id);
  return events;
}

export { newEvent, getEvents };
