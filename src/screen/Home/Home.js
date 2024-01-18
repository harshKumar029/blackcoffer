import React,{useEffect,useState} from 'react'
// import BarChart from '../../component/Bar/b3';
// import PieChart from '../../component/Pie/pie';
import Filter from './filter';


const Home = () => {
    const [chartitem, setchartitem] = useState([])

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
    
            const data = await response.json();
            // console.log("rescheck",data[0]);
            setchartitem(data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };
    
    
    useEffect(() => {
        loadData();
    }, [])

    const ata = {
        intensity: 9,
        likelihood: 3,
        relevance: 3
      };
      const pieChartData = [30, 20, 50];
  return (
    <>
    <div><Filter/></div>
    {/* <div><PieChart data={pieChartData}/></div> */}
    {/* <div><BarChart data={chartitem}/></div> */}
    <div className='homcard' >
                {
                    chartitem !== []
                        ? chartitem.map((data) => {
                            return (
                                <>
                                    <div>{data.intensity}</div>
                                    <div key={data._id} >{data.topic}</div>
                                    <h2>test</h2>
                                    <hr />
                                </>
                            )
                        })
                        : <div>''''</div>
                }
            </div>
    </>
  )
}

export default Home