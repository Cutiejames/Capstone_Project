<template>
  <div class="p-4 bg-light w-100">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div><h5 class="mb-0">Dashboard</h5></div>
      <div class="d-flex align-items-center">
        <div class="text-end me-3">
          <small class="d-block">John Doe</small>
          <small class="text-muted">Admin</small>
        </div>
        <img
          src="https://via.placeholder.com/40"
          class="rounded-circle"
          alt="Admin Avatar"
          width="40"
          height="40"
        />
      </div>
    </div>

    <!-- Show cards only on root -->
    <div v-if="$route.path === '/TestDashboard/admin-dashboard'">
      <div class="row g-3 mb-4">
        <div class="col-md-2" v-for="(card, i) in cards" :key="i">
          <div class="card h-100 text-center">
            <div class="card-body">
              <h5>{{ card.title }}</h5>
              <h3>{{ card.value }}</h3>
              <small :class="card.change >= 0 ? 'text-success' : 'text-danger'">
                {{ card.change }}% Since last month
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Page View -->
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'admin-dashboard',
  data() {
    return {
      cards: [
        { title: 'Total Profit', value: '₱1,500', change: 55 },
        { title: 'Total Customers', value: '400', change: 50 },
        { title: 'Total Rent', value: '300', change: 45 },
        { title: 'Total Reservation', value: '100', change: -10 },
        { title: 'Locker Availability', value: '15', change: 0 }
      ]
    };
  }
};
</script>
