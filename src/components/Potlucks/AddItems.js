import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';


const AddItems = (props) => {
    const { items, setItems, potluck, setPotluck } = props;
    const [newItem, setNewItem] = useState({id: uuidv4(), description: "", claimed: false, claimedBy: ""});
    // const updateItem = {id: "", description: "", claimed: false, claimedBy: ""}

    const handleItemSubmit = (e) => {
        e.preventDefault();
        setItems([...items, {id: newItem.id, description: newItem.description, claimed: false, claimedBy: ""}])
        updatePotluck(items);
        setNewItem({id: uuidv4(), description: "", claimed: false, claimedBy: ""});
    };

    const updatePotluck = (newItems) => {
        setPotluck({...potluck, items: newItems});
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
    const editItem = (e) => {
        const updateItem = {id: e.target.name.id, description: e.target.name.description, claimed: e.target.name.claimed, claimedBy: e.target.name.claimedBy};
        setNewItem({...newItem, description: e.target.name});
        setItems(items.filter(item => item.description !== e.target.name));
    }


    return (
    <div>
        <h4>Menu Items</h4>
            {items.map(item => <p>{item.description} <button type="button" name={item.description} onClick={deleteItem}>X</button><button type="button" name={item.description} onClick={editItem}>Edit</button> </p>)}
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