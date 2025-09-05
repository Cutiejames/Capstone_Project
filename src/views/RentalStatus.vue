<template>
  <div class="container py-4">
    <h2 class="text-center fw-bold mb-4">Rent Status</h2>
    <div class="row g-4">
      <div
        class="col-md-6 col-lg-4"
        v-for="(status, index) in statuses"
        :key="index"
      >
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <img
                src="https://via.placeholder.com/60"
                alt="Profile"
                class="rounded-circle"
                width="60"
                height="60"
              />
              <div class="text-center">
                <i class="bi bi-hdd-stack fs-3"></i>
                <div class="fw-bold">{{ status.lockerId }}</div>
              </div>
            </div>

            <hr />

            <p><strong>Student ID:</strong> {{ status.studentId }}</p>
            <p><strong>Student Name:</strong> {{ status.name }}</p>
            <p><strong>Course:</strong> {{ status.course }}</p>
            <p><strong>Email:</strong> {{ status.email }}</p>

            <template v-if="status.type === 'pending'">
              <p><strong>Reserve Date:</strong> {{ status.reserveDate }}</p>
              <p class="text-muted fst-italic">Waiting for Approval</p>
              <button class="btn btn-danger btn-sm">Cancel</button>npm
            </template>

            <template v-else-if="status.type === 'payment'">
              <p><strong>Reserve Date:</strong> {{ status.reserveDate }}</p>
              <p><strong>Reservation Exp:</strong> {{ status.expiryDate }}</p>
              <button class="btn btn-primary btn-sm">Proceed to payment</button>
            </template>

            <template v-else-if="status.type === 'active'">
              <p><strong>Rental Start:</strong> {{ status.startDate }}</p>
              <p><strong>Rental End:</strong> {{ status.endDate }}</p>
              <div class="d-flex gap-2">
                <button class="btn btn-primary btn-sm">Payment History</button>
                <button class="btn btn-primary btn-sm">Renew locker</button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const statuses = [
  {
    type: 'pending',
    lockerId: 'A1',
    studentId: '20220001',
    name: 'John Doe',
    course: 'BSIT',
    email: 'example@gmail.com',
    reserveDate: 'April 01, 2025'
  },
  {
    type: 'payment',
    lockerId: 'A1',
    studentId: '20220001',
    name: 'John Doe',
    course: 'BSIT',
    email: 'example@gmail.com',
    reserveDate: 'April 01, 2025',
    expiryDate: 'April 07, 2025'
  },
  {
    type: 'active',
    lockerId: 'A1',
    studentId: '20220001',
    name: 'John Doe',
    course: 'BSIT',
    email: 'example@gmail.com',
    startDate: 'April 01, 2025',
    endDate: 'May 01, 2025'
  }
];
</script>
