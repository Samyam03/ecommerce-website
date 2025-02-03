import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div className="px-4">
      {/* About Section */}
      <section className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT " text2="US" />
      </section>

      <section className="my-5 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-md"
          src={assets.about_img}
          alt="About Us"
        />
        <article className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Welcome to our store! We are dedicated to providing top-quality
            products that blend style, comfort, and affordability. Our journey
            began with a simple mission: to make premium products accessible to
            everyone without compromising on quality.
          </p>
          <p>
            Every item in our collection is carefully curated to meet the
            highest standards. Whether you're looking for the latest trends or
            timeless classics, we strive to bring you the best in the industry.
            Customer satisfaction is at the heart of everything we do.
          </p>
          <h3 className="text-lg font-semibold text-gray-800 mt-6">Our Mission</h3>
          <p>
            Our mission is to provide an unparalleled shopping experience by
            delivering high-quality products with exceptional customer service.
            We believe that shopping should be enjoyable and stress-free, which
            is why we focus on convenience, affordability, and reliability.  
            We are committed to innovation and continuously improving our
            offerings to meet your needs.
          </p>
        </article>
      </section>

      {/* Why Choose Us Section */}
      <section className="text-xl text-center py-6">
        <Title text1="WHY " text2="CHOOSE US" />
      </section>

      <section className="flex flex-col md:flex-row gap-8 text-sm mb-20">
        {[
          {
            title: "Quality Assurance",
            text: "We prioritize quality in every product we offer. Our team meticulously selects and tests each item to ensure it meets our high standards. We believe that quality should never be compromised, no matter the price.",
          },
          {
            title: "Convenience",
            text: "Shopping with us is easy and hassle-free. Our user-friendly website, secure payment options, and efficient delivery services ensure that you get what you need quickly and smoothly. We make sure your shopping experience is as seamless as possible.",
          },
          {
            title: "Exceptional Customer Service",
            text: "Our customers are our top priority. Our dedicated support team is always ready to assist you with any inquiries, returns, or concerns. We value your trust and aim to build long-term relationships through reliable service and personalized support.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-gray-50 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <p className="text-gray-600">{item.text}</p>
          </div>
        ))}
      </section>

      <NewsLetterBox />
    </div>
  );
};

export default About;
