// // src/pages/MinePage.tsx
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   Zap,
//   RefreshCw,
//   UserCog,
//   Briefcase,
//   Heart,
//   Share2,
//   X,
//   ChevronRight,
//   Check,
//   AlertTriangle,
//   Wifi,
//   WifiOff,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

// // Error types
// interface AppError {
//   id: string;
//   type: "network" | "subscription" | "mining" | "system" | "validation";
//   message: string;
//   timestamp: Date;
//   retry?: () => void;
// }

// // API Response types
// interface ApiResponse<T = any> {
//   success: boolean;
//   data?: T;
//   error?: string;
// }

// // Custom hooks for error handling
// function useErrorHandler() {
//   const [errors, setErrors] = useState<AppError[]>([]);

//   const addError = useCallback((error: Omit<AppError, "id" | "timestamp">) => {
//     const newError: AppError = {
//       ...error,
//       id: Math.random().toString(36).substr(2, 9),
//       timestamp: new Date(),
//     };
//     setErrors((prev) => [...prev, newError]);

//     // Auto-remove error after 5 seconds if no retry function
//     if (!error.retry) {
//       setTimeout(() => {
//         setErrors((prev) => prev.filter((e) => e.id !== newError.id));
//       }, 5000);
//     }
//   }, []);

//   const removeError = useCallback((id: string) => {
//     setErrors((prev) => prev.filter((e) => e.id !== id));
//   }, []);

//   const clearErrors = useCallback(() => {
//     setErrors([]);
//   }, []);

//   return { errors, addError, removeError, clearErrors };
// }

// // Network connectivity hook
// function useNetworkStatus() {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   return isOnline;
// }

// // API service with error handling
// class ApiService {
//   private static baseUrl = "/api";

//   static async request<T>(
//     endpoint: string,
//     options: RequestInit = {}
//   ): Promise<ApiResponse<T>> {
//     try {
//       const response = await fetch(`${this.baseUrl}${endpoint}`, {
//         headers: {
//           "Content-Type": "application/json",
//           ...options.headers,
//         },
//         ...options,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }

//       const data = await response.json();
//       return { success: true, data };
//     } catch (error) {
//       return {
//         success: false,
//         error:
//           error instanceof Error ? error.message : "Unknown error occurred",
//       };
//     }
//   }

//   static async subscribe(tier: "silver" | "gold"): Promise<ApiResponse> {
//     return this.request("/subscribe", {
//       method: "POST",
//       body: JSON.stringify({ tier }),
//     });
//   }

//   static async updateMiningStats(): Promise<ApiResponse<{ total: number }>> {
//     return this.request("/mining/stats");
//   }
// }

// // Enhanced ProgressBar component matching your design
// function ProgressBar({
//   value,
//   colorFrom,
//   colorTo,
//   label,
//   onError,
// }: {
//   value: number;
//   colorFrom: string;
//   colorTo: string;
//   label: string;
//   onError?: (error: string) => void;
// }) {
//   // Validate props
//   useEffect(() => {
//     if (value < 0 || value > 100) {
//       onError?.(`Invalid progress value: ${value}. Must be between 0-100.`);
//     }
//   }, [value, onError]);

//   const safeValue = Math.max(0, Math.min(100, value));

//   return (
//     <div className="flex flex-col items-center">
//       <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mb-2 border border-gray-600">
//         <div
//           className="h-full rounded-full transition-all duration-300 ease-out"
//           style={{
//             width: `${safeValue}%`,
//             background: `linear-gradient(to right, ${colorFrom}, ${colorTo})`,
//           }}
//         />
//       </div>
//       <div className="text-center">
//         <span className="text-white font-bold text-lg">{safeValue}%</span>
//         <span className="text-gray-400 text-sm block mt-1">{label}</span>
//       </div>
//     </div>
//   );
// }

// // Error notification component
// function ErrorNotification({
//   error,
//   onDismiss,
//   onRetry,
// }: {
//   error: AppError;
//   onDismiss: () => void;
//   onRetry?: () => void;
// }) {
//   const getErrorIcon = (type: AppError["type"]) => {
//     switch (type) {
//       case "network":
//         return <WifiOff className="w-5 h-5" />;
//       default:
//         return <AlertTriangle className="w-5 h-5" />;
//     }
//   };

//   const getErrorColor = (type: AppError["type"]) => {
//     switch (type) {
//       case "network":
//         return "bg-blue-500/20 border-blue-500/50 text-blue-400";
//       case "subscription":
//         return "bg-yellow-500/20 border-yellow-500/50 text-yellow-400";
//       case "mining":
//         return "bg-purple-500/20 border-purple-500/50 text-purple-400";
//       default:
//         return "bg-red-500/20 border-red-500/50 text-red-400";
//     }
//   };

