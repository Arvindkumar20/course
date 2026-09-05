import { useState, useMemo, useCallback } from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Nike Shoes",
    price: 3000,
    category: "Shoes",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg",
  },
  {
    id: 2,
    name: "Adidas Shoes",
    price: 4000,
    category: "Shoes",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/083/933/835/small/beautiful-and-inspiring-picture-detailing-a-bright-hot-air-balloon-over-river-pure-cozy-perfect-for-creatives-moods-stock-image-free-photo.jpeg",
  },
  {
    id: 3,
    name: "Leather Jacket",
    price: 5000,
    category: "Clothes",
    image:
      "https://png.pngtree.com/thumb_back/fh260/background/20240801/pngtree-new-cb-background-images-photos-pics-wallpaper-pictures-image_16123145.jpg",
  },
];

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // useMemo → expensive filtering
  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;
        return matchesSearch && matchesCategory;
    });

  }, [search,category]);

//   useCallback → stable function reference
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      return [...prevCart, product];
    });
  }, []);

//    const addToCart = (product) => {
//     setCart((prevCart) => {
//       return [...prevCart, product];
//     });
//   };
console.log(cart)
  return (
    <div style={{ padding: "20px" }}>
      <h1>My E-Commerce Store</h1>

      <h2>Cart: {cart.length}</h2>

      {/* Search */}

      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={handleSearch}
      />

      {/* Category */}

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Shoes">Shoes</option>
        <option value="Clothes">Clothes</option>
      </select>

      {/* Product List */}

      <div>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
