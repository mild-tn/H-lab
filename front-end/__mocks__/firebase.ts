const onValue = jest.fn();

const ref = jest.fn(() => {
  return {
    onValue,
  };
});

const database = {
  ref,
};

module.exports = { database, onValue, ref };
