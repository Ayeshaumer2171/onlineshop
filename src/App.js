import React, { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './assignmentApi/Header';
import Product from './assignmentApi/Product';
import { Category } from './assignmentApi/Category';
import ProductDetails from './assignmentApi/ProductDetails';
import CartOffCanvas from './assignmentApi/CartOffCanvas';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './assignmentApi/Checkout';
function App() {

  const [cartCounter,setCartCounter]=useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log("selectedCategory: ", selectedCategory);

  const addToCart = (product) => {
    const newItem = {
      id: product.id,
      image: `http://localhost:1337${product.attributes.image.data[0].attributes.url}`,
      price: product.attributes.price,
      title: product.attributes.title,
    };
  
    const existingItemIndex = cartItems.findIndex((item) => item.id === newItem.id);
  
    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      newItem.quantity = 1;
      setCartItems([...cartItems, newItem]);
    }
  
    setCartCounter(cartCounter + 1); 
  
    toast.success('Item added to cart');
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    setCartCounter(cartCounter - 1); 

  };


  return (
    <Router>
      <Header cartCounter={cartCounter}/>
      <CartOffCanvas cartItems={cartItems} removeItem={removeItem} />
      <Routes>
        <Route
          path="/"
          element={<>
          <Category setSelectedCategory={setSelectedCategory} />
          <Product selectedCategory={selectedCategory} />
          </>}
        />
        <Route
          path="/products/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />
        {/* <Route
          path="/checkout"
          element={<Checkout cartItems={cartItems}/>}
        /> */}


      </Routes>
      <ToastContainer position="bottom-right" />
    </Router>
  );
}


export default App;
//is project ka 1 checkout page bnay jis k 1 side pr form hoga and dusri side pr wo items jo add to cart mn add hyn unki quanity price ay or sath total price ay tax k sath