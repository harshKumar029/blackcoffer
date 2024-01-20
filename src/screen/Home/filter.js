import React, { useEffect, useState } from 'react';
import Barchart from '../../component/Bar/Barchart';
import PieChart from '../../component/Bar/PieChart';
import Linechart from '../../component/Bar/LineChart';

function Filter() {
  const [bar, setbar] = useState([])
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

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/statistics", {
      method: "post",
      header: {
        'content-Type': 'application/json'
      }

    });

    response = await response.json();
    console.log("datacondsgerwgrwg", response[0])
    setChartData(response[0]);
  }

  useEffect(() => {
    loadData()
  }, [])

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


  // const filteredData = data.filter(applyFilters);
  // console.log("filterkiyadata", filteredData)
  // filteredData !==[] ?setbar(filteredData) : setbar(filteredData);
  // setbar(filteredData);
  const filteredData = data.filter(applyFilters);
console.log("filterkiyadata", filteredData);
// console.log("hiiiiiededi",setFilters)



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

      {/* Display filtered data 
      <div>
        <h2>Filtered Data:</h2>
        {filteredData.map((item) => (
          <div  key={item.id}>
          <div>{item.topic}</div>
          </div>
        ))}
      </div>
    */}
      <Linechart data={filteredData.length > 0 ? filteredData : data}/>
      <Barchart data={filteredData.length > 0 ? filteredData : data} />
      <PieChart data={filteredData.length > 0 ? filteredData : data}/>


      {/* <Barchart data={propdata} /> */}
    </div>
    
  );
}

export default Filter;
