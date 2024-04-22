
import { useProps } from "../contexts/PropContext";

function SearchProducts() {
  const { searchQuery, setSearchQuery } = useProps();
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search products..."
    />
  );
}

export default SearchProducts;
