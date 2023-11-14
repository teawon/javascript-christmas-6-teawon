import RestaurantValidator from '../RestaurantValidator.js';

class CustomDate {
  static DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

  #date;

  constructor(year, month, day) {
    RestaurantValidator.validateCustomDateModel(year, month, day);
    const monthIndex = month - 1;
    this.#date = new Date(year, monthIndex, day);
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

  getMonth() {
    return this.#date.getMonth() + 1;
  }

  getDay() {
    return this.#date.getDate();
  }

  calculateDiff(otherDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const difference = otherDate.getDate() - this.#date;
    return Math.abs(Math.round(difference / oneDay));
  }
}

export default CustomDate;
