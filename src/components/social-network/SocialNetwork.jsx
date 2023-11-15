import { clsx } from 'clsx';
import { Div } from '../content';
import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa6";

export function SocialNetwork({ className }) {
  return (
    <Div className={clsx('social-network', className)}>
      <ul>
        <li className='facebook'>
          <Link to='/'>  
            <FaFacebookF size={22} />
            Facebook
          </Link>
        </li>
        <li className='instagram'>
          <Link to='/'>
            <FaInstagram size={22} />  
            Instagram
          </Link>
        </li>
        <li className='twitter'>
          <Link to='/error'>
            <BsTwitterX size={20} />
            Twitter
          </Link>
        </li>
      </ul>
    </Div>
  );
};