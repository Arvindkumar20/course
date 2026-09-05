import React from "react";

const ProductCard = React.memo(({ product, onAddToCart }) => {
  console.log("Rendering:", product.name);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px",
        borderRadius: "10px",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        width="150"
      />

      <h3>{product.name}</h3>

      <p>₹{product.price}</p>

      <button onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
});

export default ProductCard;