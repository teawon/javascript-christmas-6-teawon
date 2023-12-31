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
  totalBenefitHeader: '<총혜택 금액>',
  finalPaymentPriceHeader: '<할인 후 예상 결제 금액>',
  eventBadgeHeader: '<12월 이벤트 배지>',
  emptyLine: '',
});

export const INPUT_MESSAGE = Object.freeze({
  enterVisitDate:
    '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  enterOrderMenu:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

export const ERROR_MESSAGE = Object.freeze({
  enterVisitDate: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  enterOrder: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  emptyBadge: '[ERROR] 빈 문자열의 배지는 존재할 수 없습니다.',
  invalidDate: '[ERROR] 유효하지 않은 날짜입니다.',
  emptyMenuName: '[ERROR] 메뉴 이름은 필수입니다.',
  invalidMenuType: '[ERROR] 존재하지 않는 메뉴 타입입니다.',
  nonexistentMenu: '[ERROR] 존재하지 않는 메뉴입니다.',
  negativePrice: '[ERROR] 금액은 음수가 될 수 없습니다.',
  invalidMoneyObject: '[ERROR] 유효하지 않은 Money 객체입니다.',
  invalidCustomDateObject: '[ERROR] 유효하지 않은 CustomDateObject 객체입니다.',
  orderCountExceeded: '[ERROR] 주문 가능한 메뉴의 개수를 초과하였습니다.',
  noMenuOrdered: '[ERROR] 하나 이상의 메뉴를 주문해야합니다.',
  duplicateMenu: '[ERROR] 중복된 메뉴를 주문할 수 없습니다.',
  beverageOnly: '[ERROR] 음료만 주문할 수 없습니다.',
  minimumOneMenu: '[ERROR] 각 메뉴는 적어도 1개 이상을 주문해야합니다.',
});
