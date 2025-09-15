
// import React, { useState, useEffect } from 'react';
// import { Zap, Car } from 'lucide-react';

// const SplashScreen = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [isCharging, setIsCharging] = useState(false);
//   const [showText, setShowText] = useState(false);
//   const [vehiclePosition, setVehiclePosition] = useState(-30);
//   const [animationPhase, setAnimationPhase] = useState('approach'); // approach, charging, departure
//   const [chargingComplete, setChargingComplete] = useState(false);

//   useEffect(() => {
//     let vehicleTimer;
//     let progressTimer;
//     let departureTimer;

//     // Phase 1: BMW M5 approaches the charging station
//     const startApproach = () => {
//       vehicleTimer = setInterval(() => {
//         setVehiclePosition(prev => {
//           if (prev >= 42) { // Stop at charging station
//             clearInterval(vehicleTimer);
//             setAnimationPhase('charging');
//             // Start charging after a brief pause
//             setTimeout(() => {
//               setIsCharging(true);
//               startCharging();
//             }, 1000);
//             return 42;
//           }
//           return prev + 0.8;
//         });
//       }, 50);
//     };

//     // Phase 2: Charging process (0-100%)
//     const startCharging = () => {
//       progressTimer = setInterval(() => {
//         setProgress(prev => {
//           if (prev >= 100) {
//             clearInterval(progressTimer);
//             setChargingComplete(true);
//             setIsCharging(false);
//             // Start departure after charging completes
//             setTimeout(() => {
//               setAnimationPhase('departure');
//               startDeparture();
//             }, 1500);
//             return 100;
//           }
//           return prev + 1.5;
//         });
//       }, 80);
//     };

//     // Phase 3: BMW M5 departs
//     const startDeparture = () => {
//       setShowText(true);
//       departureTimer = setInterval(() => {
//         setVehiclePosition(prev => {
//           if (prev >= 120) { // Car exits screen
//             clearInterval(departureTimer);
//             setTimeout(onComplete, 2000); // Complete splash screen
//             return 120;
//           }
//           return prev + 1.2;
//         });
//       }, 40);
//     };

//     // Start the sequence
//     startApproach();

//     return () => {
//       if (vehicleTimer) clearInterval(vehicleTimer);
//       if (progressTimer) clearInterval(progressTimer);
//       if (departureTimer) clearInterval(departureTimer);
//     };
//   }, [onComplete]);

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-800 flex items-center justify-center z-50 overflow-hidden">
//       {/* BMW-themed gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-blue-600 to-indigo-700 opacity-90"></div>
//       <div className="absolute inset-0 bg-gradient-to-bl from-white via-blue-300 to-blue-500 opacity-40"></div>
      
//       {/* Animated background particles */}
//       <div className="absolute inset-0">
//         {[...Array(40)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-white rounded-full animate-pulse opacity-30"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 4}s`,
//               animationDuration: `${2 + Math.random() * 3}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Electric energy waves */}
//       <div className="absolute inset-0 opacity-20">
//         {[...Array(5)].map((_, i) => (
//           <div
//             key={`wave-${i}`}
//             className="absolute w-full h-px bg-white animate-pulse"
//             style={{
//               top: `${20 + i * 15}%`,
//               animationDelay: `${i * 0.5}s`,
//               animationDuration: '4s',
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
//         {/* Road */}
//         <div className="absolute bottom-1/3 w-full h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 shadow-lg">
//           <div className="absolute top-3 left-0 w-full h-px bg-yellow-300 opacity-80"></div>
//         </div>

//         {/* CHARGEMODE Charging Station */}
//         <div className="relative mb-8">
//           <div className="w-80 h-56 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 rounded-2xl mx-auto shadow-2xl border-4 border-gray-600 relative">
//             {/* CHARGEMODE brand panel */}
//             <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-56 h-14 bg-black rounded-lg border-4 border-blue-400 overflow-hidden">
//               <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded flex items-center justify-center space-x-2">
//                 <Car className="h-6 w-6 text-white" />
//                 <span className="text-white text-xl font-bold tracking-wider">CHARGEMODE</span>
//                 <Zap className="h-6 w-6 text-yellow-300" />
//               </div>
//               <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
//             </div>
            
//             {/* BMW-specific charging port */}
//             <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
//               <div className="w-20 h-16 bg-gray-600 rounded-lg border-4 border-gray-500 relative">
//                 <div className={`absolute inset-3 rounded transition-all duration-500 ${isCharging ? 'bg-blue-400 animate-pulse' : 'bg-gray-700'}`}>
//                   {isCharging && (
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <Zap className="h-6 w-6 text-white animate-bounce" />
//                     </div>
//                   )}
//                 </div>
//                 {/* BMW blue glow when charging */}
//                 {isCharging && (
//                   <div className="absolute -inset-2 bg-blue-400 opacity-30 rounded-lg animate-pulse"></div>
//                 )}
//               </div>
//             </div>
            
//             {/* Real-time status display */}
//             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-gray-800 rounded border-2 border-gray-600 flex items-center justify-center">
//               <span className={`text-sm font-bold ${isCharging ? 'text-green-400' : chargingComplete ? 'text-blue-400' : 'text-gray-400'}`}>
//                 {animationPhase === 'approach' ? 'READY' : 
//                  animationPhase === 'charging' ? `CHARGING ${Math.round(progress)}%` : 
//                  'COMPLETE'}
//               </span>
//             </div>
            
//             {/* LED side panels */}
//             <div className={`absolute left-4 top-14 w-6 h-28 rounded transition-all duration-300 ${isCharging ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`}></div>
//             <div className={`absolute right-4 top-14 w-6 h-28 rounded transition-all duration-300 ${isCharging ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`}></div>
            
//             {/* Warning stripes */}
//             <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-b-2xl">
//               <div className="absolute inset-0 bg-black opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 16px)' }}></div>
//             </div>
//           </div>

//           {/* Charging cable */}
//           <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
//             <div className="w-3 h-20 bg-gradient-to-b from-gray-600 to-black rounded-full border-2 border-gray-400">
//               <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full transition-all duration-300 ${isCharging ? 'bg-blue-400 animate-ping' : 'bg-gray-500'}`}>
//                 <div className={`absolute inset-1 rounded-full ${isCharging ? 'bg-blue-300' : 'bg-gray-600'}`}></div>
//               </div>
//             </div>
//           </div>

//           {/* Energy flow particles during charging */}
//           {isCharging && (
//             <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
//               {[...Array(10)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-80"
//                   style={{
//                     left: `${(i - 5) * 6}px`,
//                     animationDelay: `${i * 0.1}s`,
//                     animationDuration: '1s',
//                   }}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* BMW M5 */}
//         <div 
//           className="absolute bottom-1/3 transition-all duration-100 ease-linear"
//           style={{ 
//             left: `${vehiclePosition}%`,
//             transform: 'translateY(50%)',
//             filter: animationPhase === 'departure' ? 'blur(1px)' : 'none',
//           }}
//         >
//           <div className="relative">
//             {/* BMW M5 Body */}
//             <div className="w-28 h-14 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-lg shadow-2xl relative border border-gray-500">
//               {/* BMW distinctive shape */}
//               <div className="absolute top-0 left-3 w-18 h-5 bg-gray-600 rounded-t-lg"></div>
              
//               {/* Windshield */}
//               <div className="absolute top-1 left-5 w-14 h-5 bg-blue-100 rounded-t-md opacity-60 border border-gray-400"></div>
              
//               {/* BMW Kidney Grille */}
//               <div className="absolute top-3 left-0 w-2 h-6 bg-black rounded-r-lg border border-gray-300">
//                 {/* Kidney grille pattern */}
//                 <div className="absolute inset-0.5 bg-gray-800 rounded-r-md">
//                   <div className="absolute top-1 left-0.5 w-0.5 h-3 bg-gray-600 rounded"></div>
//                 </div>
//               </div>
              
