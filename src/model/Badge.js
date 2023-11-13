class Badge {
  #name;

  constructor(name) {
    this.#validate(name);
    this.#name = name;
  }

  #validate(name) {
    if (!name) {
      throw new Error('[ERROR] 빈 문자열의 배지는 존재할 수 없습니다.');
    }
  }

  getName() {
    return this.#name;
  }
}

export default Badge;
