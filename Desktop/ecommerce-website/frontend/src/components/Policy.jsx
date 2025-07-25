import { assets } from '../assets/assets'

const Policy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      description: "Hassle-free exchanges within our flexible policy guidelines for your complete satisfaction.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy", 
      description: "Full refund guarantee within 7 days of purchase. No questions asked return policy.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: assets.support_img,
      title: "24/7 Customer Support",
      description: "Round-the-clock professional support to assist you with any questions or concerns.",
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
            <section className='py-12 lg:py-16 bg-transparent'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Section Header */}
                  <div className='text-center mb-10 lg:mb-12'>
          <div className='inline-flex items-center gap-3 mb-4'>
            <div className='w-12 h-[1px] bg-gray-400'></div>
            <span className='text-sm font-medium text-gray-600 tracking-wider uppercase'>
              Our Promise
            </span>
            <div className='w-12 h-[1px] bg-gray-400'></div>
          </div>
          
          <h2 className='text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4'>
            Why Choose ShopSphere
          </h2>
          
          <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            We&apos;re committed to providing you with the best shopping experience through our customer-first policies and exceptional service.
          </p>
        </div>

        {/* Policy Cards Grid */}
        <div className='grid md:grid-cols-3 gap-8 lg:gap-12'>
          {policies.map((policy, index) => (
            <div 
              key={index}
              className='group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 hover:-translate-y-2'
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${policy.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
              
              {/* Icon Container */}
              <div className='relative mb-6'>
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${policy.color} p-0.5 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <div className='w-full h-full bg-white rounded-2xl flex items-center justify-center'>
                    <img 
                      src={policy.icon} 
                      className='w-8 h-8 transition-transform duration-300 group-hover:scale-110' 
                      alt={policy.title} 
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className='relative text-center'>
                <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-200'>
                  {policy.title}
                </h3>
                
                <p className='text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200'>
                  {policy.description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${policy.color} animate-pulse`}></div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className='text-center mt-16'>
          <div className='inline-flex flex-col sm:flex-row items-center gap-4'>
            <p className='text-gray-600 font-medium'>
              Have questions about our policies?
            </p>
            <div className='flex items-center gap-3 text-gray-800'>
              <span className='text-sm font-semibold hover:text-gray-600 transition-colors cursor-pointer'>
                CONTACT SUPPORT
              </span>
              <div className='w-12 h-[2px] bg-gradient-to-r from-gray-800 to-gray-600 rounded-full'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Policy
