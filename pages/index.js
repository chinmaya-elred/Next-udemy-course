import React, { Component } from 'react'
import Chart from 'react-google-charts'
import ShareButton from "react-web-share-button";

const LineData = [
  ['x', 'dogs', 'cats'],
  [0, 0, 0],
  [1, 20, 5],
  [2, 23, 15],
  [3, 17, 9],
  [4, 18, 10],
  [5, 9, 5],
  [6, 11, 3],
  [7, 27, 19],
]
const LineChartOptions = {
  hAxis: {
    title: 'Time',
  },
  vAxis: {
    title: 'Popularity',
  },
  series: {
    1: { curveType: 'function' },
  },
}
  const Home = () => {
    return (
      <div className="container mt-5">
        <h2>React Google Line Chart Example</h2>
        <Chart
          width={'700px'}
          height={'410px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={LineData}
          options={{
            title: "Company Performance",
            legend: { position: "bottom" },
            lineWidth: 2,
            colors: ["yellow", "green"]
          }}
          rootProps={{ 'data-testid': '2' }}
        />


        <ShareButton />
      </div>
    )
  }
export default Home;