//               {/* BMW Logo */}
//               <div className="absolute top-5 left-1 w-3 h-3 bg-white rounded-full border border-gray-400 overflow-hidden">
//                 <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-blue-500"></div>
//                 <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white"></div>
//                 <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-white"></div>
//                 <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-blue-500"></div>
//                 {isCharging && <div className="absolute inset-0 animate-spin bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-50"></div>}
//               </div>
              
//               {/* Headlights */}
//               <div className="absolute top-6 left-0 w-2 h-3 bg-yellow-200 rounded-r-md animate-pulse"></div>
//               <div className="absolute bottom-3 left-0 w-2 h-2 bg-red-400 rounded-r-md"></div>
              
//               {/* M5 Badge */}
//               <div className="absolute top-8 left-6 w-4 h-1.5 bg-red-500 rounded text-xs text-white flex items-center justify-center">
//                 <span className="text-xs font-bold">M5</span>
//               </div>
              
//               {/* Door lines */}
//               <div className="absolute top-2 left-7 w-px h-8 bg-gray-800"></div>
//               <div className="absolute top-2 left-18 w-px h-8 bg-gray-800"></div>
              
//               {/* Side mirrors */}
//               <div className="absolute top-2 left-0.5 w-1 h-1.5 bg-black rounded"></div>
//               <div className="absolute top-2 right-0.5 w-1 h-1.5 bg-black rounded"></div>
              
//               {/* Charging port (glows when charging) */}
//               <div className={`absolute top-6 right-2 w-2 h-2 rounded-full transition-all duration-300 ${isCharging ? 'bg-blue-400 animate-pulse shadow-blue-400 shadow-lg' : 'bg-gray-600'}`}>
//                 {isCharging && <div className="absolute inset-0.5 bg-blue-200 rounded-full"></div>}
//               </div>
//             </div>

//             {/* M Performance Wheels */}
//             <div className="absolute -bottom-2 left-3 w-5 h-5 bg-gray-900 rounded-full border-2 border-gray-700 shadow-lg">
//               <div className="absolute inset-0.5 bg-gray-800 rounded-full">
//                 <div className="absolute inset-0.5 border border-gray-600 rounded-full">
//                   {/* Spinning wheel effect during movement */}
//                   {(animationPhase === 'approach' || animationPhase === 'departure') && (
//                     <div className="absolute inset-0 animate-spin">
//                       <div className="w-full h-0.5 bg-gray-400 absolute top-1/2 transform -translate-y-0.5"></div>
//                       <div className="h-full w-0.5 bg-gray-400 absolute left-1/2 transform -translate-x-0.5"></div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="absolute -bottom-2 right-3 w-5 h-5 bg-gray-900 rounded-full border-2 border-gray-700 shadow-lg">
//               <div className="absolute inset-0.5 bg-gray-800 rounded-full">
//                 <div className="absolute inset-0.5 border border-gray-600 rounded-full">
//                   {(animationPhase === 'approach' || animationPhase === 'departure') && (
//                     <div className="absolute inset-0 animate-spin">
//                       <div className="w-full h-0.5 bg-gray-400 absolute top-1/2 transform -translate-y-0.5"></div>
//                       <div className="h-full w-0.5 bg-gray-400 absolute left-1/2 transform -translate-x-0.5"></div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Exhaust pipes */}
//             <div className="absolute bottom-1 -right-1 w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
//             <div className="absolute bottom-2.5 -right-1 w-1.5 h-1.5 bg-gray-700 rounded-full"></div>

//             {/* Battery indicator */}
//             <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-5 bg-gray-900 rounded border-2 border-gray-700">
//               <div
//                 className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded transition-all duration-300"
//                 style={{ width: `${progress}%` }}
//               ></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
//               </div>
//             </div>

//             {/* Motion blur effects during movement */}
//             {(animationPhase === 'approach' || animationPhase === 'departure') && (
//               <div className="absolute top-0 -left-8 w-8 h-14 bg-gradient-to-r from-transparent to-blue-300 opacity-30 rounded"></div>
//             )}
//           </div>
//         </div>

//         {/* Crystal Clear CHARGEMODE Logo */}
//         <div className="space-y-6 mt-20">
//           <div className="flex items-center justify-center space-x-6">
//             <div className="relative">
//               <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-3xl shadow-2xl border-4 border-white">
//                 <div className="flex items-center space-x-2">
//                   <Car className="h-8 w-8 text-white drop-shadow-lg" />
//                   <Zap className="h-8 w-8 text-yellow-300 drop-shadow-lg" />
//                 </div>
//               </div>
//               <div className="absolute inset-0 bg-white opacity-20 rounded-3xl animate-pulse"></div>
//             </div>
            
//             <div className="relative">
//               <h1 className="text-5xl font-black text-white drop-shadow-2xl tracking-wide">
//                 CHARGE<span className="text-yellow-300">MODE</span>
//               </h1>
//               <div className="absolute inset-0 text-5xl font-black text-blue-200 opacity-30 blur-sm">
//                 CHARGEMODE
//               </div>
//             </div>
//           </div>
// <div>
//   <br />
//    <br />
//    <br />


//    <br /><br /><br />
// </div>
//           <div className="text-center">
//             <p className="text-white text-xl font-bold drop-shadow-lg tracking-wide">
//               EMPOWERING THE FUTURE OF E-MOBILITY
//             </p>
//           </div>

//           {showText && (
//             <div className="animate-bounce text-center">
//               <p className="text-yellow-200 text-lg font-semibold drop-shadow-lg">
//                 BMW M5 • Charging Complete • Ready to Go
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Enhanced Progress bar - More Visible */}
//         <div className="mt-12 w-80 mx-auto">
//           {/* <div className="relative w-full bg-black rounded-full h-6 border-4 border-orange-400 shadow-2xl overflow-hidden"> */}
//             {/* <div
//               className="bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 h-full rounded-full transition-all duration-300 ease-out relative shadow-lg"
//               style={{ width: `${progress}%` }}
//             >
//               <div className="absolute inset-0 bg-orange-200 opacity-50 animate-pulse"></div>
//               <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-30"></div>
//               {progress > 0 && (
//                 <div className="absolute right-0 top-0 w-3 h-full bg-white animate-pulse shadow-lg"></div>
//               )}
//             </div> */}
//             {/* Progress percentage inside the bar */}
//             {/* <div className="absolute inset-0 flex items-center justify-center">
//               <span className="text-white text-sm font-black drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
//                 {Math.round(progress)}%
//               </span>
//             </div> */}
//           {/* </div> */}
//           <p className="text-black text-lg mt-4 font-black text-center drop-shadow-lg bg-orange-300 px-4 py-2 rounded-lg border-2 border-black">
//             {animationPhase === 'approach' ? 'BMW M5 Approaching...' :
//              animationPhase === 'charging' ? `Charging BMW M5... ${Math.round(progress)}%` :
//              'BMW M5 Departing...'}
//           </p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         @keyframes glow {
//           0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
//           50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SplashScreen;




// import React, { useState, useEffect } from 'react';
// import { Zap, Car } from 'lucide-react';

// const SplashScreen = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [isCharging, setIsCharging] = useState(false);
//   const [showText, setShowText] = useState(false);
//   const [vehiclePosition, setVehiclePosition] = useState(-30);
//   const [animationPhase, setAnimationPhase] = useState('approach'); // approach, charging, departure
//   const [chargingComplete, setChargingComplete] = useState(false);

//   useEffect(() => {
//     let vehicleTimer;
//     let progressTimer;
//     let departureTimer;

