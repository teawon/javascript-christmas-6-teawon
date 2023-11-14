import RestaurantValidator from '../RestaurantValidator.js';
import Money from './Money.js';

class Order {
  static MAX_ORDER_COUNT = 20;

  #foodList;
  #date;

  constructor(foodList, date) {
    const orderMenuCount = this.#getTotalOrderCount(foodList);
    RestaurantValidator.validateOrderModel(
      foodList,
      orderMenuCount,
      Order.MAX_ORDER_COUNT,
    );
    this.#foodList = foodList;
    this.#date = date;
  }

  #getTotalOrderCount(foodList) {
    return foodList.reduce((totalOrderCount, item) => {
      return totalOrderCount + item.count;
    }, 0);
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

  getFoodList() {
    return this.#foodList;
  }

  getTotalOrderCountByType(type) {
    return this.#foodList.reduce((totalOrderCountByType, item) => {
      if (item.food.getType() === type) {
        return totalOrderCountByType + item.count;
      }
      return totalOrderCountByType;
    }, 0);
  }
}

export default Order;
