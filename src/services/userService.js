import * as userRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function checkEmailAvailability(email) {
  const existingUserWithGivenEmail = await userRepository.checkEmailAvailability(email);
  if (existingUserWithGivenEmail.rows[0]) {
    return true;
  } else {
    return false;
  }
}

async function signup(name, email, password) {
  const hashedPassword = bcrypt.hashSync(password, 12);
  userRepository.signup(name, email, hashedPassword);
}
async function authenticate(email, password) {
  const user = await userRepository.findByEmail(email);

  if (!user.rows[0] || !bcrypt.compareSync(password, user.rows[0].password)) {
    return res.sendStatus(401);
  }

  const token = jwt.sign(
    {
      id: user.rows[0].id,
    },
    process.env.JWT_SECRET
  );
  return token;
}
export { checkEmailAvailability, signup, authenticate };
