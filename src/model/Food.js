import RestaurantValidator from '../RestaurantValidator.js';

class Food {
  static MENU_TYPES = ['애피타이저', '메인', '디저트', '음료'];

  #name;
  #money;
  #type;

  constructor(name, money, type) {
    RestaurantValidator.validateFoodModel(name, type, Food.MENU_TYPES);
    this.#name = name;
    this.#money = money;
    this.#type = type;
  }

  getName() {
    return this.#name;
  }

  getMoney() {
    return this.#money;
  }

  getType() {
    return this.#type;
  }
}

export default Food;
