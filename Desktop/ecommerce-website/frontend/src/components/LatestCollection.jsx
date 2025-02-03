import React, { useState, useEffect, useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    // Update latestProducts when products change
    useEffect(() => {
        if (products && products.length > 0) {
            setLatestProducts(products.slice(0, 10)); // Get the first 10 products
        }
    }, [products]);

    // Memoize the latestProducts array to avoid unnecessary re-renders
    const memoizedLatestProducts = useMemo(() => latestProducts, [latestProducts]);

    return (
        <div className="my-10">
            {/* Title Section */}
            <div className="text-center py-8 text-3xl">
                <Title text1={"LATEST"} text2={" COLLECTION"}>
                    <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                        Explore our newest arrivals and stay ahead of the trends.
                    </p>
                </Title>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {memoizedLatestProducts.length > 0 ? (
                    memoizedLatestProducts.map((item) => (
                        <ProductItem
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-600">
                        No products available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default LatestCollection;