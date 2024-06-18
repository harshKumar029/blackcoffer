import React, { useEffect, useState } from 'react';
import Barchart from '../../component/chart/Barchart';
import PieChart from '../../component/chart/PieChart';
import Linechart from '../../component/chart/LineChart';
import './home.css'

function Home() {
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
      // (filters.SWOT ? String(item.swot || '').toLowerCase().includes(filters.SWOT.toLowerCase()) : true) &&
      (filters.country !== '' ? String(item.country || '').toLowerCase().includes(filters.country.toLowerCase()) : String(item.country || '').toLowerCase().includes('india')) 
      // (filters.city ? String(item.city || '').toLowerCase().includes(filters.city.toLowerCase()) : true)
    );
  };

  const filteredData = data.filter(applyFilters);
  console.log("filwithjoy", filteredData);


  return (
    <div className='wraper'>

      <div className="filter">
        <h1 id="title">  {filters.country === '' ? 'INDIA' : filters.country.toUpperCase()} </h1>
        {/* Filters */}
        <div className='filterinput'>
          {Object.keys(filters).map((filterType) => (
            <div key={filterType}>
              <input
                placeholder={filterType}
                type="text"
                value={filters[filterType]}
                onChange={(e) => setFilters({ ...filters, [filterType]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <div className='chartcomponent'>
          <Linechart className="linechart" data={filteredData} />
          <Barchart className="linechart" data={filteredData} />
          <PieChart className="linechart" data={filteredData} />
        </div>
      </div>
    </div>

  );
}

export default Home;
