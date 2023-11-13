class CustomDate {
  static DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

  #date;

  constructor(year, month, day) {
    this.#validate(year, month, day);
    const monthIndex = month - 1;
    this.#date = new Date(year, monthIndex, day);
  }

  #validate(year, month, day) {
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다.');
    }
  }

  equal(other) {
    if (this.#date.getFullYear() !== other.getDate().getFullYear())
      return false;
    if (this.#date.getMonth() !== other.getDate().getMonth()) return false;
    if (this.#date.getDate() !== other.getDate().getDate()) return false;

    return true;
  }

  getDayOfWeek() {
    return CustomDate.DAYS_OF_WEEK[this.#date.getDay()];
  }

  isWeekend() {
    const dayOfWeek = this.#date.getDay();
    // 5: 금요일 , 6: 토요일
    return dayOfWeek === 5 || dayOfWeek === 6;
  }

  isWeekday() {
    return !this.isWeekend();
  }

  isBetween(startDate, endDate) {
    if (startDate.getDate() > this.#date) return false;
    if (endDate.getDate() < this.#date) return false;
    return true;
  }

  getDate() {
    return this.#date;
  }

  calculateDiff(otherDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const difference = otherDate.getDate() - this.#date;
    return Math.abs(Math.round(difference / oneDay));
  }
}

export default CustomDate;
