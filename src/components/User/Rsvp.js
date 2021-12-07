
import React,{useEffect, useState} from 'react';
import { useHistory,useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import axios from 'axios';

const dummyData = {
                    name:'Potluck Chow Down',
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
                            id:"925091ab-2aa4-40bd-a45e-8274ab20488b"},
                            {description:"A Dish Number ",
                            claimed: false,
                            claimedBy: "",
                            id:"925091ab-2aa5-40bd-a45e-8274ab20488b"}]
}


const initialFormValue = {
    guest:'',
    contact:'',
    rsvp:null,
    id:null
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
    const {push} = useHistory();
    const { id } = useParams()
    // const [tempItems, setTempItems] = useState([]);

    //Use Effect to get data from the DB
        useEffect(()=>{
            axios.get(`https://potluckvaultv2.herokuapp.com/api/potlucks/${id}`)
            .then(res=>{
                setData(res.data)
                console.log("Axios call",res.data)
            })

            data.items.sort((a,b)=>(a.item > b.item)?1:-1)
        },[])




    useEffect(()=>{
        data.items.sort((a,b)=>(a.item > b.item)?1:-1)
    },[data.items])
    
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
        const newItem = {id: updateItem.id, item: updateItem.item, claimed: !updateItem.claimed, claimedBy: !updateItem.claimed ? findByEmail(formValue.contact).id:""};
        
        // Remove old item from tempItems
        let tempItems = data.items.filter(item => item.id !== updateItem.id);
        // Add newItem to tempItems
        tempItems.push(newItem);
        // replace data.items completely with tempItems
        //Sorting new itemList
        tempItems.sort((a,b)=>(a.item > b.item)?1:-1)
        console.log(tempItems)
        setData({...data, items: tempItems});
    }

    const handleSubmit = e =>{
        e.preventDefault();
        // console.log(formValue)
        //axios call

        console.log(findByEmail(formValue.contact))



        if(formValue.rsvp=== true){
            setIsComing(true)
            setData({...data,})
        }
    }
    const onSubmit =(e) =>{ //Test
        e.preventDefault();
        console.log(data)
        axios.put(`https://potluckvaultv2.herokuapp.com/api/potlucks/${id}`, data)
		.then(res=> {console.log("Response from put: ", data);
		})
		.catch(err=> {
		  console.log(err);
		})
		push("/");
        
    } 
    //Helper function
    const findByEmail= (email) =>{
         const currentGuest = data.guests.filter(guest => email.toLowerCase().trim() === guest.contact)
         if(currentGuest.length>0){
             return currentGuest[0];

         }else{
             //Set Error here
             alert('Email is not here! are you sure you are invited!!')
         }
         
    }

    return(
        <div>
           {isComing === false&&<div>
            <h2>Are you attending {data.name}?</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:
                        <input type='text' name='guest' value={formValue.guest} onChange={handleOnChange}/>
                        </label>   
                    <label>Email:
                        <input type='text' name='contact' value={formValue.contact} onChange={handleOnChange}/>
                        </label>   
                    <label>Attending:
                        <label>
                            <input type ='radio' name ='rsvp' value = 'true' checked = {formValue.rsvp === true} onChange={handleOnChange} />
                             -Yes
                        </label>
                        <label>
                            <input type ='radio' name ='rsvp' value = 'false'  checked = {formValue.rsvp === false}  onChange={handleOnChange} />
                            -No
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
                                    <label>{item.item}
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