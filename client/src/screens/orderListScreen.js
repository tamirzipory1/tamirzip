import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

function orderListScreen(props) {
    const orderList = useSelector((state) => state.orderList);
    const {loading, err, orders} = orderList;
    const orderDelete = useSelector((state) => state.orderDelete);
    const{
        loading: loadingDelete,
        err: errDelete,
        success: successDelete,
    } = orderDelete;
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch({type: ORDER_DELETE_RESET});
        dispatch(listOrders());
    }, [dispatch, successDelete]);

    function deleteHandler(order){
        if(window.confirm('Are you sure to delete this order?')){
            dispatch(deleteOrder(order._id));
        }
    }

    return (
        <div>
            <h1>Orders</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errDelete && <MessageBox variant="danger">{err}</MessageBox>}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : err ? (
                <MessageBox variant="danger">{err}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10): 'No'}</td>
                                <td>
                                    {order.isDelivered
                                    ? order.deliveredAt.substring(0, 10)
                                    :'No'}
                                </td>
                                <td>
                                    <button
                                    type="button"
                                    className="small"
                                    onClick={() => {
                                        props.history.push(`/order/${order._id}`);
                                    }}
                                    >
                                        Details
                                    </button>
                                    <button
                                    type="button"
                                    className="small"
                                    onClick={() => deleteHandler(order)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default orderListScreen;