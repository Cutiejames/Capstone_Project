<template>
  <div class="container my-4">
    <h2 class="fw-bold">Rent Status</h2>
    <p class="text-muted">Payment Tracker</p>

    <!-- Search Bar -->
    <div class="d-flex justify-content-end mb-4">
      <div class="input-group w-50">
        <input
          type="text"
          class="form-control"
          v-model="searchQuery"
          placeholder="Search by name or ID..."
        />
        <button class="btn btn-primary" type="button">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>

    <!-- Cards -->
    <div class="row g-4">
      <div
        class="col-md-6"
        v-for="(rental, index) in filteredRentals"
        :key="index"
      >
        <div class="card shadow-sm h-100">
          <div class="card-body d-flex">
            <!-- User Info -->
            <div class="text-center me-4">
              <img
                src="https://via.placeholder.com/60"
                class="rounded-circle mb-2"
                alt="User"
              />
              <p class="fw-bold m-0">{{ rental.locker }}</p>
            </div>

            <!-- Details -->
            <div class="flex-grow-1 border-end pe-3">
              <p class="mb-1">
                <strong>Student ID:</strong> {{ rental.studentId }}
              </p>
              <p class="mb-1">
                <strong>Student Name:</strong> {{ rental.name }}
              </p>
              <p class="mb-1"><strong>Course:</strong> {{ rental.course }}</p>
              <p class="mb-1"><strong>Email:</strong> {{ rental.email }}</p>
            </div>

            <!-- Payment Info -->
            <div class="ps-3 text-end">
              <p class="mb-1">
                <strong>Amount paid:</strong> ₱{{ rental.amount }}
              </p>
              <p class="mb-1">
                <strong>Date started:</strong> {{ rental.startDate }}
              </p>
              <p class="mb-1">
                <strong>Date end:</strong> {{ rental.endDate }}
              </p>
              <button class="btn btn-sm btn-primary mt-2">
                Payment History
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Result Message -->
      <div
        v-if="filteredRentals.length === 0"
        class="text-center text-muted mt-4"
      >
        No matching records found.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RentalStatus',
  data() {
    return {
      searchQuery: '',
      rentals: [
        {
          studentId: '20220011',
          name: 'John Doe',
          course: 'BSIT',
          email: 'example@gmail.com',
          locker: 'A1',
          amount: 100,
          startDate: '04/01/2025',
          endDate: '06/01/2025'
        },
        {
          studentId: '20220012',
          name: 'Jane Smith',
          course: 'BSIT',
          email: 'jane@gmail.com',
          locker: 'A2',
          amount: 100,
          startDate: '04/01/2025',
          endDate: '06/01/2025'
        },
        {
          studentId: '20220013',
          name: 'Ryan Cruz',
          course: 'BSIT',
          email: 'ryan@gmail.com',
          locker: 'A3',
          amount: 100,
          startDate: '04/01/2025',
          endDate: '06/01/2025'
        },
        {
          studentId: '20220014',
          name: 'Angel Reyes',
          course: 'BSIT',
          email: 'angel@gmail.com',
          locker: 'A4',
          amount: 100,
          startDate: '04/01/2025',
          endDate: '06/01/2025'
        }
      ]
    };
  },
  computed: {
    filteredRentals() {
      const query = this.searchQuery.toLowerCase();
      return this.rentals.filter(rental => {
        return (
          rental.studentId.includes(query) ||
          rental.name.toLowerCase().includes(query)
        );
      });
    }
  }
};
</script>

<style scoped>
.card {
  transition: transform 0.2s ease;
}
.card:hover {
  transform: scale(1.01);
}
input.form-control {
  border-radius: 0.375rem 0 0 0.375rem;
}
button.btn {
  border-radius: 0 0.375rem 0.375rem 0;
}
</style>
