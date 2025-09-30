<template>
  <div class="container mt-3">
    <div v-if="isLoading" class="row justify-content-center">
      <div class="col-auto text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mx-4">
      <div class="col-lg-8 col-md-10 col-12 px-4">
        <div id="div1" style="height: 400px;"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div id="div3" style="height: 400px;"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div id="div4" style="height: 400px;"></div>
      </div>
    </div>
    <div class="row d-none">
      <div class="col-12">
        <div id="div2" style="height: 400px;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Highcharts from 'highcharts';
import { ref, watch } from 'vue';
import api from "@/api.js";

const props = defineProps({
  stockId: {
    type: String,
    required: true
  }
});
const isLoading = ref(false);

const fetchData = async (id) => {
  if (!id) {
    return;
  }
  isLoading.value = true;
  try {
    const data = await api.get(`/api/v1/testFive?stockId=${id}`);
    drawClock('div1', data);
    drawFive2('div3', data);
    drawABBand('div4', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
};

watch(() => props.stockId, (newId) => {
  fetchData(newId);
}, { immediate: true });

function drawClock(divName, data) {
  const now = data.nowPrice;
  const sdArray = data.sdArray;

  const commonBandStyle = {
    thickness: 20,
    borderRadius: '20%'
  };
  const colors = ['#55BF3B', '#A2D729', '#DF9500', '#FFE600', '#DF5353', 'red'];
  const plotBands = colors.map((color, i) => ({
    from: sdArray[i],
    to: sdArray[i + 1],
    color,
    ...commonBandStyle
  }));

  Highcharts.chart(divName, {
    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: '80%'
    },
    title: {
      text: data.stockId + " " + data.stockName + " 五線譜位階",
      style: {
        fontSize: '18px'
      }
    },
    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ['50%', '75%'],
      size: '110%'
    },
    yAxis: {
      min: sdArray[0],
      max: sdArray[sdArray.length - 1],
      tickPositions: sdArray,
      tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
      tickLength: 20,
      minorTickInterval: null,
      labels: {
        formatter: function () {
          return this.value;
        },
        rotation: 'auto',
        distance: 12,
        style: {
          fontSize: '16px'
        }
      },
      lineWidth: 0,
      plotBands: plotBands
    },
    series: [{
      data: [now],
      dataLabels: {
        format: '位階：' + data.nowSD + '<br/>現價：{y} 元',
        borderWidth: 0,
        color: (
          Highcharts.defaultOptions.title &&
          Highcharts.defaultOptions.title.style &&
          Highcharts.defaultOptions.title.style.color
        ) || '#333333',
        style: {
          fontSize: '16px'
        }
      },
      dial: {
        radius: '80%',
        backgroundColor: 'gray',
        baseWidth: 12,
        baseLength: '0%',
        rearLength: '0%'
      },
      pivot: {
        backgroundColor: 'gray',
        radius: 6
      }
    }],
    exporting: { enabled: false },
    credits: { enabled: false }
  });
}

function buildSeries(dateArray, valueArray) {
  return dateArray.map((dateStr, i) => [
    Date.parse(dateStr),
    valueArray[i]
  ]);
}

// 五線譜 (x軸只顯示年份)
function drawFive2(divName, data) {
  let minY = Math.min(...data.N_2SDArray);
  let maxY = Math.max(...data.P_2SDArray);
  let maxPrice = Math.max(...data.priceArray);
  maxY = Math.max(maxY, maxPrice);

  // 取得年份變化的位置（tick index）
  const tickPositions = data.dateArray.map((d, i) => [i, new Date(d).getFullYear()])
    .filter((pair, i, arr) =>
      i === 0 || pair[1] !== arr[i - 1][1])
    .map(pair => Date.parse(data.dateArray[pair[0]]));

  Highcharts.chart(divName, {
    chart: {
      type: 'line'
    },
    title: {
      text: '' // 不要 title
    },
    xAxis: {
      type: 'datetime',
      tickPositions: tickPositions,
      labels: {
        formatter: function () {
          return Highcharts.dateFormat('%Y', this.value);
        },
        style: {
          fontSize: '14px'
        }
      }
    },
    yAxis: {
      title: {
        text: '' // 不顯示 y 軸標題
      },
      min: Math.ceil(minY),  // 設定最小值
      max: Math.ceil(maxY),   // 設定最大值
      tickInterval: 5
    },
    tooltip: {
      formatter: function () {
        const index = data.dateArray.findIndex(d => Date.parse(d) === this.x);
        const plus2 = data.P_2SDArray[index];
        const minus2 = data.N_2SDArray[index];
        const center = data.TLArray[index];
        const price = data.priceArray[index];
        return `
          <b>${Highcharts.dateFormat('%Y/%m/%d', this.x)}</b><br/>
          價格: ${price?.toFixed(2)}<br/>
          +2SD: ${plus2?.toFixed(2)}<br/>
          中心線: ${center?.toFixed(2)}<br/>
          -2SD: ${minus2?.toFixed(2)}
        `;
      },
      style: {
        fontSize: '16px'
      },
      shared: true,
      useHTML: true
    },
    series: [
      { name: 'price', data: buildSeries(data.dateArray, data.priceArray) },
      { name: '-2SD', data: buildSeries(data.dateArray, data.N_2SDArray) },
      { name: '-1SD', data: buildSeries(data.dateArray, data.N_1SDArray) },
      { name: '中心線', data: buildSeries(data.dateArray, data.TLArray) },
      { name: '+1SD', data: buildSeries(data.dateArray, data.P_1SDArray) },
      { name: '+2SD', data: buildSeries(data.dateArray, data.P_2SDArray) }
    ],
    exporting: { enabled: false }, // 移除右上角選單
    credits: { enabled: false } // 移除 Highchart.com 超連結
  });
}

function drawABBand(divName, data) {
  Highcharts.chart(divName, {
    chart: {
      type: 'line'
    },
    title: {
      text: data.stockId + " " + data.stockName + " AB 加速通道",
      style: {
        fontSize: '18px'
      }
    },
    xAxis: {
      categories: data.AB_dateArray,
      labels: {
        rotation: 'auto'
      }
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    tooltip: {
      shared: true,
      useHTML: true
    },
    series: [
      {
        name: 'AB_UpperBand',
        data: data.AB_UpperBand
      },
      {
        name: 'AB_MidPoint',
        data: data.AB_MidPoint
      },
      {
        name: 'AB_lowerBand',
        data: data.AB_lowerBand
      },
      {
        name: 'AB_priceArray',
        data: data.AB_priceArray
      }
    ],
    exporting: { enabled: false },
    credits: { enabled: false }
  });
}
</script>