//   return (
//     <div
//       className={cn(
//         "fixed top-4 left-4 right-4 z-50 p-4 rounded-lg border backdrop-blur-sm animate-in slide-in-from-top-2",
//         getErrorColor(error.type)
//       )}
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex items-start space-x-3">
//           {getErrorIcon(error.type)}
//           <div>
//             <p className="font-medium">{error.message}</p>
//             <p className="text-xs opacity-70 mt-1">
//               {error.timestamp.toLocaleTimeString()}
//             </p>
//           </div>
//         </div>
//         <div className="flex space-x-2">
//           {error.retry && (
//             <button
//               onClick={() => {
//                 error.retry?.();
//                 onDismiss();
//               }}
//               className="text-xs px-2 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
//             >
//               Retry
//             </button>
//           )}
//           <button
//             onClick={onDismiss}
//             className="text-xs px-2 py-1 hover:bg-white/20 rounded transition-colors"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Main component with comprehensive error handling
// export default function IndexPage() {
//   // State
//   const [total, setTotal] = useState(700.0);
//   const [autoRate] = useState(0.0023338);
//   const [dataMindRate] = useState(0.00010126);
//   const [fuelPct, setFuelPct] = useState(75);
//   const [activityPct, setActivityPct] = useState(35);
//   const [isMining, setIsMining] = useState(false);
//   const [subscription, setSubscription] = useState<"silver" | "gold" | null>(
//     null
//   );
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Error handling
//   const { errors, addError, removeError, clearErrors } = useErrorHandler();
//   const isOnline = useNetworkStatus();
//   const intervalRef = useRef<number>();

//   // Network status monitoring
//   useEffect(() => {
//     if (!isOnline) {
//       addError({
//         type: "network",
//         message: "No internet connection. Some features may not work.",
//         retry: () => window.location.reload(),
//       });
//     } else {
//       clearErrors();
//     }
//   }, [isOnline, addError, clearErrors]);

//   // Mining animation with error handling
//   useEffect(() => {
//     if (!isMining) return;

//     try {
//       intervalRef.current = window.setInterval(() => {
//         setTotal((prevTotal) => {
//           const newTotal = prevTotal + 0.01;
//           // Validate reasonable limits
//           if (newTotal > 999999) {
//             addError({
//               type: "mining",
//               message: "Mining limit reached. Please upgrade your plan.",
//             });
//             return prevTotal;
//           }
//           return newTotal;
//         });
//       }, 5000);

//       return () => {
//         if (intervalRef.current) {
//           window.clearInterval(intervalRef.current);
//         }
//       };
//     } catch (error) {
//       addError({
//         type: "mining",
//         message: "Failed to start mining process. Please try again.",
//         retry: () => setIsMining(true),
//       });
//     }
//   }, [isMining, addError]);

//   // Handlers with error handling
//   const handleMachineClick = useCallback(() => {
//     try {
//       if (!isOnline) {
//         addError({
//           type: "network",
//           message: "Cannot access mining settings while offline.",
//         });
//         return;
//       }
//       setShowModal(true);
//     } catch (error) {
//       addError({
//         type: "system",
//         message: "Failed to open mining settings.",
//       });
//     }
//   }, [isOnline, addError]);

//   const handleSubscribe = useCallback(
//     async (tier: "silver" | "gold") => {
//       setIsLoading(true);

//       try {
//         const response = await ApiService.subscribe(tier);

//         if (response.success) {
//           setSubscription(tier);
//           setIsMining(true);
//           setShowModal(false);

//           // Update mining rates based on tier
//           if (tier === "gold") {
//             setFuelPct((prev) => Math.min(100, prev + 25));
//             setActivityPct((prev) => Math.min(100, prev + 15));
//           }
//         } else {
//           throw new Error(response.error || "Subscription failed");
//         }
//       } catch (error) {
//         addError({
//           type: "subscription",
//           message:
//             error instanceof Error
//               ? error.message
//               : "Subscription failed. Please try again.",
//           retry: () => handleSubscribe(tier),
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [addError]
//   );

//   const handleDeactivate = useCallback(async () => {
//     setIsLoading(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       setSubscription(null);
//       setIsMining(false);
//       if (intervalRef.current) {
//         window.clearInterval(intervalRef.current);
//       }
//       setShowModal(false);
//     } catch (error) {
//       addError({
//         type: "subscription",
//         message: "Failed to deactivate mining. Please try again.",
//         retry: handleDeactivate,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [addError]);

