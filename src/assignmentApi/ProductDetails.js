import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

   const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {

    console.log('Fetching product details for ID:', id);

    axios.get(`http://localhost:1337/api/products/${id}?populate=*`)
      .then((res) => setProduct(res.data.data))
      .catch((error) => console.error('Error fetching data:', error));
 
    }, [id]);

//create 
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:1337/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: newProduct }),
      });
  
      if (response.ok) {
        const createdProduct = await response.json();
        console.log('Product created:', createdProduct);
      } else {
        const errorMessage = await response.text();
        console.error('Failed to create the product:', errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


//delete
const handleDeleteProduct = async () => {
  try {
    const response = await axios.delete(`http://localhost:1337/api/products/${id}`);
    if (response.status === 200) {
      console.log('Product deleted successfully.');
      setProduct(null);
    } else {
      console.error('Failed to delete the product.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

//update
  const [ProductNew, setProductNew] = useState({
  title: '',
  description: '',
  price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductNew({ ...ProductNew, [name]: value });
  };

  const handleSubmitting = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:1337/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: ProductNew }),
      });

      if (response.ok) {
         const updatedProduct = await response.json();
        setProduct(updatedProduct.data);
        console.log('Product updated:', updatedProduct);
      } else {
        const errorMessage = await response.text();
        console.error('Failed to update the product:', errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="container mt-5">
      {product ? (
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              {product.attributes.image && product.attributes.image.data && product.attributes.image.data.length > 0 ? (
                <img
                  src={`http://localhost:1337${product.attributes.image.data[0].attributes.url}`}
                  alt={product.attributes.title}
                  className="card-img-top cards"
                />
              ) : (
                <div className="placeholder-image">No Image Available</div>
              )}

            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{product.attributes.title}</h5>
                <p className="card-text">Description: {product.attributes.description}</p>
                <p className="card-text cardPrice" style={{ fontSize: '25px', fontWeight: '700' }}>Price: $ {product.attributes.price}</p>

                <button className="btn btn-primary mt-3" onClick={() =>addToCart(product)}>
                  Add to cart
                </button>
              </div>
            </div>                                    
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button className="btn btn-danger mt-3" onClick={handleDeleteProduct}>
  Delete Product
</button>
<br></br>
<div className='container2'>
      <div>
      <h1>Create a New Product</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={newProduct.title} onChange={handleInputChange} required/>
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={newProduct.description} onChange={handleInputChange} required/>
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} required/>
        </div>
        <button type="submit" >Create Product</button>
      </form>
    </div>

{/* Update Form */}
 <div>
        <h1>Edit Product</h1>
        <form onSubmit={handleSubmitting} className="update-form">
          <div>
            <label>Title:</label>
            <input type="text" name="title" value={ProductNew.title} onChange={handleChange} required/>
          </div>
          <div>
            <label>Description:</label>
            <textarea name="description" value={ProductNew.description} onChange={handleChange} required />
          </div>
          <div>
            <label>Price:</label>
            <input type="number" name="price" value={ProductNew.price} onChange={handleChange} required />
          </div>
          <button type="submit">Update Product</button>
        </form>
      </div>

    </div>
    </div>
    
  );
};

export default ProductDetails;
