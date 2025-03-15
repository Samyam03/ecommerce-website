import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { assets } from "../assets/assets";

const Footer = () => {
    // Constants for reusable content
    const companyLinks = [
        { text: "Home", href: "/" },
        { text: "About Us", href: "/about" },
        { text: "Delivery", href: "/orders" },
        { text: "Privacy Policy", href: "/" },
    ];

    const contactInfo = [
        { type: "phone", value: "+1 123-456-7890" },
        { type: "email", value: "contact@shopshere.com", href: "mailto:contact@shopshere.com" },
    ];

    return (
        <footer className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                    {/* Logo and Description */}
                    <div>
                        <img
                            src={assets.logo}
                            className="mb-5 w-16"
                            alt="Shopshere Logo"
                            loading="lazy"
                        />
                        <p className="w-full md:w-2/3 text-gray-600">
                            Shopshere is your one-stop destination for a seamless online
                            shopping experience, offering a wide range of products to meet all
                            your needs.
                        </p>
                    </div>

                    {/* Company Links */}
                    <div>
                        <p className="text-xl font-medium mb-5">COMPANY</p>
                        <ul className="flex flex-col gap-1 text-gray-600">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.href}
                                        className="hover:text-gray-800 transition-colors duration-200"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                        <ul className="text-gray-600">
                            {contactInfo.map((info, index) => (
                                <li key={index}>
                                    {info.href ? (
                                        <a
                                            href={info.href}
                                            className="hover:text-gray-800 transition-colors duration-200"
                                        >
                                            {info.value}
                                        </a>
                                    ) : (
                                        info.value
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright Section */}
                <div>
                    <hr className="my-5 border-gray-300" />
                    <p className="py-5 text-sm text-center text-gray-600">
                        &copy; 2025 Shopshere.com - All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;