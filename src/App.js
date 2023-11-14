import RestaurantController from './Controller/RestaurantController.js';
import ChristmasDdayDiscount from './model/DisCountEvent/ChristmasDdayDiscount.js';
import GiftDiscount from './model/DisCountEvent/GiftDiscount.js';
import WeekdayDiscount from './model/DisCountEvent/WeekdayDiscount.js';
import WeekendDiscount from './model/DisCountEvent/WeekendDiscount.js';
import SpecialDayDiscount from './model/DisCountEvent/SpecialDayDiscount.js';
import OutputView from './Views/OutputView.js';
import InputView from './Views/InputView.js';
import Menu from './model/Menu.js';
import EventBadgeManager from './model/EventBadgeManager.js';

class App {
  async run() {
    const discountEvents = this.#getDisCountEvnets();
    const restaurantController = new RestaurantController(
      Menu,
      EventBadgeManager,
      discountEvents,
      OutputView,
      InputView,
    );
    await restaurantController.start();
  }

  #getDisCountEvnets() {
    const discountEvents = [
      new ChristmasDdayDiscount(),
      new GiftDiscount(),
      new WeekdayDiscount(),
      new WeekendDiscount(),
      new SpecialDayDiscount(),
    ];

    return discountEvents;
  }
}

export default App;
