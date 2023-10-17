import React, { useState, useEffect } from 'react';
import './Category.css';

 export  const   Category = ({ setSelectedCategory }) => {
const [categories, setCategories] = useState([]);
const [showAllItems, setShowAllItems] = useState(false); 

useEffect(() => {
 fetch('http://localhost:1337/api/categories')
   .then((res) => res.json())
   .then((data) => {
       setCategories(data.data);
})
   .catch((error) => console.error('Error fetching data:', error));
}, []);
console.log("categories are : ", categories);

  const handleCategoryClick = (category) => {
 setSelectedCategory(category.attributes.title);
 setShowAllItems(false); 

  };


const handleShowAllItems = () => {
 setSelectedCategory(null); 
 setShowAllItems(true);
};

return (
 <div className="container mt-5">
   <div className="row">

   <div
       className={`col-md-4 cat ${showAllItems ? 'active' : ''}`}
       onClick={handleShowAllItems}
     >
       Show All Items
     </div>
     {categories.map((category, index) => (
       <div
         className="col-md-4 cat"
         key={index}
         onClick={() => handleCategoryClick(category)}
       >
         {category.attributes.title}
       </div>
     ))}
   </div>
 </div>
);
}