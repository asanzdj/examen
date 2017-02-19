// npm packages
import passport from 'passport';

// our packages
import {r, Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/question/:id/answer', passport.authenticate('jwt', {session: false}),
  asyncRequest(async (req, res) => {
    const {id} = req.params;
    // get user input
    const {answer} = req.body;

    // make sure text is not empty
    if (answer !== undefined && !answer.length) {
      res.status(400).send({error: 'Answer should be not empty!'});
      return;
    }

    // get the question
    const question = await Question.get(id);

    // double-check check if question exists
    if (!question) {
      res.status(400).send({error: 'Question not found!'});
      return;
    }

    // append new answer
    question.answers.push({answer, user: req.user.id, login: req.user.login});

    // try saving
    await question.save();

    // send created question back
    res.send(question);
  }));

  app.get('/api/getMyAnswers/:id', asyncRequest(async (req, res) => {
    //try {
      const allAnswers = await r.table('Question').getField('answers');

      const answers = allAnswers.filter(answer => answer['user'] === req.params.id);

    //  res.send(myAnswers);
    /*} catch (e) {
      res.status(400).send({error: 'User does not exist'});
    }*/
  }));
};
