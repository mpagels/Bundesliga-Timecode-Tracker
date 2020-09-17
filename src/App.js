import React from 'react'
import styled from 'styled-components'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import SequencePage from './page/SequencePage'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/create">
          <Header
            title="NEUE SZENE HINZUFÜGEN"
            type="small"
            isCloseButton={true}
          />
        </Route>
        <Route path="/users">
          <h2>Users</h2>
        </Route>
        <Route path="/">
          <Header title="TIMECODE TRACKER" type="big" />
        </Route>
      </Switch>

      <NavBar />
    </Router>
  )
}