//   const handleProgressError = useCallback(
//     (error: string) => {
//       addError({
//         type: "validation",
//         message: error,
//       });
//     },
//     [addError]
//   );

//   // Render error notifications
//   const renderErrors = () => {
//     return errors.map((error) => (
//       <ErrorNotification
//         key={error.id}
//         error={error}
//         onDismiss={() => removeError(error.id)}
//         onRetry={error.retry}
//       />
//     ));
//   };

//   return (
//     <div className="min-h-screen bg-[#0f172a] text-white">
//       {renderErrors()}

//       {/* Network status indicator */}
//       {!isOnline && (
//         <div className="fixed top-0 left-0 right-0 bg-red-500/90 text-white text-center py-2 text-sm z-40">
//           <WifiOff className="w-4 h-4 inline mr-2" />
//           Offline Mode - Limited functionality
//         </div>
//       )}

//       {/* Main container */}
//       <div className="max-w-md mx-auto px-4 py-6">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-white mb-1">Main Balance</h1>
//           <div className="flex items-baseline">
//             <span className="text-4xl font-bold text-white mr-1">
//               {total.toFixed(0)}
//             </span>
//             <span className="text-xl text-white">Upd</span>
//             {!isOnline && <WifiOff className="w-5 h-5 ml-2 text-red-400" />}
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="mb-8 space-y-3">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center text-gray-300 text-sm">
//               <RefreshCw className="w-4 h-4 mr-2 text-cyan-400" />
//               <span>Auto Mining per Week</span>
//             </div>
//             <span className="text-yellow-400 text-sm font-mono">
//               {autoRate.toFixed(8)}
//             </span>
//           </div>
//           <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
//               style={{ width: "46%" }}
//             />
//           </div>

//           <div className="flex justify-between items-center">
//             <div className="flex items-center text-gray-300 text-sm">
//               <UserCog className="w-4 h-4 mr-2 text-yellow-400" />
//               <span>Influencer Data Mind</span>
//             </div>
//             <span className="text-yellow-400 text-sm font-mono">
//               {dataMindRate.toFixed(8)}
//             </span>
//           </div>
//           <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
//               style={{ width: "50%" }}
//             />
//           </div>
//         </div>

//         {/* Mining Button */}
//         <div className="flex justify-center mb-8">
//           <div className="relative">
//             <button
//               onClick={handleMachineClick}
//               disabled={isLoading}
//               className={cn(
//                 "w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300",
//                 isMining
//                   ? "bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600"
//                   : "bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-600",
//                 isLoading && "opacity-50 cursor-not-allowed"
//               )}
//             >
//               <Zap
//                 className={cn(
//                   "text-white w-12 h-12 transition-all duration-300",
//                   isMining && "animate-spin",
//                   isLoading && "animate-pulse"
//                 )}
//               />
//             </button>
//             <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
//               {subscription ? (
//                 <span className="bg-green-500 px-4 py-1 rounded-full text-sm font-medium text-white">
//                   Active
//                 </span>
//               ) : (
//                 <button
//                   onClick={handleMachineClick}
//                   disabled={isLoading || !isOnline}
//                   className={cn(
//                     "px-4 py-1 rounded-full text-sm font-medium text-white transition-colors",
//                     isOnline && !isLoading
//                       ? "bg-green-500 hover:bg-green-600"
//                       : "bg-gray-500 cursor-not-allowed"
//                   )}
//                 >
//                   {isLoading
//                     ? "Loading..."
//                     : !isOnline
//                     ? "Offline"
//                     : "Activate"}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Progress Cards - Matching your exact design */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <Card className="bg-gray-800 border border-cyan-500/30 rounded-xl overflow-hidden">
//             <CardContent className="p-4">
//               <h3 className="text-gray-300 text-sm mb-4">
//                 Weekly Mining Fuel Level
//               </h3>
//               <ProgressBar
//                 value={fuelPct}
//                 colorFrom="#8B5CF6"
//                 colorTo="#EC4899"
//                 label="Routes"
//                 onError={handleProgressError}
//               />
//               <Button
//                 className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-sm py-2 mt-4 transition-all duration-200"
//                 disabled={!isOnline}
//               >
//                 Boost
//               </Button>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-800 border border-purple-500/30 rounded-xl overflow-hidden">
//             <CardContent className="p-4">
//               <h3 className="text-gray-300 text-sm mb-4">
//                 Weekly Activities Level
//               </h3>
//               <ProgressBar
//                 value={activityPct}
//                 colorFrom="#F59E0B"
//                 colorTo="#EF4444"
//                 label="Activities"
//                 onError={handleProgressError}
//               />
//             </CardContent>
//           </Card>
//         </div>

