import DiscountEvent from './DiscountEvent.js';
import CustomDate from '../CustomDate.js';
import Money from '../Money.js';
import { MENU_TYPES, EVENT_NAMES } from '../../constants.js';

class WeekdayDiscount extends DiscountEvent {
  static DISCOUNT_MENU_TYPE = MENU_TYPES.dessert;

  static DISCOUNT_AMOUNT = 2023;

  #eventName;

  #appliedPeriod;

  constructor() {
    super();
    this.#eventName = EVENT_NAMES.weekday;
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
    if (orderDate.isWeekend()) return false;
    const desertMenuCount = this.#getTotalDesertCount(order);
    if (desertMenuCount < 1) return false;

    return true;
  }

  #getTotalDesertCount(order) {
    const desertMenuCount = order.getTotalOrderCountByType(
      WeekdayDiscount.DISCOUNT_MENU_TYPE,
    );
    return desertMenuCount;
  }

  getDiscountDetails(order) {
    const desertMenuCount = this.#getTotalDesertCount(order);
    const disCountMoney = new Money(WeekdayDiscount.DISCOUNT_AMOUNT).multiply(
      desertMenuCount,
    );

    return {
      name: this.#eventName,
      content: {
        money: disCountMoney,
      },
    };
  }
}

export default WeekdayDiscount;
