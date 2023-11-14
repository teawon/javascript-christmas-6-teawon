import Money from '../model/Money.js';
import Menu from '../model/Menu.js';
import Order from '../model/Order.js';
import EventBadgeManager from '../model/EventBadgeManager.js';
import CustomDate from '../model/CustomDate.js';
import DiscountManager from '../model/DiscountManager.js';
import ChristmasDdayDiscount from '../model/DisCountEvent/ChristmasDdayDiscount.js';
import GiftDiscount from '../model/DisCountEvent/GiftDiscount.js';
import WeekdayDiscount from '../model/DisCountEvent/WeekdayDiscount.js';
import WeekendDiscount from '../model/DisCountEvent/WeekendDiscount.js';
import SpecialDayDiscount from '../model/DisCountEvent/SpecialDayDiscount.js';
import { Console } from '@woowacourse/mission-utils';

class RestaurantController {
  async start() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');

    const dateInput = await Console.readLineAsync(
      '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
    );

    const visitDate = new CustomDate(2023, 12, Number(dateInput));

    const orderMenuInput = await Console.readLineAsync(
      '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
    );

    const orderMenuList = orderMenuInput.split(',');

    const orderMenu = orderMenuList.map((menu) => {
      const [name, count] = menu.split('-');
      const food = Menu.getFood(name);
      return { food, count: Number(count) };
    });

    const order = new Order(orderMenu, visitDate);

    Console.print('12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!');

    Console.print('<주문 메뉴>');

    orderMenu.forEach((item) => {
      Console.print(`${item.food.getName()} ${item.count}개`);
    });

    Console.print('<할인 전 총주문 금액>');

    Console.print(`${order.getTotalMoney().getPrice()}원`);

    const discountEvents = [
      new ChristmasDdayDiscount(),
      new GiftDiscount(),
      new WeekdayDiscount(),
      new WeekendDiscount(),
      new SpecialDayDiscount(),
    ];

    const discountManager = new DiscountManager(order, discountEvents);
    const discountResult = discountManager.getDiscountResults();

    Console.print('<증정 메뉴>');

    const gifts = discountManager.getGifts(discountResult);

    if (gifts.length === 0) {
      Console.print('없음');
    } else {
      const giftDescriptions = gifts
        .map((gift) => `${gift.gift.getName()} ${gift.count}개`)
        .join(', ');
      Console.print(giftDescriptions);
    }
    Console.print('<혜택 내역>');
    discountResult.forEach((discount) => {
      let money = new Money(0);

      if (discount.content.gift) {
        money = money.add(discount.content.gift.getMoney());
      }
      if (discount.content.money) {
        money = money.add(discount.content.money);
      }

      Console.print(`${discount.name}: -${money.getPrice()}원`);
    });

    Console.print('<총혜택 금액>');

    const { totalDiscountMoney, totalGiftMoney } =
      discountManager.calculateTotalDiscount(discountResult);

    const totalProfitMoney = totalDiscountMoney.add(totalGiftMoney);

    Console.print(`-${totalProfitMoney.getPrice()}원`);

    Console.print('<할인 후 예상 결제 금액>');

    const totalMoney = order.getTotalMoney().minus(totalDiscountMoney);

    Console.print(`${totalMoney.getPrice()}원`);

    Console.print('<12월 이벤트 배지>');

    const eventBadge = EventBadgeManager.getEventBadge(totalProfitMoney);

    if (eventBadge) {
      Console.print(eventBadge.getName());
    } else {
      Console.print('없음');
    }
  }
}

export default RestaurantController;
