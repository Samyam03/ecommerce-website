import React from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const { currency, getCartAmount } = useContext(ShopContext);

    const subtotal = getCartAmount();
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART '} text2={'TOTALS'} />
            </div>

            <div>
                <div className='flex flex-col gap-2 mt-2 text-sm'>
                    <div className='flex justify-between'>
                        <p>Subtotal</p>
                        <p>{currency}{subtotal}.00</p>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <p>Tax (10%)</p>
                        <p>{currency}{tax}.00</p>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <b>Total</b>
                        <b>{currency} {subtotal === 0 ? 0 : total}.00</b>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;