import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AuthCard from './components/Card'
import Main from './components/Main'
import Header from './components/Header'
import CreateTeamScreen from './screens/CreateTeam'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import TeamScreen from './screens/TeamScreen'
import TeamSettingsScreen from './screens/TeamSettingsScreen'
import TeamChartsScreen from './screens/TeamChartsScreen'
import TeamFeedbackScreen from './screens/TeamFeedbackScreen'
import FeedbackSettingsScreen from './screens/FeedbackSettingsScreen'

const App = () => {
  return (
    <Router>
      <Route path="/" component={Header} />
      <Main>
        <Route exact path="/" component={HomeScreen} />
        <Route
          exact
          path="/login"
          render={(props) => <AuthCard {...props} cardType="login" />}
        />
        <Route
          exact
          path="/signup"
          render={(props) => <AuthCard {...props} cardType="signup" />}
        />
        <Route exact path="/createTeam" component={CreateTeamScreen} />
        <Route exact path="/users/:id" component={ProfileScreen} />
        <Route exact path="/teams/:id" component={TeamScreen} />
        <Route
          exact
          path="/teams/:id/settings"
          component={TeamSettingsScreen}
        />
        <Route
          exact
          path="/teams/:id/settings/feedback"
          component={FeedbackSettingsScreen}
        />
        <Route exact path="/teams/:id/charts" component={TeamChartsScreen} />
        <Route
          exact
          path="/teams/:id/feedback"
          component={TeamFeedbackScreen}
        />
      </Main>
    </Router>
  )
}

export default App
