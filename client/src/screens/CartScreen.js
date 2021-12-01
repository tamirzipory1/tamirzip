import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction';
import MessageBox from '../components/MessageBox';
import CheckoutSteps from '../components/CheckoutSteps';
import { Link } from 'react-router-dom';

function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;

    const dispatch = useDispatch();

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    },[dispatch, productId, qty]);

    function removeFromCartHandler(id){
        //delete action
        dispatch(removeFromCart(id));
    };

    function checkout(){
        props.history.push('/signin?redirect=shipping');
    }

    return (
        <div>
           
       <div className="row top">
           
           <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ?
        (
        <MessageBox>
            Cart is empty. <Link to="/">go back to Shopping</Link>
        </MessageBox>
        )
        :
        (
        <ul>
        {cartItems.map((item) =>(
                <li key = {item.product}>
                <div className="row">
                    <div>
                    <img 
                    src={item.image}
                    alt={item.name} 
                    className="small">  
                    </img>
                </div>  
                <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>     
                    <div>
                        <select 
                        value={item.qty}
                         onChange={(e) => 
                            dispatch
                            (addToCart(item.product),
                             Number(e.target.value
                                ))}>
                                     {[...Array(item.countInStock).keys()].map((x) =>(
                                     <option key={x+1} value={x + 1}>
                                       {x + 1}</option>
                                                  ))}
                                </select>
                        </div>     
                        <div>
                            ${item.price}
                         </div>  
                         <div>
                            <button type="button" 
                            onClick={() => removeFromCartHandler(item.product)} >Delete</button>
                         </div>

                            <div>
                               
                                </div>  


                        </div>
                        </li>
        ))
                }
                   </ul>
               )}
              
           </div>
       </div>
      <div className="col-1">
          <div className="card card-body">
              <ul>
                  <li>
                      <h2>
                      Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items):
                      ${cartItems.reduce((a,c) => a+c.price * c.qty, 0)}
                      </h2>
                  </li>
                  <li>
                      <button className="primary block" type="button" onClick={checkout} disabled={cartItems.length === 0}>
                          procced to checkout</button>
                  </li>
              </ul>

          </div>
      </div>
       </div>

    )      
}

export default CartScreen
