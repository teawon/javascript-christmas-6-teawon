import ChristmasDdayDiscount from '../src/model/DisCountEvent/ChristmasDdayDiscount';
import WeekdayDiscount from '../src/model/DisCountEvent/WeekdayDiscount';
import WeekendDiscount from '../src/model/DisCountEvent/WeekendDiscount';
import SpecialDayDiscount from '../src/model/DisCountEvent/SpecialDayDiscount';
import GiftDiscount from '../src/model/DisCountEvent/GiftDiscount';

import Order from '../src/model/Order';
import Food from '../src/model/Food';
import CustomDate from '../src/model/CustomDate';
import Money from '../src/model/Money';

describe('DisCountEvent 테스트', () => {
  const foodList = [
    { food: new Food('양송이수프', new Money(6000), '애피타이저'), count: 2 },
    { food: new Food('티본스테이크', new Money(55000), '메인'), count: 1 },
    { food: new Food('디저트 음식', new Money(15000), '디저트'), count: 3 },
  ];

  describe('ChristmasDdayDiscount 테스트', () => {
    // [요구사항] 1,000원으로 시작하여 크리스마스가 다가올수록 날마다 할인 금액이 100원씩 증가
    test('크리스마스 디데이 할인 여부를 체크한다', () => {
      // given
      const christmasDdayDiscount = new ChristmasDdayDiscount();
      const appliedDate = new CustomDate(2023, 12, 20);
      const notAppliedDate = new CustomDate(2023, 12, 26);

      const appliedOrder = new Order(foodList, appliedDate);
      const notAppliedOrder = new Order(foodList, notAppliedDate);

      // when
      const isApplied = christmasDdayDiscount.isApplicable(appliedOrder);
      const isNotApplied = christmasDdayDiscount.isApplicable(notAppliedOrder);
      // then

      expect(isApplied).toBe(true);
      expect(isNotApplied).toBe(false);
    });

    test('크리스마스 디데이 할인 금액을 반환한다', () => {
      // given
      const christmasDdayDiscount = new ChristmasDdayDiscount();
      const date = new CustomDate(2023, 12, 20);
      const order = new Order(foodList, date);

      // when
      const disCountData = christmasDdayDiscount.getDiscountDetails(order);

      const disCountMoney = disCountData.content.money.getPrice();

      // then
      expect(disCountMoney).toBe(1000 + 100 * 19);
    });
  });

  describe('WeekdayDiscount 테스트', () => {
    // [요구사항] 평일에는 디저트 메뉴를 메뉴 1개당 2,023원 할인
    test('평일 할인 여부를 체크한다', () => {
      // given
      const weekdayDiscount = new WeekdayDiscount();

      const weekendDate = new CustomDate(2023, 12, 1);
      const weekDate = new CustomDate(2023, 12, 20);
      const notAppliedDate = new CustomDate(2023, 11, 20);

      const weekDateDateOrder = new Order(foodList, weekDate);
      const weekendDateOrder = new Order(foodList, weekendDate);
      const notAppliedOrder = new Order(foodList, notAppliedDate);

      // when
      const isApplied = weekdayDiscount.isApplicable(weekDateDateOrder);
      const isNotApplied1 = weekdayDiscount.isApplicable(weekendDateOrder);
      const isNotApplied2 = weekdayDiscount.isApplicable(notAppliedOrder);
      // then

      expect(isApplied).toBe(true);
      expect(isNotApplied1).toBe(false);
      expect(isNotApplied2).toBe(false);
    });

    test('평일 할인 금액을 반환한다', () => {
      // given
      const weekdayDiscount = new WeekdayDiscount();
      const date = new CustomDate(2023, 12, 20);
      const order = new Order(foodList, date);

      // when
      const disCountData = weekdayDiscount.getDiscountDetails(order);
      const disCountMoney = disCountData.content.money.getPrice();

      // then
      expect(disCountMoney).toBe(2023 * 3);
    });
  });

  describe('WeekendDiscount 테스트', () => {
    // [요구사항] 주말에는 메인 메뉴를 메뉴 1개당 2,023원 할인
    test('주말 할인 여부를 체크한다', () => {
      // given
      const weekendDiscount = new WeekendDiscount();

      const weekendDate = new CustomDate(2023, 12, 1);
      const weekDate = new CustomDate(2023, 12, 20);
      const notAppliedDate = new CustomDate(2023, 11, 20);

      const weekendDateOrder = new Order(foodList, weekendDate);
      const weekDateDateOrder = new Order(foodList, weekDate);
      const notAppliedOrder = new Order(foodList, notAppliedDate);

      // when
      const isApplied = weekendDiscount.isApplicable(weekendDateOrder);
      const isNotApplied1 = weekendDiscount.isApplicable(weekDateDateOrder);
      const isNotApplied2 = weekendDiscount.isApplicable(notAppliedOrder);
      // then

      expect(isApplied).toBe(true);
      expect(isNotApplied1).toBe(false);
      expect(isNotApplied2).toBe(false);
    });

    test('주말 할인 금액을 반환한다', () => {
      // given
      const weekendDiscount = new WeekendDiscount();
      const date = new CustomDate(2023, 12, 1);
      const order = new Order(foodList, date);

      // when
      const disCountData = weekendDiscount.getDiscountDetails(order);
      const disCountMoney = disCountData.content.money.getPrice();

      // then
      expect(disCountMoney).toBe(2023 * 1);
    });
  });

  describe('SpecialDayDiscount 테스트', () => {
    // [요구사항] 이벤트 달력에 별이 있으면 총주문 금액에서 1,000원 할인
    test('특별 할인 여부를 체크한다', () => {
      // given
      const specialDayDiscount = new SpecialDayDiscount();

      const specialDay = new CustomDate(2023, 12, 3);
      const notSpecialDay = new CustomDate(2023, 12, 4);
      const notAppliedDate = new CustomDate(2023, 11, 20);

      const specialDayOrder = new Order(foodList, specialDay);
      const notSpecialDayOrder = new Order(foodList, notSpecialDay);
      const notAppliedOrder = new Order(foodList, notAppliedDate);

      // when
      const isApplied = specialDayDiscount.isApplicable(specialDayOrder);
      const isNotApplied1 = specialDayDiscount.isApplicable(notSpecialDayOrder);
      const isNotApplied2 = specialDayDiscount.isApplicable(notAppliedOrder);
      // then

      expect(isApplied).toBe(true);
      expect(isNotApplied1).toBe(false);
      expect(isNotApplied2).toBe(false);
    });

    test('특별 할인 금액을 반환한다', () => {
      // given
      const specialDayDiscount = new SpecialDayDiscount();
      const specialDay = new CustomDate(2023, 12, 3);
      const order = new Order(foodList, specialDay);

      // when
      const disCountData = specialDayDiscount.getDiscountDetails(order);
      const disCountMoney = disCountData.content.money.getPrice();

      // then
      expect(disCountMoney).toBe(1000);
    });
  });

  describe('GiftDiscount 테스트', () => {
    // [요구사항]  할인 전 총주문 금액이 12만 원 이상일 때, 샴페인 1개 증정
    test('증정 이벤트 여부를 체크한다', () => {
      // given
      const giftDiscount = new GiftDiscount();

      const appliedDate = new CustomDate(2023, 12, 3);
      const notAppliedDate = new CustomDate(2023, 11, 20);

      const appliedFoodList = [
        {
          food: new Food('양송이수프', new Money(60000), '애피타이저'),
          count: 1,
        },
        { food: new Food('티본스테이크', new Money(60000), '메인'), count: 2 },
      ];

      const appliedOrder = new Order(appliedFoodList, appliedDate);
      const notAppliedOrder = new Order(foodList, notAppliedDate);

      // when
      const isApplied = giftDiscount.isApplicable(appliedOrder);
      const isNotApplied = giftDiscount.isApplicable(notAppliedOrder);
      // then

      expect(isApplied).toBe(true);
      expect(isNotApplied).toBe(false);
    });

    test('증정 이벤트로 샴페인을 반환한다', () => {
      // given
      const giftDiscount = new GiftDiscount();
      const date = new CustomDate(2023, 12, 3);
      const foodList = [
        {
          food: new Food('양송이수프', new Money(60000), '애피타이저'),
          count: 1,
        },
        { food: new Food('티본스테이크', new Money(60000), '메인'), count: 2 },
      ];

      const order = new Order(foodList, date);

      // when
      const disCountData = giftDiscount.getDiscountDetails(order);
      const giftItem = disCountData.content.gift;

      // then
      expect(giftItem.getName()).toBe('샴페인');
    });
  });
});
