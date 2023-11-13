import Food from './Food';
import Money from './Money';

class Menu {
  static FOOD_MENU = {
    양송이수프: {
      price: 6000,
      type: '애피타이저',
    },
    타파스: {
      price: 5500,
      type: '애피타이저',
    },
    시저샐러드: {
      price: 8000,
      type: '애피타이저',
    },
    티본스테이크: {
      price: 55000,
      type: '메인',
    },
    바비큐립: {
      price: 54000,
      type: '메인',
    },
    해산물파스타: {
      price: 35000,
      type: '메인',
    },
    크리스마스파스타: {
      price: 25000,
      type: '메인',
    },
    초코케이크: {
      price: 15000,
      type: '디저트',
    },
    아이스크림: {
      price: 5000,
      type: '디저트',
    },
    제로콜라: {
      price: 3000,
      type: '음료',
    },
    레드와인: {
      price: 60000,
      type: '음료',
    },
    샴페인: {
      price: 25000,
      type: '음료',
    },
  };

  static getFood(name) {
    const menuInfo = Menu.FOOD_MENU[name];
    if (!menuInfo) {
      throw new Error('[ERROR] 존재하지 않는 메뉴입니다.');
    }

    const { price, type } = menuInfo;
    const food = new Food(name, new Money(price), type);

    return food;
  }
}

export default Menu;
