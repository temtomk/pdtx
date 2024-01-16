// "use client";

// import React, { useState, useContext } from "react";
// import { WalletContext } from "./wallet";

// const ProfileTotal = () => {
//   const { accounts } = useContext(WalletContext);
//   const [balance, setBalance] = useState(0);
//   const [hasChecked, setHasChecked] = useState(false);
//   const [total, setTotal] = useState(0);

//   const getAccountsBalance = async () => {
//     if (accounts) {
//       await fetch(`/api/minting/${accounts[0].address}`)
//         .then((response) => response.json())
//         .then((data) => {
//           setBalance(data.Token);
//         })
//         .catch((error) => console.error("Error:", error));
//     }
//   };

//   const getTotal = async () => {
//     try {
//       const response = await fetch(`/api/minting/get-total/`);
//       const data = await response.json();
//       setTotal(data[0]?.totalToken || 0);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleClick = async () => {
//     await getAccountsBalance();
//     await getTotal();
//     setHasChecked(true);
//   };

//   return (
//     <div className="flex flex-col justify-center items-center">
//       <button
//         className="w-full text-white text-center text-2xl tracking-[2.88px] whitespace-nowrap grow border justify-center items-stretch bg-zinc-600 px-11 py-3.5 rounded-[32px] max-md:px-5 max-sm:max-w-[154px] max-sm:mx-auto"
//         onClick={handleClick}
//       >
//         Profile
//       </button>

//       <p className="text-white text-center text-2xl whitespace-nowrap mt-5">
//         {hasChecked &&
//           (accounts ? `My balance: ${balance || 0}` : "No connected")}
//       </p>

//       <div className="flex flex-col justify-center items-center mt-5 text-2xl text-white">
//         {hasChecked &&
//           `현재까지 채굴된 $PDTX: ${total ? total.toLocaleString() : "데이터 로딩 중..."} / 7,517,509`}
//       </div>
//     </div>
//   );
// };

// export default ProfileTotal;
