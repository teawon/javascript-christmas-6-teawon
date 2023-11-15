import RestaurantValidator from '../RestaurantValidator.js';

class Money {
  #price;

  constructor(price) {
    RestaurantValidator.validateMoneyModel(price);
    this.#price = price;
  }

  add(money) {
    RestaurantValidator.validateMoneyType(money, Money);
    const addedPrice = this.#price + money.getPrice();
    return new Money(addedPrice);
  }

  minus(money) {
    RestaurantValidator.validateMoneyType(money, Money);
    const minusPrice = this.#price - money.getPrice();
    return new Money(minusPrice);
  }

  multiply(number) {
    const multiplyedPrice = this.#price * number;
    return new Money(multiplyedPrice);
  }

  getPrice() {
    return this.#price;
  }
}

export default Money;