//     // Phase 1: BMW M5 approaches the charging station
//     const startApproach = () => {
//       vehicleTimer = setInterval(() => {
//         setVehiclePosition(prev => {
//           if (prev >= 42) { // Stop at charging station
//             clearInterval(vehicleTimer);
//             setAnimationPhase('charging');
//             // Start charging after a brief pause
//             setTimeout(() => {
//               setIsCharging(true);
//               startCharging();
//             }, 1000);
//             return 42;
//           }
//           return prev + 0.8;
//         });
//       }, 50);
//     };

//     // Phase 2: Charging process (0-100%)
//     const startCharging = () => {
//       progressTimer = setInterval(() => {
//         setProgress(prev => {
//           if (prev >= 100) {
//             clearInterval(progressTimer);
//             setChargingComplete(true);
//             setIsCharging(false);
//             // Start departure after charging completes
//             setTimeout(() => {
//               setAnimationPhase('departure');
//               startDeparture();
//             }, 1500);
//             return 100;
//           }
//           return prev + 1.5;
//         });
//       }, 80);
//     };

//     // Phase 3: BMW M5 departs
//     const startDeparture = () => {
//       setShowText(true);
//       departureTimer = setInterval(() => {
//         setVehiclePosition(prev => {
//           if (prev >= 120) { // Car exits screen
//             clearInterval(departureTimer);
//             setTimeout(onComplete, 2000); // Complete splash screen
//             return 120;
//           }
//           return prev + 1.2;
//         });
//       }, 40);
//     };

//     // Start the sequence
//     startApproach();

//     return () => {
//       if (vehicleTimer) clearInterval(vehicleTimer);
//       if (progressTimer) clearInterval(progressTimer);
//       if (departureTimer) clearInterval(departureTimer);
//     };
//   }, [onComplete]);

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-800 flex items-center justify-center z-50 overflow-hidden">
//       {/* BMW-themed gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-blue-600 to-indigo-700 opacity-90"></div>
//       <div className="absolute inset-0 bg-gradient-to-bl from-white via-blue-300 to-blue-500 opacity-40"></div>
      
//       {/* Animated background particles */}
//       <div className="absolute inset-0">
//         {[...Array(40)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-white rounded-full animate-pulse opacity-30"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 4}s`,
//               animationDuration: `${2 + Math.random() * 3}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Electric energy waves */}
//       <div className="absolute inset-0 opacity-20">
//         {[...Array(5)].map((_, i) => (
//           <div
//             key={`wave-${i}`}
//             className="absolute w-full h-px bg-white animate-pulse"
//             style={{
//               top: `${20 + i * 15}%`,
//               animationDelay: `${i * 0.5}s`,
//               animationDuration: '4s',
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
//         {/* Road */}
//         <div className="absolute bottom-1/3 w-full h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 shadow-lg">
//           <div className="absolute top-3 left-0 w-full h-px bg-yellow-300 opacity-80"></div>
//         </div>

//         {/* CHARGEMODE Charging Station */}
//         <div className="relative mb-8">
//           <div className="w-80 h-56 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 rounded-2xl mx-auto shadow-2xl border-4 border-gray-600 relative">
//             {/* CHARGEMODE brand panel */}
//             <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-56 h-14 bg-black rounded-lg border-4 border-blue-400 overflow-hidden">
//               <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded flex items-center justify-center space-x-2">
//                 <Car className="h-6 w-6 text-white" />
//                 <span className="text-white text-xl font-bold tracking-wider">CHARGEMODE</span>
//                 <Zap className="h-6 w-6 text-yellow-300" />
//               </div>
//               <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
//             </div>
            
//             {/* BMW-specific charging port */}
//             <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
//               <div className="w-20 h-16 bg-gray-600 rounded-lg border-4 border-gray-500 relative">
//                 <div className={`absolute inset-3 rounded transition-all duration-500 ${isCharging ? 'bg-blue-400 animate-pulse' : 'bg-gray-700'}`}>
//                   {isCharging && (
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <Zap className="h-6 w-6 text-white animate-bounce" />
//                     </div>
//                   )}
//                 </div>
//                 {/* BMW blue glow when charging */}
//                 {isCharging && (
//                   <div className="absolute -inset-2 bg-blue-400 opacity-30 rounded-lg animate-pulse"></div>
//                 )}
//               </div>
//             </div>
            
//             {/* Real-time status display */}
//             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-gray-800 rounded border-2 border-gray-600 flex items-center justify-center">
//               <span className={`text-sm font-bold ${isCharging ? 'text-green-400' : chargingComplete ? 'text-blue-400' : 'text-gray-400'}`}>
//                 {animationPhase === 'approach' ? 'READY' : 
//                  animationPhase === 'charging' ? `CHARGING ${Math.round(progress)}%` : 
//                  'COMPLETE'}
//               </span>
//             </div>
            
//             {/* LED side panels */}
//             <div className={`absolute left-4 top-14 w-6 h-28 rounded transition-all duration-300 ${isCharging ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`}></div>
//             <div className={`absolute right-4 top-14 w-6 h-28 rounded transition-all duration-300 ${isCharging ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`}></div>
            
//             {/* Warning stripes */}
//             <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-b-2xl">
//               <div className="absolute inset-0 bg-black opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 16px)' }}></div>
//             </div>
//           </div>

//           {/* Charging cable */}
//           <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
//             <div className="w-3 h-20 bg-gradient-to-b from-gray-600 to-black rounded-full border-2 border-gray-400">
//               <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full transition-all duration-300 ${isCharging ? 'bg-blue-400 animate-ping' : 'bg-gray-500'}`}>
//                 <div className={`absolute inset-1 rounded-full ${isCharging ? 'bg-blue-300' : 'bg-gray-600'}`}></div>
//               </div>
//             </div>
//           </div>

//           {/* Energy flow particles during charging */}
//           {isCharging && (
//             <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
//               {[...Array(10)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-80"
//                   style={{
//                     left: `${(i - 5) * 6}px`,
//                     animationDelay: `${i * 0.1}s`,
//                     animationDuration: '1s',
//                   }}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* BMW M5 */}
//         <div 
//           className="absolute bottom-1/3 transition-all duration-100 ease-linear"
//           style={{ 
//             left: `${vehiclePosition}%`,
//             transform: 'translateY(50%)',
//             filter: animationPhase === 'departure' ? 'blur(1px)' : 'none',
//           }}
//         >
//           <div className="relative">
//             {/* BMW M5 Body */}
//             <div className="w-28 h-14 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-lg shadow-2xl relative border border-gray-500">
//               {/* BMW distinctive shape */}
//               <div className="absolute top-0 left-3 w-18 h-5 bg-gray-600 rounded-t-lg"></div>
              
//               {/* Windshield */}
//               <div className="absolute top-1 left-5 w-14 h-5 bg-blue-100 rounded-t-md opacity-60 border border-gray-400"></div>
              
//               {/* BMW Kidney Grille */}
//               <div className="absolute top-3 left-0 w-2 h-6 bg-black rounded-r-lg border border-gray-300">
//                 {/* Kidney grille pattern */}
//                 <div className="absolute inset-0.5 bg-gray-800 rounded-r-md">
//                   <div className="absolute top-1 left-0.5 w-0.5 h-3 bg-gray-600 rounded"></div>
//                 </div>
//               </div>
              
//               {/* BMW Logo */}
//               <div className="absolute top-5 left-1 w-3 h-3 bg-white rounded-full border border-gray-400 overflow-hidden">
//                 <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-blue-500"></div>
//                 <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white"></div>
//                 <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-white"></div>
//                 <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-blue-500"></div>
//                 {isCharging && <div className="absolute inset-0 animate-spin bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-50"></div>}
//               </div>
              
