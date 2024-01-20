import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  const filteredData = data.filter((item) =>  item.topic !== '' && item.intensity !== '');
  const preprocessData = (data) => {
    const mergedData = {};
  
    // Merge entries with the same topic and intensity
    data.forEach((item) => {
      const key = `${item.topic}-${item.intensity}`;
      if (mergedData[key]) {
        mergedData[key].count += 1;
      } else {
        mergedData[key] = { topic: item.topic, intensity: item.intensity, count: 1 };
      }
    });
  
    // Convert merged data to an array
    const result = Object.values(mergedData);
  
    return result;
  };
  
  // Preprocess data before passing it to the chart
  const processedData = preprocessData(filteredData);

  const chartData = {
    labels: processedData.map((item) => item.topic),
    datasets: [
      {
        label: 'Intensity',
        data: processedData.map((item) => item.intensity),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: { title: { display: true, text: 'Topics' } },
      y: { title: { display: true, text: 'Intensity' } },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
