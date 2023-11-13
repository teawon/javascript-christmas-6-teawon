import DiscountEvent from './DiscountEvent';
import CustomDate from '../CustomDate';
import Money from '../Money';

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
    this.#eventName = '특별 할인';
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
