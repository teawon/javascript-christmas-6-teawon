import Money from './Money.js';

class DiscountManager {
  #order;
  #discountEvents;

  constructor(order, discountEvents) {
    this.#order = order;
    this.#discountEvents = discountEvents;
  }

  getDiscountResults() {
    let discountResults = [];
    for (const event of this.#discountEvents) {
      if (!event.isApplicable(this.#order)) continue;

      const details = event.getDiscountDetails(this.#order);

      discountResults.push({
        name: details.name,
        content: details.content,
      });
    }
    return discountResults;
  }

  getGifts(discountResults) {
    let gifts = [];

    discountResults.forEach((discount) => {
      if (discount.content.gift) {
        const giftWithCount = {
          gift: discount.content.gift,
          count: discount.content.count || 1,
        };
        gifts.push(giftWithCount);
      }
    });

    return gifts;
  }

  calculateTotalDiscount(discountResults) {
    const totalDiscountMoney =
      this.#calculateTotalDiscountMoney(discountResults);
    const totalGiftMoney = this.#calculateTotalGiftMoney(discountResults);

    return { totalDiscountMoney, totalGiftMoney };
  }

  #calculateTotalDiscountMoney(discountResults) {
    return discountResults.reduce((total, discount) => {
      if (discount.content.money) {
        return total.add(discount.content.money);
      }
      return total;
    }, new Money(0));
  }

  #calculateTotalGiftMoney(discountResults) {
    return discountResults.reduce((total, discount) => {
      if (discount.content.gift) {
        return total.add(
          discount.content.gift.getMoney().multiply(discount.content.count),
        );
      }
      return total;
    }, new Money(0));
  }
}

export default DiscountManager;
