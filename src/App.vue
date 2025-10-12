<template>
  <div class="d-flex flex-column flex-lg-row" style="min-height: 100vh;">
    <!-- Sidebar for desktop -->
    <div class="bg-light border-end p-3 d-none d-lg-block" style="width: 200px; flex-shrink: 0;">
      <nav class="nav nav-pills flex-column">
        <button class="nav-link" :class="{ active: currentComponent === 'FiveLine' }" @click="currentComponent = 'FiveLine'">
          無敵五線譜
        </button>
        <button class="nav-link" :class="{ active: currentComponent === 'MonthlyRevenue' }" @click="currentComponent = 'MonthlyRevenue'">
          月營收查詢
        </button>
        <button class="nav-link" :class="{ active: currentComponent === 'MonthlyRevenueNew' }" @click="currentComponent = 'MonthlyRevenueNew'">
          最新月營收
        </button>
      </nav>
    </div>

    <!-- Main content area -->
    <div class="flex-fill">
      <!-- 左側功能選單 -->
      <!-- Tab navigation for mobile -->
      <nav class="nav nav-tabs d-lg-none nav-fill">
        <a class="nav-link" :class="{ active: currentComponent === 'FiveLine' }" href="#" @click.prevent="currentComponent = 'FiveLine'">五線譜</a>
        <a class="nav-link" :class="{ active: currentComponent === 'MonthlyRevenue' }" href="#" @click.prevent="currentComponent = 'MonthlyRevenue'">月營收查詢</a>
        <a class="nav-link" :class="{ active: currentComponent === 'MonthlyRevenueNew' }" href="#" @click.prevent="currentComponent = 'MonthlyRevenueNew'">最新月營收</a>
      </nav>

      <!-- 右邊區塊 -->
      <div class="p-4">
        <!-- 最上面的查詢框 -->
        <div class="mb-4">
          <div class="input-group">
            <input type="text" class="form-control" v-model="stockInput" :placeholder="placeholders[currentComponent]" @keydown.enter.prevent="handleSearch">
            <button class="btn btn-primary" @click="handleSearch" :disabled="isLoading">
              查詢
            </button>
          </div>
        </div>
        <!-- 主要功能區 -->
        <keep-alive>
          <component
            ref="currentComponentRef"
            :is="components[currentComponent]"
            :stock-id="stockIdToSearch"
          />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MonthlyRevenue from './components/MonthlyRevenue.vue';
import MonthlyRevenueNew from './components/MonthlyRevenueNew.vue';
import FiveLine from './components/FiveLine.vue';

const currentComponent = ref('MonthlyRevenueNew');
const currentComponentRef = ref(null);

const components = {
  MonthlyRevenue,
  MonthlyRevenueNew,
  FiveLine
};

const defaultStockId = '6951';
const placeholders = {
  FiveLine: '輸入股票代碼',
  MonthlyRevenue: 'Enter stock ID',
  FiveLineQuery: '輸入股票代碼'
};
const stockInput = ref(defaultStockId);
const stockIdToSearch = ref(defaultStockId);
const isLoading = ref(false); // Note: isLoading is now local and not reactive from child

const handleSearch = () => {
  const newStockId = stockInput.value;
  const oldStockId = stockIdToSearch.value;
  stockIdToSearch.value = newStockId;

  // If the stock ID hasn't changed, the watch listener in the child component won't fire.
  // In this case, we need to manually trigger the data fetch.
  // We also need to ensure the component is mounted and has the fetchData method.
  if (newStockId === oldStockId && currentComponentRef.value && typeof currentComponentRef.value.fetchData === 'function') {
    currentComponentRef.value.fetchData(newStockId);
  }
};
</script>

<style scoped>
/* No custom CSS needed, relying on Bootstrap classes */
</style>
