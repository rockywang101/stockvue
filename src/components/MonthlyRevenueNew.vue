<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <highcharts :options="chartOptions" ref="chart"></highcharts>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const stackLabelsData = [
  { totalText: '11.32', percentageText: '' },
  { totalText: '13.23', percentageText: '+16.87%' },
  { totalText: '12.53', percentageText: '-5.29%' },
  { totalText: '12.12', percentageText: '-3.27%' },
  { totalText: '10.83', percentageText: '-10.64%' },
  { totalText: '10.81', percentageText: '-0.18%' },
  { totalText: '10.60', percentageText: '-1.94%' },
  { totalText: '12.33', percentageText: '+16.32%' },
  { totalText: '9.12', percentageText: '-26.03%' },
  { totalText: '10.73', percentageText: '+17.65%' },
  { totalText: '8.00', percentageText: '+67.71%' }
];

const chartOptions = ref({
  chart: {
    type: 'column'
  },
  title: {
    text: '8422 可寧衛 EPS'
  },
  xAxis: {
    categories: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
  },
  yAxis: {
    min: 0,
    title: {
      text: '元'
    },
    stackLabels: {
      enabled: true,
      style: {
        fontWeight: 'bold',
        color: 'gray',
        textOutline: 'none'
      },
      formatter: function() {
        const data = stackLabelsData[this.x];
        if (data) {
          const percentageText = data.percentageText;
          let color = 'blue';
          if (percentageText.startsWith('-')) {
            color = 'red';
          }
          return `<span style="font-weight: bold;">${data.totalText}</span><br/><span style="color:${color}; font-weight: bold;">${percentageText}</span>`;
        }
        return '';
      }
    }
  },
  legend: {
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'horizontal'
  },
  tooltip: {
    headerFormat: '<b>{point.x}</b><br/>',
    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      dataLabels: {
        enabled: true,
        color: 'white',
        style: {
          textOutline: 'none'
        }
      }
    }
  },
  credits: {
    enabled: false
  },
  series: [{
    name: 'Q1',
    data: [2.74, 3.55, 3.1, 3.71, 2.74, 2.54, 3.42, 2.41, 2.88, 2.26, 3.97],
    color: '#F7A35C' // Orange
  }, {
    name: 'Q2',
    data: [2.58, 3.4, 3.18, 3.09, 2.77, 2.29, 2.43, 3.29, 2.83, 2.51, 4.03],
    color: '#90EE90' // Green
  }, {
    name: 'Q3',
    data: [2.99, 3.43, 2.98, 2.7, 2.25, 3.01, 2.59, 3.09, 1.36, 2.6, 0],
    color: '#8085E9' // Purple
  }, {
    name: 'Q4',
    data: [3.01, 2.85, 3.27, 2.62, 3.07, 2.97, 2.16, 3.54, 2.05, 3.36, 0],
    color: '#7CB5EC' // Blue
  }]
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
