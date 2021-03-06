import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
// import {v4 as uuidv4} from 'uuid';

const Home = () => {
    const history  = useHistory();
    const [potlucks, setPotlucks] = useState([])
 
    // const [potluck, setPotluck] = useState({});

    const deletePotluck = e => {
        axios.delete(`https://potluckvaultv2.herokuapp.com/api/potlucks/${e.target.name}`)
          .then(res => { 
            // setPotlucks(res.data);
            history.go(0)
          })
          .catch(err => {
            console.log(err);
          }); 
    }

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
            <Link to={`/addpotluck`}><input type="button" value="Add a New Potluck"/></Link>

            {potlucks.map(potluck => {

                const getItemGuest = (id) => {
                    let itemGuest = potluck.guests.filter(guest => guest.id === id);
                    if (itemGuest.length>0) {
                        return(itemGuest[0]);
                    }else{
                        return {guest: "Nobody yet"};
                    };
                }

            return (
            <div key={potluck.id} className="potluck-card">
                <h2>{potluck.name}</h2><button onClick={deletePotluck} name={potluck.id}>Delete this Potluck</button>
                <h4>URL for RSVP: <a href={`https://potluckvaultv2.herokuapp.com/potlucks/rsvp/${potluck.id}`}>https://potluckvaultv2.herokuapp.com/potlucks/rsvp/{potluck.id}</a></h4>

                <Link to={`/editpotluck/${potluck.id}`}>Edit</Link>

                <p>Date : {potluck.date}</p>
                <p>Time : {potluck.time}</p>
                <p>Location : {potluck.location}</p>
                <p>Description : {potluck.description}</p>
                <div className="potluck-items">
                    <h3>Menu Items</h3>
                    {potluck.items.map(item => {
                        return(
                            <div key={item.id}>
                                <p>{item.item}</p> 
                                <p>Brought by: {getItemGuest(item.claimedBy).guest}</p>
                            </div>
                    )})}
                    <h3>Guests</h3>
                    {potluck.guests.map(guest => {
                        return(
                            <div key={guest.id} className="guest">
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

export default Home;