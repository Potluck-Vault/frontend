import React,{useState} from 'react';

import Item from './Item'

const dummyData = {
    title:'PotLuck ChowDown',
    date: '06-21-2012',
    time: '21:00',
    location: 'earth',
    description:'This is stuff',
    items:[
        {item:"Dish Number One",
        claimed: false,
        claimedBy: ""},
        {item:"Dish Number 2",
        claimed: false,
        claimedBy: ""},
        {item:"Dish Number three",
        claimed: false,
        claimedBy: ""}]
}
const initialFormValue = {
    name:'',
    email:'',
    attending:false 
} 

const Rsvp = () =>{
    const [data,setData] = useState(dummyData)
    const [formValue,setFormValue] = useState(initialFormValue)
    //Use Effect to get data from the DB
    
    const handleOnChange = (e) =>{
       setFormValue({...formValue,[e.target.name]:e.target.value})
    }
    return(
        <div>
           <h2>Are you attending {data.title}?</h2>
            <form>
             <label>Name:
                 <input type='text' name='name' value={formValue.name} onChange={handleOnChange}/>
                 </label>   
             <label>Email:
                 <input type='text' name='email' value={formValue.email} onChange={handleOnChange}/>
                 </label>   
            <label>Attending:
                <label>
                    Yes
                    <input type ='radio' name ='attending' value = 'yes' checked = {formValue.attending === 'yes'} onChange={handleOnChange} />
                </label>
                <label>
                    No
                    <input type ='radio' name ='attending' value = 'no'  checked = {formValue.attending ==='no'}  onChange={handleOnChange} />
                </label>
            </label>
                            
            { 
            formValue.attending === 'yes' &&
                <div>
                    <h3>What are you bringing:</h3>
                    {
                        data.items.map(item =>{
                            return <Item data={item}/>
                        })
                    }
                </div>
            }

            </form> 
        </div>
    )
}
export default Rsvp;