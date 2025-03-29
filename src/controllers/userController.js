import { HEADER } from "../constants.js";
import { loginBodySchema, registerBodySchema } from "../model/schemas.js";

class UserController {
  constructor(service, tokenController) {
    this.service = service;
    this.tokenController = tokenController;
  }

  login = async (req, res) => {
    try {
      const userReq = await loginBodySchema.validate(req.body);
      const user = this.service.users.find(
        (user) =>
          user.email === userReq.email && user.password === userReq.password
      );
      const token = this.tokenController.generateToken(user.id);
      res
        .header(HEADER, token)
        .json({ user: { id: user.id, email: user.email } });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  register = async (req, res) => {
    try {
      const newUser = await registerBodySchema.validate(req.body);
      const user = this.service.addNewUser(newUser);
      const token = this.tokenController.generateToken(user.id);
      res
        .header(HEADER, token)
        .json({ user: { id: user.id, email: user.email } });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default UserController;
