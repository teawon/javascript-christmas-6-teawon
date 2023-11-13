import DiscountManager from '../src/model/DiscountManager';
import ChristmasDdayDiscount from '../src/model/DisCountEvent/ChristmasDdayDiscount';
import GiftDiscount from '../src/model/DisCountEvent/GiftDiscount';

import Money from '../src/model/Money';
import Food from '../src/model/Food';
import CustomDate from '../src/model/CustomDate';
import Order from '../src/model/Order';

describe('DiscountManager 클래스 테스트', () => {
  const discount_events = [new ChristmasDdayDiscount(), new GiftDiscount()];
  const food1 = new Food('양송이수프', new Money(6000), '애피타이저');
  const food2 = new Food('티본스테이크', new Money(55000), '메인');
  const date = new CustomDate(2023, 12, 15);
  const foodList = [
    { food: food1, count: 2 },
    { food: food2, count: 5 },
  ];
  const order = new Order(foodList, date);
  const FREE_GIFT = new Food('샴페인', new Money(25000), '음료');

  describe('DiscountManager 모델 테스트', () => {
    test('적용 가능한 할인 이벤트의 결과를 반환한다', () => {
      // given
      const discountManager = new DiscountManager(order, discount_events);

      // when
      const discountResult = discountManager.getDiscountResults();

      // then
      expect(discountResult).toStrictEqual([
        {
          name: '크리스마스 디데이 할인',
          content: {
            money: new Money(2400),
          },
        },
        {
          name: '증정 이벤트',
          content: {
            gift: FREE_GIFT,
            count: 1,
          },
        },
      ]);
    });

    test('이벤트를 통해 증졍되는 아이템 요소를 반환한다', () => {
      // given
      const discountManager = new DiscountManager(order, discount_events);
      const discountResult = discountManager.getDiscountResults();

      // when
      const giftList = discountManager.getGifts(discountResult);

      // when
      expect(giftList).toStrictEqual([
        {
          gift: FREE_GIFT,
          count: 1,
        },
      ]);
    });

    test('총 혜택 금액과 증정품 금액을 반환한다', () => {
      // given
      const discountManager = new DiscountManager(order, discount_events);
      const discountResult = discountManager.getDiscountResults();

      // when
      const { totalDiscountMoney, totalGiftMoney } =
        discountManager.calculateTotalDiscount(discountResult);

      // then
      expect(totalDiscountMoney.getPrice()).toBe(2400);
      expect(totalGiftMoney.getPrice()).toBe(25000);
    });
  });
});
