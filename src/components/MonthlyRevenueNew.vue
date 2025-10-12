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
import { ref, watch } from 'vue';

const props = defineProps({
  stockId: {
    type: String,
    required: true
  }
});

const chartOptions = ref({
  chart: {
    type: 'column'
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: []
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
        textOutline: 'none',
        fontSize: '18px' // stack 最上面那個加總起來的數字
      }
    }
  },
  legend: {
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'horizontal',
    itemStyle: {
      fontSize: '18px'
    }
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
          textOutline: 'none',
          fontSize: '12px' // 每個季區塊裡面的數字
        }
      }
    }
  },
  credits: {
    enabled: false
  },
  series: []
});

const fetchData = async (stockId) => {
  if (!stockId) return;
  try {
    const response = await fetch(`http://localhost:5000/api/apiMonthRevenueNew?stockId=${stockId}`);
    const data = await response.json();
    
    const yearNum = 10

    const slicedQuarterlyYears = data.quarterlyYears.slice(-yearNum);
    const slicedQuarterlySeries = data.quarterlySeries.map(series => ({
      ...series,
      data: series.data.slice(-yearNum)
    }));

    chartOptions.value.title.text = data.stockName + ' 每季營收';
    chartOptions.value.xAxis.categories = slicedQuarterlyYears;
    chartOptions.value.series = slicedQuarterlySeries.reverse();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

watch(() => props.stockId, (newId) => {
  fetchData(newId);
}, { immediate: true });

defineExpose({ fetchData });
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
