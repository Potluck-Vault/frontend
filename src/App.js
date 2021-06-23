//DEPENDENCIES
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid';

//COMPONETNS
import Home from './components/Home'
import Login from './components/User/Login'
import Register from './components/User/Register'
import AddPotluck from './components/Potlucks/AddPotluck'
import Rsvp from './components/User/Rsvp'

function App() {
  const [potlucks, setPotlucks ] = useState([])

  const [items, setItems] = useState([]);
	const [guests, setGuests] = useState([]);

	const [potluck, setPotluck] = useState({
        id: uuidv4(),
        title:"",
        date: "",
        time: "",
        location: "",
        description: "",
        items: items,
        guests: guests
	});
// console.log("potluck right after creation in App: ", potluck);
  // setPotlucks([...potlucks, potluck]);

  return (
    <Router>
      <Switch>
        <Route path='/register'  component={Register}/>
        <Route path='/rsvp'  component={Rsvp}/>
        <Route path='/login'  component={Login}/>
        <Route exact path='/' component={Home} />
        <Route path='/addpotluck' 
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
        />
        <Route path='/editpotluck' 
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
        />
      </Switch>
    </Router>
  );
}

export default App;
