// 'use client';

// import React, { useEffect, useState } from 'react';

// const Banner: React.FC = () => {
//   const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

//   useEffect(() => {
//     const updateClock = () => {
//       const now = new Date();
//       setTime({
//         hours: now.getHours() % 12,
//         minutes: now.getMinutes(),
//         seconds: now.getSeconds()
//       });
//     };

//     updateClock();
//     const interval = setInterval(updateClock, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // Calculate rotation angles
//   const secondAngle = (time.seconds / 60) * 360;
//   const minuteAngle = ((time.minutes * 60 + time.seconds) / 3600) * 360;
//   const hourAngle = ((time.hours * 3600 + time.minutes * 60 + time.seconds) / 43200) * 360;

//   return (
//     <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
//       {/* Decorative Elements */}
//       <div className="absolute top-10 right-20 w-96 h-96 bg-gray-200/10 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-10 left-20 w-[500px] h-[500px] bg-gray-300/5 rounded-full blur-3xl"></div>
      
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
//         {/* Grid with content left and watch right */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-16 lg:gap-24 xl:gap-32 items-center py-16 lg:py-20">
          
//           {/* Left Content */}
//           <div className="space-y-6 lg:space-y-8 z-10">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 px-5 py-2 rounded-full shadow-sm">
//               <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
//               <span className="text-[10px] sm:text-xs font-medium text-gray-400 tracking-[4px] uppercase">
//                 2026 Collection
//               </span>
//             </div>

//             {/* Heading */}
//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.05] text-black">
//               Timeless
//               <br />
//               <span className="text-gray-400 font-medium">Elegance</span>
//             </h1>

//             {/* Description */}
//             <p className="max-w-sm lg:max-w-md text-sm sm:text-base text-gray-500 leading-relaxed">
//               Discover our curated collection of exquisite timepieces, 
//               where precision meets artistry. Each watch tells a story 
//               of heritage and innovation.
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
//               <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-black hover:bg-gray-400 text-white text-xs sm:text-sm font-light tracking-[3px] uppercase transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
//                 Explore Collection
//                 <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
//               </button>
//               <button className="group px-6 sm:px-8 py-3 sm:py-4 border border-gray-400 hover:border-black text-gray-400 hover:text-black text-xs sm:text-sm font-light tracking-[3px] uppercase transition-all duration-300 hover:shadow-lg">
//                 Watch Story
//               </button>
//             </div>

//             {/* Stats */}
//             <div className="flex gap-8 sm:gap-12 pt-6 border-t border-gray-100">
//               {[
//                 { number: '120+', label: 'Years Heritage' },
//                 { number: '85', label: 'Boutiques' },
//                 { number: '350+', label: 'Models' }
//               ].map((stat, idx) => (
//                 <div key={idx}>
//                   <div className="text-xl sm:text-2xl font-serif font-light text-gray-400">
//                     {stat.number}
//                   </div>
//                   <div className="text-[10px] sm:text-xs text-gray-500 tracking-[2px] uppercase mt-1">
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right - Smaller, More Professional Watch */}
//           <div className="relative flex justify-end items-center">
//             <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[440px] aspect-square ml-auto">
//               {/* Professional rotating rings - Thinner, more elegant */}
//               <div className="absolute inset-0 rounded-full border border-gray-200/30 animate-[spin_25s_linear_infinite]"></div>
//               <div className="absolute inset-[8%] rounded-full border border-gray-200/20 animate-[spin_30s_linear_infinite_reverse]"></div>
//               <div className="absolute inset-[16%] rounded-full border border-gray-200/15 animate-[spin_40s_linear_infinite]"></div>
              
//               {/* Minimal dots */}
//               <div className="absolute inset-0 animate-[spin_25s_linear_infinite]">
//                 {[...Array(8)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="absolute w-0.5 h-0.5 bg-gray-400 rounded-full"
//                     style={{
//                       top: '50%',
//                       left: '50%',
//                       transform: `rotate(${i * 45}deg) translateY(-44%)`,
//                       transformOrigin: '0 0',
//                       marginTop: '-0.25px',
//                       marginLeft: '-0.25px',
//                       opacity: 0.4
//                     }}
//                   />
//                 ))}
//               </div>

//               {/* Watch Face - Premium minimal */}
//               <div className="absolute inset-[18%] bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full shadow-[0_15px_60px_rgba(0,0,0,0.06),inset_0_-15px_40px_rgba(0,0,0,0.02)] border border-gray-200/20">
//                 {/* Glass reflection */}
//                 <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-20"></div>
                
//                 {/* Inner circles */}
//                 <div className="absolute inset-[8%] rounded-full border border-gray-100"></div>
//                 <div className="absolute inset-[16%] rounded-full border border-gray-200/15"></div>

//                 {/* Hour markers - Clean minimal */}
//                 {[...Array(12)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="absolute"
//                     style={{
//                       top: '50%',
//                       left: '50%',
//                       transform: `rotate(${i * 30}deg) translateY(-36%)`,
//                       transformOrigin: '0 0',
//                     }}
//                   >
//                     <div className={`${i % 3 === 0 ? 'w-0.5 h-4 bg-black' : 'w-0.5 h-2.5 bg-gray-400'}`}></div>
//                   </div>
//                 ))}

