import Order from '../Model/Order.js';
import Money from '../Model/Money.js';
import CustomDate from '../Model/CustomDate.js';
import DiscountManager from '../Model/DiscountManager.js';
import { getInputWithValidation } from '../Utils/iuput.js';
import { ERROR_MESSAGE } from '../message.js';

class RestaurantController {
  #menu;
  #eventBadgeManager;
  #discountEvents;
  #outputView;
  #inputView;

  constructor(menu, eventBadgeManager, discountEvents, outputView, inputView) {
    this.#menu = menu;
    this.#eventBadgeManager = eventBadgeManager;
    this.#discountEvents = discountEvents;
    this.#outputView = outputView;
    this.#inputView = inputView;
  }

  async start() {
    this.#outputView.printWelcome();
    const visitDate = await this.#getVisitDate();
    const order = await this.#getOrder(visitDate);

    this.#printEventPreview(visitDate);
    this.#printMenu(order);
    this.#printTotalOrderPrice(order);

    const { totalProfitMoney, totalDiscountMoney } =
      this.#calculateAndPrintDiscounts(order);

    this.#printFinalPaymentPrice(order, totalDiscountMoney);

    const eventBadge = this.#eventBadgeManager.getEventBadge(totalProfitMoney);
    this.#printEventBadge(eventBadge);
  }

  #calculateAndPrintDiscounts(order) {
    const discountManager = new DiscountManager(order, this.#discountEvents);
    const discountResult = discountManager.getDiscountResults();
    const gifts = discountManager.getGifts(discountResult);

    this.#printGiftMenu(gifts);
    this.#printBenefitDetails(discountResult);

    const { totalDiscountMoney, totalGiftMoney } =
      discountManager.calculateTotalDiscount(discountResult);

    const totalProfitMoney = totalDiscountMoney.add(totalGiftMoney);
    this.#printTotalBenefit(totalProfitMoney);

    return { totalDiscountMoney, totalProfitMoney };
  }

  async #getVisitDate() {
    const inputFuction = async () => {
      const dateInput = await this.#inputView.readDate();
      const visitDate = new CustomDate(2023, 12, Number(dateInput));
      return visitDate;
    };

    return await getInputWithValidation(
      inputFuction,
      ERROR_MESSAGE.enterVisitDate,
    );
  }

  async #getOrder(visitDate) {
    const inputFuction = async () => {
      const orderMenuInput = await this.#inputView.readOrderMenu();
      const orderMenuList = orderMenuInput.split(',');
      const orderMenu = orderMenuList.map((menu) => {
        const [name, count] = menu.split('-');
        const food = this.#menu.getFood(name);
        return { food, count: Number(count) };
      });

      const order = new Order(orderMenu, visitDate);
      return order;
    };

    return await getInputWithValidation(inputFuction, ERROR_MESSAGE.enterOrder);
  }

  #printMenu(order) {
    const foodList = order.getFoodList();
    const orderMenuData = foodList.map((foodList) => ({
      name: foodList.food.getName(),
      count: foodList.count,
    }));
    this.#outputView.printMenu(orderMenuData);
    this.#outputView.printLine();
  }

  #printEventPreview(visitDate) {
    const month = visitDate.getMonth();
    const day = visitDate.getDay();
    this.#outputView.printEventPreview(month, day);
    this.#outputView.printLine();
  }

  #printTotalOrderPrice(order) {
    const totalOrderMoney = order.getTotalMoney();
    const totalOrderPrice = totalOrderMoney.getPrice();
    this.#outputView.printTotalOrderPrice(totalOrderPrice);
    this.#outputView.printLine();
  }

  #printGiftMenu(gifts) {
    const giftsData = gifts.map((item) => ({
      name: item.gift.getName(),
      count: item.count,
    }));
    this.#outputView.printGiftMenu(giftsData);
    this.#outputView.printLine();
  }

  #printBenefitDetails(discountResult) {
    const discountDatas = discountResult.map((discount) => {
      let money = new Money(0);
      if (discount.content.gift) {
        money = money.add(discount.content.gift.getMoney());
      }
      if (discount.content.money) {
        money = money.add(discount.content.money);
      }

      return { name: discount.name, amount: money.getPrice() };
    });
    this.#outputView.printBenefitDetails(discountDatas);
    this.#outputView.printLine();
  }

  #printTotalBenefit(totalProfitMoney) {
    const totalProfitPrice = totalProfitMoney.getPrice();
    this.#outputView.printTotalBenefit(totalProfitPrice);
    this.#outputView.printLine();
  }

  #printFinalPaymentPrice(order, totalDiscountMoney) {
    const finalPaymentMoney = order.getTotalMoney().minus(totalDiscountMoney);
    const finalPaymentPrice = finalPaymentMoney.getPrice();
    this.#outputView.printFinalPaymentPrice(finalPaymentPrice);
    this.#outputView.printLine();
  }

  #printEventBadge(eventBadge) {
    let eventBadgeName = '';
    if (eventBadge) {
      eventBadgeName = eventBadge.getName();
    }
    this.#outputView.printEventBadge(eventBadgeName);
  }
}

export default RestaurantController;
