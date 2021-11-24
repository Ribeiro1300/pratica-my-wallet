import * as userService from "../services/userService.js";

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.sendStatus(400);
    }

    if (await userService.checkEmailAvailability(email)) {
      return res.sendStatus(409);
    }

    userService.signup(name, email, password);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function signin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const result = await userService.authenticate(email, password);
    const token = result.token;
    if (!result.user.rows[0] || !bcrypt.compareSync(password, result.user.rows[0].password)) {
      return res.sendStatus(401);
    }

    res.send({ token });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
export { signup, signin };
