import Order from '../src/model/Order';
import Food from '../src/model/Food';
import Money from '../src/model/Money';

describe('Order 모델 테스트', () => {
  const food1 = new Food('양송이수프', new Money(6000), '애피타이저');
  const food2 = new Food('티본스테이크', new Money(55000), '메인');
  const drink = new Food('제로콜라', new Money(3000), '음료');
  const date = new Date(2023, 11, 13);

  test('유효한 주문 정보에 대한 객체를 생성하고 총 금액을 계산한다', () => {
    // given
    const foodList = [
      { food: food1, count: 2 },
      { food: food2, count: 1 },
    ];

    // when
    const order = new Order(foodList, date);

    // then

    expect(order.getTotalMoney().getPrice()).toBe(6000 * 2 + 55000);
    expect(order.getDate()).toBe(date);
  });

  test('특정 타입에 대한 메뉴 개수를 반환한다', () => {
    // given
    const foodList = [
      { food: food1, count: 2 },
      { food: drink, count: 3 },
    ];

    // when
    const order = new Order(foodList, date);

    // then
    expect(order.getTotalOrderCountByType('음료')).toBe(3);
  });

  test('주문 가능한 메뉴 개수가 초과하면 에러가 발생한다', () => {
    //given
    const foodList = [
      { food: food1, count: 11 },
      { food: food2, count: 10 },
    ];

    //when
    const action = () => {
      new Order(foodList, date);
    };

    //then
    expect(action).toThrow('[ERROR] 주문 가능한 메뉴의 개수를 초과하였습니다.');
  });

  test('어떠한 메뉴도 주문하지 않으면 에러가 발생한다', () => {
    //given
    const foodList = [];

    //when
    const action = () => {
      new Order(foodList, date);
    };

    //then
    expect(action).toThrow('ERROR] 하나 이상의 메뉴를 주문해야합니다.');
  });

  test('음료만 주문하면 에러가 발생한다', () => {
    //given
    const foodList = [{ food: drink, count: 1 }];

    //when
    const action = () => {
      new Order(foodList, date);
    };

    //then
    expect(action).toThrow('[ERROR] 음료만 주문할 수 없습니다.');
  });

  test('특정 메뉴에 대해 1미만의 개수를 주문하면 에러가 발생한다', () => {
    //given
    const foodList = [
      { food: drink, count: 1 },
      { food: food1, count: 0 },
    ];

    //when
    const action = () => {
      new Order(foodList, date);
    };

    //then
    expect(action).toThrow(
      '[ERROR] 각 메뉴는 적어도 1개 이상을 주문해야합니다.',
    );
  });

  test('중복 메뉴를 주문하면 에러가 발생한다', () => {
    //given
    const foodList = [
      { food: food1, count: 1 },
      { food: food1, count: 2 },
    ];

    //when
    const action = () => {
      new Order(foodList, date);
    };

    //then
    expect(action).toThrow('[ERROR] 중복된 메뉴를 주문할 수 없습니다.');
  });
});
