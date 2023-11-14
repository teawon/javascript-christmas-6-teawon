import { formatNumberToKRW } from '../../src/utils/formatter';

describe('formatNumberToKRW 함수 테스트', () => {
  test.each([
    [1000, '1,000'],
    [50000, '50,000'],
    [123456789, '123,456,789'],
    [0, '0'],
    [-1000, '-1,000'],
  ])('숫자 %d에 대해 3자리수 마다 쉼표를 넣어 변환 (%s)', (input, expected) => {
    expect(formatNumberToKRW(input)).toBe(expected);
  });
});