//               {/* Headlights */}
//               <div className="absolute top-6 left-0 w-2 h-3 bg-yellow-200 rounded-r-md animate-pulse"></div>
//               <div className="absolute bottom-3 left-0 w-2 h-2 bg-red-400 rounded-r-md"></div>
              
//               {/* M5 Badge */}
//               <div className="absolute top-8 left-6 w-4 h-1.5 bg-red-500 rounded text-xs text-white flex items-center justify-center">
//                 <span className="text-xs font-bold">M5</span>
//               </div>
              
//               {/* Door lines */}
//               <div className="absolute top-2 left-7 w-px h-8 bg-gray-800"></div>
//               <div className="absolute top-2 left-18 w-px h-8 bg-gray-800"></div>
              
//               {/* Side mirrors */}
//               <div className="absolute top-2 left-0.5 w-1 h-1.5 bg-black rounded"></div>
//               <div className="absolute top-2 right-0.5 w-1 h-1.5 bg-black rounded"></div>
              
//               {/* Charging port (glows when charging) */}
//               <div className={`absolute top-6 right-2 w-2 h-2 rounded-full transition-all duration-300 ${isCharging ? 'bg-blue-400 animate-pulse shadow-blue-400 shadow-lg' : 'bg-gray-600'}`}>
//                 {isCharging && <div className="absolute inset-0.5 bg-blue-200 rounded-full"></div>}
//               </div>
//             </div>

//             {/* M Performance Wheels */}
//             <div className="absolute -bottom-2 left-3 w-5 h-5 bg-gray-900 rounded-full border-2 border-gray-700 shadow-lg">
//               <div className="absolute inset-0.5 bg-gray-800 rounded-full">
//                 <div className="absolute inset-0.5 border border-gray-600 rounded-full">
//                   {/* Spinning wheel effect during movement */}
//                   {(animationPhase === 'approach' || animationPhase === 'departure') && (
//                     <div className="absolute inset-0 animate-spin">
//                       <div className="w-full h-0.5 bg-gray-400 absolute top-1/2 transform -translate-y-0.5"></div>
//                       <div className="h-full w-0.5 bg-gray-400 absolute left-1/2 transform -translate-x-0.5"></div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="absolute -bottom-2 right-3 w-5 h-5 bg-gray-900 rounded-full border-2 border-gray-700 shadow-lg">
//               <div className="absolute inset-0.5 bg-gray-800 rounded-full">
//                 <div className="absolute inset-0.5 border border-gray-600 rounded-full">
//                   {(animationPhase === 'approach' || animationPhase === 'departure') && (
//                     <div className="absolute inset-0 animate-spin">
//                       <div className="w-full h-0.5 bg-gray-400 absolute top-1/2 transform -translate-y-0.5"></div>
//                       <div className="h-full w-0.5 bg-gray-400 absolute left-1/2 transform -translate-x-0.5"></div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Exhaust pipes */}
//             <div className="absolute bottom-1 -right-1 w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
//             <div className="absolute bottom-2.5 -right-1 w-1.5 h-1.5 bg-gray-700 rounded-full"></div>

//             {/* Battery indicator */}
//             <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-5 bg-gray-900 rounded border-2 border-gray-700">
//               <div
//                 className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded transition-all duration-300"
//                 style={{ width: `${progress}%` }}
//               ></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
//               </div>
//             </div>

//             {/* Motion blur effects during movement */}
//             {(animationPhase === 'approach' || animationPhase === 'departure') && (
//               <div className="absolute top-0 -left-8 w-8 h-14 bg-gradient-to-r from-transparent to-blue-300 opacity-30 rounded"></div>
//             )}
//           </div>
//         </div>

//         {/* Crystal Clear CHARGEMODE Logo */}
//         <div className="space-y-6 mt-20">
//           <div className="flex items-center justify-center space-x-6">
//             <div className="relative">
//               <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-3xl shadow-2xl border-4 border-white">
//                 <div className="flex items-center space-x-2">
//                   <Car className="h-8 w-8 text-white drop-shadow-lg" />
//                   <Zap className="h-8 w-8 text-yellow-300 drop-shadow-lg" />
//                 </div>
//               </div>
//               <div className="absolute inset-0 bg-white opacity-20 rounded-3xl animate-pulse"></div>
//             </div>
            
//             <div className="relative">
//               <h1 className="text-5xl font-black text-white drop-shadow-2xl tracking-wide">
//                 CHARGE<span className="text-yellow-300">MODE</span>
//               </h1>
//               <div className="absolute inset-0 text-5xl font-black text-blue-200 opacity-30 blur-sm">
//                 CHARGEMODE
//               </div>
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="text-white text-xl font-bold drop-shadow-lg tracking-wide">
//               EMPOWERING THE FUTURE OF E-MOBILITY
//             </p>
//           </div>

//           {showText && (
//             <div className="animate-bounce text-center">
//               <p className="text-yellow-200 text-lg font-semibold drop-shadow-lg">
//                 BMW M5 • Charging Complete • Ready to Go
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Enhanced Progress bar */}
//         <div className="mt-12 w-80 mx-auto">
//           <div className="relative w-full bg-gray-800 rounded-full h-3 border-4 border-white shadow-xl overflow-hidden">
//             <div
//               className="bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 h-full rounded-full transition-all duration-300 ease-out relative"
//               style={{ width: `${progress}%` }}
//             >
//               <div className="absolute inset-0 bg-white opacity-40 animate-pulse"></div>
//               {progress > 0 && (
//                 <div className="absolute right-0 top-0 w-2 h-full bg-white animate-pulse"></div>
//               )}
//             </div>
//           </div>
//           <p className="text-white text-base mt-3 font-bold text-center drop-shadow-lg">
//             {animationPhase === 'approach' ? 'BMW M5 Approaching...' :
//              animationPhase === 'charging' ? `Charging BMW M5... ${Math.round(progress)}%` :
//              'BMW M5 Departing...'}
//           </p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         @keyframes glow {
//           0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
//           50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SplashScreen;



// import React, { useState, useEffect } from 'react';
// import { Zap } from 'lucide-react';

// const SplashScreen = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [isCharging, setIsCharging] = useState(false);
//   const [showText, setShowText] = useState(false);
//   const [vehiclePosition, setVehiclePosition] = useState(-25);
//   const [vehicleReachedStation, setVehicleReachedStation] = useState(false);
//   const [isDrifting, setIsDrifting] = useState(false);

//   useEffect(() => {
//     // Vehicle movement with drift effect
//     const vehicleTimer = setInterval(() => {
//       setVehiclePosition(prev => {
//         if (prev >= 40 && prev < 45) {
//           setIsDrifting(true);
//         }
//         if (prev >= 50) {
//           setVehicleReachedStation(true);
//           setIsDrifting(false);
//           clearInterval(vehicleTimer);
//           // Start charging after vehicle reaches station
//           setTimeout(() => setIsCharging(true), 800);
//           return 50;
//         }
//         return prev + 0.6;
//       });
//     }, 40);

//     // Progress animation starts after vehicle reaches station
//     let progressTimer;
//     const startProgress = () => {
//       progressTimer = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(progressTimer);
//             setTimeout(() => {
//               setShowText(true);
//               setTimeout(onComplete, 1500);
//             }, 500);
//             return 100;
//           }
//           return prev + 1.2;
//         });
//       }, 100);
//     };

//     setTimeout(startProgress, 3500);

//     return () => {
//       clearInterval(vehicleTimer);
//       if (progressTimer) clearInterval(progressTimer);
//     };
//   }, [onComplete]);

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-orange-600 to-red-600 flex items-center justify-center z-50 overflow-hidden">
//       {/* Enhanced orange gradient background with animated elements */}
//       <div className="absolute inset-0 bg-gradient-to-tr from-orange-300 via-orange-500 to-red-500 opacity-90"></div>
//       <div className="absolute inset-0 bg-gradient-to-bl from-yellow-400 via-orange-400 to-orange-600 opacity-60"></div>
      
