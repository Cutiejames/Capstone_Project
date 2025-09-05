<template>
  <div class="container my-5">
    <!-- Legend -->
    <div class="d-flex justify-content-center gap-4 mb-4">
      <div><span class="dot bg-danger"></span> RENTED</div>
      <div><span class="dot bg-warning"></span> RESERVED</div>
      <div><span class="dot bg-success"></span> AVAILABLE</div>
    </div>

    <!-- Filter Icon (Placeholder) -->
    <div class="text-end mb-2">
      <i class="bi bi-sliders"></i>
    </div>

    <!-- Locker Grid -->
    <div class="row">
      <!-- Column A -->
      <div class="col-6">
        <h5 class="text-center fw-bold mb-3">A</h5>
        <div class="row row-cols-4 g-3">
          <div
            v-for="locker in lockersA"
            :key="locker.id"
            class="col text-center"
          >
            <div class="card shadow-sm">
              <div class="card-body p-2">
                <i class="bi bi-hdd-stack-fill fs-3"></i>
                <div class="fw-bold">{{ locker.id }}</div>
                <span
                  class="status-dot"
                  :class="statusColor(locker.status)"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Column B -->
      <div class="col-6">
        <h5 class="text-center fw-bold mb-3">B</h5>
        <div class="row row-cols-4 g-3">
          <div
            v-for="locker in lockersB"
            :key="locker.id"
            class="col text-center"
          >
            <div class="card shadow-sm">
              <div class="card-body p-2">
                <i class="bi bi-hdd-stack-fill fs-3"></i>
                <div class="fw-bold">{{ locker.id }}</div>
                <span
                  class="status-dot"
                  :class="statusColor(locker.status)"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-center mt-4">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#">Prev</a>
        </li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item disabled">
          <a class="page-link" href="#">...</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LockerStatus',
  data() {
    return {
      lockersA: [
        { id: 'A1', status: 'rented' },
        { id: 'A2', status: 'reserved' },
        { id: 'A3', status: 'available' },
        { id: 'A4', status: 'rented' },
        { id: 'A5', status: 'available' },
        { id: 'A6', status: 'rented' },
        { id: 'A7', status: 'reserved' },
        { id: 'A8', status: 'available' },
        { id: 'A9', status: 'available' },
        { id: 'A10', status: 'reserved' },
        { id: 'A11', status: 'rented' },
        { id: 'A12', status: 'available' }
      ],
      lockersB: [
        { id: 'B1', status: 'available' },
        { id: 'B2', status: 'rented' },
        { id: 'B3', status: 'rented' },
        { id: 'B4', status: 'reserved' },
        { id: 'B5', status: 'reserved' },
        { id: 'B6', status: 'available' },
        { id: 'B7', status: 'rented' },
        { id: 'B8', status: 'reserved' },
        { id: 'B9', status: 'rented' },
        { id: 'B10', status: 'available' },
        { id: 'B11', status: 'rented' },
        { id: 'B12', status: 'rented' }
      ]
    };
  },
  methods: {
    statusColor(status) {
      switch (status) {
        case 'rented':
          return 'bg-danger';
        case 'reserved':
          return 'bg-warning';
        case 'available':
          return 'bg-success';
        default:
          return 'bg-secondary';
      }
    }
  }
};
</script>

<style scoped>
.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 4px;
}

.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
