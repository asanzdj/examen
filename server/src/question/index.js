// our packages
import get from './get';
import create from './create';
import update from './update';
import deleteQuestion from './delete';
import answer from './answer';
import vote from './vote';

export default (app) => {
  get(app);
  create(app);
  update(app);
  deleteQuestion(app);
  answer(app);
  vote(app);
};
