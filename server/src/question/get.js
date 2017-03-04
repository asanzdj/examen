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
  const match = req.query.match || '';
  const questions = await r.table('Question')
                           .eqJoin('owner', r.table('User'))
                           .without({right: {id:true}})
                           .zip()
                           .pluck('id', 'text', 'creationDate', 'expirationDate', 'owner', 'votes', 'login')
                           .filter(doc => doc('text').match(`(?i)${match}`))
                           .orderBy(r.asc('expirationDate'))
                           .skip(skip)
                           .limit(limit);
  // send question back
  res.send(questions);
  }));

  app.post('/api/questions/orderByDesc', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
  const order = req.body.order;
  const type = req.body.type;
  const skip = parseInt(req.query.skip, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 10;
  const questions = await r.table('Question')
                           .eqJoin('owner', r.table('User'))
                           .without({right: {id:true}})
                           .zip()
                           .pluck('id', 'text', 'creationDate', 'expirationDate', 'owner', 'votes', 'login')
                           .orderBy(r.asc(order))
                           .skip(skip)
                           .limit(limit);
  // send question back
  res.send(questions);
  }));

  app.post('/api/questions/orderByAsc', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    const order = req.body.order;
    const skip = parseInt(req.query.skip, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const questions = await r.table('Question')
                             .eqJoin('owner', r.table('User'))
                             .without({right: {id:true}})
                             .zip()
                             .pluck('id', 'text', 'creationDate', 'expirationDate', 'owner', 'votes', 'login')
                             .orderBy(r.asc(order))
                             .skip(skip)
                             .limit(limit);
    // send question back
    res.send(questions);
  }));
};
