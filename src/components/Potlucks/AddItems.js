import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';


const AddItems = (props) => {
    const { items, setItems, potluck, setPotluck } = props;
    const [newItem, setNewItem] = useState({id: uuidv4(), item: "", claimed: false, claimedBy: null});

    const handleItemSubmit = (e) => {
        e.preventDefault();
        setItems([...items, {id: newItem.id, item: newItem.item, claimed: false, claimedBy: newItem.claimedBy}]);
        updatePotluck(items);
        setNewItem({id: uuidv4(), item: "", claimed: false, claimedBy: null});
    };

    const updatePotluck = (items) => {
        setPotluck({...potluck, items: [...items, newItem]});
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
    const editItem = (updateItem) => {
        setNewItem({id: updateItem.id, item: updateItem.item, claimed: updateItem.claimed, claimedBy:updateItem.claimedBy});
        setItems(items.filter(item => item.id !== updateItem.id));
    }


    return (
    <div>
        <h4>Menu Items</h4>
            {items.map(item => <p>{item.item} <button type="button" name={item.id} onClick={deleteItem}>X</button><button type="button" name={item.id} onClick={()=>{editItem(item)}}>Edit</button> </p>)}
        <h4>Add an Item</h4>
            <div>
                <label htmlFor="item">Description: </label>
                <input value={newItem.item} onChange={handleNewItemChange} name="item" type="text" />	
            </div>
            <div>
                <button onClick={handleItemSubmit}>Add to list...</button>
            </div>
    </div>
    )
}

export default AddItems;