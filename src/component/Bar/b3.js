import * as d3 from 'd3';
import './b3.css';
// const jsonData = require('./jsondata.json');

function Bar(props) {
  let data = props.data[0];
  console.log("ram",data);



  // Fetch the data from the provided URL

  d3.json(data)
  // d3.json("http://192.168.1.5:4000/api/data")
    .then(data => {
      // Extract relevant data
      
      const dataset = data;
      const tempMax = new Date("January, 20 2017 03:51:25")
      const tempMin = new Date("October, 07 2016 02:49:52")
      
      // Set up chart dimensions
      const margin= {top:20,right: 20,bottom:20,left:20}
      const width = 800 -margin.left-margin.right;
      const height = 400 -margin.top-margin.bottom; 
      const padding = 50;

      const svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
      /* draw axis */
      // x-axis
      let temp = "relevance";
      const xMinDate = new Date(d3.min(dataset, d => d.added))
      const xMaxDate = new Date(d3.max(dataset, d => d.added))
      const xScale = d3.scaleTime()
        .domain([tempMin, tempMax])
        .range([padding, width - padding]);
      console.log(xMinDate,xMaxDate)
      svg.append("g")
        .attr('transform', `translate(0, ${height - padding})`)
        .attr("id", "x-axis")
        .call(d3.axisBottom(xScale));
      

      // y-axis
      const yMax = d3.max(dataset, d => d[temp]);

      const yScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([height - padding, 0]);

      svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${padding}, 0)`)
        .call(d3.axisLeft(yScale));
      // Add y-axis label
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", 0 - height / 3)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(`${temp} to period`);
        

      // display rectangles for each data point
      svg.selectAll(".bar")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", d => xScale(new Date(d.added)))
        .attr("y", d => yScale(d[temp]))
        .attr("width", width / dataset.length)
        .attr("height", d => height - padding - yScale(d[temp]))
        .attr("fill", "#2196f3")
        .attr("data-date", d => d.added)
        .attr("data-gdp", d => d[temp])
        .attr("class", "bar")
        
        .on("mouseover", function (event, d) {
          d3.select(this).attr("fill", "#ccc");
          tooltip.style("display", "block")
            .attr("data-date", d.added)
            .html(`Sector: ${d.sector}<br>Topic: ${d.topic}`);
        })
        .on("mousemove", function (event) {
          const [x, y] = d3.pointer(event);
          tooltip.style("left", x + 560 + "px")
            .style("top", y + 65 + "px");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "#2196f3");
          tooltip.style("display", "none");
        });

      const tooltip = d3.select("#tooltip").attr("data-date", "").on("mousemove", function (event) {
        d3.select(this).style("top", event.pageY - 50 + "px")
      });;
    })
    .catch(error => console.error("Error fetching data:", error.message));


  return (
    <div className="App">
      <h1 id="title"> United State GDP </h1>
      <svg id="chart" width="800" height="400"></svg>



      <div id="tooltip"></div>
    </div>
  );
}

export default Bar;


