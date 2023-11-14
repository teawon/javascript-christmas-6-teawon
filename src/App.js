import RestaurantController from './Controller/RestaurantController.js';

class App {
  async run() {
    const restaurantController = new RestaurantController();
    await restaurantController.start();
  }
}

export default App;
