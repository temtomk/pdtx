"use client";

import React, { useState } from "react";

const Search = ({ setSearchResult }) => {
  const [account, setAccount] = useState("");

  const search = async () => {
    try {
      const res = await fetch(
        `https://5141-211-184-43-102.ngrok-free.app/api/checkAmount/address=${account}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      const data = await res.json();

      const result: number = data[account];

      setSearchResult(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-5">
      <input
        type="text"
        placeholder="Address: link1..."
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        className="w-80 h-10 bg-gray-200 border-black border placeholder:text-center text-black" // h-10 클래스를 통해 input의 높이를 조절
      />
      <button
        onClick={search}
        className="ml-2 h-10 bg-black text-white" // h-10 클래스를 통해 button의 높이를 조절
      >
        Search
      </button>
    </div>
  );
};

export default Search;
