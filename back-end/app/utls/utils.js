const variables = {
  SECOND: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 24 * 60 * 60 * 1000,
  GB: 1073741824,
  MAX_GB_FOR_VOD: 35,
  sleep: function (tempo) {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000 * tempo);
    });
  },

  compare: function (a, b) {
    if (a === b) return true;

    if (a == null || typeof a != "object" || b == null || typeof b != "object")
      return false;

    let keysA = Object.keys(a),
      keysB = Object.keys(b);

    if (keysA.length != keysB.length) return false;

    for (let key of keysA) {
      if (!keysB.includes(key) || !this.compare(a[key], b[key])) return false;
    }

    return true;
  },
};

module.exports = variables;
