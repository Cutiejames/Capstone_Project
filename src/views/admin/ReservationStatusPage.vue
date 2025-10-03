<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>RESERVATION DETAILS</h2>
      <div class="input-group" style="width: 250px">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search for..."
        />
        <button class="btn btn-primary">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>

    <!-- Scrollable Table Wrapper -->
    <div class="table-container">
      <table class="table table-bordered table-hover align-middle text-center">
        <thead class="table-dark">
          <tr>
            <th>Locker ID</th>
            <th>Locker Number</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="locker in filteredLockers" :key="locker.locker_id">
            <td>{{ locker.locker_id }}</td>
            <td>{{ locker.locker_number }}</td>
            <td>{{ locker.location }}</td>
            <td>{{ locker.status }}</td>
            <td>
              <div class="d-flex justify-content-center gap-2">
                <button
                  class="btn btn-primary btn-sm"
                  @click="approve(locker.locker_id)"
                >
                  Approve
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  @click="cancel(locker.locker_id)"
                >
                  Cancel
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredLockers.length === 0">
            <td colspan="5" class="text-muted fst-italic">
              No reservations found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReservationTable",
  data() {
    return {
      searchQuery: "",
      lockers: []
    };
  },
  computed: {
    filteredLockers() {
      const q = this.searchQuery.toLowerCase();
      return this.lockers.filter(
        l =>
          l.locker_number.toString().toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.status.toLowerCase().includes(q)
      );
    }
  },
  methods: {
    async fetchLockers() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/locker/lockers", {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.lockers = res.data;
      } catch (err) {
        console.error("Failed to fetch lockers:", err);
      }
    },
    approve(lockerId) {
      alert(`Approve reservation for Locker ID: ${lockerId}`);
    },
    cancel(lockerId) {
      alert(`Cancel reservation for Locker ID: ${lockerId}`);
    }
  },
  mounted() {
    this.fetchLockers();
  }
};
</script>

<style scoped>
.table-container {
  max-height: 400px; /* 👈 adjust height to your preference */
  overflow-y: auto;
}
</style>
