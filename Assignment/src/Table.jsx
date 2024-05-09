import React, { useState } from "react";

const Table = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTagChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedTags(selectedOptions);
  };
  
  const allTags = Array.from(new Set(data.flatMap((item) => item.tags)));

  if (!Array.isArray(data)) {
    return <p>Data is not in the expected format</p>;
  }

  let filtereData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If tags are selected, filter the searchData based on selected tags
  if (selectedTags.length > 0) {
    filtereData = filtereData.filter((item) =>
      selectedTags.every((tag) => item.tags.includes(tag))
    );
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select multiple onChange={handleTagChange}>
        {allTags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {filtereData.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td>{item.tags.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