//                 {/* Minute markers - Subtle */}
//                 {[...Array(60)].map((_, i) => (
//                   i % 5 !== 0 && (
//                     <div
//                       key={i}
//                       className="absolute"
//                       style={{
//                         top: '50%',
//                         left: '50%',
//                         transform: `rotate(${i * 6}deg) translateY(-40%)`,
//                         transformOrigin: '0 0',
//                       }}
//                     >
//                       <div className="w-0.5 h-1.5 bg-gray-300"></div>
//                     </div>
//                   )
//                 ))}

//                 {/* Minimal Roman Numerals */}
//                 {[
//                   { num: 'XII', angle: 0 },
//                   { num: 'III', angle: 90 },
//                   { num: 'VI', angle: 180 },
//                   { num: 'IX', angle: 270 }
//                 ].map(({ num, angle }) => (
//                   <div
//                     key={num}
//                     className="absolute text-[7px] sm:text-[8px] font-serif text-gray-400 font-light"
//                     style={{
//                       top: '50%',
//                       left: '50%',
//                       transform: `rotate(${angle}deg) translateY(-48%)`,
//                       transformOrigin: '0 0',
//                       marginTop: '-3px',
//                     }}
//                   >
//                     {num}
//                   </div>
//                 ))}

//                 {/* Watch Hands - Precision */}
//                 {/* Hour Hand */}
//                 <div
//                   className="absolute top-1/2 left-1/2 w-1 bg-black rounded-full origin-bottom transition-all duration-1000"
//                   style={{
//                     height: '20%',
//                     transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
//                     transformOrigin: 'bottom center',
//                   }}
//                 >
//                   <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-black rounded-full"></div>
//                 </div>

//                 {/* Minute Hand */}
//                 <div
//                   className="absolute top-1/2 left-1/2 w-0.5 bg-gray-400 rounded-full origin-bottom transition-all duration-1000"
//                   style={{
//                     height: '28%',
//                     transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
//                     transformOrigin: 'bottom center',
//                   }}
//                 >
//                   <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
//                 </div>

//                 {/* Second Hand */}
//                 <div
//                   className="absolute top-1/2 left-1/2 w-0.5 bg-red-400 rounded-full origin-bottom transition-all duration-1000"
//                   style={{
//                     height: '30%',
//                     transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
//                     transformOrigin: 'bottom center',
//                   }}
//                 >
//                   <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
//                 </div>

//                 {/* Center dot */}
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full border border-white shadow-sm">
//                   <div className="absolute inset-[2px] rounded-full bg-gray-800"></div>
//                 </div>
//               </div>

//               {/* Professional floating badges - Smaller, cleaner */}
//               <div className="absolute -top-4 -right-2 bg-white/90 backdrop-blur-md shadow-premium rounded-lg px-2.5 py-1 border border-gray-100/50 animate-float">
//                 <div className="flex items-center gap-1">
//                   <span className="text-yellow-500 text-xs">★</span>
//                   <span className="text-[10px] font-medium text-black">4.9</span>
//                 </div>
//               </div>
//               <div className="absolute -bottom-4 -left-2 bg-white/90 backdrop-blur-md shadow-premium rounded-lg px-2.5 py-1 border border-gray-100/50 animate-float-delayed">
//                 <div className="flex items-center gap-1">
//                   <span className="text-[9px] font-medium text-gray-400">✦</span>
//                   <span className="text-[9px] font-medium text-gray-400">Premium</span>
//                 </div>
//               </div>

//               {/* Subtle glow */}
//               <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gray-200/5 via-transparent to-gray-300/5 pointer-events-none"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
//         <span className="text-[8px] sm:text-[10px] tracking-[4px] uppercase font-light">Scroll</span>
//         <div className="w-[1px] h-6 sm:h-8 bg-gradient-to-b from-gray-400 to-transparent"></div>
//       </div>
//     </section>
//   );
// };

// export default Banner;













// 'use client';

// import React, { useRef, useEffect } from 'react';

// const Banner: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     // Ensure video plays on load
//     if (videoRef.current) {
//       videoRef.current.play().catch(error => {
//         console.log('Video autoplay prevented:', error);
//       });
//     }
//   }, []);

//   return (
//     <section className="relative w-full h-screen overflow-hidden">
//       {/* Video Background */}
//       <div className="absolute inset-0 w-full h-full">
//         <video
//           ref={videoRef}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
//           autoPlay
//           loop
//           muted
//           playsInline
//           preload="auto"
//         >
//           <source src="/videos/watch-banner.mp4" type="video/mp4" />
//           {/* Fallback for unsupported browsers */}
//           Your browser does not support the video tag.
//         </video>
//       </div>

//       {/* Overlay for better video visibility */}
//       <div className="absolute inset-0 bg-black/20"></div>

//       {/* Scroll Indicator - Minimal */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce z-10">
//         <span className="text-[8px] sm:text-[10px] tracking-[4px] uppercase font-light">Scroll</span>
//         <div className="w-[1px] h-6 sm:h-8 bg-gradient-to-b from-white/50 to-transparent"></div>
//       </div>
//     </section>
//   );
// };

// export default Banner;






'use client';

import React, { useRef, useEffect } from 'react';

const Banner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log('Video autoplay prevented');
      });
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden sticky top-0 z-10">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/watch-banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce z-10">
        <span className="text-[8px] sm:text-[10px] tracking-[4px] uppercase font-light">
          Scroll
        </span>
        <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
};

export default Banner;