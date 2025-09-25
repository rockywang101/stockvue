<template>
  <div class="container mt-5">
    <div v-if="isLoading" class="row justify-content-center mb-3">
      <div class="col-auto">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-if="apiData && !apiData.error" class="mt-5" style="width: 85%; margin: 0 auto;">
      <div class="row">
        <div class="col-md-12" >
          <highcharts :options="chartOptions1" ref="chart1" style="display: block;"></highcharts>
          <div class="table-responsive">
            <table class="table table-bordered mt-3 text-center" style="min-width: 800px;">
              <thead class="table-dark">
                <tr>
                  <th>年份</th>
                <th>1月</th>
                <th>2月</th>
                <th>3月</th>
                <th>4月</th>
                <th>5月</th>
                <th>6月</th>
                <th>7月</th>
                <th>8月</th>
                <th>9月</th>
                <th>10月</th>
                <th>11月</th>
                <th>12月</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in apiData.tableBody1" :key="row.head">
                <td>{{ row.head }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M01) < 0 }">{{ row.M01 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M02) < 0 }">{{ row.M02 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M03) < 0 }">{{ row.M03 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M04) < 0 }">{{ row.M04 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M05) < 0 }">{{ row.M05 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M06) < 0 }">{{ row.M06 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M07) < 0 }">{{ row.M07 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M08) < 0 }">{{ row.M08 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M09) < 0 }">{{ row.M09 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M10) < 0 }">{{ row.M10 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M11) < 0 }">{{ row.M11 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M12) < 0 }">{{ row.M12 }}</td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-12">
          <highcharts :options="chartOptions2" ref="chart2" style="display: none;"></highcharts>
          <div class="table-responsive">
            <table class="table table-bordered mt-3 text-center" style="min-width: 800px; display: none;">
              <thead class="table-dark">
                <tr>
                  <th>年份</th>
                <th>1月</th>
                <th>2月</th>
                <th>3月</th>
                <th>4月</th>
                <th>5月</th>
                <th>6月</th>
                <th>7月</th>
                <th>8月</th>
                <th>9月</th>
                <th>10月</th>
                <th>11月</th>
                <th>12月</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in apiData.tableBody2" :key="row.head">
                <td>{{ row.head }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M01) < 0 }">{{ row.M01 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M02) < 0 }">{{ row.M02 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M03) < 0 }">{{ row.M03 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M04) < 0 }">{{ row.M04 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M05) < 0 }">{{ row.M05 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M06) < 0 }">{{ row.M06 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M07) < 0 }">{{ row.M07 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M08) < 0 }">{{ row.M08 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M09) < 0 }">{{ row.M09 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M10) < 0 }">{{ row.M10 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M11) < 0 }">{{ row.M11 }}</td>
                <td :class="{ 'text-danger': parseFloat(row.M12) < 0 }">{{ row.M12 }}</td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-12">
          <h6 class="text-center">{{ apiData.stockName }} 季度營收比較</h6>
          <div class="table-responsive">
            <table class="table table-bordered mt-3 text-center">
              <thead class="table-dark">
                <tr>
                  <th>年份</th>
                <th v-if="quarterlyData.headers.Q1">{{ quarterlyData.headers.Q1 }}</th>
                <th v-if="quarterlyData.headers.Q2">{{ quarterlyData.headers.Q2 }}</th>
                <th v-if="quarterlyData.headers.Q3">{{ quarterlyData.headers.Q3 }}</th>
                <th v-if="quarterlyData.headers.Q4">{{ quarterlyData.headers.Q4 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in quarterlyData.data" :key="row.year">
                <td>{{ row.year }}</td>
                <td v-if="quarterlyData.headers.Q1" :class="{ 'text-danger': parseFloat(row.Q1) < 0 }">{{ row.Q1 }}</td>
                <td v-if="quarterlyData.headers.Q2" :class="{ 'text-danger': parseFloat(row.Q2) < 0 }">{{ row.Q2 }}</td>
                <td v-if="quarterlyData.headers.Q3" :class="{ 'text-danger': parseFloat(row.Q3) < 0 }">{{ row.Q3 }}</td>
                <td v-if="quarterlyData.headers.Q4" :class="{ 'text-danger': parseFloat(row.Q4) < 0 }">{{ row.Q4 }}</td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-if="apiData && apiData.error" class="mt-3">
      <h5>Error:</h5>
      <p>{{ apiData.error }}</p>
    </div>
  </div>

  <div class="mt-5"></div> <!--為了讓下面有點間距-->
</template>

<script setup>
import { ref, computed } from 'vue';
import api from "@/api.js";

const props = defineProps({
  stockId: {
    type: String,
    required: true
  }
});
const apiData = ref(null);
const isLoading = ref(false);

const fetchData = async (id = props.stockId) => {
  if (!id) {
    return;
  }
  isLoading.value = true;
  try {
    apiData.value = await api.get(`/api/test?stockId=${id}`);
  } catch (error) {
    console.error('Error fetching data:', error);
    apiData.value = { error: error.message };
  } finally {
    isLoading.value = false;
  }
};

defineExpose({ fetchData, isLoading });

const chartOptions1 = computed(() => ({
  chart: {
    type: 'line'
  },
  title: {
    text: `${apiData.value.stockName} 月營收資料`
  },
  xAxis: {
    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    title: {
      text: '營收'
    }
  },
  credits: {
    enabled: false
  },
  series: apiData.value ? apiData.value.series1 : []
}));

const chartOptions2 = computed(() => ({
  chart: {
    type: 'line'
  },
  title: {
    text: `${apiData.value.stockName} 累計營收資料`
  },
  xAxis: {
    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    title: {
      text: '營收'
    }
  },
  credits: {
    enabled: false
  },
  series: apiData.value ? apiData.value.series2 : []
}));

const quarterlyData = computed(() => {
  if (!apiData.value || !apiData.value.tableBody1 || apiData.value.tableBody1.length === 0) return { headers: {}, data: [] };

  // 找到最新年份（最後一個）
  const latestYearData = apiData.value.tableBody1[apiData.value.tableBody1.length - 1];

  // 確定最新年份有哪些月份有資料
  const availableMonths = [];
  for (let i = 1; i <= 12; i++) {
    const monthKey = `M${i.toString().padStart(2, '0')}`;
    const value = parseFloat(latestYearData[monthKey]) || 0;
    if (value !== 0) {
      availableMonths.push(i);
    }
  }

  // 生成季度標題
  const generateQuarterHeader = (quarterMonths) => {
    const availableQuarterMonths = quarterMonths.filter(month => availableMonths.includes(month));
    if (availableQuarterMonths.length === 0) return '';
    if (availableQuarterMonths.length === 1) {
      return `${availableQuarterMonths[0]}月`;
    }
    const minMonth = Math.min(...availableQuarterMonths);
    const maxMonth = Math.max(...availableQuarterMonths);
    return `${minMonth}-${maxMonth}月`;
  };

  const headers = {
    Q1: availableMonths.some(m => [1,2,3].includes(m)) ? `Q1 (${generateQuarterHeader([1,2,3])})` : '',
    Q2: availableMonths.some(m => [4,5,6].includes(m)) ? `Q2 (${generateQuarterHeader([4,5,6])})` : '',
    Q3: availableMonths.some(m => [7,8,9].includes(m)) ? `Q3 (${generateQuarterHeader([7,8,9])})` : '',
    Q4: availableMonths.some(m => [10,11,12].includes(m)) ? `Q4 (${generateQuarterHeader([10,11,12])})` : 'Q4'
  };

  // 根據可用月份計算季度
  const calculateQuarter = (row, quarterMonths) => {
    const availableQuarterMonths = quarterMonths.filter(month => availableMonths.includes(month));
    if (availableQuarterMonths.length === 0) return '';
    return availableQuarterMonths.reduce((sum, month) => {
      const monthKey = `M${month.toString().padStart(2, '0')}`;
      return sum + (parseFloat(row[monthKey]) || 0);
    }, 0);
  };

  const data = apiData.value.tableBody1.map(row => {
    const q1 = calculateQuarter(row, [1, 2, 3]);
    const q2 = calculateQuarter(row, [4, 5, 6]);
    const q3 = calculateQuarter(row, [7, 8, 9]);
    const q4 = calculateQuarter(row, [10, 11, 12]);

    return {
      year: row.head,
      Q1: q1 === '' ? '' : (q1 === 0 ? '' : q1.toFixed(2)),
      Q2: q2 === '' ? '' : (q2 === 0 ? '' : q2.toFixed(2)),
      Q3: q3 === '' ? '' : (q3 === 0 ? '' : q3.toFixed(2)),
      Q4: q4 === '' ? '' : (q4 === 0 ? '' : q4.toFixed(2))
    };
  });

  // Correct YoY row calculation if there are at least three rows (two years + YoY)
  if (data.length >= 3) {
    const yoyIndex = data.length - 1;
    const lastYear = data[yoyIndex - 1];
    const prevYear = data[yoyIndex - 2];
    data[yoyIndex].Q1 = (lastYear.Q1 && prevYear.Q1 && lastYear.Q1 !== '' && prevYear.Q1 !== '' && parseFloat(prevYear.Q1) !== 0) ? (((parseFloat(lastYear.Q1) - parseFloat(prevYear.Q1)) / parseFloat(prevYear.Q1)) * 100).toFixed(2) : '';
    data[yoyIndex].Q2 = (lastYear.Q2 && prevYear.Q2 && lastYear.Q2 !== '' && prevYear.Q2 !== '' && parseFloat(prevYear.Q2) !== 0) ? (((parseFloat(lastYear.Q2) - parseFloat(prevYear.Q2)) / parseFloat(prevYear.Q2)) * 100).toFixed(2) : '';
    data[yoyIndex].Q3 = (lastYear.Q3 && prevYear.Q3 && lastYear.Q3 !== '' && prevYear.Q3 !== '' && parseFloat(prevYear.Q3) !== 0) ? (((parseFloat(lastYear.Q3) - parseFloat(prevYear.Q3)) / parseFloat(prevYear.Q3)) * 100).toFixed(2) : '';
    data[yoyIndex].Q4 = (lastYear.Q4 && prevYear.Q4 && lastYear.Q4 !== '' && prevYear.Q4 !== '' && parseFloat(prevYear.Q4) !== 0) ? (((parseFloat(lastYear.Q4) - parseFloat(prevYear.Q4)) / parseFloat(prevYear.Q4)) * 100).toFixed(2) : '';
  }

  return { headers, data };
});
</script>

<style scoped>
.text-danger {
  color: #ff0000 !important; /* 讓紅字的字更紅一點，因為預設只是暗紅色 */
}
</style>
