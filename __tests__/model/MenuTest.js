import Menu from '../../src/Model/Menu.js';
import Food from '../../src/Model/Food';

describe('Menu 모델 테스트', () => {
  test('판매중인 이름의 메뉴가 있다면 해당 음식 인스턴스를 반환한다', () => {
    // given
    const name = '양송이수프';

    // when
    const food = Menu.getFood(name);

    // then
    expect(food).toBeInstanceOf(Food);
    expect(food.getName()).toBe(name);
    expect(food.getMoney().getPrice()).toBe(6000);
    expect(food.getType()).toBe('애피타이저');
  });

  test('판매중이지 않은 메뉴정보를 가져오면 에러가 발생한다', () => {
    // given
    const notExistName = '신라면';

    // when
    const action = () => {
      food = Menu.getFood(notExistName);
    };

    // then
    expect(action).toThrow('[ERROR] 존재하지 않는 메뉴입니다.');
  });
});
