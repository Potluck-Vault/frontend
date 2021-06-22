import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';


const InviteGuests = (props) => {
    const { guests, setGuests, potluck, setPotluck } = props;
    const [newGuest, setNewGuest] = useState({id: uuidv4(), name: "", email: ""});

    const handleGuestSubmit = (e) => {
        e.preventDefault();
        setGuests([...guests, {id: newGuest.id, name: newGuest.name, email: newGuest.email}])
        updatePotluck(guests);
        setNewGuest({id: uuidv4(), name: "", email: ""});
        console.log("Potluck after new guest: ", potluck);
    };

    const updatePotluck = () => {
        setPotluck({...potluck, guests: guests});       
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

    return (
    <div>
        <h4>Guests</h4>
            {guests.map(guest => <p>{guest.name} <button name={guest.id} onClick={deleteGuest}>X</button></p>
             )}

        <h4>Invite a Guest</h4>
            <div>
                <label htmlFor="name">Name: </label>
                <input value={newGuest.name} onChange={handleNewGuestChange} name="name" type="text" />	
                <label htmlFor="name">Email: </label>
                <input value={newGuest.email} onChange={handleNewGuestChange} name="email" type="email" />	
            </div>
            
            <div>
                <button onClick={handleGuestSubmit}>Add to invite list...</button>
            </div>
    </div>
    )
}

export default InviteGuests;