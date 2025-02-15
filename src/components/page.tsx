import React, { useEffect, useRef, useState } from 'react'
import LogoCubeScroller from './logocube'

const Page = () => {
    const[scrollProgress,setScrollProgress]=useState(0)
     const containerRef = useRef(null);
      
    useEffect(()=>{
        if(!containerRef.current)
        {
            return
        }
        const scrollStart = window.innerHeight;
      const scrollEnd = document.body.scrollHeight - window.innerHeight * 2;
      const currentScroll = window.scrollY - scrollStart;
      const maxScroll = scrollEnd - scrollStart;
      
      const progress = Math.max(0, Math.min(1, currentScroll / maxScroll));
      setScrollProgress(progress);
    })
   const getBlurAmount=()=>{
    if(scrollProgress<0.3)
    {
        return (scrollProgress/0.3)*10
    }
    
   }
    const blurAmount=getBlurAmount()
  return (
    <>
    <div className="sticky bg-[#331707] text-white">
     {/* <div className='absolute flex gap-6 transform translate-x-1/2 translate-y-1/2 top-1/4 left-1/2 z-2' ref={containerRef} style={{filter:`blur(${blurAmount})px`, opacity:1}}>
        <div className='flex flex-col justify-end'>
            <div className="origin-bottom-right transform rotate-45 bg-pink-700 w-9 h-9"></div>
            <div className="transform bg-pink-700 w-9 h-9"></div>
        </div>
        <div className='flex flex-col justify-end gap-6'>
            <div className="bg-pink-700 w-9 h-9"></div>
            <div className="transform bg-pink-700 w-9 h-9"></div>
        </div>
        <div className='flex flex-col justify-end'>
            <div className="origin-bottom-left transform bg-pink-700 rotate-[-42deg] w-9 h-9"></div>
            <div className="transform bg-pink-700 w-9 h-9"></div>
        </div>
        </div>  */}
        <LogoCubeScroller/>
        {/* <section className='text-center absolute top-1/2 left-1/2 w-[30%]'>
            <h2  className='text-2xl font-bold'>Where innovation meets precision</h2>
            <p>Symphonia unites visionary thinkers, creative architects, and analytical experts, collaborating seamlessly to transform challenges into oppurtunities. Together, we deliver tailored solutions that drive impact and inspire growth. "</p>
        </section> */}
     </div> 
    </>
  )
}

export default Page