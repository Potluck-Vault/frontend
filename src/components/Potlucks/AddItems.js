import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';


const AddItems = (props) => {
    const { items, setItems, potluck, setPotluck } = props;
    const [newItem, setNewItem] = useState({id: uuidv4(), description: "", claimed: false, claimedBy: ""});

    const handleItemSubmit = (e) => {
        e.preventDefault();
        setItems([...items, {id: newItem.id, description: newItem.description, claimed: false, claimedBy: ""}])
        updatePotluck(items);
        setNewItem({id: uuidv4(), description: "", claimed: false, claimedBy: ""});
    };

    const updatePotluck = (items) => {
        setPotluck({...potluck, items: items});
        console.log("Potluck after new item: ", potluck);
    };

    const handleNewItemChange = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        })

    };

    const deleteItem = (e) => {
        setItems(items.filter(item => item.id !== e.target.name));
    }

    return (
    <div>
        <h4>Menu Items</h4>
            {items.map(item => <p>{item.description} <button type="button" name={item.id} color="red" onClick={deleteItem}>X</button></p>)}

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