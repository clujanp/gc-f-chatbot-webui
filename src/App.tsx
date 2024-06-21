import { Route, Switch } from 'wouter';
import Landing from './pages/landing';
import FourOhFour from './pages/404';
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
        <FourOhFour />
      </Route>
    </Switch>
  );
}

export default App;
