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
        <h4 class="fw-bold mb-1">
          {{ form.firstName }} {{ form.lastName }}
        </h4>
        <div class="text-muted">{{ form.course }}</div>
      </div>
    </div>

    <!-- Form section -->
    <form @submit.prevent="updateProfile">
      <div class="row mb-3">
        <div class="col-md-6 mb-3">
          <label for="idNumber" class="form-label">ID Number:</label>
          <input
            type="text"
            id="idNumber"
            class="form-control"
            v-model="form.idNumber"
            disabled
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

    <!-- Success / Error messages -->
    <div v-if="message" class="mt-3 alert" :class="messageClass">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        idNumber: "",
        course: "",
        firstName: "",
        lastName: "",
        currentPassword: "",
        newPassword: "",
      },
      message: "",
      messageClass: "",
    };
  },
  async created() {
    try {
      // Example: get user by ID (replace with your logic or token userId)
      const response = await axios.get("http://localhost:3001/users/20220001");

      if (response.data) {
        this.form.idNumber = response.data.idNumber;
        this.form.course = response.data.course;
        this.form.firstName = response.data.firstName;
        this.form.lastName = response.data.lastName;
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  },
  methods: {
    async updateProfile() {
      try {
        await axios.put(
          `http://localhost:3001/users/${this.form.idNumber}`,
          this.form
        );
        this.message = "Profile updated successfully!";
        this.messageClass = "alert-success";
      } catch (error) {
        this.message = "Failed to update profile.";
        this.messageClass = "alert-danger";
      }
    },
  },
};
</script>
