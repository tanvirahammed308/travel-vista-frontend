import Image from 'next/image'
import Link from 'next/link'
import { BiCopyright, BiPhone } from 'react-icons/bi'
import {  FaFacebookSquare, FaInstagramSquare, FaWhatsappSquare } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { RiMvAiLine } from 'react-icons/ri'

const Footer = () => {
  return (
      <footer className=' text-[#f6f9fc] '>
          <div className='bg-[#2D373C] pt-10 pb-6 '>
            
              <div className='max-w-7xl mx-auto grid md:grid-cols-4 gap-20 px-5 md:px-0'>
                  {/* logo and about */}
                  <div className='space-y-2'>
                      <div className='flex items-center  font-bold'>
                         <Image
      src="/images/logo.png"
      width={200}
      height={60}
                          alt="Picture of logo"
                          className='w-16 h-auto'
                          />
                      <p>TravelVista</p>    
                      </div>
                      
                      <p className='text-sm leading-6'>
                          Explore the beauty of Bangladesh with us. We provide the best tours,
            travel packages, and unforgettable experiences.
                      </p>
                      <div>
                          <h4 className='capitalize font-bold'>Follow us:</h4>
                          <div className='flex space-x-4 mt-2'>
                              <FaFacebookSquare  size={30}/>
<FaSquareXTwitter  size={30}/>
<FaInstagramSquare size={30}/>
<FaWhatsappSquare size={30}/>

                          </div>
                      </div>

                  </div>
                  {/* Quick links */}
                  <div>
                      <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
           
            <li><Link href="/tours" className="hover:text-white transition">Tours</Link></li>
            <li><Link href="/packages" className="hover:text-white transition">Packages</Link></li>
          </ul>
                  </div>
                   {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition">Terms & Conditions</Link></li>
          </ul>
                  </div>
                   {/* Contact + Social */}
                  
                  <div>
                        <h3 className="text-white font-semibold mb-3">Contact</h3>
                       <div className="flex items-center gap-2 text-sm">
            <RiMvAiLine size={16} />
            <span>support@travelbangla.com</span>
          </div>

          <div className="flex items-center gap-2 text-sm mt-2">
            <BiPhone size={16} />
            <span>+880 1234-567890</span>
          </div>
                  </div>
                 
</div>
              
          </div>
          {/* bottom  */}
              <div className='text-center bg-[#162B32] pt-6 pb-4 flex items-center justify-center space-x-1.5'>
                  <BiCopyright />
                  <p className='font-semibold'>{new Date().getFullYear() } TravelVista. All rights reserved.</p>

              </div>
    </footer>
  )
}

export default Footer