import Badge from './Badge.js';

class EventBadgeManager {
  static getEventBadge(totalBenefitMoney) {
    const totalBenefitPrice = totalBenefitMoney.getPrice();
    if (totalBenefitPrice >= 20000) return new Badge('산타');

    if (totalBenefitPrice >= 10000) return new Badge('트리');

    if (totalBenefitPrice >= 5000) return new Badge('별');

    return null;
  }
}

export default EventBadgeManager;
