//DEPENDENCIES
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

//COMPONETNS
import Home from './components/Home'
import Login from './components/User/Login'
import Register from './components/User/Register'
import AddPotluck from './components/Potlucks/AddPotluck'

function App() {
  return (
    <Router>
      <Switch>
      <Route path='/register'  component={Register}/>
        <Route path='/login'  component={Login}/>
        <Route exact path='/' component={Home} />
        <Route path='/addpotluck' component={AddPotluck} />
      </Switch>
    </Router>
  );
}

export default App;
