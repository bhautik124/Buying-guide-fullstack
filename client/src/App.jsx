import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Product from "./component/Product";
import ProductDetails from "./component/ProductDetails";
import { dataContext } from "./context/Context";

const App = () => {
  const { data: productsData, setdata } = useContext(dataContext); // Use context for data
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Process products from context
    if (productsData.products) {
      const updatedProducts = productsData.products.map((product) => ({
        ...product,
        img: `/images/${product.name.replace(/\s+/g, "_")}.jpeg`,
      }));
      setProducts(updatedProducts);
    }
  }, [productsData]);

  return (
    <div className="w-full min-h-screen bg-black">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route
          path="/product/:productId"
          element={<ProductDetails products={products} />}
        />
      </Routes>
    </div>
  );
};

export default App;