//       {/* Animated background particles */}
//       <div className="absolute inset-0">
//         {[...Array(50)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-white rounded-full animate-pulse opacity-30"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 4}s`,
//               animationDuration: `${2 + Math.random() * 3}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Electric energy waves */}
//       <div className="absolute inset-0 opacity-20">
//         {[...Array(5)].map((_, i) => (
//           <div
//             key={`wave-${i}`}
//             className="absolute w-full h-px bg-white animate-pulse"
//             style={{
//               top: `${20 + i * 15}%`,
//               animationDelay: `${i * 0.5}s`,
//               animationDuration: '4s',
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
//         {/* Road with drift marks */}
//         <div className="absolute bottom-1/3 w-full h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 shadow-lg">
//           <div className="absolute top-2 left-0 w-full h-px bg-yellow-300 opacity-80"></div>
//           {/* Drift marks */}
//           {isDrifting && (
//             <div className="absolute top-0 w-full h-full">
//               {[...Array(10)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute w-8 h-1 bg-black opacity-60 rounded"
//                   style={{
//                     left: `${40 + i * 2}%`,
//                     top: `${Math.random() * 100}%`,
//                     transform: `rotate(${Math.random() * 30 - 15}deg)`,
//                   }}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* MASSIVE Enhanced Charging Station - Doubled Size */}
//         <div className="relative mb-8">
//           {/* Main charging station structure - Much larger */}
//           <div className="w-96 h-64 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 rounded-2xl mx-auto shadow-2xl border-4 border-gray-600 relative">
//             {/* Station brand panel */}
//             <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-64 h-16 bg-black rounded-lg border-4 border-orange-400 overflow-hidden">
//               <div className="absolute inset-2 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
//                 <span className="text-white text-2xl font-bold tracking-wider">chargeMOD</span>
//               </div>
//               <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
//             </div>
            
//             {/* Large charging ports */}
//             <div className="absolute top-28 left-1/2 transform -translate-x-1/2 flex space-x-8">
//               <div className="w-24 h-20 bg-gray-600 rounded-lg border-4 border-gray-500 relative">
//                 <div className={`absolute inset-4 rounded ${isCharging ? 'bg-green-400 animate-pulse' : 'bg-gray-700'}`}>
//                   {isCharging && (
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <Zap className="h-8 w-8 text-white animate-bounce" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="w-24 h-20 bg-gray-600 rounded-lg border-4 border-gray-500 relative">
//                 <div className="absolute inset-4 bg-gray-700 rounded"></div>
//               </div>
//             </div>
            
//             {/* Control panel */}
//             <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-gray-800 rounded border-2 border-gray-600">
//               <div className="absolute top-2 left-4 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
//               <div className="absolute top-2 right-4 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
//               <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-orange-400 rounded animate-pulse"></div>
//             </div>
            
//             {/* Side panels */}
//             <div className="absolute left-4 top-16 w-8 h-32 bg-orange-500 rounded opacity-80"></div>
//             <div className="absolute right-4 top-16 w-8 h-32 bg-orange-500 rounded opacity-80"></div>
            
//             {/* Warning stripes */}
//             <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-b-2xl">
//               <div className="absolute inset-0 bg-black opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.3) 10px, rgba(0,0,0,0.3) 20px)' }}></div>
//             </div>
//           </div>

//           {/* Enhanced charging cables */}
//           <div className="absolute top-32 left-1/2 transform -translate-x-1/2 -translate-x-8">
//             <div className="w-4 h-32 bg-gradient-to-b from-gray-600 to-black rounded-full border-2 border-gray-400">
//               <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full ${isCharging ? 'bg-green-400 animate-ping' : 'bg-gray-500'}`}>
//                 <div className={`absolute inset-1 rounded-full ${isCharging ? 'bg-green-300' : 'bg-gray-600'}`}></div>
//               </div>
//             </div>
//           </div>

//           {/* Energy flow effects */}
//           {isCharging && (
//             <div className="absolute top-36 left-1/2 transform -translate-x-1/2">
//               {[...Array(12)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-80"
//                   style={{
//                     left: `${(i - 6) * 8}px`,
//                     animationDelay: `${i * 0.1}s`,
//                     animationDuration: '1s',
//                   }}
//                 ></div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Detailed Porsche 911 with drift animation */}
//         <div 
//           className={`absolute bottom-1/3 transition-all duration-75 ease-linear ${isDrifting ? 'transform rotate-12' : ''}`}
//           style={{ 
//             left: `${vehiclePosition}%`,
//             transform: `translateY(50%) ${isDrifting ? 'rotate(8deg) scale(1.1)' : 'rotate(0deg) scale(1)'}`,
//             transition: isDrifting ? 'all 0.3s ease-out' : 'left 0.1s linear',
//           }}
//         >
//           {/* Porsche 911 - Detailed Design */}
//           <div className="relative">
//             {/* Main body */}
//             <div className="w-32 h-16 bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-lg shadow-2xl relative border border-red-300">
//               {/* Porsche distinctive curve */}
//               <div className="absolute top-0 left-4 w-20 h-6 bg-red-400 rounded-t-full"></div>
              
//               {/* Windshield */}
//               <div className="absolute top-1 left-6 w-16 h-6 bg-blue-200 rounded-t-lg opacity-70 border border-gray-300"></div>
              
//               {/* Side windows */}
//               <div className="absolute top-3 left-2 w-4 h-4 bg-blue-200 rounded opacity-60"></div>
//               <div className="absolute top-3 right-2 w-4 h-4 bg-blue-200 rounded opacity-60"></div>
              
//               {/* Headlights */}
//               <div className="absolute top-4 left-0 w-3 h-4 bg-yellow-200 rounded-r-lg animate-pulse"></div>
//               <div className="absolute bottom-4 left-0 w-3 h-4 bg-red-400 rounded-r-lg"></div>
              
//               {/* Door lines */}
//               <div className="absolute top-2 left-8 w-px h-10 bg-red-700"></div>
//               <div className="absolute top-2 left-20 w-px h-10 bg-red-700"></div>
              
//               {/* Porsche logo area */}
//               <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-yellow-400 rounded flex items-center justify-center">
//                 <div className="w-2 h-2 bg-red-600 rounded-full"></div>
//               </div>
              
//               {/* Side mirrors */}
//               <div className="absolute top-2 left-1 w-1 h-2 bg-black rounded"></div>
//               <div className="absolute top-2 right-1 w-1 h-2 bg-black rounded"></div>
              
//               {/* Rear spoiler */}
//               <div className="absolute top-1 right-2 w-6 h-1 bg-red-700 rounded"></div>
//             </div>

//             {/* Wheels - Porsche style */}
//             <div className="absolute -bottom-3 left-4 w-6 h-6 bg-gray-900 rounded-full border-4 border-gray-700 shadow-lg">
//               <div className="absolute inset-1 bg-gray-800 rounded-full">
//                 <div className="absolute inset-1 border-2 border-gray-600 rounded-full"></div>
//               </div>
//             </div>
//             <div className="absolute -bottom-3 right-4 w-6 h-6 bg-gray-900 rounded-full border-4 border-gray-700 shadow-lg">
//               <div className="absolute inset-1 bg-gray-800 rounded-full">
//                 <div className="absolute inset-1 border-2 border-gray-600 rounded-full"></div>
//               </div>
//             </div>

//             {/* Exhaust pipes */}
//             <div className="absolute bottom-2 -right-2 w-2 h-2 bg-gray-700 rounded-full"></div>
//             <div className="absolute bottom-4 -right-2 w-2 h-2 bg-gray-700 rounded-full"></div>

