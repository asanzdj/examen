// npm packages
import passport from 'passport';

// our packages
import {r, Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/question/vote/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    try {
      let exist = false;
      const question = await Question.get(req.params.id);

      for (let i = 0; i < question.users.length; i++) {
        if (question.users[i].id == req.user.id) {
          exist = true;
        }
      }

      if (exist) {
        res.status(400).send({error: 'Only can vote one time this question'});
        return;
      }

      question.votes ++;
      question.users.push({id: req.user.id});

      await question.save();
      res.send(question);

    } catch (e) {
      res.status(400).send({error: 'Cannot be voted'});
    }
  }));

  app.get('/api/question/votes/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    try {
      const questions = await Question;
      const question = questions.filter(question => question.id == req.params.id);

      res.send(question.votes);
    } catch (e) {
      res.status(400).send({error: 'User does not exist'});
    }
  }));
};
