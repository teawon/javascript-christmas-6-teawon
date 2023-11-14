import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printWelcome() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
  },

  printEventPreview(month, day) {
    Console.print(
      `${month}월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
    );
  },
  printMenu(orderMenuList) {
    Console.print('<주문 메뉴>');

    orderMenuList.forEach((item) => {
      Console.print(`${item.name} ${item.count}개`);
    });
  },

  printTotalOrderPrice(totalOrderPrice) {
    Console.print('<할인 전 총주문 금액>');
    Console.print(`${totalOrderPrice}원`);
  },

  printGiftMenu(giftsData) {
    Console.print('<증정 메뉴>');

    if (giftsData.length === 0) {
      Console.print('없음');
      return;
    }

    giftsData.forEach((gift) => {
      Console.print(`${gift.name} ${gift.count}개`);
    });
  },

  printBenefitDetails(discountDatas) {
    Console.print('<혜택 내역>');

    discountDatas.forEach((discount) => {
      Console.print(`${discount.name}: -${discount.amount.getPrice()}원`);
    });
  },

  printTotalBenefit(totalProfitPrice) {
    Console.print('<총혜택 금액>');
    Console.print(`-${totalProfitPrice}원`);
  },

  printFinalPaymentPrice(finalPaymentPrice) {
    Console.print('<할인 후 예상 결제 금액>');
    Console.print(`${finalPaymentPrice}원`);
  },

  printEventBadge(eventBadgeName) {
    Console.print('<12월 이벤트 배지>');
    if (!eventBadgeName) {
      Console.print('없음');
    }

    Console.print(eventBadgeName);
  },
};

export default OutputView;