//         {/* Bottom section */}
//         <div className="mb-16">
//           <p className="text-gray-400 text-sm text-center mb-4">
//             Only qualified actions will unlock the new galaxy!
//           </p>
//           <div className="flex justify-center gap-3 mb-6">
//             <Button
//               className="bg-gradient-to-r rounded-full from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 rounded-lg text-sm px-6 py-2 transition-all duration-200"
//               disabled={!isOnline}
//               style={{ borderRadius: "25px" }}
//             >
//               New
//             </Button>
//             <Button
//               className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm px-6 py-2 transition-all duration-200"
//               disabled={!isOnline}
//               style={{ borderRadius: "25px" }}
//             >
//               Learn&Earn
//             </Button>
//           </div>

//           {/* Tasks */}
//           <div className="space-y-3 mb-6">
//             <div className="flex justify-between items-center bg-gray-800 p-4 rounded-xl border border-gray-700">
//               <div className="flex items-center">
//                 <div className="bg-gray-700 p-2 rounded-md mr-3">
//                   <Zap className="w-5 h-5 text-red-500" />
//                 </div>
//                 <span className="text-white">
//                   Watch & like "What is UpdateMe?"
//                 </span>
//               </div>
//               <span className="text-green-400 text-sm">+500 Upd</span>
//             </div>

//             <div className="flex justify-between items-center bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-xl">
//               <div className="flex items-center">
//                 <div className="bg-gray-700 p-2 rounded-md mr-3">
//                   <Zap className="w-5 h-5 text-red-500" />
//                 </div>
//                 <span className="text-black font-medium">
//                   Trending: Share Fireborn Post
//                 </span>
//               </div>
//               <span className="text-green-700 text-sm font-medium">
//                 +1000 CEXP
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Navigation */}
//         <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700 py-3">
//           <div className="flex justify-around max-w-md mx-auto px-4">
//             <NavButton
//               icon={<Briefcase className="w-5 h-5" />}
//               label="Work"
//               disabled={!isOnline}
//             />
//             <NavButton icon={<Zap className="w-5 h-5" />} label="Mine" active />
//             <NavButton
//               icon={<Heart className="w-5 h-5" />}
//               label="Likes"
//               disabled={!isOnline}
//             />
//             <NavButton
//               icon={<Share2 className="w-5 h-5" />}
//               label="Share"
//               disabled={!isOnline}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Subscription Modal */}
//       <SubscriptionModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         isSubscribed={Boolean(subscription)}
//         onSubscribe={handleSubscribe}
//         onDeactivate={handleDeactivate}
//         isLoading={isLoading}
//         isOnline={isOnline}
//       />
//     </div>
//   );
// }

// // Enhanced NavButton component
// function NavButton({
//   icon,
//   label,
//   active = false,
//   disabled = false,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   active?: boolean;
//   disabled?: boolean;
// }) {
//   return (
//     <button
//       className={cn(
//         "flex flex-col items-center transition-all duration-200",
//         disabled && "opacity-50 cursor-not-allowed"
//       )}
//       disabled={disabled}
//     >
//       <div
//         className={cn(
//           "p-2 rounded-md mb-1 transition-colors duration-200",
//           active ? "bg-cyan-500 text-white" : "text-gray-400",
//           !disabled && !active && "hover:bg-gray-700 hover:text-gray-300"
//         )}
//       >
//         {icon}
//       </div>
//       <span
//         className={cn(
//           "text-xs transition-colors duration-200",
//           active ? "text-cyan-400" : "text-gray-400"
//         )}
//       >
//         {label}
//       </span>
//     </button>
//   );
// }

