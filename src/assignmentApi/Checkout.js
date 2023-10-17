import { useLocation } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const { cartItems, itemQuantities, totalValue } = location.state || {};

  if (!cartItems || !itemQuantities || totalValue === undefined) {
    return (
      <div>
        <h1>Checkout</h1>
        <p>No items in the cart.</p>
      </div>
    );
  }
  console.log('cartItems dikhao:', cartItems);
  console.log('itemQuantities:', itemQuantities);
  console.log('totalValue:', totalValue);
  
  return (
    <div>
      <h1>Checkout</h1>
      <h2>Order Summary</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <p>{item.title}</p>
            <p>Quantity: {itemQuantities[item.id]}</p>
            <p>Price: RS {item.price}</p>
            <p>Total: RS {itemQuantities[item.id] * item.price}</p>
          </li>
        ))}
      </ul>
      <p>Total Value: RS {totalValue}</p>
    </div>
  );
}

export default Checkout;
