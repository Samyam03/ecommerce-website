import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <footer>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img src={assets.logo} className="mb-5 w-32" alt="Shopshere Logo" />
                    <p className="w-full md:w-2/3 text-gray-600">
                        Shopshere is your one-stop destination for a seamless online
                        shopping experience, offering a wide range of products to meet all
                        your needs.
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>
                            <a href="/" className="hover:text-gray-800">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-gray-800">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/delivery" className="hover:text-gray-800">
                                Delivery
                            </a>
                        </li>
                        <li>
                            <a href="/privacy-policy" className="hover:text-gray-800">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="text-gray-600">
                        <li>+1 123-456-7890</li>
                        <li>
                            <a
                                href="mailto:contact@shopshere.com"
                                className="hover:text-gray-800"
                            >
                                contact@shopshere.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <hr className="my-5" />
                <p className="py-5 text-sm text-center">
                    &copy; 2025 Shopshere.com - All Rights Reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
