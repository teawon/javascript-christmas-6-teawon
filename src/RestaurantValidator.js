import ValidationUtils from './Utils/ValidationUtils.js';
import { ERROR_MESSAGE } from './message.js';
import { MENU_TYPES } from './constants.js';

const {
  validateNotNull,
  validateTypeCheck,
  validateMaxLen,
  validateMinLen,
  validateIncluded,
  validateNotDuplicate,
} = ValidationUtils;

const RestaurantValidator = {
  validateBadgeModel(name) {
    validateNotNull(name, ERROR_MESSAGE.emptyBadge);
  },

  validateCustomDateModel(year, month, day) {
    const date = new Date(year, month - 1, day);
    const isYearValid = date.getFullYear() === year;
    const isMonthValid = date.getMonth() + 1 === month;
    const isDayValid = date.getDate() === day;

    if (!isYearValid || !isMonthValid || !isDayValid) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  },

  validateFoodModel(name, type, menuType) {
    validateNotNull(name, ERROR_MESSAGE.emptyMenuName);
    validateIncluded(type, menuType, ERROR_MESSAGE.invalidMenuType);
  },

  validateExistMenu(menu) {
    validateNotNull(menu, ERROR_MESSAGE.nonexistentMenu);
  },

  validateMoneyModel(price) {
    validateMinLen(price, 0, ERROR_MESSAGE.negativePrice);
  },

  validateMoneyType(money, moneyType) {
    validateTypeCheck(money, moneyType, ERROR_MESSAGE.invalidMoneyObject);
  },

  validateCustomDateType(date, dateType) {
    validateTypeCheck(date, dateType, ERROR_MESSAGE.invalidCustomDateObject);
  },

  validateOrderModel(foodList, orderMenuCount, maxCount) {
    validateMaxLen(orderMenuCount, maxCount, ERROR_MESSAGE.orderCountExceeded);
    validateMinLen(foodList.length, 1, ERROR_MESSAGE.noMenuOrdered);

    const menuNames = foodList.map((item) => item.food.getName());
    validateNotDuplicate(menuNames, ERROR_MESSAGE.duplicateMenu);

    if (foodList.every((item) => item.food.getType() === MENU_TYPES.beverage)) {
      throw new Error(ERROR_MESSAGE.beverageOnly);
    }
    if (foodList.some((item) => item.count < 1)) {
      throw new Error(ERROR_MESSAGE.minimumOneMenu);
    }
  },
};

export default RestaurantValidator;
