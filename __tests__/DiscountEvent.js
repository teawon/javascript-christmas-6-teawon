import ChristmasDdayDiscount from '../src/model/DisCountEvent/ChristmasDdayDiscount';
import Order from '../src/model/Order';
import Food from '../src/model/Food';
import CustomDate from '../src/model/CustomDate';
import Money from '../src/model/Money';

describe('DisCountEvent 테스트', () => {
  const foodList = [
    { food: new Food('양송이수프', new Money(6000), '애피타이저'), count: 2 },
    { food: new Food('티본스테이크', new Money(55000), '메인'), count: 1 },
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
      expect(disCountMoney).toBe(1000 + 100 * 5);
    });
  });
});
