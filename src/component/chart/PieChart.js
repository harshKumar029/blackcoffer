import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  // use to Filter out null values 
  const filteredData = data.filter((item) =>  item.topic !== '' && item.intensity !== '');
  // it is use to calculate total intensity of unique topic
  const Data = filteredData.reduce((accumulator, currentItem) => {
    const existingItem = accumulator.find((item) => item.topic === currentItem.topic);

    if (existingItem) {
      existingItem.intensity += currentItem.intensity;
    } else {
      accumulator.push({ ...currentItem });
    }

    return accumulator;
  }, []);
    const generateRandomColor = () => {
        return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
      };
    
    const backgroundColors = data.map(() => generateRandomColor());
    

    // Function to count the number of blank or undefined data
    // const countBlankData = () => {
    //     let count = 0;
    
    //     data.forEach((item) => {
    //       if (item.topic  === '') {
    //         count++;
    //         // console.log(item)
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
    const chartOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Leading Industries',
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
    <div className='allchart Piechart'>
      <Pie  data={chartData} options={chartOptions} />
    </div>
  )
};

export default PieChart;
