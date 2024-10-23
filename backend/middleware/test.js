const test = (req, res, next) => {
  console.log("Hello world M1");
  next();
};

module.exports = test;
