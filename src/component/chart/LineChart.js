import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
// data.map((item) => item.topic),

const Linechart = ({ data }) => {
  const filteredData = data.filter((item) =>  
  item.topic !== '' &&
  item.intensity !== '' &&
  item.likelihood !== null &&
  item.likelihood !== undefined &&
  item.relevance !== null &&
  item.relevance !== undefined
);
  // console.log("dskjcbdgicigd",filteredData)
  const chartData = {
    labels: filteredData.map((item) => item.topic),
    datasets: [
      {
        label: 'Intensity',
        data:  filteredData.map((item) => item.intensity),
        
        backgroundColor: 'rgba(65, 105, 225, 0.8)',
        borderColor: 'rgba(65, 105, 225, 0.8)',
        borderWidth: 2,
      },
      {
        label: 'likelihood',
        data: filteredData.map((item) => item.likelihood),
        
        backgroundColor: 'rgba(0, 128, 128, 0.5)',
        borderColor: 'rgba(0, 128, 128, 0.5)',
        borderWidth: 2,
      },
      {
        label: 'relevance',
        data: filteredData.map((item) => item.relevance),
        
        backgroundColor: 'rgba(255, 69, 0, 0.3)',
        borderColor: 'rgba(255, 69, 0, 0.3)',
        borderWidth: 2,
      }
    ],
  };

const options = {
  scales: {
    x: {
      display: false,
    },
    y: {
      beginAtZero: true,
      display: true,
      ticks: {
        min: 0,
        max: 100,
      },
    },
  },
  plugins: {
    title: {
      display: true,
      text: 'Trends Over Topic', // title
      font: {
        size: 16,
        weight: 'bold',
      },
    },
  },
  elements: {
    line: {
      tension: 0.4, // tension
    },
  },

  responsive: true, 
  maintainAspectRatio: false,
};

  

  return (
    <div className='allchart linechart'>
      <Line data={chartData} options={options} />
    </div>
  )
};

export default Linechart;