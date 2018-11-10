// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import theme from './theming';
import user from './user';
import prof from './prof';
import etudiant from './etudiant';
import classe from './classe';
import module from './module';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({
      router: routerReducer,
      counter,
      theme,
      user,
      prof,
      etudiant,
      classe,
      module,
    })
  );
}
