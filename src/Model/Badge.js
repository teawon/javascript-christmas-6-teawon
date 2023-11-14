import RestaurantValidator from '../RestaurantValidator.js';

class Badge {
  #name;

  constructor(name) {
    RestaurantValidator.validateBadgeModel(name);
    this.#name = name;
  }

  getName() {
    return this.#name;
  }
}

export default Badge;
