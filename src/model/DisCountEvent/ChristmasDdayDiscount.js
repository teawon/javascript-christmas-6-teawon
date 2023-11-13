import DiscountEvent from './DiscountEvent.js';
import CustomDate from '../CustomDate.js';
import Money from '../Money.js';

class ChristmasDdayDiscount extends DiscountEvent {
  #eventName;
  #appliedPeriod;

  constructor() {
    super();
    this.#eventName = '크리스마스 디데이 할인';
    this.#appliedPeriod = {
      start: new CustomDate(2023, 12, 1),
      end: new CustomDate(2023, 12, 25),
    };
  }

  isApplicable(order) {
    const orderDate = order.getDate();

    if (
      !orderDate.isBetween(this.#appliedPeriod.start, this.#appliedPeriod.end)
    )
      return false;
    if (order.getTotalMoney().getPrice() < 10000) return false;

    return true;
  }

  getDiscountDetails(order) {
    const orderDate = order.getDate();
    const targetDate = new CustomDate(2023, 12, 1);
    const diff = targetDate.calculateDiff(orderDate);
    const disCountMoney = new Money(100).multiply(diff).add(new Money(1000));

    return {
      name: this.#eventName,
      content: {
        money: disCountMoney,
      },
    };
  }
}

export default ChristmasDdayDiscount;
