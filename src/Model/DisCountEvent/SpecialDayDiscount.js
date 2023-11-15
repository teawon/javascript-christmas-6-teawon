import DiscountEvent from './DiscountEvent.js';
import CustomDate from '../CustomDate.js';
import Money from '../Money.js';
import { EVENT_NAMES } from '../../constants.js';

class SpecialDayDiscount extends DiscountEvent {
  static SPECIAL_DAY = [
    new CustomDate(2023, 12, 3),
    new CustomDate(2023, 12, 10),
    new CustomDate(2023, 12, 17),
    new CustomDate(2023, 12, 24),
    new CustomDate(2023, 12, 25),
    new CustomDate(2023, 12, 31),
  ];

  static DISCOUNT_AMOUNT = 1000;

  #eventName;

  #appliedPeriod;

  constructor() {
    super();
    this.#eventName = EVENT_NAMES.specialDay;
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

    if (!SpecialDayDiscount.SPECIAL_DAY.some((day) => day.equal(orderDate)))
      return false;

    return true;
  }

  getDiscountDetails(order) {
    const disCountMoney = new Money(SpecialDayDiscount.DISCOUNT_AMOUNT);

    return {
      name: this.#eventName,
      content: {
        money: disCountMoney,
      },
    };
  }
}

export default SpecialDayDiscount;
