import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

const AddItems = (props) => {
    const { items, setItems } = props;

    const handleChange = (e) => {
        setItems({
            ...items,
            [e.target.name]: e.target.value
        })
    };

const handleSubmit = (e) => {
    e.preventDefault();
    setItems(items.push({id: uuidv4(),
        item: "New Item", 
        claimed: false, 
        claimedBy: ""}))
};

    return (
    <div>
        <h4>Menu Items</h4>
        <form onSubmit={handleSubmit}>
            {items.map(item=>{
            <div>	
                <label>Description</label>
                <input value={item.item} onChange={handleChange} name="title" type="text" />			
            </div>
            })};
            <button>Add another...</button>
        </form>
    </div>
    )
}
