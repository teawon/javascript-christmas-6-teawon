class DiscountEvent {
  constructor() {
    if (this.constructor === DiscountEvent) {
      throw new Error('[ERROR] DiscountEvent는 추상클래스 입니다.');
    }
  }
  isApplicable(order) {
    throw new Error('[ERROR] DiscountEvent는 추상클래스 입니다.');
  }

  getDiscountDetails(order) {
    throw new Error('[ERROR] DiscountEvent는 추상클래스 입니다.');
  }
}

export default DiscountEvent;
