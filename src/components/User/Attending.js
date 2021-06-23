
import React from 'react';

const Attending = (props) =>{
    const {data,updateData} = props
const handleOnChange = e =>{
    const {type,value,checked} = e.target
    const valueToUse = (type === 'checkbox'? checked : value)
    updateData(e.target.name,valueToUse)
}
console.log(data)
    return (
        <div>
            <h3>{data.item}</h3>
            <form>
                <input type = 'checkbox' name='claimed' checked={data.claimed} onChange={handleOnChange}/>
            </form>
        </div>
    ) 
}
export default Attending;