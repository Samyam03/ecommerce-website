import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from "../components/NewsLetterBox"

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title  text1={"ABOUT"} text2={"US"} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div>
          <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium facilis nemo fuga, soluta totam odio maxime eveniet nostrum sint modi. Temporibus, velit doloremque? Numquam repudiandae porro, odio quam obcaecati voluptatem.
          Possimus quia velit at necessitatibus, perferendis nulla. Eum in nisi accusantium exercitationem possimus fuga numquam doloremque, officia commodi mollitia impedit aliquid cumque tempora alias rem eligendi suscipit maxime perferendis illo.
          Debitis iusto exercitationem fuga consequuntur, in mollitia maxime officiis vel assumenda ducimus explicabo repellendus, odio nostrum porro placeat vitae deserunt? Reiciendis eos ratione unde minus ipsum, quisquam enim in deserunt?
          Aspernatur, corrupti quia! Quisquam magnam ipsum autem expedita ut! Vitae nam ipsa quaerat ratione! Iste temporibus, error consequuntur obcaecati, id nisi veniam doloremque accusamus cum vitae, quibusdam pariatur illo et.
          Molestiae mollitia nesciunt fugit sequi illum, expedita, possimus perferendis quis in dolorum quae eaque! Pariatur enim impedit magnam quia provident quibusdam, accusamus dolorem ab possimus animi aut error iste necessitatibus.

          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, ex minima nam accusantium quia corporis, et provident quo consectetur, alias quos maiores esse. Delectus nostrum sequi rem odio dolores magnam.
            Quo, nulla repellendus rerum, blanditiis dignissimos eveniet sint modi voluptatum, incidunt necessitatibus officiis aspernatur distinctio amet impedit corrupti. Accusamus sequi, consectetur quidem neque ducimus autem fuga ratione labore molestias illum.
            Doloribus dolorem aliquid perferendis fuga praesentium odio magnam quaerat fugit sunt fugiat quibusdam harum maiores, delectus veritatis, recusandae rem, ducimus expedita adipisci nam a! Voluptatum tenetur praesentium velit nemo culpa.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, ex minima nam accusantium quia corporis, et provident quo consectetur, alias quos maiores esse. Delectus nostrum sequi rem odio dolores magnam.
            Quo, nulla repellendus rerum, blanditiis dignissimos eveniet sint modi voluptatum, incidunt necessitatibus officiis aspernatur distinctio amet impedit corrupti. Accusamus sequi, consectetur quidem neque ducimus autem fuga ratione labore molestias illum.
            Doloribus dolorem aliquid perferendis fuga praesentium odio magnam quaerat fugit sunt fugiat quibusdam harum maiores, delectus veritatis, recusandae rem, ducimus expedita adipisci nam a! Voluptatum tenetur praesentium velit nemo culpa.
          </p>
        </div>
      </div>

    <div className='text-2xl py-4'>
      <Title text1={'WHY '} text2={"CHOOSE US"}/>
    </div>

    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ipsam quos ullam minima reiciendis vel, optio saepe tempora voluptatibus fuga temporibus eius culpa, laboriosam nemo quod aliquid tenetur dicta eaque?</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ipsam quos ullam minima reiciendis vel, optio saepe tempora voluptatibus fuga temporibus eius culpa, laboriosam nemo quod aliquid tenetur dicta eaque?</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exception Customer Service:</b>
          <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ipsam quos ullam minima reiciendis vel, optio saepe tempora voluptatibus fuga temporibus eius culpa, laboriosam nemo quod aliquid tenetur dicta eaque?</p>
      </div>
    </div>
    <NewsLetterBox />
    </div>
  )
}

export default About
