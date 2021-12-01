import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SigninScreen(props) {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] =  useState('');

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo, loading, err} = userSignin;

    const dispatch = useDispatch();

    function submitHandler(e){
        e.preventDefault();
        dispatch(signin(email, password));
    };

     useEffect(() =>{
         if(userInfo){
             props.history.push(redirect);
         }
     }, [props.history, redirect, userInfo]);

    return (
        <div>
            <CheckoutSteps step1></CheckoutSteps>
          <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign in</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {err && <MessageBox variant="danger">{err}</MessageBox>}
            <div>
                <label htmlFor="email">Email address</label>
                <input 
                type="email"
                 id="email"
                 placeholder="Enter email" 
                 required
                 onChange={(e) => setEmail(e.target.value)}>
                 </input>
            </div>
            
            <div>
                <label htmlFor="password">Password </label>
                <input 
                type="password"
                 id="password"
                 placeholder="Enter password" 
                 required
                 onChange={(e) => setPassword(e.target.value)}>
                 </input>
            </div>

            <div>
                <label />
                <button className="primary" type="submit">
                    Sign in
                    </button>
            </div>
            <div>
                <label />
            </div>
            <div>
                New customer? {' '}
                <Link to={`/register?redirect=${redirect}`}> Create Account </Link>
            </div>
            </form>
        </div>
    )
}

export default SigninScreen;
