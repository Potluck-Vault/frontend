import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

import AddPotluck from "./Potlucks/AddPotluck"

const Home = () => {
    const { push } = useHistory();
    const [potlucks, setPotlucks] = useState([])
    // const [items, setItems] = useState([]);
    // const [guests, setGuests] = useState([]);
  
    const [potluck, setPotluck] = useState({
        id: uuidv4(),
        title:"",
        date: "",
        time: "",
        location: "",
        description: "",
        items: [],
        guests: []
    });

    const editPotluck = (potluck) => {
        push("/editpotluck");

        console.log("editPotluck potluck obj: ", potluck);
        return(

        <AddPotluck setPotluck={setPotluck} 
                    potluck={potluck} 
                    potlucks={potlucks}  
                    setPotlucks={setPotlucks} />
    )};

   useEffect(()=>{
        axios.get('https://potluckvaultv2.herokuapp.com/api/potlucks')
          .then(res => { 
            setPotlucks(res.data);
          })
          .catch(err => {
            console.log(err);
          });
          
      }, []);
    return (
        <div>
            <h1>My Potlucks</h1>
            {potlucks.map(potluck => {
            return (
            <div className="potluck-card">
                <h2>{potluck.name}</h2>
                {/* Link with onClick and component */}
                {/* <Link to={'/editpotluck'} component={<AddPotluck />} onClick={()=>{editPotluck(potluck)}}>Edit</Link> */}

                {/* Link with component; no onClick */}
                {/* <Link to={'/editpotluck'} component={AddPotluck}>Edit</Link> */}

                {/* Button with onClick */}
                {/* <button onClick={()=>{editPotluck(potluck)}}>Edit</button> */}

                {/* Link with id in url */}
                <Link to={`/editpotluck/${potluck.id}`}>Edit</Link>

                <p>Date : {potluck.date}</p>
                <p>Time : {potluck.time}</p>
                <p>Location : {potluck.location}</p>
                <p>Description : {potluck.description}</p>
                <div className="potluck-items">
                    <h3>Menu Items</h3>
                    {potluck.items.map(item => {
                        return(
                            <div>
                                <p>{item.item}</p> 
                                <p>Claimed?: {item.claimed}</p>
                                <p>By: {item.claimedBy}</p>
                            </div>
                    )})}
                    <h3>Guests</h3>
                    {potluck.guests.map(guest => {
                        return(
                            <div className="guest">
                                <p>{guest.guest}</p>
                                <p>{guest.contact}</p>
                            </div>
                        )
                    })}
                </div>
            </div>)}
            )}
        </div>

    )
}

export default Home
