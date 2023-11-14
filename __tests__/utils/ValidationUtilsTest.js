import ValidationUtils from '../../src/Utils/ValidationUtils';

describe('ValidationUtils 테스트', () => {
  const ERROR_MESSAGE = '[ERROR]';
  describe('validateNotNull 메서드 테스트', () => {
    test('빈 문자열 데이터가 들어오면 에러를 반환한다', () => {
      //given
      const input = 'notNull';

      //when & then
      expect(() =>
        ValidationUtils.validateNotNull(input, ERROR_MESSAGE),
      ).not.toThrow();
    });

    test('빈 문자열 데이터가 들어오면 에러를 반환한다', () => {
      const input = null;

      //when & then
      expect(() =>
        ValidationUtils.validateNotNull(input, ERROR_MESSAGE),
      ).toThrow(ERROR_MESSAGE);
    });

    describe('validateIncluded 메서드 테스트', () => {
      const array = ['apple', 'banana', 'orange'];

      test('주어진 배열에 포함된 요소에 대해서는 에러를 발생시키지 않는다', () => {
        // given
        const element = 'apple';

        // when & then
        expect(() =>
          ValidationUtils.validateIncluded(element, array, ERROR_MESSAGE),
        ).not.toThrow();
      });

      test('주어진 배열에 포함되지 않은 요소에 대해서는 에러를 발생시킨다', () => {
        // given
        const element = 'grape';

        // when & then
        expect(() =>
          ValidationUtils.validateIncluded(element, array, ERROR_MESSAGE),
        ).toThrow(ERROR_MESSAGE);
      });
    });

    describe('validateTypeCheck 메서드 테스트', () => {
      test('올바른 타입에 대해서는 에러를 발생시키지 않는다', () => {
        // given
        const value = new Date();

        // When & Then
        expect(() =>
          ValidationUtils.validateTypeCheck(value, Date, ERROR_MESSAGE),
        ).not.toThrow();
      });

      test('잘못된 타입에 대해서는 에러를 발생시킨다', () => {
        // given
        const value = {};

        // when & then
        expect(() =>
          ValidationUtils.validateTypeCheck(value, Date, ERROR_MESSAGE),
        ).toThrow(ERROR_MESSAGE);
      });
    });
  });

  describe('validateMaxLen 메서드', () => {
    test('최대 길이 이하의 문자열에 대해서는 에러를 발생시키지 않는다', () => {
      // given
      const value = 'test';

      // when & then
      expect(() =>
        ValidationUtils.validateMaxLen(value.length, 5, ERROR_MESSAGE),
      ).not.toThrow();
    });

    test('최대 길이 초과의 문자열에 대해서는 에러를 발생시킨다', () => {
      // given
      const value = 'testing';

      // when & then
      expect(() =>
        ValidationUtils.validateMaxLen(value.length, 5, ERROR_MESSAGE),
      ).toThrow(ERROR_MESSAGE);
    });
  });

  describe('validateMinLen 메서드', () => {
    test('최소 길이 이상의 문자열에 대해서는 에러를 발생시키지 않는다', () => {
      // given
      const value = 'loooooongstr';

      // when & then
      expect(() =>
        ValidationUtils.validateMinLen(value.length, 5, ERROR_MESSAGE),
      ).not.toThrow();
    });

    test('최소 길이 미만의 문자열에 대해서는 에러를 발생시킨다', () => {
      // given
      const value = 'short';

      // when & then
      expect(() =>
        ValidationUtils.validateMinLen(value.length, 10, ERROR_MESSAGE),
      ).toThrow(ERROR_MESSAGE);
    });
  });

  describe('validateNotDuplicate 메서드', () => {
    test('중복되지 않는 배열에 대해서는 에러를 발생시키지 않는다', () => {
      // given
      const array = ['apple', 'banana', 'orange'];

      // when & then
      expect(() =>
        ValidationUtils.validateNotDuplicate(array, ERROR_MESSAGE),
      ).not.toThrow();
    });

    test('중복된 요소가 있는 배열에 대해서는 에러를 발생시킨다', () => {
      // given
      const array = ['apple', 'banana', 'apple'];

      // when & then
      expect(() =>
        ValidationUtils.validateNotDuplicate(array, ERROR_MESSAGE),
      ).toThrow(ERROR_MESSAGE);
    });
  });
});
