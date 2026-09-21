import React, { useState } from "react";
// Problem 2: Inventory Statistics (reduce)
// Scenario: Your warehouse manager needs a
//  quick summary tool. Given an array of inventory
//  items, you need to calculate the total cash value
//  of all items in stock and find out how many items
//  are category 'Electronics'.
// The Data:javascript

const inventory = [
  { id: 1, name: "Phone", category: "Electronics", price: 600, stock: 4 },
  { id: 2, name: "Book", category: "Media", price: 15, stock: 10 },
  { id: 3, name: "Tablet", category: "Electronics", price: 300, stock: 2 },
  { id: 4, name: "Shirt", category: "Apparel", price: 25, stock: 8 },
  { id: 4, name: "st", category: "Apparel", price: 25, stock: 8 },
];

// const categories=[];
// inventory.filter((product)=>{
//    categories.push(product.category);
// });

// const noDublicate=new Set([...categories]);
// console.log(noDublicate);

// const newProducts=inventory.filter((product)=>noDublicate.has(product.category));

// console.log(newProducts)

export default function Cart() {
  const [total, setTotal] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(inventory);
  //   const [categoryTotal, setCategoryTotal] = useState(0);

  // const allCategories=inventory.filter(product=>product.category==)
  const handleChangeCategory = (e) => {
    const category = e.target.value;
    const newProducts = inventory.filter(
      (product) =>
        product.category.toLocaleLowerCase() === category.toLocaleLowerCase(),
    );

    const catTotal = newProducts.reduce((acc, item) => {
      return acc + item.price * item.stock;
    }, 0);

    //     const catTotal = inventory.reduce((acc, item) => {
    //       if (item.category === category) {
    //         return acc + item.price * item.stock;
    //       }

    //       return acc;
    //     }, 0);
    //  console.log(catTotal);

    setTotal(catTotal);
    setFilteredProducts(
      inventory.filter(
        (product) =>
          product.category.toLocaleLowerCase() == category.toLocaleLowerCase(),
      ),
    );
  };

  const handleTotal = () => {
    const intTotal = inventory.reduce((acc, item) => {
      return acc + item.price * item.stock;
    }, 0);

    setTotal(intTotal);
  };

  return (
    <div>
      <div>
        <button
          onClick={handleTotal}
          className="py-2 px-5 bg-green-500 text-white"
        >
          Total
        </button>
        <select
          name="filter"
          id="filter"
          onChange={handleChangeCategory}
          className="py-2 px-5 bg-blue-500 text-white"
        >
          <option value="electronics">Electric</option>
          <option value="media">Media</option>
          <option value="apparel">Apparel</option>
        </select>

        <div className="flex items-center justify-between">
          {filteredProducts.map((product) => {
            return (
              <button
                className="py-2 px-5 bg-blue-500 text-white"
                key={product.id}
                onClick={() => handleChangeCategory(product.category)}
              >
                {product.category}
              </button>
            );
          })}
        </div>
      </div>

      <p>Total : {total}</p>
      {/* <p>Selected Category Total : {categoryTotal}</p> */}

      <ul className="container mx-auto flex items-center justify-between gap-5 py-5">
        {inventory?.map((product) => {
          return (
            <li key={product.id} className="grid border py-3 px-10">
              <span>Name : {product.name}</span>
              <span>Category : {product.category}</span>
              <span>Price : {product.price}</span>
              <span>Qty : {product.stock}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
