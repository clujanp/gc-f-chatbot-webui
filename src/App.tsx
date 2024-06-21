import './App.css'
import { Route, Switch } from 'wouter'
import Landing from './pages/landing'

function App() {

  return (
    <Switch>
      <Route path="/" component={Landing} />

      <Route path="/users/:name">
        {(params) => <>Hello, {params.name}!</>}
      </Route>

      {/* Default route in a switch */}
      <Route>404: No such page!</Route>
    </Switch>
  )
}

export default App
