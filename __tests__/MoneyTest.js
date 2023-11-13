import Money from '../src/model/Money.js';

describe('Money 모델 테스트', () => {
  test('양수 금액으로 Money객체를 생성하면 해당 금액을 가진 객체가 생성된다', () => {
    // given
    const pirce = 5000;

    // when
    const money = new Money(pirce);

    // then
    expect(money.getPrice()).toBe(pirce);
  });

  test('음수 금액으로 Money 객체를 생성하면 에러가 발생한다', () => {
    // given
    const negativePrice = -1000;

    // when
    const action = () => {
      new Money(negativePrice);
    };

    expect(action).toThrow('[ERROR] 금액은 음수가 될 수 없습니다.');
  });

  test('두 Money 객체를 더하면, 그 합계 금액을 가진 새 Money 객체가 반환된다', () => {
    // given
    const money1 = new Money(1000);
    const money2 = new Money(500);

    // when
    const result = money1.add(money2);

    // then
    expect(result.getPrice()).toBe(1000 + 500);
  });

  test('두 Money 객체를 빼면, 차이 금액을 가진 새 Money 객체가 반환된다', () => {
    // given
    const money1 = new Money(1000);
    const money2 = new Money(500);

    // when
    const result = money1.minus(money2);

    // then
    expect(result.getPrice()).toBe(1000 - 500);
  });

  test('Money 객체에서 더 큰 금액의 Money 객체를 빼려고 하면, 에러가 발생한다', () => {
    // Given: 두 Money 객체
    const money1 = new Money(500);
    const money2 = new Money(1000);

    // When & Then: 더 큰 금액을 뺄 때 오류 발생
    expect(() => money1.minus(money2)).toThrow(
      '[ERROR] 금액은 음수가 될 수 없습니다.',
    );
  });

  test.each([[null], [500], [{ amount: 1000 }]])(
    'Money 객체에 유효하지 않은 데이터를 더하거나 빼려고 하면, 오류가 발생한다',
    (invalidInput) => {
      // given
      const money = new Money(1000);

      // when & then:
      expect(() => money.add(invalidInput)).toThrow(
        '[ERROR] 유효하지 않은 Money 객체입니다.',
      );
      expect(() => money.minus(invalidInput)).toThrow(
        '[ERROR] 유효하지 않은 Money 객체입니다.',
      );
    },
  );
});
