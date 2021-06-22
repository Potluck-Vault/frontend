//Add a form that creates a new potluck and posts it to a backend endpoint
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import AddItems from './AddItems';
import InviteGuests from './InviteGuests';

import axios from 'axios';

const EditPotluck = (props) => {
	const { push } = useHistory();
	const { setPotluck, potluck, setItems, setGuests } = props; //Coming in from Home page
// TEST DATA
	setPotluck({
		id: "450f2ae3-1ee2-4e51-94c9-92380ab84f42",
		title: "Bob's birthday",
		date: "6/22/2021",
		time: "7:00pm",
		description: "Celebrate Bob's big day. Bring a swimsuit.",
		guests: [{email: "joe@smith.com",
				id: "0b1b308d-2452-4f5c-b494-0b01585fd677",
				name: "joe smith",
				rsvp: false},
				{email: "jane@doe.com",
				id: "925091ab-2aa4-40bd-a45e-9274ab20487b",
				name: "Jane Doe",
				rsvp: false}],
		items: [{claimed: false,
				claimedBy: "",
				description: "chips & salsa",
				id: "3196dafb-a1f5-4253-b812-4c9b92c34992"},
				{claimed: false,
				claimedBy: "",
				description: "beer",
				id: "c0224a5a-8d96-48c1-a76b-548ee3e81ffa"},
				
				{claimed: false,
				claimedBy: "",
				description: "chicken",
				id: "2a94efb3-7e24-4c02-a267-edc355a0d722"}]
		});
	
	const handleChange = (e) => {
        setPotluck({
            ...potluck,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
		e.preventDefault();
		// axios.post(`http://addPotluckAPI/`, potluck)
		// .then(res=> {
        //     setPotlucks(res.data);
		//   push(`/`);
		// })
		// .catch(err=> {
		//   console.log(err);
		// })
        // setPotlucks([...potlucks, potluck ])
        
	}
	
	const { title, date, time, location, description, items, guests } = potluck;

    return (
	<div className="col">
		<div className="modal-content">
			<form onSubmit={handleSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title">Editing: <strong>{potluck.title}</strong></h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={title} onChange={handleChange} name="title" type="text" className="form-control"/>
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
	</div>);
}

export default EditPotluck;
