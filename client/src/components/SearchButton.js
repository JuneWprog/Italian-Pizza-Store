import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function SearchButton(props) {

  let navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search`);
  }

  return (
    <div className="searchContainer">
      <button type="submit" value="Submit" onClick={handleClick}>
        <BsSearch role="img" aria-label="search icon" className="search-icon" />
      </button>
    </div>
  );
}

