import {
  NotFoundGame,
  PurchaseException,
} from "@unq-ui/gog-model-js/src/model/Exceptions.js";
import { CartDTO, GameDTO, GamePageDTO, SimpleGameDTO } from "../model/dtos.js";

class GameController {
  constructor(service, tokenController) {
    this.service = service;
    this.tokenController = tokenController;
  }

  getGames = async (req, res) => {
    try {
      const page = req.query.page ? req.query.page.toString() : 1;
      const gamePage = await this.service.getGames(page);
      res.json(new GamePageDTO(gamePage));
    } catch (PageException) {
      res.status(400).json({ error: "Invalid page number" });
    }
  };

  getGamesRecommended = (req, res) => {
    const games = this.service.getRecommendedGames();
    res.json(games.map((game) => new SimpleGameDTO(game)));
  };

  getGamesId = async (req, res) => {
    try {
      const gameId = req.params.gameId.toString();
      console.log(gameId);
      const game = await this.service.getGame(gameId);
      res.json(new GameDTO(game));
    } catch (NotFoundGame) {
      res.status(404).json({ error: "Game not found" });
    }
  };

  putGamesId = async (req, res) => {
    try {
      const gameId = req.params.gameId.toString();
      const userId = this.tokenController.getUserId(req);
      const cart = await this.service.addGameToCart(userId, gameId);
      res.json(new CartDTO(cart));
    } catch (PurchaseException) {
      res.status(404).json({ error: "User already has the game" });
    }
  };

  deleteGamesId = async (req, res) => {
    try {
      const gameId = req.params.gameId.toString();
      const userId = this.tokenController.getUserId(req);
      const cart = await this.service.removeGameFromCart(userId, gameId);
      res.json(new CartDTO(cart));
    } catch (CartException) {
      res.status(404).json({ error: "Game not in the cart" });
    }
  };

  search = async (req, res) => {
    try {
        const query = req.query.query ? req.query.query.toString() : "";
        const page = req.query.page ? req.query.page.toInt() : 1;
        const gamePage = await this.service.searchGame(query, page);
        res.json(new GamePageDTO(gamePage));
    } catch (error) {
        res.json(new GamePageDTO());
    }
  };
}

export default GameController;
