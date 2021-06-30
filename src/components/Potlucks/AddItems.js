import React, {useState} from 'react';
// import {v4 as uuidv4} from 'uuid';


const AddItems = (props) => {
    const { items, setItems, potluck, setPotluck } = props;
    const [newItem, setNewItem] = useState({id: 0, item: "", claimed: false, claimedBy: 0});

    const handleItemSubmit = (e) => {
        e.preventDefault();
        setItems([...items, newItem]);
        updatePotluck(items);

        setNewItem({id: 0, item: "", claimed: false, claimedBy: 0});
    };

    const updatePotluck = (items) => { //adds a newItem object to an items array in potluck object
        setPotluck({...potluck, items: [...items, newItem]});
    };

    const handleNewItemChange = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]: ((e.target.name === "claimedBy") ? parseInt(e.target.value, 10) : e.target.value)
        })
        console.log("handleNewItemChange: ", newItem);

    };
    // Trying to figure out how to update a react state item (object in an array) in jsx
    // This function is called from the onChange of a JSX select input where updateItem is one item in a .map of items array
    const updateClaimedByFromJsx = (e) => { 
        const objIndex = items.findIndex((item => item.id === e.target.name));
        setItems([...items, items[objIndex].claimedBy = e.target.name])//without the event object, how do you know what has changed?
    }
    
    const deleteItem = (e) => {
        console.log("deleteItem e.target.name: ", e.target.name)
        console.log("deleteItem items: ", items)
 
        setItems(items.filter(item => item.id !== e.target.name));
        console.log("deleteItem after setItems - items: ", items)

    }
    const editItem = (updateItem) => {
        setNewItem({...updateItem});
        setItems(items.filter(item => item.id !== updateItem.id));
    }
	// const getItemGuest = (id) => {
	// 	let itemGuest = potluck.guests.filter(guest => guest.id == id);
	// 	return(itemGuest)
	// }
    const getItemGuest = (id) => {
        let itemGuest = potluck.guests.filter(guest => guest.id === id);
        if (itemGuest.length>0) {
            return(itemGuest[0]);
        }else{
            return {guest: 0};
        };
    }
    return (
    <div>
        <h4>Menu Items</h4>
            {items.map(item => {


                return(
                <div key={item.id}>
                <p>{item.item} 
                 Who's bringing it?: {getItemGuest(item.claimedBy).guest}
                <button type="button" name={item.id} onClick={deleteItem}>X</button>
                <button type="button" name={item.item} onClick={()=>{editItem(item)}}>Edit</button>
                </p>
                </div>
            )})}
        
        <h4>Add an Item</h4>
            <div>
                <label htmlFor="item">Description: </label>
                <input name="item" onChange={handleNewItemChange} type="text" value={newItem.item} />	
            </div>
            <div>
                <label htmlFor="claimedBy">Who's bringing it?: </label>
                <select value={newItem.claimedBy} name="claimedBy" onChange={handleNewItemChange} type="number">
                    <option value={0} name="claimedBy">Nobody Yet</option>
                    {/* <option value={parseInt(newItem.claimedBy, 10)} name="claimedBy"></option> */}
                    {potluck.guests.map(guest =>
                        <option key={parseInt(guest.id, 10)} value={parseInt(guest.id, 10)} name="claimedBy">{guest.guest}</option>
                    )}
                </select>
            </div>
            <div>
                <button onClick={handleItemSubmit}>Add to list...</button>
            </div>
    </div>
            )
}

export default AddItems;