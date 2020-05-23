import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { hot } from 'react-hot-loader/root';
import { Store } from './reducers/types';
import AppRoute from './routes/AppRoutes';
import AuthRoute from './routes/AuthRoutes';
import NotFoundPage from './pages/NotFoundPage';

type Props = {
  store: Store;
  history: History;
};

const App = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <AuthRoute path="/auth" />
        <Route exact path="/not-found" component={NotFoundPage} />
        <AppRoute path="/" />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default hot(App);