// // Enhanced SubscriptionModal component
// function SubscriptionModal({
//   isOpen,
//   onClose,
//   isSubscribed,
//   onSubscribe,
//   onDeactivate,
//   isLoading,
//   isOnline,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   isSubscribed: boolean;
//   onSubscribe: (tier: "silver" | "gold") => void;
//   onDeactivate: () => void;
//   isLoading: boolean;
//   isOnline: boolean;
// }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
//       <div className="bg-gray-800 rounded-xl max-w-sm w-full mx-4 p-6 border border-gray-700">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold text-white">Mining Plans</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white transition-colors duration-200"
//             disabled={isLoading}
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {!isOnline && (
//           <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 flex items-center text-red-400">
//             <WifiOff className="w-4 h-4 mr-2" />
//             <span className="text-sm">No internet connection</span>
//           </div>
//         )}

//         {isSubscribed ? (
//           <div className="space-y-4">
//             <p className="text-gray-300 mb-4">
//               Your mining plan is currently active.
//             </p>
//             <Button
//               onClick={onDeactivate}
//               disabled={isLoading || !isOnline}
//               className={cn(
//                 "w-full py-3 rounded-lg transition-all duration-200",
//                 isLoading || !isOnline
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : "bg-red-500 hover:bg-red-600 text-white"
//               )}
//             >
//               {isLoading ? "Deactivating..." : "Deactivate Mining"}
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="bg-gray-700/50 p-4 rounded-lg border border-cyan-500/30">
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="font-bold text-white">Silver Plan</h3>
//                 <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs">
//                   POPULAR
//                 </span>
//               </div>
//               <p className="text-gray-300 text-sm mb-4">
//                 Basic mining with standard rates
//               </p>
//               <div className="flex justify-between items-center">
//                 <span className="text-white font-bold">$9.99/month</span>
//                 <Button
//                   onClick={() => onSubscribe("silver")}
//                   disabled={isLoading || !isOnline}
//                   className={cn(
//                     "px-4 py-1 rounded-lg text-sm flex items-center transition-all duration-200",
//                     isLoading || !isOnline
//                       ? "bg-gray-600 cursor-not-allowed"
//                       : "bg-cyan-500 hover:bg-cyan-600 text-white"
//                   )}
//                 >
//                   {isLoading ? "Processing..." : "Select"}
//                   {!isLoading && <ChevronRight className="w-4 h-4 ml-1" />}
//                 </Button>
//               </div>
//             </div>

//             <div className="bg-gray-700/50 p-4 rounded-lg border border-yellow-500/30">
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="font-bold text-white">Gold Plan</h3>
//                 <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">
//                   BEST VALUE
//                 </span>
//               </div>
//               <p className="text-gray-300 text-sm mb-4">
//                 Premium mining with 2x faster rates
//               </p>
//               <div className="flex justify-between items-center">
//                 <span className="text-white font-bold">$19.99/month</span>
//                 <Button
//                   onClick={() => onSubscribe("gold")}
//                   disabled={isLoading || !isOnline}
//                   className={cn(
//                     "px-4 py-1 rounded-lg text-sm flex items-center transition-all duration-200",
//                     isLoading || !isOnline
//                       ? "bg-gray-600 cursor-not-allowed"
//                       : "bg-yellow-500 hover:bg-yellow-600 text-white"
//                   )}
//                 >
//                   {isLoading ? "Processing..." : "Select"}
//                   {!isLoading && <ChevronRight className="w-4 h-4 ml-1" />}
//                 </Button>
//               </div>
//             </div>

//             <div className="pt-2">
//               <div className="flex items-center text-gray-400 text-sm mb-1">
//                 <Check className="w-4 h-4 mr-2 text-green-400" />
//                 <span>No commitment, cancel anytime</span>
//               </div>
//               <div className="flex items-center text-gray-400 text-sm">
//                 <Check className="w-4 h-4 mr-2 text-green-400" />
//                 <span>7-day free trial available</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import MiningDashboard from '@/components/MiningDashboard';
import SubscriptionModal from '@/components/SubscriptionModal';

export default function IndexPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<'silver' | 'gold' | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(700.0);
  const [dailyEarnings, setDailyEarnings] = useState(15.32);

  const handleMiningClick = () => {
    if (!isSubscribed) {
      setShowSubscriptionModal(true);
    } else {
      setIsMining(prev => !prev);
      toast({
        title: !isMining ? 'Mining Activated!' : 'Mining Stopped',
        description: !isMining
          ? 'Your mining operation has started successfully.'
          : 'Your mining operation has been paused.',
      });
    }
  };

  const handleSubscription = (tier: 'silver' | 'gold') => {
    setSubscriptionTier(tier);
    setIsSubscribed(true);
    setShowSubscriptionModal(false);
    setIsMining(true);
    toast({
      title: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Plan Activated!`,
      description: 'Welcome to the mining network. Your journey begins now!',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-slate-900/90 to-slate-800/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/10 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-6">
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
           UpdateMe
          </h1>
          <p className="text-slate-300 text-base">Own the Future. Start Mining Now!</p>
        </header>

        <MiningDashboard
          totalEarnings={totalEarnings}
          dailyEarnings={dailyEarnings}
          isMining={isMining}
          isSubscribed={isSubscribed}
          subscriptionTier={subscriptionTier}
          onMiningClick={handleMiningClick}
        />

        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          onSubscribe={handleSubscription}
        />
      </div>
    </div>
  );
}
