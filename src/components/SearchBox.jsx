import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import "../Css/SearchBox.css"
import searchData from "./SearchData";

function SearchBox() {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    const suggestions = searchData.filter((item) =>
      item.title.includes(value)
    );
    setFilteredData(value ? suggestions : []);
  };

  const handleSelect = (item) => {
    setQuery("");
    setFilteredData([]);
    navigate(item.path, { state: { title: item.title, description: item.description } });
  };

  useEffect(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.bottom + window.scrollY + "px",
        left: rect.left + "px",
        width: rect.width + "px",
      });
    }
  }, [query]);

  return (
    <>
      <div className="search-container search-Wel">
        <input
          ref={inputRef}
          className="form-control searchInput"
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="ابحث هنا ...."
          aria-label="Search"
        />
        <button className="btn-search" type="button">
          <IoSearch size={30} />
        </button>
      </div>

      {filteredData.length > 0 && (
        <ul className="suggestions-list" style={{ ...dropdownStyle, position: "absolute" }}>
          {filteredData.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="suggestion-item"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SearchBox;