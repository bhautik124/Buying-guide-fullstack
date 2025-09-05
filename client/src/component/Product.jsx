import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaFilter } from "react-icons/fa";
import SpotlightCard from "./animation/Card";
import { dataContext } from "../context/Context";

const Product = () => {
  const { data: products, setData } = useContext(dataContext);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const navigate = useNavigate();

  const allCategories = [
    "Smartphones",
    "Televisions",
    "Laptops",
    "Headphones",
    "Smartwatches",
    "Speakers",
    "Cameras",
    "Footwear",
    "Backpacks",
    "Kitchen Appliances",
    "Furniture",
    "Fitness",
    "Home Decor",
    "Power Banks",
  ];

  const visibleCategories = {
    base: 3,
    sm: 4,
    md: 5,
    lg: 6,
  };

  const categories = ["trending_products", "lowest_price", "top_deals"];

  // Process data when products are available from context
  const processedProducts = products.products
    ? {
        ...products,
        products: products.products.map((product) => ({
          ...product,
          img: `/images/${product.name.replace(/\s+/g, "_")}.jpeg`,
        })),
      }
    : { products: [], categories: {} };

  const handleCategoryClick = (category) => {
    setFilteredCategory(category);
    setIsFilterModalOpen(false); // Close modal after selection
  };

  const handlePrevClick = () => {
    setCategoryIndex((prevIndex) =>
      prevIndex === 0
        ? allCategories.length - visibleCategories.lg
        : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCategoryIndex((prevIndex) =>
      prevIndex === allCategories.length - visibleCategories.lg
        ? 0
        : prevIndex + 1
    );
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 md:px-5">
      {/* CSS to Hide Scrollbar */}
      <style>
        {`
          .hide-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge */
          }
        `}
      </style>

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center py-5 gap-4 lg:gap-0">
        {/* Mobile & Tablet Layout: Home (Left), Filter Button (Right) */}
        <div className="flex lg:hidden w-full justify-between items-center">
          <Link
            to="/"
            className="border border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-black transition-all"
          >
            Home
          </Link>
          <button
            className="border border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-black transition-all"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <FaFilter />
          </button>
        </div>

        {/* Desktop Layout (lg and above): All Button (Left), Categories (Center), Home (Right) */}
        <div className="hidden lg:flex justify-between items-center w-full">
          <button
            className={`border border-white rounded-full px-4 py-2 transition-all text-center ${
              filteredCategory === "All"
                ? "bg-white !text-black"
                : "text-white hover:bg-white hover:text-black"
            }`}
            onClick={() => handleCategoryClick("All")}
          >
            All
          </button>

          <div className="flex items-center space-x-2">
            <FaArrowLeft
              className="cursor-pointer text-white hover:text-gray-400"
              onClick={handlePrevClick}
            />
            <div className="flex space-x-2 overflow-hidden max-w-[600px] relative hide-scrollbar">
              <div
                className="flex space-x-2 transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${categoryIndex * 120}px)`,
                }}
              >
                {allCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className={`border border-white rounded-full px-4 py-2 transition-all flex-shrink-0 text-base ${
                      filteredCategory === category
                        ? "bg-white text-black"
                        : "text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    {category.length > 12
                      ? `${category.substring(0, 10)}...`
                      : category}
                  </button>
                ))}
                {/* Add duplicate categories for infinite scroll effect */}
                {allCategories.map((category, index) => (
                  <button
                    key={`duplicate-${index}`}
                    onClick={() => handleCategoryClick(category)}
                    className={`border border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-black transition-all flex-shrink-0 text-base ${
                      filteredCategory === category ? "bg-white text-black" : ""
                    }`}
                  >
                    {category.length > 12
                      ? `${category.substring(0, 10)}...`
                      : category}
                  </button>
                ))}
              </div>
            </div>
            <FaArrowRight
              className="cursor-pointer text-white hover:text-gray-400"
              onClick={handleNextClick}
            />
          </div>

          <Link
            to="/"
            className="border border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-black transition-all"
          >
            Home
          </Link>
        </div>
      </div>

      {/* Filter Modal for Mobile & Tablet */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 lg:hidden">
          <div className="bg-zinc-900 p-6 rounded-lg w-11/12 max-h-[80vh] overflow-y-auto hide-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                Filter by Category
              </h2>
              <button
                className="text-white text-xl"
                onClick={() => setIsFilterModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                className={`border border-white rounded-full px-4 py-2 transition-all ${
                  filteredCategory === "All"
                    ? "bg-white !text-black"
                    : "text-white hover:bg-white hover:text-black"
                }`}
                onClick={() => handleCategoryClick("All")}
              >
                All
              </button>
              {allCategories.map((category, index) => (
                <button
                  key={index}
                  className={`border border-white rounded-full px-4 py-2 transition-all ${
                    filteredCategory === category
                      ? "bg-white !text-black"
                      : "text-white hover:bg-white hover:text-black"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      {filteredCategory === "All" ? (
        <>
          {/* Existing sections: trending_products, lowest_price, top_deals */}
          {categories.map((category) => (
            <div key={category} className="py-5 md:p-10">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 text-white capitalize">
                {category.replace("_", " ")}
              </h2>
              <div className="flex overflow-x-auto space-x-4 md:space-x-5 pb-5 hide-scrollbar">
                {processedProducts.categories &&
                  processedProducts.categories[category]?.map((productId) => {
                    const product = processedProducts.products.find(
                      (p) => p.id === productId
                    );
                    return (
                      <div
                        key={product.id}
                        className="min-w-[250px] md:min-w-[300px]"
                      >
                        <SpotlightCard
                          className="custom-spotlight-card h-full"
                          spotlightColor="rgba(255, 255, 255, 0.25)"
                        >
                          <div className="p-4 md:p-5">
                            <img
                              src={product.img}
                              alt={product.name}
                              className="w-full h-[120px] md:h-[150px] object-contain rounded-lg"
                            />
                            <h3 className="text-lg md:text-xl font-bold mt-3 text-center text-white">
                              {product.name}
                            </h3>
                            <p className="text-gray-300 text-center text-sm md:text-base">
                              Price: ₹{product.price}
                            </p>
                            <p className="text-gray-400 text-center text-xs md:text-sm mt-1 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="mt-3 flex justify-center">
                              <Link
                                to={`/product/${product.id}`}
                                className="border border-white text-white rounded-full px-3 py-1 md:px-4 md:py-2 hover:bg-white hover:text-black transition-all text-sm md:text-base"
                              >
                                BUY NOW
                              </Link>
                            </div>
                          </div>
                        </SpotlightCard>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}

          {/* New section: All Products */}
          <div className="py-5 md:p-10">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 text-white capitalize">
              All Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10">
              {processedProducts.products?.map((product) => (
                <SpotlightCard
                  key={product.id}
                  className="custom-spotlight-card h-full"
                  spotlightColor="rgba(255, 255, 255, 0.25)"
                >
                  <div className="p-4 md:p-5">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-[150px] md:h-[200px] object-contain rounded-lg"
                    />
                    <h3 className="text-lg md:text-xl font-bold mt-3 text-center text-white">
                      {product.name}
                    </h3>
                    <p className="text-gray-300 text-center text-sm md:text-base">
                      Price: ₹{product.price}
                    </p>
                    <p className="text-gray-400 text-center text-xs md:text-sm mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-3 flex justify-center">
                      <Link
                        to={`/product/${product.id}`}
                        className="border border-white text-white rounded-full px-3 py-1 md:px-4 md:py-2 hover:bg-white hover:text-black transition-all text-sm md:text-base"
                      >
                        BUY NOW
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="py-5 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10">
          {processedProducts.products
            ?.filter((p) => p.category === filteredCategory)
            .map((product) => (
              <SpotlightCard
                key={product.id}
                className="custom-spotlight-card h-full"
                spotlightColor="rgba(255, 255, 255, 0.25)"
              >
                <div className="p-4 md:p-5">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-[150px] md:h-[200px] object-contain rounded-lg"
                  />
                  <h3 className="text-lg md:text-xl font-bold mt-3 text-center text-white">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 text-center text-sm md:text-base">
                    Price: ₹{product.price}
                  </p>
                  <p className="text-gray-400 text-center text-xs md:text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-3 flex justify-center">
                    <Link
                      to={`/product/${product.id}`}
                      className="border border-white text-white rounded-full px-3 py-1 md:px-4 md:py-2 hover:bg-white hover:text-black transition-all text-sm md:text-base"
                    >
                      BUY NOW
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            ))}
        </div>
      )}
    </div>
  );
};

export default Product;
