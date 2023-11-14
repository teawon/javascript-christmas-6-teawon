const ValidationUtils = {
  validateNotNull(input, message) {
    if (!input) {
      throw new Error(message);
    }
  },

  validateIncluded(input, element, message) {
    if (!element.includes(input)) {
      throw new Error(message);
    }
  },

  validatePositiveNumber(input, message) {
    if (input < 0) {
      throw new Error(message);
    }
  },

  validateTypeCheck(input, type, message) {
    if (!(input instanceof type)) {
      throw new Error(message);
    }
  },

  validateMaxLen(input, maxLen, message) {
    if (input > maxLen) {
      throw new Error(message);
    }
  },

  validateMinLen(input, minLen, message) {
    if (input < minLen) {
      throw new Error(message);
    }
  },

  validateNotDuplicate(input, message) {
    if (new Set(input).size !== input.length) {
      throw new Error(message);
    }
  },
};

export default ValidationUtils;
