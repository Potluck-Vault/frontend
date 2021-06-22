import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';


const AddItems = (props) => {
    const { items, setItems } = props;
    const [newItem, setNewItem] = useState({id: uuidv4(), description: "", claimed: false, claimedBy: 0});

    const handleItemSubmit = (e) => {
        e.preventDefault();
        setItems([...items, {id: newItem.id, description: newItem.description, claimed: false, claimedBy: 0}])
        setNewItem({id: uuidv4(), description: "", claimed: false, claimedBy: 0});
    };

    const handleNewItemChange = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        })

    };

    const deleteItem = (e) => {
        console.log("e.target.name before filter: ", e.target.name);
        setItems(items.filter(item => item.id !== e.target.name));
        // console.log("items after filter: ", items);
    }

    return (
    <div>
        <h4>Menu Items</h4>
            {items.map(item => <p>{item.description} <button name={item.id} color="red" onClick={deleteItem}>X</button></p>)}

        <h4>Add an Item</h4>
            <div>
                <label htmlFor="description">Description: </label>
                <input value={newItem.description} onChange={handleNewItemChange} name="description" type="text" />	
            </div>
            
            <div>
                <button onClick={handleItemSubmit}>Add to list...</button>
            </div>
    </div>
    )
}

export default AddItems;