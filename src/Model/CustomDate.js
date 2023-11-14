import RestaurantValidator from '../RestaurantValidator.js';
import { DAYS_OF_WEEK } from '../constants.js';
class CustomDate {
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
    const dayIndex = this.#date.getDay();
    const dayKeys = Object.keys(DAYS_OF_WEEK);
    return DAYS_OF_WEEK[dayKeys[dayIndex]];
  }

  isWeekend() {
    const dayIndex = this.#date.getDay();
    return (
      dayIndex === DAYS_OF_WEEK.friday || dayIndex === DAYS_OF_WEEK.saturday
    );
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
