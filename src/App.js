import './App.css';
import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Main from './pages/main'
import NewPost from './pages/post/new'
import OldPost from './pages/post/old'
import Board from './pages/board'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/main">
          <Main />
        </Route>
        <Route exact path="/post/new">
          <NewPost />
        </Route>
        <Route exact path="/post/:id">
          <OldPost />
        </Route>
        <Route exact path="/board/:id">
          <Board />
        </Route>
        <Redirect path="*" to="/main" />
      </Switch>
    </BrowserRouter >
  );
}

export default App;
