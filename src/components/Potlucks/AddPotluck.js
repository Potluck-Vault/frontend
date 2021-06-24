//Add a form that creates a new potluck and posts it to a backend endpoint
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import AddItems from './AddItems';
import InviteGuests from './InviteGuests';

import axios from 'axios';

const AddPotluck = (props) => {
	// console.log("AddPotluck props.potluck: ", props.potluck);

	const { push } = useHistory();
	// const { setPotlucks, potlucks, potluck, setPotluck, items, setItems, guests, setGuests } = props; //Coming in from Home page
	const [items, setItems] = useState([]);
	const [guests, setGuests] = useState([]);
	const [potluck, setPotluck] = useState({
		user_id: 1, //where does user_id  & username come from?
		username: "",
		name: "", 
		date: "", 
		time: "", 
		location: "", 
		description: "", 
		image_url: "",
		items: items,
		guests: guests });



	const handleChange = (e) => {
		console.log("Handle change: ", e.target.name, e.target.value);
		setPotluck({
			...potluck,
			[e.target.name]: e.target.value
		});
	}
	const removeIdFromGuests = guests => {
		let newGuests = [];
		guests.forEach(guest=>{
			let newGuest = {guest: guest.guest, contact: guest.contact, rsvp: guest.rsvp};
			newGuests.push(newGuest);
		})
		console.log("newGuests: ", newGuests)
		setGuests(newGuests);
		console.log("guests after setGuests: ", guests)
		setPotluck({...potluck, guests: newGuests})
		console.log("potluck after setPotluck: ", potluck);
	}
	const removeIdFromItems = items => {
		let newItems = [];
		items.forEach(item=>{
			let newItem = {item: item.item, claimed: item.claimed, claimedBy: item.claimedBy};
			newItems.push(newItem);
		})
		console.log("newItems: ", newItems)
		setItems(newItems);
		setPotluck({...potluck, items: newItems});
	}
    const handleSubmit = (e) => {
		e.preventDefault();
		removeIdFromGuests(potluck.guests);
		removeIdFromItems(potluck.items);
		setPotluck({...potluck, items: items, guests: guests});
        axios.post(`https://potluckvaultv2.herokuapp.com/api/potlucks/`, potluck)
          .then(res => { console.log("res for potluck id api: ", res)
            setPotluck(res.data);
			setGuests(res.data.guests);
			setItems(res.data.items);

          })
          .catch(err => {
            console.log("Error from API: ", err);
          });
		// Keep state in synch with database 

        // setPotlucks([...potlucks, potluck ])
        console.log("potluck to post: ", potluck);
	}

	const { name, date, time, location, description } = potluck;

    return (
	<div className="col">
		<div className="modal-content">
			<form onSubmit={handleSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title">Adding Potluck: <strong>{name}</strong></h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={name} onChange={handleChange} name="name" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Date</label>
						<input value={date} onChange={handleChange} name="date" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Time</label>
						<input value={time} onChange={handleChange} name="time" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Location</label>
						<input value={location} onChange={handleChange} name="location" type="text" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
					</div>
					<AddItems items={items} 
                        setItems={setItems} 
                        potluck={potluck} 
                        setPotluck={setPotluck} />
                    <InviteGuests guests={guests} 
                        setGuests={setGuests} 
                        potluck={potluck} 
                        setPotluck={setPotluck}/>	
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Save Potluck"/>
					<Link to={`/`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
			</form>
		</div>
	</div>
	)};

export default AddPotluck;
