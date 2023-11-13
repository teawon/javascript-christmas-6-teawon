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
      if (discount.content.gift) gifts.push(discount.content.gift);
    });

    return gifts;
  }

  calculateTotalDiscountMoney(discountResults) {
    const totalDiscount = this.#calculateTotalDiscount(discountResults);
    const totalGiftValue = this.#calculateTotalGiftValue(discountResults);

    return totalDiscount.add(totalGiftValue);
  }

  #calculateTotalDiscount(discountResults) {
    return discountResults.reduce((total, discount) => {
      if (discount.content.money) {
        return total.add(discount.content.money);
      }
      return total;
    }, new Money(0));
  }

  #calculateTotalGiftValue(discountResults) {
    return discountResults.reduce((total, discount) => {
      if (discount.content.gift) {
        return total.add(discount.content.gift.getMoney());
      }
      return total;
    }, new Money(0));
  }
}

export default DiscountManager;
