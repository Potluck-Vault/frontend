import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';


const InviteGuests = (props) => {
    const { guests, setGuests, potluck, setPotluck } = props;
    const [newGuest, setNewGuest] = useState({id: uuidv4(), name: "", email: "", rsvp: false});

    const handleGuestSubmit = (e) => {
        e.preventDefault();
        setGuests([...guests, {id: newGuest.id, guest: newGuest.guest, contact: newGuest.contact, rsvp: newGuest.rsvp}]);
        updatePotluck(guests)
        setNewGuest({id: uuidv4(), guest: "", contact: ""});
    };

    const updatePotluck = (guests) => {
        setPotluck({...potluck, guests: [...guests, newGuest]});       
    }

    const handleNewGuestChange = (e) => {
        setNewGuest({
            ...newGuest,
            [e.target.name]: e.target.value
        })
    };

    const deleteGuest = (e) => {
        setGuests(guests.filter(guest => guest.id !== e.target.name));
    }

    const editGuest = (updateGuest) => {
        setNewGuest({id: updateGuest.id, guest: updateGuest.guest, contact: updateGuest.contact, rsvp: updateGuest.rsvp});
        setGuests(guests.filter(guest => guest.id !== updateGuest.id));
    }

    return (
    <div>
        <h4>Guests</h4>
            {guests.map(guest => 
            <div key={guest.id}>
                <p>{`${guest.guest}, ${guest.contact}`} <button type="button" name={guest.id} onClick={deleteGuest}>X</button><button type="button" name={guest.guest} onClick={()=>{editGuest(guest)}}>Edit</button></p>
                
            </div>
             )}

        <h4>Invite a Guest</h4>
            <div>
                <label htmlFor="name">Name: </label>
                <input value={newGuest.guest} onChange={handleNewGuestChange} name="guest" type="text" />	
                <label htmlFor="name">Email: </label>
                <input value={newGuest.contact} onChange={handleNewGuestChange} name="contact" type="email" />	
            </div>
            
            <div>
                <button onClick={handleGuestSubmit}>Add to invite list...</button>
            </div>
    </div>
    )
}

export default InviteGuests;