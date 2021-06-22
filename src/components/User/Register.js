import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';


//Add a Register Form that asks for username, email nad password
const initialFormValue = {
    username:'',
    email:'',
    password:'',
    confirm:''
}

const Register = (props) => {

    const [formValue,setFormValue] = useState(initialFormValue)
    const [error,setError] = useState('')
    const { push } = useHistory()
    const handleOnChange = e => {
        setFormValue({...formValue,[e.target.name]:e.target.value})
    }
    const handleOnSubmit = e =>{
        e.preventDefault();
        //make sure the two passwords are the same.
        if(formValue.password !== formValue.confirm){
            setError('Passwords do not match!')
        }else{
            setError('')
            //Axios call here POST
            //Push
            push('/login')
        }
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleOnSubmit}>
                <label>Name
                    <input
                    type='text'
                    name='username'
                    value={formValue.username}
                    onChange={handleOnChange}
                    />
                </label>
                
                <label>Email
                    <input
                    type='text'
                    name='email'
                    value={formValue.email}
                    onChange={handleOnChange}
                    />
                </label>
                <label>Password
                    <input
                    type='text'
                    name='password'
                    value={formValue.password}
                    onChange={handleOnChange}
                    />
                </label>
                <label>Confirm Password
                    <input
                    type='text'
                    name='confirm'
                    value={formValue.confirm}
                    onChange={handleOnChange}
                    />
                </label>
                <button>Sign Up!</button>

            </form>
            <div>{error}</div>
        </div>
    )
}

export default Register
