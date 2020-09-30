import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import procon from './procon';
import editProposal from './editProposal';
import proposal from './proposal';
import map from './map';
import survey from './survey';
import searched from './searched';
import bestIdeas from './bestIdeas';
import newIdea from './newIdea';
import pubTalkReg from './pubTalkReg';

const rootReducer = combineReducers({
  auth,
  user,
  procon,
  proposal,
  editProposal,
  map,
  survey,
  searched,
  bestIdeas,
  newIdea,
  pubTalkReg,
});

export default rootReducer;
