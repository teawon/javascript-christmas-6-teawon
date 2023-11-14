export const OUTPUT_MESSAGE = Object.freeze({
  welcome: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  eventPreview: (month, day) =>
    `${month}월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  orderMenuHeader: '<주문 메뉴>',
  orderItem: (name, count) => `${name} ${count}개`,
  totalOrderPriceHeader: '<할인 전 총주문 금액>',
  positiveMoney: (price) => `${price}원`,
  minusMoney: (price) => `-${price}원`,
  giftMenuHeader: '<증정 메뉴>',
  benefitDetail: (name, amount) => `${name}: -${amount}원`,
  notExist: '없음',
  benefitDetailsHeader: '<혜택 내역>',
  benefitDetail: (name, amount) => `${name}: -${amount}원`,
  totalBenefitHeader: '<총혜택 금액>',
  finalPaymentPriceHeader: '<할인 후 예상 결제 금액>',
  eventBadgeHeader: '<12월 이벤트 배지>',
  emptyLine: '',
});
