import Money from './Money.js';

class Order {
  #foodList;
  #date;

  constructor(foodList, date) {
    this.#validate(foodList);
    this.#foodList = foodList;
    this.#date = date;
  }

  #validate(foodList) {
    if (foodList.length > 20) {
      throw new Error('[ERROR] 주문 가능한 메뉴의 개수를 초과하였습니다.');
    }

    if (foodList.length < 1) {
      throw new Error('[ERROR] 하나 이상의 메뉴를 주문해야합니다.');
    }

    if (foodList.every((item) => item.food.getType() === '음료')) {
      throw new Error('[ERROR] 음료만 주문할 수 없습니다.');
    }

    if (foodList.some((item) => item.count < 1)) {
      throw new Error('[ERROR] 각 메뉴는 적어도 1개 이상을 주문해야합니다.');
    }

    const menuNames = foodList.map((item) => item.food.getName());
    const uniqueMenuNames = new Set(menuNames);
    if (uniqueMenuNames.size !== menuNames.length) {
      throw new Error('[ERROR] 중복된 메뉴를 주문할 수 없습니다.');
    }
  }

  getTotalMoney() {
    return this.#foodList.reduce((totalMoney, item) => {
      const itemPrice = item.food.getMoney();
      const itemTotalPrice = itemPrice.multiply(item.count);
      return totalMoney.add(itemTotalPrice);
    }, new Money(0));
  }

  getDate() {
    return this.#date;
  }
}

export default Order;
