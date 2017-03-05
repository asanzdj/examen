import {thinky} from './thinky';

export const Question = thinky.createModel('Question', {
  text: thinky.type.string().required(),
  creationDate: thinky.type.date().default(thinky.r.now()),
  expirationDate: thinky.type.date().required(),
  answers: thinky.type.array().schema(
    thinky.type.object().schema({
      id: thinky.type.string().required(),
      user: thinky.type.string().required(),
      answer: thinky.type.string().required(),
      votes: thinky.type.number().required(),
      users: thinky.type.array().schema(
        thinky.type.object().schema({
          id: thinky.type.string().required(),
        })
      ).default([]),
    })
  ).default([]),
  owner: thinky.type.string().required(),
  votes: thinky.type.number().required(),
  users: thinky.type.array().schema(
    thinky.type.object().schema({
      id: thinky.type.string().required(),
    })
  ).default([]),
});
