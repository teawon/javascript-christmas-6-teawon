import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from '../message.js';

const InputView = {
  async readDate() {
    const dateInput = await Console.readLineAsync(INPUT_MESSAGE.enterVisitDate);
    return dateInput;
  },

  async readOrderMenu() {
    const orderMenuInput = await Console.readLineAsync(
      INPUT_MESSAGE.enterOrderMenu,
    );
    return orderMenuInput;
  },
};

export default InputView;
