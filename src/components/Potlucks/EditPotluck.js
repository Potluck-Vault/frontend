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
					<h4 className="modal-title">Adding: <strong>{potluck.title}</strong></h4>
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
