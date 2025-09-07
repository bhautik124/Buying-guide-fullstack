// import React, { useContext, useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import AIHelpModal from "./AIHelpModal";
// import ReviewModal from "./ReviewModal";
// import ShouldIBuyModal from "./ShouldIBuyModal";
// import CompareModal from "./CompareModal";
// import { dataContext } from "../context/Context";

// const ProductDetails = () => {
//   const { productId } = useParams();
//   const { data: productsData } = useContext(dataContext); // Use context for data
//   const [product, setProduct] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [isAIOpen, setIsAIOpen] = useState(false);
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//   const [isShouldIBuyOpen, setIsShouldIBuyOpen] = useState(false);
//   const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     // Process products from context
//     if (productsData.products) {
//       const updatedProducts = productsData.products.map((product) => ({
//         ...product,
//         img: `/images/${product.name.replace(/\s+/g, "_")}.jpeg`,
//       }));

//       setProducts(updatedProducts);
//       const foundProduct = updatedProducts.find(
//         (p) => p.id === parseInt(productId)
//       );
//       setProduct(foundProduct);
//     }
//   }, [productsData, productId]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(
//           `http://https://buying-guide-fullstack-backend.onrender.com/api/reviews/${productId}`
//         );
//         setReviews(response.data);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };

//     fetchReviews();
//   }, [productId]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   if (!product) {
//     return (
//       <div className="text-white text-center mt-16 text-3xl">
//         Loading product...
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-black text-white p-10 flex flex-col items-center">
//       {/* Back Button */}
//       <div className="w-full flex justify-end mb-5">
//         <Link
//           to="/product"
//           className="border border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-black transition-all"
//         >
//           Back
//         </Link>
//       </div>

//       {/* Product Details */}
//       <div className="max-w-6xl mx-auto flex space-x-16 items-center">
//         {/* Product Image */}
//         <div className="w-1/2 bg-[#101110] h-[640px] flex items-center justify-center rounded-lg text-2xl">
//           <img
//             src={product.img}
//             alt={product.name}
//             className="w-full h-full object-contain rounded-lg"
//           />
//         </div>

//         {/* Product Information */}
//         <div className="w-1/2 space-y-8 text-center">
//           <p className="w-full bg-[#101110] p-8 rounded-lg text-2xl">
//             {product.name}
//           </p>
//           <p className="w-full bg-[#101110] p-8 rounded-lg text-2xl">
//             Price: ₹{product.price}
//           </p>
//           <p className="w-full bg-[#101110] p-8 rounded-lg text-2xl">
//             Brand: {product.brand}
//           </p>
//           <p className="w-full bg-[#101110] p-8 rounded-lg text-2xl">
//             {product.description}
//           </p>
//           <div className="flex justify-center space-x-6">
//             <button
//               className="bg-[#101110] px-5 border border-white py-4 rounded-lg text-xl"
//               onClick={() => setIsShouldIBuyOpen(true)}
//             >
//               Should I Buy?
//             </button>
//             <button
//               className="bg-[#101110] px-5 border border-white py-4 rounded-lg text-xl"
//               onClick={() => setIsCompareModalOpen(true)}
//             >
//               Compare
//             </button>
//             <button
//               className="bg-[#101110] px-5 border border-white py-4 rounded-lg text-xl"
//               onClick={() => setIsAIOpen(!isAIOpen)}
//             >
//               AI Help
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* AI Modal */}
//       <AIHelpModal
//         product={product}
//         isAIOpen={isAIOpen}
//         setIsAIOpen={setIsAIOpen}
//       />

//       {/* Should I Buy Modal */}
//       <ShouldIBuyModal
//         productId={productId}
//         isOpen={isShouldIBuyOpen}
//         onClose={() => setIsShouldIBuyOpen(false)}
//         openCompareModal={() => setIsCompareModalOpen(true)}
//       />

//       {/* Compare Modal */}
//       <CompareModal
//         productId={productId}
//         products={products}
//         isOpen={isCompareModalOpen}
//         onClose={() => setIsCompareModalOpen(false)}
//       />

//       {/* Reviews Section */}
//       <div className="mt-16 text-center w-full max-w-4xl">
//         <div className="flex justify-end mb-6">
//           <button
//             className="px-3 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition-all"
//             onClick={() => setIsReviewModalOpen(true)}
//           >
//             Write a Review
//           </button>
//         </div>

