// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const CompareModal = ({ productId, products, isOpen, onClose }) => {
//   const [selectedProductId, setSelectedProductId] = useState("");

//   // Find the current product
//   const currentProduct = products.find((p) => p.id === parseInt(productId));

//   // Find the selected product for comparison
//   const selectedProduct = products.find(
//     (p) => p.id === parseInt(selectedProductId)
//   );

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-10">
//       <div className="bg-[#101110] rounded-lg p-8 w-full max-w-4xl relative">
//         {/* Top Row */}
//         <div className="flex justify-between items-center mb-6">
//           {/* Left: "Compare Products" Text */}
//           <h3 className="text-2xl font-bold">Compare Products</h3>

//           {/* Center: Dropdown */}
//           <select
//             className="bg-[#202020] px-4 py-2 rounded-lg text-white"
//             value={selectedProductId}
//             onChange={(e) => setSelectedProductId(e.target.value)}
//           >
//             <option value="">Select a product to compare</option>
//             {products
//               .filter((p) => p.id !== parseInt(productId)) // Exclude the current product
//               .map((product) => (
//                 <option key={product.id} value={product.id}>
//                   {product.name}
//                 </option>
//               ))}
//           </select>

//           {/* Right: Cross Button */}
//           <button className="text-white text-2xl" onClick={onClose}>
//             &times;
//           </button>
//         </div>

//         {/* Product Comparison Boxes */}
//         <div className="flex space-x-8">
//           {/* Current Product */}
//           <div className="w-1/2 border border-white rounded-lg p-4">
//             <h4 className="text-xl font-bold mb-4">{currentProduct.name}</h4>
//             <img
//               src={currentProduct.img}
//               alt={currentProduct.name}
//               className="w-full h-48 object-contain rounded-lg"
//             />
//             <p className="mt-4">Price: ₹{currentProduct.price}</p>
//             <p>Brand: {currentProduct.brand}</p>
//             <p>Description: {currentProduct.description}</p>
//           </div>

//           {/* Selected Product */}
//           {selectedProduct && (
//             <div className="w-1/2 border border-white rounded-lg p-4">
//               <h4 className="text-xl font-bold mb-4">{selectedProduct.name}</h4>
//               <img
//                 src={selectedProduct.img}
//                 alt={selectedProduct.name}
//                 className="w-full h-48 object-contain rounded-lg"
//               />
//               <p className="mt-4">Price: ₹{selectedProduct.price}</p>
//               <p>Brand: {selectedProduct.brand}</p>
//               <p>Description: {selectedProduct.description}</p>
//               <Link
//                 to={`/product/${selectedProduct.id}`}
//                 className="mt-4 inline-block bg-[#202020] px-4 py-2 rounded-lg text-white hover:bg-[#303030]"
//                 onClick={onClose} // Close modal on click
//               >
//                 Know More
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompareModal;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const CompareModal = ({ productId, products, isOpen, onClose }) => {
  const [selectedProductId, setSelectedProductId] = useState("");

  // Find the current product
  const currentProduct = products.find((p) => p.id === parseInt(productId));

  // Find the selected product for comparison
  const selectedProduct = products.find(
    (p) => p.id === parseInt(selectedProductId)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 md:p-10 z-50">
      <div className="bg-[#101110] rounded-lg p-4 md:p-6 lg:p-8 w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 gap-4 md:gap-0">
          {/* "Compare Products" Text */}
          <h3 className="text-xl md:text-2xl font-bold">Compare Products</h3>

          {/* Dropdown */}
          <select
            className="bg-[#202020] px-3 py-2 md:px-4 md:py-2 rounded-lg text-white w-full md:w-auto"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            <option value="">Select a product to compare</option>
            {products
              .filter((p) => p.id !== parseInt(productId)) // Exclude the current product
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
          </select>

          {/* Cross Button */}
          <button
            className="text-white text-xl md:text-2xl absolute top-2 right-2 md:static"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Product Comparison Boxes */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 lg:space-x-8">
          {/* Current Product */}
          <div className="w-full md:w-1/2 border border-white rounded-lg p-3 md:p-4">
            <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              {currentProduct.name}
            </h4>
            <img
              src={currentProduct.img}
              alt={currentProduct.name}
              className="w-full h-32 md:h-48 object-contain rounded-lg"
            />
            <p className="mt-3 md:mt-4 text-sm md:text-base">
              Price: ₹{currentProduct.price}
            </p>
            <p className="text-sm md:text-base">
              Brand: {currentProduct.brand}
            </p>
            <p className="text-sm md:text-base mt-2">
              Description: {currentProduct.description}
            </p>
          </div>

          {/* Selected Product */}
          {selectedProduct && (
            <div className="w-full md:w-1/2 border border-white rounded-lg p-3 md:p-4">
              <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                {selectedProduct.name}
              </h4>
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="w-full h-32 md:h-48 object-contain rounded-lg"
              />
              <p className="mt-3 md:mt-4 text-sm md:text-base">
                Price: ₹{selectedProduct.price}
              </p>
              <p className="text-sm md:text-base">
                Brand: {selectedProduct.brand}
              </p>
              <p className="text-sm md:text-base mt-2">
                Description: {selectedProduct.description}
              </p>
              <Link
                to={`/product/${selectedProduct.id}`}
                className="mt-3 md:mt-4 inline-block bg-[#202020] px-3 py-2 md:px-4 md:py-2 rounded-lg text-white hover:bg-[#303030] text-sm md:text-base"
                onClick={onClose} // Close modal on click
              >
                Know More
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
