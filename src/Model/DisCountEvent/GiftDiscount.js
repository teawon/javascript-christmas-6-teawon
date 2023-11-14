import DiscountEvent from './DiscountEvent.js';
import CustomDate from '../CustomDate.js';
import Menu from '../Menu.js';
import { EVENT_NAMES, MENU_NAMES } from '../../constants.js';

class GiftDiscount extends DiscountEvent {
  static GIFT_ITEM = MENU_NAMES.champagne;
  static GIFT_COUNT = 1;
  static CONDITION_AMOUNT = 120_000;

  #eventName;
  #appliedPeriod;

  constructor() {
    super();
    this.#eventName = EVENT_NAMES.freeGift;
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

  getDiscountDetails() {
    const giftItem = Menu.getFood(GiftDiscount.GIFT_ITEM);

    return {
      name: this.#eventName,
      content: {
        gift: giftItem,
        count: GiftDiscount.GIFT_COUNT,
      },
    };
  }
}

export default GiftDiscount;
