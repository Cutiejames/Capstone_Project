<template>
  <div class="container mt-5">
    <!-- Filter Dropdown -->
    <div class="d-flex justify-content-end mb-3">
      <select v-model="filter" class="form-select w-auto">
        <option value="All">All</option>
        <option value="Answered">Answered</option>
        <option value="Pending">Pending</option>
      </select>
    </div>

    <!-- Collapsible List Card -->
    <div class="card">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <span><i class="bi bi-list"></i> List</span>
        <button class="btn btn-sm" @click="isOpen = !isOpen">
          <i :class="isOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
        </button>
      </div>

      <div v-if="isOpen" class="card-body p-0">
        <div
          v-for="(item, index) in filteredItems"
          :key="index"
          class="border-bottom p-3 d-flex"
        >
          <img
            src="https://via.placeholder.com/40"
            alt="avatar"
            class="rounded-circle me-3"
          />
          <div>
            <div class="fw-bold text-primary">
              #{{ item.id }} - {{ item.subject }}
              <span
                class="badge ms-2"
                :class="{
                  'bg-secondary': item.status === 'Answered',
                  'bg-danger': item.status === 'Pending'
                }"
              >
                {{ item.status }}
              </span>
            </div>
            <div>{{ item.name }}</div>
            <div>{{ item.email }}</div>
            <div class="text-muted">{{ item.date }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true,
      filter: 'All',
      items: [
        {
          id: 1001,
          subject: 'Lost key - New key',
          name: 'John Doe',
          email: 'Example@gmail.com',
          date: '05-18-2025 12:33:11',
          status: 'Answered'
        },
        {
          id: 1001,
          subject: 'Lost key - New key',
          name: 'John Doe',
          email: 'Example@mail.com',
          date: '05-18-2025 12:33:11',
          status: 'Pending'
        },
        {
          id: 1001,
          subject: 'Lost key - New key',
          name: 'John Doe',
          email: 'Example@gmail.com',
          date: '05-18-2025 12:33:11',
          status: 'Answered'
        }
      ]
    };
  },
  computed: {
    filteredItems() {
      if (this.filter === 'All') return this.items;
      return this.items.filter(item => item.status === this.filter);
    }
  }
};
</script>

<style scoped>
.card-body img {
  width: 40px;
  height: 40px;
}
</style>
