export class GameDTO {
  constructor(game) {
    this.id = game.id;
    this.name = game.name;
    this.description = game.description;
    this.mainImage = game.mainImage?.src || null;
    this.multimedia = game.multimedia;
    this.tags = game.tags;
    this.price = game.price;
    this.requirement = game.requirement;
    this.relatedGames = game.relatedGames.map(
      (game) => new SimpleGameDTO(game)
    );
    this.developer = new DeveloperDTO(game.developer);
    this.releaseDate = game.releaseDate;
    this.reviews = game.reviews.map((review) => new ReviewDTO(review));
    this.esrb = game.esrb;
    this.website = game.website;
  }
}

export class SimpleGameDTO {
  constructor(game) {
    this.id = game.id;
    this.name = game.name;
    this.mainImage = game.mainImage?.src || null;
    this.tags = game.tags;
    this.price = game.price;
  }
}

export class DeveloperDTO {
  constructor(developer) {
    this.id = developer.id;
    this.name = developer.name;
    this.image = developer.image?.src || null;
  }
}

export class ReviewDTO {
  constructor(review) {
    this.id = review.id;
    this.user = new SimpleUserDTO(review.user);
    this.game = new SimpleGameDTO(review.game);
    this.isRecommended = review.isRecommended;
    this.text = review.text;
  }
}

export class UserDTO {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.image = user.image?.src || null;
    this.backgroundImage = user.backgroundImage?.src || null;
    this.games = user.games.map((game) => new SimpleGameDTO(game));
  }
}

export class SimpleUserDTO {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.image = user.image;
  }
}

export class GamePageDTO {
  constructor(pageInfo = { list: [], currentPage: 1, amountOfElements: 0, amountOfPages: 0 }) {
    this.list = pageInfo.list.map((game) => new SimpleGameDTO(game));
    this.currentPage = pageInfo.currentPage.toString();
    this.amountOfElements = pageInfo.amountOfElements;
    this.amountOfPages = pageInfo.amountOfPages;
  }
}

export class CartDTO {
  constructor(cart) {
    this.games = cart.games.map((game) => new SimpleGameDTO(game));
    this.user = pageInfo.amountOfPages;
  }
}
