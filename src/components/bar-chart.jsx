import React from 'react'
import { Line } from 'react-chartjs-2'

const BarChart = () => {
  return (
    <Line
    data={{
      labels: [1, 2, 3, 4, 5, 6],
      datasets: [
        {
          data: [47, 52, 67, 58, 9, 50],
          backgroundColor: '#FF0303',
        },
      ],
    }}
    height={400}
    width={600}
    options={{
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      legend: {
        display: false
    }

    }}
  />
  )
}

export default BarChart