//         <h3 className="text-5xl font-bold">Reviews</h3>
//         {reviews.map((review, index) => (
//           <div
//             key={index}
//             className="bg-[#101110] p-8 rounded-lg mt-6 flex justify-between items-center"
//           >
//             <div className="w-full">
//               <p className="text-xl font-bold">{review.username}</p>
//               <p className="text-lg">{review.review}</p>
//               <div className="text-yellow-400 text-3xl">
//                 {"★".repeat(review.rating)}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Review Modal */}
//       <ReviewModal
//         productId={productId}
//         isReviewModalOpen={isReviewModalOpen}
//         setIsReviewModalOpen={setIsReviewModalOpen}
//         setReviews={setReviews}
//       />
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AIHelpModal from "./AIHelpModal";
import ReviewModal from "./ReviewModal";
import ShouldIBuyModal from "./ShouldIBuyModal";
import CompareModal from "./CompareModal";
import { dataContext } from "../context/Context";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data: productsData } = useContext(dataContext);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isShouldIBuyOpen, setIsShouldIBuyOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Process products from context
    if (productsData.products) {
      const updatedProducts = productsData.products.map((product) => ({
        ...product,
        img: `/images/${product.name.replace(/\s+/g, "_")}.jpeg`,
      }));

      setProducts(updatedProducts);
      const foundProduct = updatedProducts.find(
        (p) => p.id === parseInt(productId)
      );
      setProduct(foundProduct);
    }
  }, [productsData, productId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://buying-guide-fullstack-backend.onrender.com/api/reviews/${productId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!product) {
    return (
      <div className="text-white text-center mt-16 text-xl md:text-2xl lg:text-3xl">
        Loading product...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-10 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full flex justify-end mb-5">
        <Link
          to="/product"
          className="border border-white rounded-full px-3 py-1 md:px-4 md:py-2 text-white hover:bg-white hover:text-black transition-all text-sm md:text-base"
        >
          Back
        </Link>
      </div>

      {/* Product Details */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 xl:space-x-16 items-center">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 bg-[#101110] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[640px] flex items-center justify-center rounded-lg text-xl md:text-2xl">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-contain rounded-lg p-4"
          />
        </div>

        {/* Product Information */}
        <div className="w-full lg:w-1/2 space-y-4 md:space-y-8 text-center">
          <p className="w-full bg-[#101110] p-4 md:p-6 lg:p-8 rounded-lg text-lg md:text-xl lg:text-2xl">
            {product.name}
          </p>
          <p className="w-full bg-[#101110] p-4 md:p-6 lg:p-8 rounded-lg text-lg md:text-xl lg:text-2xl">
            Price: ₹{product.price}
          </p>
          <p className="w-full bg-[#101110] p-4 md:p-6 lg:p-8 rounded-lg text-lg md:text-xl lg:text-2xl">
            Brand: {product.brand}
          </p>
          <p className="w-full bg-[#101110] p-4 md:p-6 lg:p-8 rounded-lg text-lg md:text-xl lg:text-2xl">
            {product.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
            <button
              className="bg-[#101110] px-4 py-3 md:px-5 md:py-4 border border-white rounded-lg text-base md:text-xl"
              onClick={() => setIsShouldIBuyOpen(true)}
            >
              Should I Buy?
            </button>
            <button
              className="bg-[#101110] px-4 py-3 md:px-5 md:py-4 border border-white rounded-lg text-base md:text-xl"
              onClick={() => setIsCompareModalOpen(true)}
            >
              Compare
            </button>
            <button
              className="bg-[#101110] px-4 py-3 md:px-5 md:py-4 border border-white rounded-lg text-base md:text-xl"
              onClick={() => setIsAIOpen(!isAIOpen)}
            >
              AI Help
            </button>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      <AIHelpModal
        product={product}
        isAIOpen={isAIOpen}
        setIsAIOpen={setIsAIOpen}
      />

      {/* Should I Buy Modal */}
      <ShouldIBuyModal
        productId={productId}
        isOpen={isShouldIBuyOpen}
        onClose={() => setIsShouldIBuyOpen(false)}
        openCompareModal={() => setIsCompareModalOpen(true)}
      />

      {/* Compare Modal */}
      <CompareModal
        productId={productId}
        products={products}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
      />

      {/* Reviews Section */}
      <div className="mt-10 md:mt-16 text-center w-full max-w-4xl">
        <div className="flex justify-end mb-4 md:mb-6">
          <button
            className="px-3 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition-all text-sm md:text-base"
            onClick={() => setIsReviewModalOpen(true)}
          >
            Write a Review
          </button>
        </div>

        <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
          Reviews
        </h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#101110] p-4 md:p-6 lg:p-8 rounded-lg mt-4 md:mt-6 flex justify-between items-center"
            >
              <div className="w-full">
                <p className="text-base md:text-lg lg:text-xl font-bold">
                  {review.username}
                </p>
                <p className="text-sm md:text-base lg:text-lg mt-1">
                  {review.review}
                </p>
                <div className="text-yellow-400 text-xl md:text-2xl lg:text-3xl mt-2">
                  {"★".repeat(review.rating)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 mt-4">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        productId={productId}
        isReviewModalOpen={isReviewModalOpen}
        setIsReviewModalOpen={setIsReviewModalOpen}
        setReviews={setReviews}
      />
    </div>
  );
};

export default ProductDetails;
