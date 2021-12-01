import React from 'react';
import { Route, BrowserRouter, Link} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import orderHistoryScreen from './screens/orderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import Trivia from './screens/Trivia';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import orderListScreen from './screens/orderListScreen';
import maccabi from './images/maccabi.png';

function App() {

  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  
  function signoutHandler(){
    dispatch(signout());
  };

  return (
  <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
    <Link className="brand" to ="/">Maccabi TLV</Link>
    <Link className="brand" to ="/"><img src={maccabi} height="30px" width="30px"></img></Link>
    
</div>
<div>
  <Link to="/cart">Cart
  {cartItems.length > 0 && (
    <span className="badge"> {cartItems.length} </span>
  )}
  </Link>

      

  { userInfo? (
     <div className="dropdown">
     <Link to="#">{userInfo.name} 
     <i className="fa fa-caret-down"></i>
     </Link>
     <ul className="dropdown-content">
       <li>
         <Link to="/profile">User Profile</Link>
       </li>
       <li>
         <Link to="/orderhistory">Order History</Link>
       </li>
       
       <li>
         <Link to="/game">game</Link>
         </li>

       <Link to="#signout" onClick={signoutHandler}>
         Sign out
       </Link>
     </ul>
     </div>

   ):(
     <Link to="/signin">Sign in</Link>
   )}

    {userInfo && userInfo.isAdmin && (
      <div className="dropdown">
        <Link to="#admin">
          Admin <i className="fa fa-caret-down"></i>
        </Link>
        <ul className="dropdown-content">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/Productlist">Products</Link>
          </li>
          <li>
            <Link to="/orderlist">Orders</Link>
          </li>
          <li>
            <Link to="/userlist">Users</Link>
          </li>

        </ul>
      </div>
    )}

</div>

</header>
<main>
  <Route path="/game" component={Trivia}></Route>
  <Route path="/cart/:id?" component={CartScreen}></Route>
  <Route path="/product/:id" component={ProductScreen} exact></Route>
  <Route 
  path="/product/:id/edit"
  component={ProductEditScreen}
  exact
  ></Route>
  <Route path="/signin" component={SigninScreen}></Route>
  <Route path="/register" component={RegisterScreen}></Route>
  <Route path="/shipping" component={ShippingAddressScreen}></Route>
  <Route path="/payment" component={PaymentMethodScreen}></Route>
  <Route path="/placeorder" component={PlaceOrderScreen}></Route>
  <Route path="/order/:id" component={OrderScreen}></Route>
  <Route path="/orderhistory" component={orderHistoryScreen}></Route>
  <PrivateRoute 
  path="/profile" 
  component={ProfileScreen}
  ></PrivateRoute>
  <AdminRoute
  path="/productlist"
  component={ProductListScreen}>
  </AdminRoute>
  <AdminRoute
  path="/orderlist"
  component={orderListScreen}>
    </AdminRoute>
  <Route path="/" component={HomeScreen} exact ></Route>
</main>
<footer className="row center">
  all right reserved
</footer>

</div>
</BrowserRouter>

  )
}

export default App;
