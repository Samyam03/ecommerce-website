import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
    const quickLinks = [
        { text: "About", href: "/about" },
        { text: "Collection", href: "/collection" },
        { text: "Contact", href: "/contact" },
        { text: "Orders", href: "/orders" },
    ];

    const legalLinks = [
        { text: "Terms", href: "/" },
        { text: "Privacy", href: "/" },
        { text: "Returns", href: "/" },
    ];

    const socialLinks = [
        { 
            name: "Facebook", 
            href: "#",
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            )
        },
        { 
            name: "Instagram", 
            href: "#",
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.542-3.293-1.445-.845-.903-1.293-2.098-1.293-3.395s.448-2.492 1.293-3.395c.845-.903 1.996-1.445 3.293-1.445s2.448.542 3.293 1.445c.845.903 1.293 2.098 1.293 3.395s-.448 2.492-1.293 3.395c-.845.903-1.996 1.445-3.293 1.445zm7.718-1.293v-7.718h-7.718v7.718h7.718z"/>
                </svg>
            )
        },
        { 
            name: "Twitter", 
            href: "#",
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
            )
        }
    ];

    return (
        <footer className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 mt-12 w-screen max-w-none left-0 right-0 relative shadow-inner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                        {/* Brand Section */}
                        <div className="flex flex-col items-center lg:items-start space-y-3">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={assets.logo}
                                    className="h-8 w-auto"
                                    alt="ShopSphere Logo"
                                    loading="lazy"
                                />
                                <span className="text-xl font-bold text-gray-900">ShopSphere</span>
                            </div>
                            <p className="text-sm text-gray-600 text-center lg:text-left max-w-xs">
                                Your premier destination for quality products and exceptional shopping experiences.
                            </p>
                        </div>
                        {/* Quick Links */}
                        <div className="flex flex-col items-center space-y-3">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Quick Links</h3>
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                                {quickLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        to={link.href}
                                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline"
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        {/* Social & Connect */}
                        <div className="flex flex-col items-center lg:items-end space-y-3">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Connect</h3>
                            <div className="flex items-center space-x-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom Section */}
                <div className="border-t border-gray-200 py-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                        <p className="text-xs text-gray-500">
                            © 2025 ShopSphere. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6">
                            {legalLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.href}
                                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200 hover:underline"
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;