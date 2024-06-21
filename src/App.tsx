import { Route, Switch } from 'wouter';
import Landing from './pages/landing';
import Chatbox from './pages/chatbox';

function App() {
  return (
    <Switch>
      <Route path='/' component={Landing} />

      <Route path='/chat'>
        <Chatbox />
      </Route>

      {/* Default route in a switch */}
      <Route>
        <Landing />
      </Route>
    </Switch>
  );
}

export default App;
