import { useState } from "react";
import { Dropdown, Icon } from "semantic-ui-react";

function Filter({ onChange }) {
  const [filters, setFilters] = useState({
    tags: [],
    date: "",
  });

  const options = [
    {
      key: "availableOnly",
      text: "Only available",
      value: "availableOnly",
      label: { color: "red", empty: true, circular: true },
    },
    {
      key: "passengersRequired",
      text: "passengers",
      value: "passengersRequired",
      label: { color: "red", empty: true, circular: true },
    },
  ];

  const handleDropdownChange = (_, { value }) => {
    const updated = { ...filters, tags: value };
    setFilters(updated);
    onChange(updated);
  };

  const handleDateChange = (e) => {
    const updated = { ...filters, date: e.target.value };
    setFilters(updated);
    onChange(updated);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Dropdown
        placeholder="Filter Rides"
        button
        className="icon"
        labeled
        icon="filter"
        floating
        selection
        multiple
        search
        options={options}
        onChange={handleDropdownChange}
        value={filters.tags}
      />
      <input
        type="date"
        onChange={handleDateChange}
        value={filters.date}
        style={{ marginLeft: 10, padding: 6, borderRadius: 4 }}
      />
    </div>
  );
}

export default Filter;
