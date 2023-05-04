const checkAnswer = (objVar, GameAnswer, name, value, index) => {
  if (index > GameAnswer.length - 1) {
    objVar.checker = false;
  }
  if (GameAnswer[index]) {
    if (name !== GameAnswer[index].name || value !== GameAnswer[index].value) {
      objVar.checker = false;
    }
  }
};

export default checkAnswer;
