<template>
  <div class="d-flex vh-100">
    <!-- Left side -->
    <div
      class="d-flex flex-column justify-content-center align-items-center text-white text-center"
      style="background-color: #000020; width: 50%"
    >
      <img
        src="@/assets/cpc-logo.jpg"
        alt="CPC Logo"
        class="mb-4"
        style="max-width: 200px"
      />
      <h1 class="fw-bold">
        WELCOME
        <br />
        TO
        <br />
        CPC E-LOCKER
      </h1>
    </div>

    <!-- Right side -->
    <div
      class="d-flex flex-column justify-content-center align-items-center flex-fill px-4"
    >
      <form class="w-100" style="max-width: 400px" @submit.prevent="signIn">
        <!-- Error message display -->
        <div v-if="errorMessage" class="alert alert-danger mb-3" role="alert">
          {{ errorMessage }}
        </div>

        <!-- Success message display -->
        <div v-if="successMessage" class="alert alert-success mb-3" role="alert">
          {{ successMessage }}
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold" for="studentId">
            STUDENT ID:
          </label>
          <input
            id="studentId"
            type="text"
            class="form-control"
            v-model="studentId"
            placeholder="Enter Student ID"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="mb-4">
          <label class="form-label fw-semibold" for="password">
            PASSWORD:
          </label>
          <input
            id="password"
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Enter Password"
            required
            :disabled="isLoading"
          />
        </div>

        <button
          type="submit"
          class="btn w-100 text-white mb-3"
          style="background-color: #3a73f1"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          {{ isLoading ? 'SIGNING IN...' : 'SIGN IN' }}
        </button>

        <div class="text-center mb-3">
          <a
            href="#"
            class="text-decoration-none text-primary small"
            @click.prevent="goToForgotPassword"
          >
            Forgot Password?
          </a>
        </div>

        <div class="text-center">
          <button
            type="button"
            class="btn text-white"
            style="background-color: #3a73f1; width: 60%"
            @click="signUp"
            :disabled="isLoading"
          >
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const studentId = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

// API base URL - adjust this according to your setup
const API_BASE_URL = 'http://localhost:3001';

const signIn = async () => {
  // Clear previous messages
  errorMessage.value = '';
  successMessage.value = '';
  
  // Basic validation
  if (!studentId.value.trim()) {
    errorMessage.value = 'Please enter your Student ID';
    return;
  }
  
  if (!password.value.trim()) {
    errorMessage.value = 'Please enter your password';
    return;
  }

  isLoading.value = true;

  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username: studentId.value.trim(), // Backend expects 'username'
      password: password.value
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });

    // Handle successful login
    if (response.data && response.data.token) {
      const { token, user, role } = response.data;
      
      // Store token and user data in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('userRole', role);

      successMessage.value = 'Login successful! Redirecting...';
      
      // Redirect based on role
      setTimeout(() => {
        if (role === 'admin') {
          router.push('/TestDashboard/admin-dashboard');
        } else {
          router.push('/dashboard/user-locker');
        }
      }, 1500);
    }

  } catch (error) {
    console.error('Login error:', error);
    
    if (error.response) {
      // Server responded with error status
      const statusCode = error.response.status;
      const errorData = error.response.data;
      
      if (statusCode === 401) {
        errorMessage.value = errorData.error || 'Invalid username or password';
      } else if (statusCode === 500) {
        errorMessage.value = 'Server error. Please try again later.';
      } else {
        errorMessage.value = errorData.error || 'Login failed. Please try again.';
      }
    } else if (error.request) {
      // Network error
      errorMessage.value = 'Network error. Please check your connection and try again.';
    } else {
      // Other error
      errorMessage.value = 'An unexpected error occurred. Please try again.';
    }
  } finally {
    isLoading.value = false;
  }
};

const signUp = () => {
  router.push('/dashboard');
};

const goToForgotPassword = () => {
  // You can create a forgot password route
  router.push('/forgot-password');
  // Or for now, redirect to admin dashboard as in original code
  // router.push('/TestDashboard/admin-dashboard');
};

// Optional: Check if user is already logged in
const checkAuthStatus = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // You might want to verify the token with the backend
    // For now, just redirect to appropriate dashboard
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      router.push('/TestDashboard/admin-dashboard');
    } else {
      router.push('/dashboard/user-locker');
    }
  }
};

// Check auth status when component mounts
checkAuthStatus();
</script>