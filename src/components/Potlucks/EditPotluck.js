//Add a form that creates a new potluck and posts it to a backend endpoint
import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import AddItems from './AddItems';
import InviteGuests from './InviteGuests';

import axios from 'axios';

const EditPotluck = (props) => {

	const { push } = useHistory();

	const { id } = useParams();

	const [items, setItems] = useState([]);
	const [guests, setGuests] = useState([]);
	const [potluck, setPotluck] = useState({id: id,
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



	useEffect(()=>{
        axios.get(`https://potluckvaultv2.herokuapp.com/api/potlucks/${id}`)
          .then(res => { console.log("res.data for potluck id api: ", res.data)
            setPotluck(res.data);
			setGuests(res.data.guests);
			setItems(res.data.items);

          })
          .catch(err => {
            console.log("Error from API: ", err);
          });
          
      }, [id]);

	const handleChange = (e) => {
		setPotluck({
			...potluck,
			[e.target.name]: e.target.value
		});
	}

    const handleSubmit = (e) => {
		e.preventDefault();
		axios.put((`https://potluckvaultv2.herokuapp.com/api/potlucks/${id}`), potluck)
		.then(res=> {console.log("Response from put: ", res);
		})
		.catch(err=> {
		  console.log(err);
		})
		setPotluck(potluck);
		push("/");
	}

	const { name, date, time, location, description } = potluck;
   	return (
	<div className="col">
		<div className="modal-content">
			<form onSubmit={handleSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title">Updating: <strong>{name}</strong></h4>
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
                        setPotluck={setPotluck}
						guests={guests} />
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

export default EditPotluck;
