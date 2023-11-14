import CustomDate from '../../src/Model/CustomDate.js';
import { DAYS_OF_WEEK } from '../../src/constants.js';

describe('CustomDate 모델 테스트', () => {
  test('유효한 날짜 정보가 들어오면, 해당 정보를 가진 객체를 생성한다', () => {
    // given
    const YEAR = 2023;
    const MONTH = 11;
    const DAY = 13;

    // when
    const customDate = new CustomDate(YEAR, MONTH, DAY);

    // then
    expect(customDate.getDate()).toEqual(new Date(YEAR, MONTH - 1, DAY));
  });

  test('유효하지 않은 날짜 정보가 들어오면 에러가 발생한다', () => {
    // given
    const YEAR = 2023;
    const INVALID_MONTH = 13;
    const DAY = 0;

    // when
    const action = () => {
      new CustomDate(YEAR, INVALID_MONTH, DAY);
    };

    // then
    expect(action).toThrow('[ERROR] 유효하지 않은 날짜입니다.');
  });

  test('특정 요일에 대한 정보가 반환된다', () => {
    // given
    const YEAR = 2023;
    const MONTH = 11;
    const DAY = 13;
    const DAY_OF_WEEK = DAYS_OF_WEEK.monday;
    const customDate = new CustomDate(YEAR, MONTH, DAY);

    // when
    const dayOfWeek = customDate.getDayOfWeek();

    // then
    expect(dayOfWeek).toBe(DAY_OF_WEEK);
  });

  test('두 날짜 정보가 일치하는지 여부를 반환한다', () => {
    // given
    const date1 = new CustomDate(2023, 11, 15);
    const date2 = new CustomDate(2023, 11, 15);
    const date3 = new CustomDate(2023, 11, 16);

    // when
    const isEqual1 = date1.equal(date2);
    const isEqual2 = date1.equal(date3);

    // then
    expect(isEqual1).toBe(true);
    expect(isEqual2).toBe(false);
  });

  test('주어진 날짜가 주말인지 평일인지 확인한다', () => {
    // given
    const weekendDate = new CustomDate(2023, 11, 11); // 토요일
    const weekdayDate = new CustomDate(2023, 11, 13); // 월요일

    // when
    const isWeekend = weekendDate.isWeekend();
    const isWeekday = weekdayDate.isWeekday();

    // then
    expect(isWeekend).toBeTruthy();
    expect(isWeekday).toBeTruthy();
  });

  test('주어진 날짜가 특정 기간 내에 있는지 확인한다', () => {
    // given
    const startDate = new CustomDate(2023, 11, 10);
    const endDate = new CustomDate(2023, 11, 20);
    const withinDate = new CustomDate(2023, 11, 15);
    const outsideDate = new CustomDate(2023, 11, 21);

    // when
    const isWithin = withinDate.isBetween(startDate, endDate);
    const isOutside = outsideDate.isBetween(startDate, endDate);

    // then
    expect(isWithin).toBe(true);
    expect(isOutside).toBe(false);
  });

  test('두 날짜 사이의 간격정보를 반환한다', () => {
    // given
    const START_DAY = 10;
    const END_DAY = 20;
    const startDate = new CustomDate(2023, 11, START_DAY);
    const endDate = new CustomDate(2023, 11, END_DAY);

    // when
    const diff = startDate.calculateDiff(endDate);

    // then
    expect(diff).toBe(END_DAY - START_DAY);
  });
});
