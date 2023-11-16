import { Console } from '@woowacourse/mission-utils';
import { formatNumberToKRW } from '../Utils/formatter.js';
import { OUTPUT_MESSAGE } from '../message.js';

const OutputView = {
  printWelcome() {
    Console.print(OUTPUT_MESSAGE.welcome);
  },

  printEventPreview(month, day) {
    Console.print(OUTPUT_MESSAGE.eventPreview(month, day));
  },
  printMenu(orderMenuList) {
    Console.print(OUTPUT_MESSAGE.orderMenuHeader);

    orderMenuList.forEach((item) => {
      Console.print(OUTPUT_MESSAGE.orderItem(item.name, item.count));
    });
  },

  printTotalOrderPrice(totalOrderPrice) {
    Console.print(OUTPUT_MESSAGE.totalOrderPriceHeader);
    Console.print(
      OUTPUT_MESSAGE.positiveMoney(formatNumberToKRW(totalOrderPrice)),
    );
  },

  printGiftMenu(giftsData) {
    Console.print(OUTPUT_MESSAGE.giftMenuHeader);

    if (giftsData.length === 0) {
      Console.print(OUTPUT_MESSAGE.notExist);
      return;
    }

    giftsData.forEach((gift) => {
      Console.print(OUTPUT_MESSAGE.benefitDetail(gift.name, gift.count));
    });
  },

  printBenefitDetails(discountDatas) {
    Console.print(OUTPUT_MESSAGE.benefitDetailsHeader);
    if (discountDatas.length === 0) {
      Console.print(OUTPUT_MESSAGE.notExist);
      return;
    }
    discountDatas.forEach((discount) => {
      Console.print(
        OUTPUT_MESSAGE.benefitDetail(
          discount.name,
          formatNumberToKRW(discount.amount),
        ),
      );
    });
  },

  printTotalBenefit(totalProfitPrice) {
    Console.print(OUTPUT_MESSAGE.totalBenefitHeader);
    Console.print(
      OUTPUT_MESSAGE.minusMoney(formatNumberToKRW(totalProfitPrice)),
    );
  },

  printFinalPaymentPrice(finalPaymentPrice) {
    Console.print(OUTPUT_MESSAGE.finalPaymentPriceHeader);
    Console.print(
      OUTPUT_MESSAGE.positiveMoney(formatNumberToKRW(finalPaymentPrice)),
    );
  },

  printEventBadge(eventBadgeName) {
    Console.print(OUTPUT_MESSAGE.eventBadgeHeader);
    if (!eventBadgeName) {
      Console.print(OUTPUT_MESSAGE.notExist);
    }
    Console.print(eventBadgeName);
  },

  printLine() {
    Console.print(OUTPUT_MESSAGE.emptyLine);
  },
};

export default OutputView;
