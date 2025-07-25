import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* About Section */}
        <div className='text-center text-3xl font-bold pt-8 border-t border-gray-200/50 pb-8'>
          <Title text1="ABOUT " text2="US" />
        </div>

        <section className="my-8 lg:my-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  src={assets.about_img}
                  alt="About Us"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
              </div>
            </div>
            
            <article className="space-y-8">
              <div className="space-y-6">
                <p className="text-lg text-gray-800 leading-relaxed">
                  Welcome to our store! We are dedicated to providing top-quality
                  products that blend style, comfort, and affordability. Our journey
                  began with a simple mission: to make premium products accessible to
                  everyone without compromising on quality.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Whether you&apos;re looking for the latest trends or timeless classics, we strive to bring you the best in the industry. Customer satisfaction is at the heart of everything we do.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Our Mission
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our mission is to provide an unparalleled shopping experience by
                  delivering high-quality products with exceptional customer service.
                  We believe that shopping should be enjoyable and stress-free, which
                  is why we focus on convenience, affordability, and reliability.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  We are committed to innovation and continuously improving our
                  offerings to meet your needs.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <div className='text-center text-3xl font-bold py-6'>
          <Title text1="WHY " text2="CHOOSE US" />
        </div>

        <section className="mb-16 lg:mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Assurance",
                text: "We prioritize quality in every product we offer. Our team meticulously selects and tests each item to ensure it meets our high standards. We believe that quality should never be compromised, no matter the price.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )
              },
              {
                title: "Convenience",
                text: "Shopping with us is easy and hassle-free. Our user-friendly website, secure payment options, and efficient delivery services ensure that you get what you need quickly and smoothly. We make sure your shopping experience is as seamless as possible.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Exceptional Customer Service",
                text: "Our customers are our top priority. Our dedicated support team is always ready to assist you with any inquiries, returns, or concerns. We value your trust and aim to build long-term relationships through reliable service and personalized support.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] h-full"
              >
                <div className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <NewsLetterBox />
      </div>
    </div>
  );
};

export default About;
