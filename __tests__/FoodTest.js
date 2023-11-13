import Food from '../src/model/Food.js';
import Money from '../src/model/Money.js';

describe('Food 모델 테스트', () => {
  test('이름, 금액, 타입 정보가 유효하다면 Food객체가 생성된다', () => {
    // given
    const name = '양송이수프';
    const price = new Money(6000);
    const type = '애피타이저';

    // when
    const food = new Food(name, price, type);

    // then
    expect(food.getName()).toBe(name);
    expect(food.getMoney()).toBe(price);
    expect(food.getType()).toBe(type);
  });

  test('존재하지 않는 타입의 음식을 생성하면 에러가 발생한다', () => {
    // given
    const name = '양송이수프';
    const price = new Money(6000);
    const inValidType = '술';

    // when
    const action = () => {
      new Food(name, price, inValidType);
    };

    // then
    expect(action).toThrow('[ERROR] 존재하지 않는 메뉴 타입입니다.');
  });

  test('빈 문자열을 이름을 입력받으면 에러가 발생한다', () => {
    // given
    const inValidName = '';
    const price = new Money(6000);
    const type = '애피타이저';

    // when
    const action = () => {
      new Food(inValidName, price, type);
    };

    // then
    expect(action).toThrow('[ERROR] 메뉴 이름은 필수입니다.');
  });
});
