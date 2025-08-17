import React, { useState, useRef, useEffect } from 'react';
import {
  SearchContainer,
  SearchInput,
  SearchButton,
  SearchIcon,
  ClearButton,
  ClearIcon
} from './style';

const SearchBar = ({
  onSearch,
  placeholder = 'Search products...',
  className = '',
  debounceMs = 300
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (searchTerm.trim()) {
      setIsSearching(true);
      debounceRef.current = setTimeout(() => {
        onSearch(searchTerm.trim());
        setIsSearching(false);
      }, debounceMs);
    } else {
      setIsSearching(false);
      onSearch('');
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm, onSearch, debounceMs]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer className={className}>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={isSearching}
      />
      
      {searchTerm && (
        <ClearButton
          onClick={handleClear}
          show={!!searchTerm}
          title="Clear search"
        >
          <ClearIcon>×</ClearIcon>
        </ClearButton>
      )}
      
      <SearchButton
        onClick={handleSearch}
        disabled={!searchTerm.trim() || isSearching}
        title="Search"
      >
        <SearchIcon>
          {isSearching ? '⏳' : '🔍'}
        </SearchIcon>
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
