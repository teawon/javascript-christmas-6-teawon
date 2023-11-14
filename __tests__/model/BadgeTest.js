import Badge from '../../src/model/Badge';

describe('Badge 모델 테스트', () => {
  test('입력한 이름을 가지는 뱃지 객체를 생성한다', () => {
    // given
    const name = '산타';

    // when
    const badge = new Badge(name);

    // then
    expect(badge.getName()).toBe(name);
  });

  test('빈 문자열이 이름으로 주어지면 에러가 발생한다', () => {
    // given
    const nullName = '';

    // when
    const action = () => {
      new Badge(nullName);
    };

    // then
    expect(action).toThrow('[ERROR] 빈 문자열의 배지는 존재할 수 없습니다.');
  });
});
