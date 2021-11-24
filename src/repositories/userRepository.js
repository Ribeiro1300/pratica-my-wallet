import connection from "../database.js";

async function checkEmailAvailability(email) {
  const existingUserWithGivenEmail = await connection.query(
    `SELECT * FROM "users" WHERE "email"=$1`,
    [email]
  );
  return existingUserWithGivenEmail;
}

async function signup(name, email, hashedPassword) {
  await connection.query(`INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`, [
    name,
    email,
    hashedPassword,
  ]);
}

async function findByEmail(email) {
  const user = await connection.query(`SELECT * FROM "users" WHERE "email"=$1`, [email]);
  return user;
}
export { checkEmailAvailability, signup, findByEmail };
