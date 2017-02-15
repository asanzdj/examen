// our packages
import get from './get';
import create from './create';
import update from './update';
import deleteQuestion from './delete';
import answer from './answer';
import search from './search';

export default (app) => {
  get(app);
  create(app);
  update(app);
  deleteQuestion(app);
  answer(app);
  search(app);
};
