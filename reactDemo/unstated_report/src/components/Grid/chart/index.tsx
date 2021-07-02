import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ItemDataType } from '@/models/details';


const ChartGrid = ({itemData}:{itemData: ItemDataType}) => {
  console.log('chart:::', itemData);
  let { h = 100 } = itemData;
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };
  return (
    <div className="com_container">
      <ReactECharts 
        option={options} 
        style={{ height: h }}
      />
    </div>
  )
}

export default ChartGrid;