import ValidationUtils from './Utils/ValidationUtils.js';

const RestaurantValidator = {
  validateBadgeModel(name) {
    ValidationUtils.validateNotNull(
      name,
      '[ERROR] 빈 문자열의 배지는 존재할 수 없습니다.',
    );
  },

  validateCustomDateModel(year, month, day) {
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다.');
    }
  },

  validateFoodModel(name, type, menuType) {
    ValidationUtils.validateNotNull(name, '[ERROR] 메뉴 이름은 필수입니다.');
    ValidationUtils.validateIncluded(
      type,
      menuType,
      '[ERROR] 존재하지 않는 메뉴 타입입니다.',
    );
  },

  validateExistMenu(menu) {
    ValidationUtils.validateNotNull(menu, '[ERROR] 존재하지 않는 메뉴입니다.');
  },

  validateMoneyModel(price) {
    ValidationUtils.validatePositiveNumber(
      price,
      '[ERROR] 금액은 음수가 될 수 없습니다.',
    );
  },

  validateMoneyType(money, moneyType) {
    ValidationUtils.validateTypeCheck(
      money,
      moneyType,
      '[ERROR] 유효하지 않은 Money 객체입니다.',
    );
  },

  validateOrderModel(foodList, orderMenuCount) {
    ValidationUtils.validateMaxLen(
      orderMenuCount,
      20,
      '[ERROR] 주문 가능한 메뉴의 개수를 초과하였습니다.',
    );

    ValidationUtils.validateMinLen(
      foodList.length,
      1,
      '[ERROR] 하나 이상의 메뉴를 주문해야합니다.',
    );

    const menuNames = foodList.map((item) => item.food.getName());
    ValidationUtils.validateNotDuplicate(
      menuNames,
      '[ERROR] 중복된 메뉴를 주문할 수 없습니다.',
    );

    if (foodList.every((item) => item.food.getType() === '음료')) {
      throw new Error('[ERROR] 음료만 주문할 수 없습니다.');
    }

    if (foodList.some((item) => item.count < 1)) {
      throw new Error('[ERROR] 각 메뉴는 적어도 1개 이상을 주문해야합니다.');
    }
  },
};

export default RestaurantValidator;
