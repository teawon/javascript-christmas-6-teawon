import DiscountEvent from './DiscountEvent';
import CustomDate from '../CustomDate';
import Money from '../Money';

class WeekendDiscount extends DiscountEvent {
  static DISCOUNT_MENU_TYPE = '메인';
  static DISCOUNT_AMOUNT = 2023;

  #eventName;
  #appliedPeriod;

  constructor() {
    super();
    this.#eventName = '주말 할인';
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
