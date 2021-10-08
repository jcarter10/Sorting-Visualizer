import React from 'react'
import { Chart } from 'react-charts'


const MyChart = ({ theData }) => {

    // sets initial data
    const data = React.useMemo(
        () => [
            {
                data: theData
            },
        ],
        [theData]
    )

    // sets the type of graph (bar graph)
    const series = React.useMemo(
        () => ({
            type: 'bar'
        }),
        []
    )

    // sets the axis options
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom', show: false },
            { type: 'linear', position: 'left', show: false }
        ],
        []
    )

    // return chart component
    return (
        <div id='chartDiv'>
            <div id='chart'>
                <Chart data={data} series={series} axes={axes}/>
            </div>
        </div>
    )
}

export default MyChart;
