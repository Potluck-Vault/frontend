import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';


const AddItems = (props) => {
    const { items, setItems, potluck, setPotluck } = props;
    const [newItem, setNewItem] = useState({id: uuidv4(), item: "", claimed: false, claimedBy: 0});

    const handleItemSubmit = (e) => {
        e.preventDefault();
        if (newItem.claimedBy) {
            setNewItem({...newItem, claimedBy: parseInt(newItem.claimedBy, 10), claimed: true})
        };
        // setNewItem({...newItem, claimedBy: parseInt(newItem.claimedBy, 10), claimed: true})
        setItems([...items, newItem]);
        updatePotluck(items);
        console.log("items just added to potluck: ", items);

        setNewItem({id: uuidv4(), item: "", claimed: false, claimedBy: 0});
    };

    const updatePotluck = (items) => {
        setPotluck({...potluck, items: [...items, newItem]});
    };

    const handleNewItemChange = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        })
        console.log("handleNewItemChange: ", newItem);

    };

    const deleteItem = (e) => {
        setItems(items.filter(item => item.id !== e.target.name));
    }
    const editItem = (updateItem) => {
        setNewItem({id: updateItem.id, item: updateItem.item, claimed: updateItem.claimed, claimedBy:updateItem.claimedBy});
        setItems(items.filter(item => item.id !== updateItem.id));
        console.log("editItem newItem: ", newItem);
    }
	const getItemGuest = (id) => {
		let itemGuest = potluck.guests.filter(guest => guest.id === id);
		return(itemGuest)
	}

    return (
    <div>
        <h4>Menu Items</h4>
            {items.map(item => {
                const getItemGuest = (id) => {
                    let itemGuest = potluck.guests.filter(guest => guest.id === id);
                    if (itemGuest.length>0) {
                        return(itemGuest[0]);
                    }else{
                        return {guest: "Nobody yet"};
                    };
                }

                return(
                <div key={item.id}>
                <p>{item.item} 
                 Who's bringing it?: {getItemGuest(item.claimedBy).guest}
                <button type="button" name={item.id} onClick={deleteItem}>X</button>
                <button type="button" name={item.id} onClick={()=>{editItem(item)}}>Edit</button>
                </p>
                </div>
            )})}
            {console.log("items after map list: ", items)}
        
        <h4>Add an Item</h4>
            <div>
                <label htmlFor="item">Description: </label>
                <input value={newItem.item} name="item" onChange={handleNewItemChange} type="text" />	
            </div>
            <div>
                <label htmlFor="claimedBy">Who's bringing it?: </label>
                <select value={parseInt(getItemGuest(newItem.claimedBy).id, 10)}name="claimedBy" onChange={handleNewItemChange}>
                    <option value="0">Nobody Yet</option>
                    {potluck.guests.map(guest =>
                        <option value={parseInt(guest.id, 10)} name="claimedBy">{guest.guest}</option>
                    )}
                    {console.log("newItem in select: ", newItem)}
                </select>
            </div>
            <div>
                <button onClick={handleItemSubmit}>Add to list...</button>
            </div>
    </div>
            )
}

export default AddItems;