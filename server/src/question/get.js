// npm packages
import passport from 'passport';

// our packages
import {r, Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.get('/api/question/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    // get requested question
    const question = await Question.get(req.params.id);
    // send question back
    res.send(question);
  }));

  app.get('/api/question', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    const skip = parseInt(req.query.skip, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const questions = await r.table('Question')
                             .pluck('id', 'text', 'creationDate', 'expirationDate', 'owner', 'votes')
                             .orderBy(r.desc('creationDate'))
                             .skip(skip)
                             .limit(limit);
    // send question back
    res.send(questions);
  }));

  app.get('/api/questions', asyncRequest(async (req, res) => {
    const questions = await Question;
    res.send(questions);
  }));

  app.get('/api/getMyQuestions/:id', asyncRequest(async (req, res) => {
    try {
      const questions = await Question;
      const myQuestions = questions.filter(question => question.owner == req.params.id);

      res.send(myQuestions);
    } catch (e) {
      res.status(400).send({error: 'User does not exist'});
    }
  }));
};
