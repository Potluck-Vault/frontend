//DEPENDENCIES
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

//COMPONENTS
import Home from './components/Home'
import Login from './components/User/Login'
import Register from './components/User/Register'
import AddPotluck from './components/Potlucks/AddPotluck'
import EditPotluck from './components/Potlucks/EditPotluck'
import Rsvp from './components/User/Rsvp'

function App() {
  // const [potlucks, setPotlucks] = useState([])
  // const [items, setItems] = useState([]);
	// const [guests, setGuests] = useState([]);

  // // const [potluck, setPotluck] = useState({});
	// const [potluck, setPotluck] = useState({
  //       id: uuidv4(),
  //       title:"",
  //       date: "",
  //       time: "",
  //       location: "",
  //       description: "",
  //       items: items,
  //       guests: guests
	// });

  return (
    <Router>
      <Switch>
        <Route path='/register'  component={Register}/>
        <Route path='/rsvp'  component={Rsvp}/>
        <Route path='/login'  component={Login}/>
        <Route exact path='/'  component={Home}/>
        {/* <Route exact path='/'
          render={(props) => (
            <Home {...props} potlucks={potlucks} 
                  setPotlucks={setPotlucks} />
          )} 
          /> */}

        <Route path='/addpotluck'  component={AddPotluck}/>
        <Route path='/editpotluck/:id'  component={EditPotluck}/>
        {/* <Route path='/addpotluck' 
          render={(props) => (
            <AddPotluck {...props} potlucks={potlucks} 
                        setPotlucks={setPotlucks}
                        potluck={potluck} 
                        setPotluck={setPotluck} 
                        items={items} 
                        setItems={setItems} 
                        guests={guests}
                        setGuests={setGuests}  />
          )}
            /> */}
        {/* <Route path='/editpotluck' 
          render={(props) => (
            <AddPotluck {...props} potlucks={potlucks} 
                        setPotlucks={setPotlucks}
                        potluck={potluck} 
                        setPotluck={setPotluck} 
                        items={items} 
                        setItems={setItems} 
                        guests={guests}
                        setGuests={setGuests}  />
          )}
        /> */}
      </Switch>
    </Router>
  );
}

export default App;
