import RestaurantValidator from '../RestaurantValidator.js';
import Food from './Food.js';
import Money from './Money.js';
import { MENU_NAMES, MENU_TYPES } from '../constants.js';

class Menu {
  static FOOD_MENU = {
    [MENU_NAMES.mushroomSoup]: {
      price: 6000,
      type: MENU_TYPES.appetizer,
    },
    [MENU_NAMES.tapas]: {
      price: 5500,
      type: MENU_TYPES.appetizer,
    },
    [MENU_NAMES.caesarSalad]: {
      price: 8000,
      type: MENU_TYPES.appetizer,
    },
    [MENU_NAMES.tBoneSteak]: {
      price: 55000,
      type: MENU_TYPES.main,
    },
    [MENU_NAMES.bbqRibs]: {
      price: 54000,
      type: MENU_TYPES.main,
    },
    [MENU_NAMES.seafoodPasta]: {
      price: 35000,
      type: MENU_TYPES.main,
    },
    [MENU_NAMES.christmasPasta]: {
      price: 25000,
      type: MENU_TYPES.main,
    },
    [MENU_NAMES.chocoCake]: {
      price: 15000,
      type: MENU_TYPES.dessert,
    },
    [MENU_NAMES.iceCream]: {
      price: 5000,
      type: MENU_TYPES.dessert,
    },
    [MENU_NAMES.zeroCola]: {
      price: 3000,
      type: MENU_TYPES.beverage,
    },
    [MENU_NAMES.redWine]: {
      price: 60000,
      type: MENU_TYPES.beverage,
    },
    [MENU_NAMES.champagne]: {
      price: 25000,
      type: MENU_TYPES.beverage,
    },
  };

  static getFood(name) {
    const menuInfo = Menu.FOOD_MENU[name];
    RestaurantValidator.validateExistMenu(menuInfo);

    const { price, type } = menuInfo;
    const food = new Food(name, new Money(price), type);

    return food;
  }
}

export default Menu;
