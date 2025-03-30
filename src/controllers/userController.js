import { HEADER } from "../constants.js";
import { UserDTO } from "../model/dtos.js";
import { loginBodySchema, registerBodySchema } from "../model/schemas.js";
import { NotFoundUser, UserException } from "@unq-ui/gog-model-js/src/model/Exceptions.js";

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
        .json(new UserDTO(user));
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
        .json(new UserDTO(user));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getFriends = async (req, res) => {
    try {
      const userId = req.params.userId.toString();
      const user = await this.service.getUser(userId);
      res.json(user.friends.map((friend) => new UserDTO(friend)));
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  };

  addOrRemoveFriend = async (req, res) => {
    try {
      const friendId = req.params.userId.toString();
      const userId = this.tokenController.getUserId(req);
      const user = await this.service.addOrRemoveFriend(userId, friendId);
      res.json(user.friends.map((friend) => new UserDTO(friend)));
    } catch (error) {
      if (error instanceof NotFoundUser) {
        return res.status(404).json({ error: "User not found" });
      }
      if (error instanceof UserException) {
        return res.status(400).json({ error: "Can't add yourself as a friend" });
      }
    }
  };
}

export default UserController;
