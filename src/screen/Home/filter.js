import React, { useEffect, useState } from 'react';

function Filter() {
  const [data, setChartData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: '',
    topics: '',
    sector: '',
    region: '',
    PEST: '',
    source: '',
    SWOT: '',
    country: '',
    city: ''
  });

  const getUserInput = (promptMessage) => {
    return prompt(promptMessage);
  };

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/statistics", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({/* your data here */}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      response = await response.json();
      console.log("datacondsgerwgrwg",response[0])
      setChartData(response[0]);
    } catch (error) {
      // console.error("Error fetching data:",error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const applyFilters = (item) => {
    return (
      (filters.end_year ? String(item.end_year || '').includes(filters.end_year) : true) &&
      (filters.topics ? String(item.topic || '').toLowerCase().includes(filters.topics.toLowerCase()) : true) &&
      (filters.sector ? String(item.sector || '').toLowerCase().includes(filters.sector.toLowerCase()) : true) &&
      (filters.region ? String(item.region || '').toLowerCase().includes(filters.region.toLowerCase()) : true) &&
      (filters.PEST ? String(item.pestle || '').toLowerCase().includes(filters.PEST.toLowerCase()) : true) &&
      (filters.source ? String(item.source || '').toLowerCase().includes(filters.source.toLowerCase()) : true) &&
      (filters.SWOT ? String(item.swot || '').toLowerCase().includes(filters.SWOT.toLowerCase()) : true) &&
      (filters.country ? String(item.country || '').toLowerCase().includes(filters.country.toLowerCase()) : true) &&
      (filters.city ? String(item.city || '').toLowerCase().includes(filters.city.toLowerCase()) : true)
    );
  };

  const handleFilterChange = (filterType) => {
    // const userInput = getUserInput(`Enter ${filterType} filter:`);
    // setFilters({ ...filters, [filterType]: userInput });
  };
 

  const filteredData = data.filter(applyFilters);
  console.log("filterkiyadata",filteredData)

  return (
    <div className="App">
      <h1 id="title"> United State GDP </h1>
      {/* Filters */}
      <div>
        {Object.keys(filters).map((filterType) => (
          <div key={filterType}>
            <label>{filterType}:</label>
            <input
              type="text"
              value={filters[filterType]}
              onChange={(e) => setFilters({ ...filters, [filterType]: e.target.value })}
            />
          </div>
        ))}
      </div>
      {/* Button to apply filters */}
      <button onClick={() => handleFilterChange('end_year')}>Apply Filters</button>

      {/* Display filtered data */}
      <div>
        <h2>Filtered Data:</h2>
        {filteredData.map((item) => (
          <div key={item.id}>{item.topic/* Render your filtered data here */}</div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
