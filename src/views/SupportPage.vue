<template>
  <div class="container py-4">
    <h2 class="fw-bold">Tickets</h2>
    <hr />

    <div class="d-flex justify-content-end mb-3">
      <select class="form-select w-auto">
        <option>All</option>
        <option>Pending</option>
        <option>Answered</option>
      </select>
    </div>

    <div class="row">
      <!-- Left: Add Ticket -->
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <span><i class="bi bi-pencil-square me-2"></i>Add New Ticket</span>
            <i class="bi bi-chevron-up"></i>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">Subject</label>
              <input
                type="text"
                class="form-control"
                placeholder="Input box..."
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Request</label>
              <input
                type="text"
                class="form-control"
                placeholder="Input box..."
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea
                class="form-control"
                rows="4"
                placeholder="Input box..."
              ></textarea>
            </div>
            <button class="btn btn-primary w-100">Submit</button>
          </div>
        </div>
      </div>

      <!-- Right: Ticket List -->
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <span><i class="bi bi-list me-2"></i>List</span>
            <i class="bi bi-chevron-up"></i>
          </div>
          <div class="card-body">
            <!-- Empty state -->
            <div class="text-center text-muted">No tickets yet.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No logic needed for static layout
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
