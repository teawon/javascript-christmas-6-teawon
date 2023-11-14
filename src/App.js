import RestaurantController from './Controller/RestaurantController.js';
import ChristmasDdayDiscount from './Model/DisCountEvent/ChristmasDdayDiscount.js';
import GiftDiscount from './Model/DisCountEvent/GiftDiscount.js';
import WeekdayDiscount from './Model/DisCountEvent/WeekdayDiscount.js';
import WeekendDiscount from './Model/DisCountEvent/WeekendDiscount.js';
import SpecialDayDiscount from './Model/DisCountEvent/SpecialDayDiscount.js';
import OutputView from './Views/OutputView.js';
import InputView from './Views/InputView.js';
import Menu from './Model/Menu.js';
import EventBadgeManager from './Model/EventBadgeManager.js';

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
