import PropTypes from "prop-types";
import { slugify } from "@/utils/index";

const DataFilter = ({ categories }) => {
  return (
    <div className="data-filter-menu">
      <button className="is-checked" data-filter="*">
        All
      </button>
      {categories?.map((cat, idx) => (
        <button key={idx} data-filter={`.${slugify(cat)}`}>
          <span className="filter-text">{cat}</span>
        </button>
      ))}
    </div>
  );
};

DataFilter.propTypes = {
  categories: PropTypes.array,
};

export default DataFilter;
