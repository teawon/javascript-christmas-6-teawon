import RestaurantValidator from '../RestaurantValidator.js';
import { MENU_TYPES } from '../constants.js';
class Food {
  static MENU_TYPES = [
    MENU_TYPES.appetizer,
    MENU_TYPES.main,
    MENU_TYPES.dessert,
    MENU_TYPES.beverage,
  ];

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
