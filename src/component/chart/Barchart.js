import React from 'react';
import { Bar } from 'react-chartjs-2';


const BarChart = ({ data }) => {

  const processChartData = (data) => {
    const uniqueTopics = Array.from(new Set(data.map((item) => item.topic)));
  
    const filteredData = uniqueTopics.map((topic) => {
      const topicData = data.filter((item) => item.topic === topic);
      const maxIntensityItem = topicData.reduce((max, item) =>
        item.intensity > max.intensity ? item : max
      );
      const maxrel= topicData.reduce((max, item) =>
        item.relevance > max.relevance ? item : max
      );
  
      return (maxIntensityItem,maxrel);
    });
  
    return filteredData.filter((item) => item.topic !== '' && item.intensity !== '');
  };
  const filteredData = processChartData(data);
  console.log("filtdata",filteredData)

  const chartData = {
    labels: filteredData.map((item) => item.topic),
    datasets: [
      {
        label: 'Intensity',
        data: filteredData.map((item) => item.intensity),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Relevance',
        data: filteredData.map((item) => item.relevance),
        backgroundColor: 'rgba(4, 88, 255, 0.608)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

    const chartOptions = {
      scales: {
        y: {
          stacked: false,
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
          text: 'Topic-wise Maximum Metrics', // title
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    
      responsive: true, 
      maintainAspectRatio: false,
    };

  return (
    <div className='allchart Barchart'>
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
};

export default BarChart;
