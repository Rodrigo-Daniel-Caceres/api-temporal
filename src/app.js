import express from "express";

import { initGogSystem } from "@unq-ui/gog-model-js";

import UserController from "./controllers/userController.js";
import TokenController from "./controllers/tokenController.js";
import GameController from "./controllers/gameController.js";

const gogSystem = initGogSystem();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tokenController = new TokenController(gogSystem);
const userController = new UserController(gogSystem, tokenController);
const gameController = new GameController(gogSystem, tokenController);

// User
app.post("/login", tokenController.checkRole("public"), userController.login);
app.post(
  "/register",
  tokenController.checkRole("public"),
  userController.register
);

app
  .route("/users/:userId/friends")
  .get(tokenController.checkRole("public"), userController.getFriends)
  .post(tokenController.checkRole("user"), userController.addOrRemoveFriend);

// Games
app.get("/games", tokenController.checkRole("public"), gameController.getGames);
app.get(
  "/games/recommended",
  tokenController.checkRole("public"),
  gameController.getGamesRecommended
);
app
  .route("/games/:gameId")
  .get(tokenController.checkRole("public"), gameController.getGamesId)
  .put(tokenController.checkRole("user"), gameController.putGamesId)
  .delete(tokenController.checkRole("user"), gameController.deleteGamesId);

// Search
app.get(
  "/search", 
  tokenController.checkRole("public"), 
  gameController.search
);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