//             {/* Battery indicator */}
//             <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 rounded border-2 border-gray-700">
//               <div
//                 className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded transition-all duration-500"
//                 style={{ width: `${progress}%` }}
//               ></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
//               </div>
//             </div>

//             {/* Drift smoke effects */}
//             {isDrifting && (
//               <div className="absolute -bottom-1 -right-4">
//                 {[...Array(6)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="absolute w-4 h-4 bg-gray-400 rounded-full opacity-60 animate-ping"
//                     style={{
//                       left: `${i * -8}px`,
//                       animationDelay: `${i * 0.1}s`,
//                       animationDuration: '0.8s',
//                     }}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Crystal Clear CHARGE MOD Logo */}
//         <div className="space-y-6 mt-20">
//           <div className="flex items-center justify-center space-x-6">
//             {/* Clear, bold logo */}
//             <div className="relative">
//               <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-3xl shadow-2xl border-4 border-white">
//                 <Zap className="h-12 w-12 text-white drop-shadow-lg" />
//               </div>
//               <div className="absolute inset-0 bg-white opacity-20 rounded-3xl animate-pulse"></div>
//             </div>
            
//             {/* Crystal clear text */}
//             <div className="relative">
//               <h1 className="text-6xl font-black text-white drop-shadow-2xl tracking-wide">
//                 CHARGE<span className="text-yellow-300">MOD</span>
//               </h1>
//               <div className="absolute inset-0 text-6xl font-black text-orange-200 opacity-30 blur-sm">
//                 CHARGEMOD
//               </div>
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="text-white text-2xl font-bold drop-shadow-lg tracking-wide">
//               EMPOWERING THE FUTURE OF E-MOBILITY
//             </p>
//           </div>

//           {showText && (
//             <div className="animate-bounce text-center">
//               <p className="text-yellow-200 text-xl font-semibold drop-shadow-lg">
//                 Welcome to the Energy Revolution
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Enhanced Progress bar */}
//         <div className="mt-16 w-96 mx-auto">
//           <div className="relative w-full bg-gray-800 rounded-full h-4 border-4 border-white shadow-xl overflow-hidden">
//             <div
//               className="bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 h-full rounded-full transition-all duration-300 ease-out relative"
//               style={{ width: `${progress}%` }}
//             >
//               <div className="absolute inset-0 bg-white opacity-40 animate-pulse"></div>
//               {progress > 0 && (
//                 <div className="absolute right-0 top-0 w-3 h-full bg-white animate-pulse"></div>
//               )}
//             </div>
//           </div>
//           <p className="text-white text-lg mt-4 font-bold text-center drop-shadow-lg">
//             {vehicleReachedStation ? `Charging... ${Math.round(progress)}%` : 'Connecting Vehicle...'}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SplashScreen;








// import React, { useState, useEffect } from 'react';
// import { Zap } from 'lucide-react';

// const SplashScreen = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [isCharging, setIsCharging] = useState(false);
//   const [showText, setShowText] = useState(false);
//   const [vehiclePosition, setVehiclePosition] = useState(-25);
//   const [vehicleReachedStation, setVehicleReachedStation] = useState(false);
//   const [isDrifting, setIsDrifting] = useState(false);

//   useEffect(() => {
//     // Vehicle movement with drift effect
//     const vehicleTimer = setInterval(() => {
//       setVehiclePosition(prev => {
//         if (prev >= 40 && prev < 45) {
//           setIsDrifting(true);
//         }
//         if (prev >= 50) {
//           setVehicleReachedStation(true);
//           setIsDrifting(false);
//           clearInterval(vehicleTimer);
//           // Start charging after vehicle reaches station
//           setTimeout(() => setIsCharging(true), 800);
//           return 50;
//         }
//         return prev + 0.6;
//       });
//     }, 40);

//     // Progress animation starts after vehicle reaches station
//     let progressTimer;
//     const startProgress = () => {
//       progressTimer = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(progressTimer);
//             setTimeout(() => {
//               setShowText(true);
//               setTimeout(onComplete, 1500);
//             }, 500);
//             return 100;
//           }
//           return prev + 1.2;
//         });
//       }, 100);
//     };

//     setTimeout(startProgress, 3500);

//     return () => {
//       clearInterval(vehicleTimer);
//       if (progressTimer) clearInterval(progressTimer);
//     };
//   }, [onComplete]);

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-orange-600 to-red-600 flex items-center justify-center z-50 overflow-hidden">
//       {/* Enhanced orange gradient background with animated elements */}
//       <div className="absolute inset-0 bg-gradient-to-tr from-orange-300 via-orange-500 to-red-500 opacity-90"></div>
//       <div className="absolute inset-0 bg-gradient-to-bl from-yellow-400 via-orange-400 to-orange-600 opacity-60"></div>
      
//       {/* Animated background particles */}
//       <div className="absolute inset-0">
//         {[...Array(50)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-white rounded-full animate-pulse opacity-30"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 4}s`,
//               animationDuration: `${2 + Math.random() * 3}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Electric energy waves */}
//       <div className="absolute inset-0 opacity-20">
//         {[...Array(5)].map((_, i) => (
//           <div
//             key={`wave-${i}`}
//             className="absolute w-full h-px bg-white animate-pulse"
//             style={{
//               top: `${20 + i * 15}%`,
//               animationDelay: `${i * 0.5}s`,
//               animationDuration: '4s',
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
//         {/* Road with drift marks */}
//         <div className="absolute bottom-1/3 w-full h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 shadow-lg">
//           <div className="absolute top-2 left-0 w-full h-px bg-yellow-300 opacity-80"></div>
//           {/* Drift marks */}
//           {isDrifting && (
//             <div className="absolute top-0 w-full h-full">
//               {[...Array(10)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute w-8 h-1 bg-black opacity-60 rounded"
//                   style={{
//                     left: `${40 + i * 2}%`,
//                     top: `${Math.random() * 100}%`,
//                     transform: `rotate(${Math.random() * 30 - 15}deg)`,
//                   }}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* MASSIVE Enhanced Charging Station - Doubled Size */}
//         <div className="relative mb-8">
//           {/* Main charging station structure - Much larger */}
//           <div className="w-96 h-64 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 rounded-2xl mx-auto shadow-2xl border-4 border-gray-600 relative">
//             {/* Station brand panel */}
//             <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-64 h-16 bg-black rounded-lg border-4 border-orange-400 overflow-hidden">
//               <div className="absolute inset-2 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
//                 <span className="text-white text-2xl font-bold tracking-wider">chargeMOD</span>
//               </div>
//               <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
//             </div>
            
//             {/* Large charging ports */}
//             <div className="absolute top-28 left-1/2 transform -translate-x-1/2 flex space-x-8">
//               <div className="w-24 h-20 bg-gray-600 rounded-lg border-4 border-gray-500 relative">
//                 <div className={`absolute inset-4 rounded ${isCharging ? 'bg-green-400 animate-pulse' : 'bg-gray-700'}`}>
//                   {isCharging && (
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <Zap className="h-8 w-8 text-white animate-bounce" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="w-24 h-20 bg-gray-600 rounded-lg border-4 border-gray-500 relative">
//                 <div className="absolute inset-4 bg-gray-700 rounded"></div>
//               </div>
//             </div>
            
//             {/* Control panel */}
//             <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-gray-800 rounded border-2 border-gray-600">
//               <div className="absolute top-2 left-4 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
//               <div className="absolute top-2 right-4 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
//               <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-orange-400 rounded animate-pulse"></div>
//             </div>
            
//             {/* Side panels */}
//             <div className="absolute left-4 top-16 w-8 h-32 bg-orange-500 rounded opacity-80"></div>
//             <div className="absolute right-4 top-16 w-8 h-32 bg-orange-500 rounded opacity-80"></div>
            
