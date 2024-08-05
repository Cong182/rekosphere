import React, { useState } from "react";

interface SearchInputProps {
  onResults: (contacts: any) => void;
}

const mockData = [
  { id: 1, name: "Alice", familiarityLevel: "A" },
  { id: 2, name: "Bob", familiarityLevel: "B" },
  { id: 3, name: "Charlie", familiarityLevel: "C" },
  { id: 4, name: "David", familiarityLevel: "D" },
];

const SearchInput: React.FC<SearchInputProps> = ({ onResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const results = mockData.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );
    onResults(results);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search contacts"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchInput;
