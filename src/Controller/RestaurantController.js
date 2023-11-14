import Menu from '../model/Menu.js';
import Order from '../model/Order.js';
import Money from '../model/Money.js';
import EventBadgeManager from '../model/EventBadgeManager.js';
import CustomDate from '../model/CustomDate.js';
import DiscountManager from '../model/DiscountManager.js';
import ChristmasDdayDiscount from '../model/DisCountEvent/ChristmasDdayDiscount.js';
import GiftDiscount from '../model/DisCountEvent/GiftDiscount.js';
import WeekdayDiscount from '../model/DisCountEvent/WeekdayDiscount.js';
import WeekendDiscount from '../model/DisCountEvent/WeekendDiscount.js';
import SpecialDayDiscount from '../model/DisCountEvent/SpecialDayDiscount.js';
import OutputView from '../Views/OutputView.js';
import InputView from '../Views/InputView.js';
import { getInputWithValidation } from '../Utils/iuput.js';

class RestaurantController {
  #discountEvents;

  constructor() {
    this.#discountEvents = [
      new ChristmasDdayDiscount(),
      new GiftDiscount(),
      new WeekdayDiscount(),
      new WeekendDiscount(),
      new SpecialDayDiscount(),
    ];
  }

  async start() {
    OutputView.printWelcome();
    const visitDate = await this.#getVisitDate();
    const orderMenu = await this.#getOrderMenu();
    const order = new Order(orderMenu, visitDate);

    this.#printEventPreview(visitDate);
    this.#printMenu(order);
    this.#printTotalOrderPrice(order);

    const { totalProfitMoney, totalDiscountMoney } =
      this.#calculateAndPrintDiscounts(order);

    this.#printFinalPaymentPrice(order, totalDiscountMoney);

    const eventBadge = EventBadgeManager.getEventBadge(totalProfitMoney);
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
      const dateInput = await InputView.readDate();
      const visitDate = new CustomDate(2023, 12, Number(dateInput));
      return visitDate;
    };
    const errorMessage =
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.';

    return await getInputWithValidation(inputFuction, errorMessage);
  }

  async #getOrderMenu() {
    const inputFuction = async () => {
      const orderMenuInput = await InputView.readOrderMenu();

      const orderMenuList = orderMenuInput.split(',');
      const orderMenu = orderMenuList.map((menu) => {
        const [name, count] = menu.split('-');
        const food = Menu.getFood(name);
        return { food, count: Number(count) };
      });
      //TODO Validation 및 재 입력받기
      return orderMenu;
    };
    const errorMessage =
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.';

    return await getInputWithValidation(inputFuction, errorMessage);
  }

  #printMenu(order) {
    const foodList = order.getFoodList();
    const orderMenuData = foodList.map((foodList) => ({
      name: foodList.food.getName(),
      count: foodList.count,
    }));
    OutputView.printMenu(orderMenuData);
    OutputView.printLine();
  }

  #printEventPreview(visitDate) {
    const month = visitDate.getMonth();
    const day = visitDate.getDay();
    OutputView.printEventPreview(month, day);
    OutputView.printLine();
  }

  #printTotalOrderPrice(order) {
    const totalOrderMoney = order.getTotalMoney();
    const totalOrderPrice = totalOrderMoney.getPrice();
    OutputView.printTotalOrderPrice(totalOrderPrice);
    OutputView.printLine();
  }

  #printGiftMenu(gifts) {
    const giftsData = gifts.map((item) => ({
      name: item.gift.getName(),
      count: item.count,
    }));
    OutputView.printGiftMenu(giftsData);
    OutputView.printLine();
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
    OutputView.printBenefitDetails(discountDatas);
    OutputView.printLine();
  }

  #printTotalBenefit(totalProfitMoney) {
    const totalProfitPrice = totalProfitMoney.getPrice();
    OutputView.printTotalBenefit(totalProfitPrice);
    OutputView.printLine();
  }

  #printFinalPaymentPrice(order, totalDiscountMoney) {
    const finalPaymentMoney = order.getTotalMoney().minus(totalDiscountMoney);
    const finalPaymentPrice = finalPaymentMoney.getPrice();
    OutputView.printFinalPaymentPrice(finalPaymentPrice);
    OutputView.printLine();
  }

  #printEventBadge(eventBadge) {
    let eventBadgeName = '';
    if (eventBadge) {
      eventBadgeName = eventBadge.getName();
    }
    OutputView.printEventBadge(eventBadgeName);
  }
}

export default RestaurantController;
