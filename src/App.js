//DEPENDENCIES
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'

//COMPONENTS
import Home from './components/Home'
import Login from './components/User/Login'
import Register from './components/User/Register'
import AddPotluck from './components/Potlucks/AddPotluck'
import EditPotluck from './components/Potlucks/EditPotluck'
import Rsvp from './components/User/Rsvp'

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/register'  component={Register}/>
<<<<<<< HEAD
          <Route path='/potlucks/rsvp/:id'  component={Rsvp}/>
=======
        <Route path='/potluck/rsvp/:id'  component={Rsvp}/>
>>>>>>> 0775b67482169cc74effa797465309ae6b50daa8
        <Route path='/login'  component={Login}/>
        <Route exact path='/'  component={Home}/>
        <Route path='/addpotluck'  component={AddPotluck}/>
        <Route path='/editpotluck/:id'  component={EditPotluck}/>
      </Switch>
    </Router>
  );
}

export default App;
