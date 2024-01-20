import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  // Filter out items with undefined or null values for better visualization
  const filteredData = data.filter((item) =>  item.topic !== '' && item.intensity !== '');
  // Preprocess the data to calculate total intensity for each unique topic
  const Data = filteredData.reduce((accumulator, currentItem) => {
    const existingItem = accumulator.find((item) => item.topic === currentItem.topic);

    if (existingItem) {
      existingItem.intensity += currentItem.intensity;
    } else {
      accumulator.push({ ...currentItem });
    }

    return accumulator;
  }, []);
// console.log("vsdvdvdfvaeva",...data)
    // Function to generate random colors based on intensity
    const generateRandomColor = () => {
        return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
      };
    
    const backgroundColors = data.map(() => generateRandomColor());
    

    // Function to count the number of blank or undefined data
    // const countBlankData = () => {
    //     let count = 0;
    
    //     data.forEach((item) => {
    //       if (item.sector  === '') {
    //         count++;
    //         console.log(item)
    //       }
    //     });
    
    //     return count;
    //   };

    //   console.log('Number of blank data:', countBlankData());

  const chartData = {
    labels: Data.map((item) => item.topic),
    datasets: [
      {
        data: Data.map((item) => item.intensity),
        backgroundColor: backgroundColors,
        borderColor: [
          'rgba(255, 255, 255, 255)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
