// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import theme from './theming';
import session from './session';
import prof from './prof';
import etudiant from './etudiant';
import classe from './classe';
import module from './module';
import seance from './seance';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({
      router: routerReducer,
      theme,
      session,
      prof,
      etudiant,
      classe,
      module,
      seance,
    })
  );
}
