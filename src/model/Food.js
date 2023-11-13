class Food {
  static MENU_TYPES = ['애피타이저', '메인', '디저트', '음료'];

  #name;
  #money;
  #type;

  constructor(name, money, type) {
    this.#validate(name, type);
    this.#name = name;
    this.#money = money;
    this.#type = type;
  }

  #validate(name, type) {
    if (!name) {
      throw new Error('[ERROR] 메뉴 이름은 필수입니다.');
    }

    if (!Food.MENU_TYPES.includes(type)) {
      throw new Error('[ERROR] 존재하지 않는 메뉴 타입입니다.');
    }
  }

  getName() {
    return this.#name;
  }

  getMoney() {
    return this.#money;
  }

  getType() {
    return this.#type;
  }
}

export default Food;
