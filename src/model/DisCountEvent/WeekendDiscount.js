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

    if (
      !orderDate.isBetween(this.#appliedPeriod.start, this.#appliedPeriod.end)
    )
      return false;
    if (order.getTotalMoney().getPrice() < 10000) return false;

    if (orderDate.isWeekday()) return false;

    const disCountTypeCount = order.getTotalOrderCountByType(
      WeekendDiscount.DISCOUNT_MENU_TYPE,
    );

    if (disCountTypeCount < 1) return false;

    return true;
  }

  getDiscountDetails(order) {
    const disCountTypeCount = order.getTotalOrderCountByType(
      WeekendDiscount.DISCOUNT_MENU_TYPE,
    );

    const disCountMoney = new Money(WeekendDiscount.DISCOUNT_AMOUNT).multiply(
      disCountTypeCount,
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
