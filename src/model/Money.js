class Money {
  #price;

  constructor(price) {
    this.#validate(price);
    this.#price = price;
  }

  #validate(price) {
    if (price < 0) {
      throw new Error('[ERROR] 금액은 음수가 될 수 없습니다.');
    }
  }

  #validateMoneyObject(money) {
    if (!(money instanceof Money)) {
      throw new Error('[ERROR] 유효하지 않은 Money 객체입니다.');
    }
  }

  add(money) {
    this.#validateMoneyObject(money);
    const addedPrice = this.#price + money.getPrice();
    return new Money(addedPrice);
  }

  minus(money) {
    this.#validateMoneyObject(money);
    const minusPrice = this.#price - money.getPrice();
    return new Money(minusPrice);
  }

  getPrice() {
    return this.#price;
  }
}

export default Money;
