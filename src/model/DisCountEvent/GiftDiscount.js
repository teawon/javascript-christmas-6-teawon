import DiscountEvent from './DiscountEvent.js';
import CustomDate from '../CustomDate.js';
import Menu from '../Menu.js';

class GiftDiscount extends DiscountEvent {
  static GIFT_ITEM = '샴페인';
  static CONDITION_AMOUNT = 120_000;

  #eventName;
  #appliedPeriod;

  constructor() {
    super();
    this.#eventName = '증정 이벤트';
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
    if (order.getTotalMoney().getPrice() < GiftDiscount.CONDITION_AMOUNT)
      return false;

    return true;
  }

  getDiscountDetails(order) {
    const giftItem = Menu.getFood(GiftDiscount.GIFT_ITEM);

    return {
      name: this.#eventName,
      content: {
        gift: giftItem,
      },
    };
  }
}

export default GiftDiscount;
