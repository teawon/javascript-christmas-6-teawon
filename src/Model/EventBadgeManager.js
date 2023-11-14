import Badge from './Badge.js';
import { BADGE_TYPES } from '../constants.js';
class EventBadgeManager {
  static getEventBadge(totalBenefitMoney) {
    const totalBenefitPrice = totalBenefitMoney.getPrice();
    if (totalBenefitPrice >= 20000) return new Badge(BADGE_TYPES.santa);

    if (totalBenefitPrice >= 10000) return new Badge(BADGE_TYPES.tree);

    if (totalBenefitPrice >= 5000) return new Badge(BADGE_TYPES.star);

    return null;
  }
}

export default EventBadgeManager;
