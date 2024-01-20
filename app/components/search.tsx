import React, { useState } from "react";

const Search = ({ setSearchResult }) => {
  const [account, setAccount] = useState("");

  const search = async () => {
    // API 호출 로직
  };

  return (
    <div className="flex items-center mt-5">
      <input
        type="text"
        placeholder="Address: link1..."
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        className="w-80 h-10 bg-gray-200 border-black border placeholder:text-center" // h-10 클래스를 통해 input의 높이를 조절
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
