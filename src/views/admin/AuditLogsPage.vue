<template>
  <div class="container mt-4">
    <!-- Single Date Filter -->
    <div class="d-flex justify-content-end gap-2 mb-3">
      <input type="date" class="form-control w-auto" v-model="selectedDate" />
      <button class="btn btn-primary" @click="fetchLogs(1)">Filter</button>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-bordered text-center">
        <thead class="table-light">
          <tr>
            <th>ID</th>
            <th>Admin</th>
            <th>Activity</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in tableData" :key="log.audit_id">
            <td>{{ log.audit_id }}</td>
            <td>{{ log.admin_username }}</td>
            <td class="text-start">{{ log.activity }}</td>
            <td>{{ formatDate(log.created_at) }}</td>
            <td>{{ formatTime(log.created_at) }}</td>
          </tr>
          <tr v-if="tableData.length === 0">
            <td colspan="5">No logs found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <nav v-if="totalPages > 1">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
          @click="changePage(currentPage - 1)"
        >
          <a class="page-link">Prev</a>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
          @click="changePage(page)"
        >
          <a class="page-link">{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
          @click="changePage(currentPage + 1)"
        >
          <a class="page-link">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedDate: "", // 👈 only one date input
      currentPage: 1,
      perPage: 10, // 👈 10 rows per page
      totalPages: 1,
      tableData: []
    };
  },
  mounted() {
    this.fetchLogs();
  },
  methods: {
    async fetchLogs(page = 1) {
      try {
        this.currentPage = page;

        let url = `http://localhost:3001/audit-logs?page=${this.currentPage}&limit=${this.perPage}`;

        // add single date filter if set
        if (this.selectedDate) {
          url += `&start=${this.selectedDate}&end=${this.selectedDate}`;
        }

        const res = await axios.get(url);

        // backend response should include { data: [], totalPages: X }
        this.tableData = res.data.data || [];
        this.totalPages = res.data.totalPages || 1;
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.fetchLogs(page);
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },
    formatTime(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
  }
};
</script>
