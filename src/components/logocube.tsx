
import React, { useState, useEffect, useRef } from 'react';

const LogoCubeScroller = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ticking = false;
  
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;
  
         
          const scrollStart = window.innerHeight;
          const scrollEnd = document.body.scrollHeight - window.innerHeight * 2;
          const currentScroll = window.scrollY - scrollStart;
          const maxScroll = scrollEnd - scrollStart;
  
          setScrollProgress(Math.max(0, Math.min(1, currentScroll / maxScroll)));
          ticking = false;
        });
        ticking = true;
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  const logos = [
    { id: 1, startImg: 1, column: 0, row: 0, rotate: 45, origin: 'bottom-right' },
    { id: 2, startImg: 7, column: 1, row: 0, rotate: 0 },
    { id: 3, startImg: 13, column: 2, row: 0, rotate: -45, origin: 'bottom-left' },
    { id: 4, startImg: 19, column: 0, row: 1, rotate: 0 },
    { id: 5, startImg: 25, column: 1, row: 1, rotate: 0 },
    { id: 6, startImg: 31, column: 2, row: 1, rotate: 0 }
  ];

  const getBlurAmount = () => {
    if (scrollProgress < 0.3) return (scrollProgress / 0.3) * 10;
    return 10 * (1 - ((scrollProgress - 0.3) / 0.2));
  };
  
  const getCubeTransform = () => {
    if (scrollProgress < 0.2) return 0;
    if (scrollProgress > 0.6) return 1;
    return (scrollProgress - 0.3) / 0.4;
  };
  
  const getCircleExpand = () => {
    if (scrollProgress < 0.3) return 0;
    return (scrollProgress - 0.7) / 0.3;
  };

  const blurAmount = getBlurAmount();
  const cubeTransform = getCubeTransform();
  const circleExpand = getCircleExpand();

  return (
    <div className="relative">

      
      <div className="sticky top-0 bg-[#331707] flex items-center justify-center h-screen overflow-hidden">
        <div 
          ref={containerRef}
          className="absolute px-4 mt-4 transform translate-x-1/2 translate-y-1/2 top-1/4 left-1/2 z-2 max-w-7xl sm:px-6 lg:px-8"
          style={{
            filter: `blur(${blurAmount}px)`,
            opacity: 1
          }}
        >
            <div className="relative flex items-center justify-center w-full h-full">
            {circleExpand>0? <div 
                className="absolute flex-col items-center w-full mt-8 text-center transition-opacity duration-500 transform -translate-x-1/2 -translate-y-1/2 fle8x mt-z-10 top-1/2 left-1/2 "
                style={{ opacity: circleExpand }}
              >
          <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  Where innovation meets precision
                </h2>
                <p className="text-sm text-white sm:text-base md:text-lg">
                  Symphonia unites visionary thinkers, creative architects, and analytical experts, 
                  collaborating seamlessly to transform challenges into opportunities. Together, we 
                  deliver tailored solutions that drive impact and inspire growth.
                </p>
        </div>:""}
        <div className="flex gap-3 sm:gap-4 md:gap-6">
            {[0, 1, 2].map(colIndex => (
              <div key={colIndex} className={`flex flex-col justify-end ${colIndex === 1 ? 'gap-3 sm:gap-4 md:gap-6' : ''}`}>
                {[0, 1].map(rowIndex => {
                  const logo = logos.find(l => l.column === colIndex && l.row === rowIndex);
                  if (!logo) return null;

                //   const angle = ((logo.id - 1) / logos.length) * Math.PI * 2;
                //   const radius = circleExpand * Math.min(window.innerWidth, window.innerHeight) * 0.3;
                //   const xPos = Math.cos(angle) * radius;
                //   const yPos = Math.sin(angle) * radius;
                //   const initialX = (colIndex - 1) * 60;
                //   const initialY = (rowIndex - 0.5) * 60;
                //   const x = cubeTransform * xPos + (1 - cubeTransform) * initialX;
                //   const y = cubeTransform * yPos + (1 - cubeTransform) * initialY;

                //   const rotateX = cubeTransform * 360 * Math.sin(angle) + circleExpand * 180;
                //   const rotateY = cubeTransform * 360 * Math.cos(angle) + circleExpand * 180;
                //   const initialScale = 1;
                //   const scale = initialScale + cubeTransform * 0.5 + circleExpand * 1;
                 
                const angle = ((logo.id - 1) / 6) * Math.PI * 2;
                const radius = circleExpand * Math.min(window.innerWidth, window.innerHeight) * 0.45;
                const xPos = Math.cos(angle) * radius;
                const yPos = Math.sin(angle) * radius;
                const initialX = (logo.id % 3 - 1) * 30;
                const initialY = (Math.floor(logo.id / 3) - 0.5) * 30;
              
                const x = cubeTransform * xPos + (1 - cubeTransform) * initialX;
                const y = cubeTransform * yPos + (1 - cubeTransform) * initialY;
                const rotateX = cubeTransform * 360 * Math.sin(angle) + circleExpand * 180;
                const rotateY = cubeTransform * 360 * Math.cos(angle) + circleExpand * 180;
                const scale = 0.5 + cubeTransform * 0.5 + circleExpand * 1;

                  return (
                    <div
                      key={logo.id}
                      className={`relative w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 transition-all duration-300 ${
                        logo.origin ? `origin-${logo.origin}` : ''
                      }`}
                      style={{
                        transform: cubeTransform > 0.1
                          ? `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)  scale(${scale})${logo.rotate ? `rotate(${logo.rotate}deg)` : ''}`
                          : `${logo.rotate ? `rotate(${logo.rotate}deg)` : ''}`,
                        transformStyle: 'preserve-3d',
                        transition: `all ${0.3 + (logo.id - 1) * 0.05}s cubic-bezier(0.25, 0.1, 0.25, 1)`,
                      }}
                    >
                    
                      <div className="absolute inset-0 bg-pink-700" />
                      
                      {cubeTransform > 0.2 && (
                        <div className="absolute inset-0 w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                          
                          <div className="absolute inset-0 transform translate-z-[18px]">
                            <img src={`/img${logo.startImg}.jpg`} alt="" className="object-cover w-full h-full" />
                          </div>
                          
                          <div className="absolute inset-0 transform rotate-180 -translate-z-[18px]">
                            <img src={`/img${logo.startImg + 1}.jpg`} alt="" className="object-cover w-full h-full" />
                          </div>
                          
                          <div className="absolute inset-0 transform translate-x-[18px] rotate-y-90">
                            <img src={`/img${logo.startImg + 2}.jpg`} alt="" className="object-cover w-full h-full" />
                          </div>
                        
                          <div className="absolute inset-0 transform -translate-x-[18px] -rotate-y-90">
                            <img src={`/img${logo.startImg + 3}.jpg`} alt="" className="object-cover w-full h-full" />
                          </div>
                        
                          <div className="absolute inset-0 transform translate-y-[18px] rotate-x-90">
                            <img src={`/img${logo.startImg + 4}.jpg`} alt="" className="object-cover w-full h-full" />
                          </div>
                          {/* Bottom face */}
                          <div className="absolute inset-0 transform -translate-y-[18px] -rotate-x-90">
                            <img src={`/img${logo.startImg + 5}.jpg`} alt="" className="object-cover w-full h-full" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                  );
                })}
              </div>
              
            ))}
          </div>
        </div></div>
        {circleExpand==0 &&(<div 
            className="absolute w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] top-1/2 left-1/2 text-center text-[#ffe9d9] px-4"
            style={{ 
              transform: 'translate(-50%, -50%)',
              filter: `blur(${blurAmount}px)`,
              opacity: 1
            }}
          >
            <h1 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
              The first media company crafted for the digital first generation.
            </h1>
          </div>
        )}
        </div>
      {/* {scrollProgress<0.2?<div 
  className="absolute w-[60%] top-1/2 left-1/2  text-center text-[#ffe9d9]"
  style={{ 
    transform: 'translate(-50%, -50%) scale(1)', // Or just 'scale-1' in className
    filter: `blur(${blurAmount}px)`,
            opacity: 1
    // Default if position is nullish
  }}
>
  <h1 className="text-3xl font-bold"> */}
{/*   
          The first media company crafted for the digital first generation.
        
  </h1>
</div>:''} */} 
      <div className="h-screen" />
      <div className="h-screen" />
    </div>
  );
};

export default LogoCubeScroller;

