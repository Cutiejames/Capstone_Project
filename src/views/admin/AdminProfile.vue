<template>
  <div class="container py-4">
    <!-- Header section -->
    <div class="d-flex align-items-center mb-4 border-bottom pb-3">
      <div class="position-relative">
        <img
          src="profile.jpg"
          alt="Profile"
          class="rounded-circle"
          width="120"
          height="120"
        />
        <button
          class="btn btn-sm btn-light position-absolute bottom-0 start-0 translate-middle p-1 rounded-circle shadow"
        >
          <i class="bi bi-camera"></i>
        </button>
      </div>
      <div class="ms-4">
        <h4 class="fw-bold mb-1">John Doe</h4>
        <div class="text-muted">
          Bachelor of Science in Information Technology
        </div>
      </div>
    </div>

    <!-- Form section -->
    <form>
      <div class="row mb-3">
        <div class="col-md-6 mb-3">
          <label for="idNumber" class="form-label">ID Number:</label>
          <input
            type="text"
            id="idNumber"
            class="form-control"
            v-model="form.idNumber"
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="course" class="form-label">Course</label>
          <input
            type="text"
            id="course"
            class="form-control"
            v-model="form.course"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6 mb-3">
          <label for="firstName" class="form-label">First Name:</label>
          <input
            type="text"
            id="firstName"
            class="form-control"
            v-model="form.firstName"
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="lastName" class="form-label">Last Name:</label>
          <input
            type="text"
            id="lastName"
            class="form-control"
            v-model="form.lastName"
          />
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-6 mb-3">
          <label for="currentPassword" class="form-label">
            Current Password:
          </label>
          <input
            type="password"
            id="currentPassword"
            class="form-control"
            placeholder="Current Password..."
            v-model="form.currentPassword"
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="newPassword" class="form-label">New Password:</label>
          <input
            type="password"
            id="newPassword"
            class="form-control"
            placeholder="New Password..."
            v-model="form.newPassword"
          />
        </div>
      </div>

      <button type="submit" class="btn btn-primary px-4">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        idNumber: '20220001',
        course: 'Bachelor of Science in Information Technology',
        firstName: 'John',
        lastName: 'Doe',
        currentPassword: '',
        newPassword: ''
      }
    };
  }
};
</script>
