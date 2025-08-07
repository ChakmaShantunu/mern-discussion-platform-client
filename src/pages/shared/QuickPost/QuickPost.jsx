import React from 'react';
import logo from '../../../assets/images/logo.jpg'
import { Link } from 'react-router';

const QuickPost = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img
                    className="mb-2 max-w-[60px] h-auto object-contain"
                    src={logo}
                    alt="QuickPost Logo"
                />
                <p className='font-extrabold text-3xl ml-2'>QuickPost.io</p>
            </div>
        </Link>
    );
};

export default QuickPost;