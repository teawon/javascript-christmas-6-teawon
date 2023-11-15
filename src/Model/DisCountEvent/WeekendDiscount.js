import DiscountEvent from './DiscountEvent.js';
import CustomDate from '../CustomDate.js';
import Money from '../Money.js';
import { MENU_TYPES, EVENT_NAMES } from '../../constants.js';

class WeekendDiscount extends DiscountEvent {
  static DISCOUNT_MENU_TYPE = MENU_TYPES.main;

  static DISCOUNT_AMOUNT = 2023;

  #eventName;

  #appliedPeriod;

  constructor() {
    super();
    this.#eventName = EVENT_NAMES.weekend;
    this.#appliedPeriod = {
      start: new CustomDate(2023, 12, 1),
      end: new CustomDate(2023, 12, 31),
    };
  }

  isApplicable(order) {
    const orderDate = order.getDate();
    const { start, end } = this.#appliedPeriod;

    if (!orderDate.isBetween(start, end)) return false;
    if (order.getTotalMoney().getPrice() < 10000) return false;
    if (orderDate.isWeekday()) return false;

    const mainMenuCount = this.#getTotalMainMenuCount(order);
    if (mainMenuCount < 1) return false;

    return true;
  }

  #getTotalMainMenuCount(order) {
    const mainMenuCount = order.getTotalOrderCountByType(
      WeekendDiscount.DISCOUNT_MENU_TYPE,
    );
    return mainMenuCount;
  }

  getDiscountDetails(order) {
    const mainMenuCount = this.#getTotalMainMenuCount(order);
    const disCountMoney = new Money(WeekendDiscount.DISCOUNT_AMOUNT).multiply(
      mainMenuCount,
    );

    return {
      name: this.#eventName,
      content: {
        money: disCountMoney,
      },
    };
  }
}

export default WeekendDiscount;