//             {/* Warning stripes */}
//             <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-b-2xl">
//               <div className="absolute inset-0 bg-black opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.3) 10px, rgba(0,0,0,0.3) 20px)' }}></div>
//             </div>
//           </div>

//           {/* Enhanced charging cables */}
//           <div className="absolute top-32 left-1/2 transform -translate-x-1/2 -translate-x-8">
//             <div className="w-4 h-32 bg-gradient-to-b from-gray-600 to-black rounded-full border-2 border-gray-400">
//               <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full ${isCharging ? 'bg-green-400 animate-ping' : 'bg-gray-500'}`}>
//                 <div className={`absolute inset-1 rounded-full ${isCharging ? 'bg-green-300' : 'bg-gray-600'}`}></div>
//               </div>
//             </div>
//           </div>

//           {/* Energy flow effects */}
//           {isCharging && (
//             <div className="absolute top-36 left-1/2 transform -translate-x-1/2">
//               {[...Array(12)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-80"
//                   style={{
//                     left: `${(i - 6) * 8}px`,
//                     animationDelay: `${i * 0.1}s`,
//                     animationDuration: '1s',
//                   }}
//                 ></div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Detailed Porsche 911 with drift animation */}
//         <div 
//           className={`absolute bottom-1/3 transition-all duration-75 ease-linear ${isDrifting ? 'transform rotate-12' : ''}`}
//           style={{ 
//             left: `${vehiclePosition}%`,
//             transform: `translateY(50%) ${isDrifting ? 'rotate(8deg) scale(1.1)' : 'rotate(0deg) scale(1)'}`,
//             transition: isDrifting ? 'all 0.3s ease-out' : 'left 0.1s linear',
//           }}
//         >
//           {/* Porsche 911 - Detailed Design */}
//           <div className="relative">
//             {/* Main body */}
//             <div className="w-32 h-16 bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-lg shadow-2xl relative border border-red-300">
//               {/* Porsche distinctive curve */}
//               <div className="absolute top-0 left-4 w-20 h-6 bg-red-400 rounded-t-full"></div>
              
//               {/* Windshield */}
//               <div className="absolute top-1 left-6 w-16 h-6 bg-blue-200 rounded-t-lg opacity-70 border border-gray-300"></div>
              
//               {/* Side windows */}
//               <div className="absolute top-3 left-2 w-4 h-4 bg-blue-200 rounded opacity-60"></div>
//               <div className="absolute top-3 right-2 w-4 h-4 bg-blue-200 rounded opacity-60"></div>
              
//               {/* Headlights */}
//               <div className="absolute top-4 left-0 w-3 h-4 bg-yellow-200 rounded-r-lg animate-pulse"></div>
//               <div className="absolute bottom-4 left-0 w-3 h-4 bg-red-400 rounded-r-lg"></div>
              
//               {/* Door lines */}
//               <div className="absolute top-2 left-8 w-px h-10 bg-red-700"></div>
//               <div className="absolute top-2 left-20 w-px h-10 bg-red-700"></div>
              
//               {/* Porsche logo area */}
//               <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-yellow-400 rounded flex items-center justify-center">
//                 <div className="w-2 h-2 bg-red-600 rounded-full"></div>
//               </div>
              
//               {/* Side mirrors */}
//               <div className="absolute top-2 left-1 w-1 h-2 bg-black rounded"></div>
//               <div className="absolute top-2 right-1 w-1 h-2 bg-black rounded"></div>
              
//               {/* Rear spoiler */}
//               <div className="absolute top-1 right-2 w-6 h-1 bg-red-700 rounded"></div>
//             </div>

//             {/* Wheels - Porsche style */}
//             <div className="absolute -bottom-3 left-4 w-6 h-6 bg-gray-900 rounded-full border-4 border-gray-700 shadow-lg">
//               <div className="absolute inset-1 bg-gray-800 rounded-full">
//                 <div className="absolute inset-1 border-2 border-gray-600 rounded-full"></div>
//               </div>
//             </div>
//             <div className="absolute -bottom-3 right-4 w-6 h-6 bg-gray-900 rounded-full border-4 border-gray-700 shadow-lg">
//               <div className="absolute inset-1 bg-gray-800 rounded-full">
//                 <div className="absolute inset-1 border-2 border-gray-600 rounded-full"></div>
//               </div>
//             </div>

//             {/* Exhaust pipes */}
//             <div className="absolute bottom-2 -right-2 w-2 h-2 bg-gray-700 rounded-full"></div>
//             <div className="absolute bottom-4 -right-2 w-2 h-2 bg-gray-700 rounded-full"></div>

//             {/* Battery indicator */}
//             <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 rounded border-2 border-gray-700">
//               <div
//                 className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded transition-all duration-500"
//                 style={{ width: `${progress}%` }}
//               ></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
//               </div>
//             </div>

//             {/* Drift smoke effects */}
//             {isDrifting && (
//               <div className="absolute -bottom-1 -right-4">
//                 {[...Array(6)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="absolute w-4 h-4 bg-gray-400 rounded-full opacity-60 animate-ping"
//                     style={{
//                       left: `${i * -8}px`,
//                       animationDelay: `${i * 0.1}s`,
//                       animationDuration: '0.8s',
//                     }}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Crystal Clear CHARGE MOD Logo */}
//         <div className="space-y-6 mt-20">
//           <div className="flex items-center justify-center space-x-6">
//             {/* Clear, bold logo */}
//             <div className="relative">
//               <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-3xl shadow-2xl border-4 border-white">
//                 <Zap className="h-12 w-12 text-white drop-shadow-lg" />
//               </div>
//               <div className="absolute inset-0 bg-white opacity-20 rounded-3xl animate-pulse"></div>
//             </div>
            
//             {/* Crystal clear text */}
//             <div className="relative">
//               <h1 className="text-6xl font-black text-white drop-shadow-2xl tracking-wide">
//                 CHARGE<span className="text-yellow-300">MOD</span>
//               </h1>
//               <div className="absolute inset-0 text-6xl font-black text-orange-200 opacity-30 blur-sm">
//                 CHARGEMOD
//               </div>
//             </div>
//           </div>

//           <div className="text-center">
//             <p className="text-white text-2xl font-bold drop-shadow-lg tracking-wide">
//               EMPOWERING THE FUTURE OF E-MOBILITY
//             </p>
//           </div>

//           {showText && (
//             <div className="animate-bounce text-center">
//               <p className="text-yellow-200 text-xl font-semibold drop-shadow-lg">
//                 Welcome to the Energy Revolution
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Enhanced Progress bar */}
//         <div className="mt-16 w-96 mx-auto">
//           <div className="relative w-full bg-gray-800 rounded-full h-4 border-4 border-white shadow-xl overflow-hidden">
//             <div
//               className="bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 h-full rounded-full transition-all duration-300 ease-out relative"
//               style={{ width: `${progress}%` }}
//             >
//               <div className="absolute inset-0 bg-white opacity-40 animate-pulse"></div>
//               {progress > 0 && (
//                 <div className="absolute right-0 top-0 w-3 h-full bg-white animate-pulse"></div>
//               )}
//             </div>
//           </div>
//           <p className="text-white text-lg mt-4 font-bold text-center drop-shadow-lg">
//             {vehicleReachedStation ? `Charging... ${Math.round(progress)}%` : 'Connecting Vehicle...'}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SplashScreen;


// import React, { useState, useEffect } from 'react';
// import { Zap } from 'lucide-react';  // Importing Lucide icons for Zap

// const SplashScreen = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [isCharging, setIsCharging] = useState(false);
//   const [showText, setShowText] = useState(false);

