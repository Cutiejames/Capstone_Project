<template>
  <div class="container my-5">
    <!-- Legend -->
    <div class="d-flex justify-content-center gap-4 mb-4">
      <div><span class="dot bg-danger"></span> RENTED</div>
      <div><span class="dot bg-warning"></span> RESERVED</div>
      <div><span class="dot bg-success"></span> AVAILABLE</div>
    </div>

    <!-- Locker Grid -->
    <div class="row">
      <div
        v-for="locker in paginatedLockers"
        :key="locker.locker_id"
        class="col-2 mb-4 d-flex justify-content-center"
      >
        <div class="locker-wrapper" @click="openLocker(locker)">
          <div class="locker-card">
            <!-- locker image -->
            <img :src="lockerIcon" alt="Locker" class="locker-icon" />
          </div>
          <div class="locker-number">{{ locker.locker_number }}</div>
          <div class="status-dot" :class="statusColor(locker.status)"></div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-center mt-4">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage">Prev</button>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage">Next</button>
        </li>
      </ul>
    </div>

    <!-- Locker Modal -->
    <div
      v-if="selectedLocker"
      class="modal fade show"
      style="display: block; background: rgba(0,0,0,0.5);"
      tabindex="-1"
      @click.self="selectedLocker = null"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Locker {{ selectedLocker.locker_number }}</h5>
            <button type="button" class="btn-close" @click="selectedLocker = null"></button>
          </div>
          <div class="modal-body">
            <p><strong>Status:</strong> {{ selectedLocker.status }}</p>
            <p><strong>Assigned To:</strong> {{ selectedLocker.assigned_to || 'N/A' }}</p>
            <p><strong>Locker Number:</strong> {{ selectedLocker.locker_number }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import lockerIcon from "@/assets/locker.png"; // ✅ same pattern as sidebar

export default {
  name: "LockerPage",
  data() {
    return {
      lockers: [],
      selectedLocker: null,
      currentPage: 1,
      pageSize: 24, // only 24 lockers per page
      lockerIcon, // make available in template
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.lockers.length / this.pageSize);
    },
    paginatedLockers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.lockers.slice(start, end);
    },
  },
  methods: {
    async fetchLockers() {
      try {
        const response = await axios.get("http://localhost:3001/locker/lockers");
        this.lockers = response.data;
      } catch (error) {
        console.error("Error fetching lockers:", error);
      }
    },
    statusColor(status) {
      switch (status) {
        case "rented":
          return "bg-danger";
        case "reserved":
          return "bg-warning";
        case "available":
          return "bg-success";
        default:
          return "bg-secondary";
      }
    },
    openLocker(locker) {
      this.selectedLocker = locker;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    this.fetchLockers();
  },
};
</script>

<style scoped>
/* legend dots */
.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 4px;
}

/* grid item */
.locker-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

/* square box with icon */
.locker-card {
  width: 70px;
  height: 70px;
  border: 2px solid #000;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}

.locker-icon {
  width: 800px;
  height: auto;
}

/* label under box */
.locker-number {
  font-weight: bold;
  margin-top: 4px;
}

/* status dot under label */
.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 4px;
}
</style>
