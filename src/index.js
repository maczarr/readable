import React from 'react';
import ReactDOM from 'react-dom';
import Startpage from './pages/Startpage';
import PostingDetails from './pages/PostingDetails';
import PostingCreate from './pages/PostingCreate';
import PostingEdit from './pages/PostingEdit';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import './index.css';

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const routingMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(logger, thunk, routingMiddleware)
  )
)

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div className="app">
      <Router history={history}>
        <Route path="/" component={Startpage}/>
        <Route path="/post/create" component={PostingCreate}/>
        <Route path="/:category" component={Startpage}/>
        <Route path="/:category/:id" component={PostingDetails}/>
        <Route path="/:category/:id/edit" component={PostingEdit}/>
      </Router>
    </div>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