//   useEffect(() => {
//     // Start charging animation after a brief delay
//     const chargingTimer = setTimeout(() => {
//       setIsCharging(true);
//     }, 500);

//     // Progress animation
//     const progressTimer = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(progressTimer);
//           setTimeout(() => {
//             setShowText(true);
//             setTimeout(onComplete, 1500);
//           }, 500);
//           return 100;
//         }
//         return prev + 2;
//       });
//     }, 50);

//     return () => {
//       clearTimeout(chargingTimer);
//       clearInterval(progressTimer);
//     };
//   }, [onComplete]);

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50">
//       {/* Background charging station */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Animated background particles */}
//         <div className="absolute inset-0">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-2 h-2 bg-amber-400 rounded-full animate-pulse"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 2}s`,
//                 animationDuration: `${2 + Math.random() * 2}s`,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="relative z-10 text-center">
//         {/* Main charging station */}
//         <div className="relative mb-8">
//           {/* Charging station base */}
//           <div className="w-32 h-20 bg-gradient-to-t from-gray-800 to-gray-600 rounded-lg mx-auto shadow-2xl">
//             <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gray-700 rounded"></div>
//             <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gray-600 rounded"></div>
//           </div>

//           {/* Charging cable */}
//           <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-amber-500 to-amber-300 rounded-full">
//             <div
//               className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full ${
//                 isCharging ? 'animate-ping' : ''
//               }`}
//             ></div>
//           </div>

//           {/* EV Car */}
//           <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
//             <div className="relative">
//               {/* Car body */}
//               <div className="w-16 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
//                 <div className="absolute top-1 left-1 w-2 h-2 bg-blue-300 rounded-full"></div>
//                 <div className="absolute top-1 right-1 w-2 h-2 bg-blue-300 rounded-full"></div>
//                 <div className="absolute bottom-1 left-2 w-3 h-1 bg-gray-800 rounded"></div>
//                 <div className="absolute bottom-1 right-2 w-3 h-1 bg-gray-800 rounded"></div>
//               </div>

//               {/* Charging port */}
//               <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gray-800 rounded">
//                 <div
//                   className={`absolute inset-0 bg-amber-400 rounded ${isCharging ? 'animate-pulse' : ''}`}
//                 ></div>
//               </div>

//               {/* Battery indicator */}
//               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gray-800 rounded border border-gray-600">
//                 <div
//                   className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded transition-all duration-300"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <span className="text-xs font-bold text-white">{progress}%</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Energy flow animation */}
//           {isCharging && (
//             <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
//               {[...Array(5)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute w-1 h-1 bg-amber-400 rounded-full animate-bounce"
//                   style={{
//                     left: `${i * 4 - 8}px`,
//                     animationDelay: `${i * 0.1}s`,
//                     animationDuration: '0.8s',
//                   }}
//                 ></div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Logo and text */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-center space-x-3">
//             <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-2xl animate-pulse">
//               <Zap className="h-8 w-8 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
//               charge<span className="text-amber-400">MOD</span>
//             </h1>
//           </div>

//           <p className="text-amber-200 text-lg font-medium animate-fade-in">
//             Empowering the Future of E-Mobility
//           </p>

//           {showText && (
//             <div className="animate-slide-up">
//               <p className="text-white text-sm opacity-80">
//                 Welcome to the energy revolution
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Progress bar */}
//         <div className="mt-8 w-64 mx-auto">
//           <div className="w-full bg-gray-700 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300 ease-out"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//           <p className="text-amber-200 text-sm mt-2">Initializing chargeMOD...</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SplashScreen;



// import React, { useState, useEffect } from 'react';
// import { Zap, Car, Battery, Plug } from 'lucide-react';

// const SplashScreen = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [isCharging, setIsCharging] = useState(false);
//   const [showText, setShowText] = useState(false);

//   useEffect(() => {
//     // Start charging animation after a brief delay
//     const chargingTimer = setTimeout(() => {
//       setIsCharging(true);
//     }, 500);

//     // Progress animation
//     const progressTimer = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(progressTimer);
//           setTimeout(() => {
//             setShowText(true);
//             setTimeout(onComplete, 1500);
//           }, 500);
//           return 100;
//         }
//         return prev + 2;
//       });
//     }, 50);

//     return () => {
//       clearTimeout(chargingTimer);
//       clearInterval(progressTimer);
//     };
//   }, [onComplete]);

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50">
//       {/* Background charging station */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Animated background particles */}
//         <div className="absolute inset-0">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-2 h-2 bg-amber-400 rounded-full animate-pulse"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 2}s`,
//                 animationDuration: `${2 + Math.random() * 2}s`
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="relative z-10 text-center">
//         {/* Main charging station */}
//         <div className="relative mb-8">
//           {/* Charging station base */}
//           <div className="w-32 h-20 bg-gradient-to-t from-gray-800 to-gray-600 rounded-lg mx-auto shadow-2xl">
//             <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gray-700 rounded"></div>
//             <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gray-600 rounded"></div>
//           </div>

//           {/* Charging cable */}
//           <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-amber-500 to-amber-300 rounded-full">
//             <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full ${isCharging ? 'animate-ping' : ''}`}></div>
//           </div>

//           {/* EV Car */}
//           <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
//             <div className="relative">
//               {/* Car body */}
//               <div className="w-16 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
//                 <div className="absolute top-1 left-1 w-2 h-2 bg-blue-300 rounded-full"></div>
//                 <div className="absolute top-1 right-1 w-2 h-2 bg-blue-300 rounded-full"></div>
//                 <div className="absolute bottom-1 left-2 w-3 h-1 bg-gray-800 rounded"></div>
//                 <div className="absolute bottom-1 right-2 w-3 h-1 bg-gray-800 rounded"></div>
//               </div>
              
//               {/* Charging port */}
//               <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gray-800 rounded">
//                 <div className={`absolute inset-0 bg-amber-400 rounded ${isCharging ? 'animate-pulse' : ''}`}></div>
//               </div>

//               {/* Battery indicator */}
//               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gray-800 rounded border border-gray-600">
//                 <div 
//                   className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded transition-all duration-300"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <span className="text-xs font-bold text-white">{progress}%</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Energy flow animation */}
//           {isCharging && (
//             <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
//               {[...Array(5)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute w-1 h-1 bg-amber-400 rounded-full animate-bounce"
//                   style={{
//                     left: `${i * 4 - 8}px`,
//                     animationDelay: `${i * 0.1}s`,
//                     animationDuration: '0.8s'
//                   }}
//                 ></div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Logo and text */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-center space-x-3">
//             <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-2xl animate-pulse">
//               <Zap className="h-8 w-8 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
//               charge<span className="text-amber-400">MOD</span>
//             </h1>
//           </div>
          
//           <p className="text-amber-200 text-lg font-medium animate-fade-in">
//             Empowering the Future of E-Mobility
//           </p>

//           {showText && (
//             <div className="animate-slide-up">
//               <p className="text-white text-sm opacity-80">
//                 Welcome to the energy revolution
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Progress bar */}
//         <div className="mt-8 w-64 mx-auto">
//           <div className="w-full bg-gray-700 rounded-full h-2">
//             <div 
//               className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300 ease-out"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//           <p className="text-amber-200 text-sm mt-2">Initializing chargeMOD...</p>
//         </div>
//       </div>

//       {/* Custom animations */}
//       <style jsx>{`
//         @keyframes fade-in {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slide-up {
//           from { 
//             opacity: 0; 
//             transform: translateY(20px); 
//           }
//           to { 
//             opacity: 1; 
//             transform: translateY(0); 
//           }
//         }
        
//         .animate-fade-in {
//           animation: fade-in 1s ease-in-out;
//         }
        
//         .animate-slide-up {
//           animation: slide-up 0.8s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SplashScreen;
