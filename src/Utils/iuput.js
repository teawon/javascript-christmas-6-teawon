import { Console } from '@woowacourse/mission-utils';

export const getInputWithValidation = async (inputFunction, errorMessage) => {
  while (true) {
    try {
      return await inputFunction();
    } catch (error) {
      Console.print(errorMessage);
    }
  }
};
