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
};

module.exports = variables;
