import connection from "../database.js";

async function newEvent(id, value, type) {
  await connection.query(
    `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
    [id, value, type]
  );
}

async function getEvents(id) {
  const events = await connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [id]
  );
  return events;
}

export { newEvent, getEvents };
