import EventBadgeManager from '../../src/Model/EventBadgeManager';
import Money from '../../src/Model/Money';

describe('EventBadgeManager 모델 테스트', () => {
  test.each([
    [20000, '산타'],
    [15000, '트리'],
    [10000, '트리'],
    [5000, '별'],
    [0, null],
  ])('혜택 금액에 따라 적절한 뱃지를 반환한다', (amount, expectedBadgeName) => {
    const totalBenefitMoney = new Money(amount);
    const badge = EventBadgeManager.getEventBadge(totalBenefitMoney);

    if (expectedBadgeName) {
      expect(badge.getName()).toBe(expectedBadgeName);
    } else {
      expect(badge).toBeNull();
    }
  });
});
