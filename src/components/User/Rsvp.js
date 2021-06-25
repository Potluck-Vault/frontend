import axios from 'axios';
import React,{useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { v4 } from 'uuid';

const dummyData = {
                    title:'Potluck Chow Down',
                    date: '06-21-2012',
                    time: '21:00',
                    location: 'earth',
                    description:'This is stuff',
                    claimed: false,
                    guest: [{email: "joe@smith.com",
                            id: "0b1b308d-2452-4f5c-b494-0b01585fd677",
                            name: "joe smith",
                            rsvp: false},
                            {email: "jane@doe.com",
                            id: "925091ab-2aa4-40bd-a45e-9274ab20487b",
                            name: "Jane Doe",
                            rsvp: false}],
                    items: [{description:"Dish Number One",
                            claimed: true,
                            claimedBy: "",
                            id: "925091ab-2va4-40bd-a45e-9274ab20487b"},
                            {description:"Dish Number 2",
                            claimed: true,
                            claimedBy: "",
                            id:"925091ab-2aa4-40bd-a45e-9274ab21487b"},
                            {description:"Dish Number three",
                            claimed: false,
                            claimedBy: "",
                            id:"925091ab-2aa4-40bd-a45e-9274ab20488b"},
                            {description:"Dish Number 4th",
                            claimed: false,
                            claimedBy: "",
                            id:"925091ab-2aa4-40bd-a45e-8274ab20488b"}]
}
const initialFormValue = {
    name:'',
    email:'',
    rsvp:null,
    id: v4()
} 

const stringToBool= value =>{
    if (value && typeof value === "string") {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
   }
   return value;
    
}
const Rsvp = () =>{
    const [data,setData] = useState(dummyData)
    const [formValue,setFormValue] = useState(initialFormValue)
    const [isComing,setIsComing] = useState(false)
    const {push} = useHistory()
    const {id} = useParams()
    // const [tempItems, setTempItems] = useState([]);

    //Use Effect to get data from the DB

    const handleOnChange = (e) =>{
        if(e.target.type !== 'radio'){
            setFormValue({...formValue,[e.target.name]:e.target.value})
        }else{  
            setFormValue({...formValue,[e.target.name]:stringToBool(e.target.value)})
        }
    }
    const handleAttendChange = e =>{
        const { name, value, checked, type } = e.target
        const valueToUse = type === 'checkbox' ? checked : value
        setData({...data,[name]:valueToUse})
        console.log(name,valueToUse)
    }

    const handleItemChange = (updateItem) => {
        // Create newItem (copy of changed item) with checkbox = !checkbox
        const newItem = {id: updateItem.id, description: updateItem.description, claimed: !updateItem.claimed, claimedBy:updateItem.claimedBy};
        // Remove old item from tempItems
        let tempItems = data.items.filter(item => item.id !== updateItem.id);
        // Add newItem to tempItems
        tempItems.push(newItem);
        // replace data.items completely with tempItems
        setData({...data, items: tempItems});
    }

    const handleSubmit = e =>{
        e.preventDefault();
        // console.log(formValue)
        //axios call

        if(formValue.rsvp=== true){
            setIsComing(true)
        }
    }
    const onSubmit =(e) =>{ //Test
        e.preventDefault();
        axios.put(`https://potluckvaultv2.herokuapp.com/api/potlucks/${id}`, data)
		.then(res=> {console.log("Response from put: ", res);
		})
		.catch(err=> {
		  console.log(err);
		})
		push("/");
        
    } 

    return(
        <div>
           {isComing === false&&<div>
            <h2>Are you attending {data.title}?</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:
                        <input type='text' name='name' value={formValue.name} onChange={handleOnChange}/>
                        </label>   
                    <label>Email:
                        <input type='text' name='email' value={formValue.email} onChange={handleOnChange}/>
                        </label>   
                    <label>Attending:
                        <label>
                            Yes
                            <input type ='radio' name ='rsvp' value = 'true' checked = {formValue.rsvp === true} onChange={handleOnChange} />
                        </label>
                        <label>
                            No
                            <input type ='radio' name ='rsvp' value = 'false'  checked = {formValue.rsvp === false}  onChange={handleOnChange} />
                        </label>
                    </label> 
                    <button>Submit</button>              
                </form>
            </div>}
            {isComing&&<div>
                <div>
                    <h2>What can you bring to {formValue.name}</h2>    
                    <form onSubmit={onSubmit}>
                                {/* <div>
                                    <label>{data.items[0].description}
                                    <input  type='checkbox' name='claimed' checked={data.claimed} onChange={handleAttendChange} />
                                    </label>
                                </div> */}
                        {data.items.map((item,ind)=>{
                            return(
                                <div key ={item.id} >
                                    <label>{item.description}
                                    <input  type='checkbox' name={"claimed"} checked={item.claimed} onChange={()=>{handleItemChange(item)}} />
                                    </label>
                                </div>
                            )
                        })}
                        <button>Submit</button> 
                    </form>
                </div>
            </div>
         }
        </div>)
}

export default Rsvp;