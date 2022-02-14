import './App.css';
import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Team from './pages/team'
import NewPost from './pages/post/new'
import NewTeam from './pages/new/team'
import NewSubject from './pages/new/subject'
import OldPost from './pages/post/old'
import Board from './pages/board'
import Login from './pages/login'
import Setting from './pages/setting'
import Subject from './pages/subject'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/team/:id">
          <Team />
        </Route>
        <Route exact path="/new/team">
          <NewTeam />
        </Route>
        <Route exact path="/subject/:id">
          <Subject />
        </Route>
        <Route exact path="/new/subject/:id">
          <NewSubject />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/setting">
          <Setting />
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
        <Redirect path="*" to="/setting" />
      </Switch>
    </BrowserRouter >
  );
}

export default App;
