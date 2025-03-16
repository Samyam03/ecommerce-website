import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { currency } from '../App'


const List = ({token}) => {

  const[list,setList]=useState([])


  const fetchList = async()=>{
    try {
      const response = await axios.get(backendUrl+'/api/product/list')

      if(response.data.success){
        setList(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }
      
    } 
    
    catch (error) {
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
  
      if (response.data.success) {
        toast.success(response.data.message);
        
        // Directly update the list state
        setList(prevList => {
          const updatedList = prevList.filter(item => item._id !== id);
          return updatedList;
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error removing product: ' + error.message);
    }
  };

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>
        All Products List
      </p>
      <div className='flex flex-col gap-2'>

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-gray-600 text-sm font-semibold'>
        <b > Image </b>
        <b> Name </b>
        <b> Category </b>
        <b> Price </b>
        <b className='text-center'>  Action</b>
        </div>

       {list.map((item,index)=>(
        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
          <img className='w-12' src={item.image[0]} alt="" />
          <p> {item.name} </p>
          <p> {item.category} </p>
          <p>{currency} {item.price} </p>
          <button onClick={()=>removeProduct(item._id)} className='bg-red-500 text-white px-2 py-1 rounded cursor-pointer'>Remove</button>
        </div>
       ))}
      </div>
    </>
  )
}

export default List
