<template>
  <div class="d-flex flex-column flex-lg-row" style="min-height: 100vh;">
    <!-- Sidebar for desktop -->
    <div class="bg-light border-end p-3 d-none d-lg-block" style="width: 200px; flex-shrink: 0;">
      <nav class="nav nav-pills flex-column">
        <button class="nav-link" :class="{ active: currentComponent === 'FiveLine' }" @click="currentComponent = 'FiveLine'">
          五線譜 
        </button>
        <button class="nav-link" :class="{ active: currentComponent === 'MonthlyRevenue' }" @click="currentComponent = 'MonthlyRevenue'">
          月營收查詢
        </button>
      </nav>
    </div>

    <!-- Main content area -->
    <div class="flex-fill">
      <!-- Tab navigation for mobile -->
      <nav class="nav nav-tabs d-lg-none nav-fill">
        <a class="nav-link" :class="{ active: currentComponent === 'FiveLine' }" href="#" @click.prevent="currentComponent = 'FiveLine'">五線譜</a>
        <a class="nav-link" :class="{ active: currentComponent === 'MonthlyRevenue' }" href="#" @click.prevent="currentComponent = 'MonthlyRevenue'">月營收</a>
      </nav>

      <!-- Component content -->
      <div class="p-4">
        <div class="mb-4">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              v-model="stockInput"
              :placeholder="placeholders[currentComponent]"
              @keydown.enter.prevent="handleSearch"
            >
            <button
              class="btn btn-primary"
              @click="handleSearch"
              :disabled="isLoading"
            >
              查詢
            </button>
          </div>
        </div>

        <component
          :is="components[currentComponent]"
          ref="activeComponent"
          :stock-id="stockInput"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import MonthlyRevenue from './components/MonthlyRevenue.vue';
import FiveLine from './components/FiveLine.vue';

const currentComponent = ref('FiveLine');
const activeComponent = ref(null);

const components = {
  MonthlyRevenue,
  FiveLine
};

const defaultStockId = '8462';
const placeholders = {
  FiveLine: '輸入股票代碼',
  MonthlyRevenue: 'Enter stock ID',
  FiveLineQuery: '輸入股票代碼'
};
const stockInput = ref(defaultStockId);

const isLoading = computed(() => activeComponent.value?.isLoading?.value ?? false);

watch(currentComponent, async () => {
  await nextTick();
  activeComponent.value?.fetchData?.(stockInput.value);
}, { immediate: true });

const handleSearch = () => {
  activeComponent.value?.fetchData?.(stockInput.value);
};
</script>

<style scoped>
/* No custom CSS needed, relying on Bootstrap classes */
</style>
