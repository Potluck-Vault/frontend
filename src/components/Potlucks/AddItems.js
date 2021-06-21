import React from 'react';
import {v4 as uuidv4} from 'uuid';

const AddItems = (props) => {
    const { items, setItems } = props;

    const handleChange = (e) => {
        setItems({
            ...items,
            [e.target.name]: e.target.value
        })
    };

    const handleItemSubmit = (e) => {
        e.preventDefault();
        setItems(items.push({id: uuidv4(),
            description: "New Item", 
            claimed: false, 
            claimedBy: 0}))
    };
    console.log("items: ", items);
    return (
    <div>
        <h4>Menu Items</h4>
        <form onSubmit={handleItemSubmit}>
            {items.map(item=>{
            <div>
                    <label htmlFor="{id}">Description: </label>
                    <input value={item.description} onChange={handleChange} name="{id}" type="text" />	
            </div>
            })}
            <div>
                <button>Add another...</button>
            </div>
        </form>
    </div>
    )
}

export default AddItems;