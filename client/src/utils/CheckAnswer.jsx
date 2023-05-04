const checkAnswer = (objVar, GameAnswer, name, value, index) => {
  if (index > GameAnswer.length - 1) {
    // eslint-disable-next-line no-param-reassign
    objVar.checker = false;
  }
  if (GameAnswer[index]) {
    if (name !== GameAnswer[index].name || value !== GameAnswer[index].value) {
      // eslint-disable-next-line no-param-reassign
      objVar.checker = false;
    }
  }
};

export default checkAnswer;
