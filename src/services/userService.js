import * as userRepository from "../repositories/userRepository.js";
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
async function authenticate(email) {
  const user = await userRepository.findByEmail(email);

  const token = jwt.sign(
    {
      id: user.rows[0].id,
    },
    process.env.JWT_SECRET
  );
  return token;
}

async function checkPassword(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user.rows[0] || !bcrypt.compareSync(password, user.rows[0].password)) {
    return false;
  } else {
    return true;
  }
}
export { checkEmailAvailability, signup, authenticate, checkPassword };
