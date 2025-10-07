<template>
  <div class="container my-5 pb-5">
    <!-- Legend -->
    <div class="stats d-flex justify-content-start gap-4">
      <div><span class="dot bg-danger"></span> RENTED</div>
      <div><span class="dot bg-warning"></span> RESERVED</div>
      <div><span class="dot bg-success"></span> AVAILABLE</div>
    </div>

    <!-- Locker Batches -->
    <div class="row justify-content-center mb-5">
      <!-- Left Batch -->
      <div class="col-md-6 text-center">
        <h5 class="fw-bold mb-3">{{ currentBatchLetters[0] }}</h5>
        <div class="row g-3 justify-content-center">
          <div
            v-for="locker in leftBatch"
            :key="locker.locker_id"
            class="col-3 d-flex justify-content-center"
          >
            <div
              class="card locker-card shadow-sm"
              :class="{ selected: selectedLocker && selectedLocker.locker_id === locker.locker_id }"
              @click="openLocker(locker)"
            >
              <div class="card-body text-center p-3">
                <div class="locker-icon-wrapper mb-2">
                  <img :src="lockerIcon" alt="Locker" class="locker-icon" />
                </div>
                <div class="locker-number">{{ locker.locker_number }}</div>
                <div class="status-dot mt-1" :class="statusColor(locker.status)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Batch -->
      <div class="col-md-6 text-center">
        <h5 class="fw-bold mb-3">{{ currentBatchLetters[1] }}</h5>
        <div class="row g-3 justify-content-center">
          <div
            v-for="locker in rightBatch"
            :key="locker.locker_id"
            class="col-3 d-flex justify-content-center"
          >
            <div
              class="card locker-card shadow-sm"
              :class="{ selected: selectedLocker && selectedLocker.locker_id === locker.locker_id }"
              @click="openLocker(locker)"
            >
              <div class="card-body text-center p-3">
                <div class="locker-icon-wrapper mb-2">
                  <img :src="lockerIcon" alt="Locker" class="locker-icon" />
                </div>
                <div class="locker-number">{{ locker.locker_number }}</div>
                <div class="status-dot mt-1" :class="statusColor(locker.status)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <p><strong>Assigned To:</strong> {{ selectedLocker.assigned_to || "N/A" }}</p>
            <p><strong>Locker Number:</strong> {{ selectedLocker.locker_number }}</p>

            <div v-if="selectedLocker.status === 'available'" class="mt-3 text-center">
              <p>This locker is currently available!</p>
              <p>Would you like to assign someone?</p>
              <button class="btn btn-danger me-2" @click="selectedLocker = null">No</button>
              <button class="btn btn-primary" @click="assignLocker(selectedLocker)">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Fixed at Bottom -->
    <div class="pagination-footer">
      <button
        class="btn btn-outline-primary rounded-pill px-4 fw-semibold pagination-btn"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        ‹ Prev
      </button>

      <div class="d-flex gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          class="page-circle"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
      </div>

      <button
        class="btn btn-outline-primary rounded-pill px-4 fw-semibold pagination-btn"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next ›
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import lockerIcon from "@/assets/locker-black.png";

export default {
  name: "LockerPage",
  data() {
    return {
      lockers: [],
      selectedLocker: null,
      currentPage: 1,
      lockerIcon,
      letters: ["A", "B", "C", "D"],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.letters.length / 2);
    },
    currentBatchLetters() {
      const index = (this.currentPage - 1) * 2;
      return [this.letters[index], this.letters[index + 1]];
    },
    sortedLockers() {
      return [...this.lockers].sort((a, b) => {
        const letterA = a.locker_number.charAt(0).toUpperCase();
        const letterB = b.locker_number.charAt(0).toUpperCase();
        const numA = parseInt(a.locker_number.slice(1)) || 0;
        const numB = parseInt(b.locker_number.slice(1)) || 0;
        if (letterA === letterB) return numA - numB;
        return letterA.localeCompare(letterB);
      });
    },
    leftBatch() {
      return this.sortedLockers.filter((l) =>
        l.locker_number.startsWith(this.currentBatchLetters[0])
      );
    },
    rightBatch() {
      return this.sortedLockers.filter((l) =>
        l.locker_number.startsWith(this.currentBatchLetters[1])
      );
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
    async assignLocker(locker) {
      try {
        const payload = {
          locker_id: locker.locker_id,
          assigned_to: "student_id_here",
          status: "reserved",
          assigned_at: new Date().toISOString(),
        };
        await axios.post("http://localhost:3001/transaction", payload);
        await this.fetchLockers();
        this.selectedLocker = null;
        alert(`Locker ${locker.locker_number} assigned successfully!`);
      } catch (error) {
        console.error("Error assigning locker:", error);
        alert("Failed to assign locker.");
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
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
.stats{
  margin-bottom: 60px;
}
.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 4px;
}

.locker-card {
  width: 90px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25) !important;
  transition: transform 0.2s ease;
}

.locker-card:hover {
  transform: translateY(-4px);
}

.locker-card.selected .locker-icon-wrapper {
  border-bottom: 3px solid #8000ff;
}

.locker-icon-wrapper {
  border-bottom: 3px solid #000;
  padding-bottom: 6px;
  display: flex;
  justify-content: center;
}

.locker-icon {
  width: 45px;
  height: auto;
}

.locker-number {
  font-weight: bold;
  font-size: 14px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 auto;
}

/* Pagination Footer */
.pagination-footer {
  position: relative;
  bottom: -150px;
  left: 0;
  right: 0;
  background: white;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.btn-outline-primary {
  border: 2px solid #007bff;
  color: #007bff;
  background-color: white;
  transition: all 0.2s ease-in-out;
}

.btn-outline-primary:hover:not(:disabled) {
  background-color: #007bff;
  color: white;
}

.btn-outline-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.page-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #007bff;
  background-color: white;
  color: #007bff;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  line-height: 34px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.page-circle:hover {
  background-color: #007bff;
  color: white;
}

.page-circle.active {
  background-color: #007bff;
  color: white;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}
</style>
