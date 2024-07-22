import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
    // добавьте здесь дополнительную логику для поиска, если необходимо
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <SearchContext.Provider value={{ searchTerm, handleSearch, handleClearSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
