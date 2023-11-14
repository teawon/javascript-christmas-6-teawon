import ValidationUtils from './Utils/ValidationUtils.js';
import { ERROR_MESSAGE } from './message.js';
import { MENU_TYPES } from './constants.js';

const RestaurantValidator = {
  validateBadgeModel(name) {
    ValidationUtils.validateNotNull(name, ERROR_MESSAGE.emptyBadge);
  },

  validateCustomDateModel(year, month, day) {
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  },

  validateFoodModel(name, type, menuType) {
    ValidationUtils.validateNotNull(name, ERROR_MESSAGE.emptyMenuName);
    ValidationUtils.validateIncluded(
      type,
      menuType,
      ERROR_MESSAGE.invalidMenuType,
    );
  },

  validateExistMenu(menu) {
    ValidationUtils.validateNotNull(menu, ERROR_MESSAGE.nonexistentMenu);
  },

  validateMoneyModel(price) {
    ValidationUtils.validateMinLen(price, 0, ERROR_MESSAGE.negativePrice);
  },

  validateMoneyType(money, moneyType) {
    ValidationUtils.validateTypeCheck(
      money,
      moneyType,
      ERROR_MESSAGE.invalidMoneyObject,
    );
  },

  validateOrderModel(foodList, orderMenuCount, maxCount) {
    ValidationUtils.validateMaxLen(
      orderMenuCount,
      maxCount,
      ERROR_MESSAGE.orderCountExceeded,
    );

    ValidationUtils.validateMinLen(
      foodList.length,
      1,
      ERROR_MESSAGE.noMenuOrdered,
    );

    const menuNames = foodList.map((item) => item.food.getName());
    ValidationUtils.validateNotDuplicate(
      menuNames,
      ERROR_MESSAGE.duplicateMenu,
    );

    if (foodList.every((item) => item.food.getType() === MENU_TYPES.beverage)) {
      throw new Error(ERROR_MESSAGE.beverageOnly);
    }

    if (foodList.some((item) => item.count < 1)) {
      throw new Error(ERROR_MESSAGE.minimumOneMenu);
    }
  },
};

export default RestaurantValidator;
