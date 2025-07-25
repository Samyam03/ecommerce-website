import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext, useCallback } from 'react';
import { ShopContext } from '../context/ShopContextContext';
import { currency } from '../../../constants';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    const { productId } = useParams();
    const { products, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState("");
    const [size, setSize] = useState('');

    const fetchProductData = useCallback(() => {
        const product = products.find(item => item._id === productId);
        if (product) {
            setProductData(product);
            setImage(product.image[0]);
        }
    }, [productId, products]);

    useEffect(() => {
        if (products.length > 0) {
            fetchProductData();
        }
    }, [productId, products, fetchProductData]);

    if (!productData) {
        return <div className="h-screen"></div>; // Loading state
    }

    return (
        <div className="border-t-2 pt-10">
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                {/* Product Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {productData.image.map((item, index) => (
                            <img
                                onClick={() => setImage(item)}
                                src={item}
                                key={index}
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                alt=""
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img className="w-full h-auto" src={image} alt="" />
                    </div>
                </div>
                
                {/* Product Info */}
                <div className="flex-1 p-4">
                    <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        <img className="w-4" src={assets.star_icon} alt="" />
                        <img className="w-4" src={assets.star_icon} alt="" />
                        <img className="w-4" src={assets.star_icon} alt="" />
                        <img className="w-4" src={assets.star_icon} alt="" />
                        <img className="w-4" src={assets.star_dull_icon} alt="" />
                        <p className="pl-2">(122)</p>
                    </div>
                    <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
                    <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

                    {/* Select Size */}
                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>
                        <div className="flex gap-2">
                            {productData.sizes.map((item, index) => (
                                <button
                                    onClick={() => setSize(item)}
                                    className={`cursor-pointer border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                                    key={index}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={() => addToCart(productData._id, size)}
                        className="bg-black text-white px-10 py-3 text-sm active:bg-gray-700"
                    >
                        ADD TO CART
                    </button>
                    <hr className="mt-8 sm:w-4/5" />

                    {/* Product Guarantee */}
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <p>Guaranteed 100% Authenticity for Every Product</p>
                        <p>Seamless Cash-on-Delivery Option Available</p>
                        <p>Effortless Returns and Exchanges Within 7 Days</p>
                    </div>
                </div>
            </div>

            {/* Description & Reviews */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews (122)</p>
                </div>

                <div className="flex flex-col gap-6 border px-8 py-8 text-sm text-gray-600 leading-relaxed">
                    <p>
                        This premium garment is crafted with high-quality materials to offer exceptional comfort and durability.
                        Designed with a perfect balance of style and functionality, it features a modern fit suitable for various occasions.
                        Available in a versatile range of colors and sizes, this clothing piece is perfect for individuals who value both aesthetics and practicality.
                        Ideal for casual wear, work attire, or evening outings, it is a timeless addition to any wardrobe.
                    </p>

                    <ul className="list-disc pl-6">
                        <li>Soft and breathable fabric for all-day comfort</li>
                        <li>Expert stitching and attention to detail</li>
                        <li>Contemporary design with a flattering fit</li>
                        <li>Easy to care for and maintain</li>
                    </ul>

                    <p>A must-have for those seeking a combination of elegance and everyday utility.</p>
                </div>
            </div>

            {/* Related Products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    );
}

export default Product;