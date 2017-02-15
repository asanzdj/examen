// npm packages
import passport from 'passport';

// our packages
import {r, Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/search', passport.authenticate('jwt', {session: false}),
  asyncRequest(async (req, res) => {
    const {text} = req.body;
    const text2 = text.toLowerCase().trim();
    const skip = parseInt(req.query.skip, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const questions = await r.table('Question')
                             .pluck('id', 'text', 'creationDate', 'expirationDate', 'owner')
                             .orderBy(r.desc('creationDate'))
                             .skip(skip)
                             .limit(limit);
    const filteredQuestions = questions.filter(q => q.text.toLowerCase().trim().indexOf(text2) !== -1);
    // send question back
    res.send(filteredQuestions);
  }));

};
