<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold text-primary">Programs</h2>
      <button class="btn btn-primary d-flex align-items-center shadow-sm">
        <i class="bi bi-person-plus me-2"></i> Add Student
      </button>
    </div>

    <!-- Programs Grid -->
    <div class="row g-4">
      <div v-for="program in programs" :key="program.course_id" class="col-md-3">
        <div class="card shadow-sm h-100 text-center border-0">
          <div class="card-body">
            <!-- Program Logo -->
            <img
              :src="getProgramLogo(program.acronym)"
              alt="logo"
              class="img-fluid mb-3"
              style="height: 80px"
            />
            <h5 class="fw-bold text-primary">
              {{ program.acronym || program.course_name }}
            </h5>
            <p class="text-muted small">{{ program.course_name }}</p>
            <button
              class="btn btn-outline-primary btn-sm rounded-pill px-3"
              @click="fetchStudents(program.course_id, program)"
            >
              View Students
            </button>
          </div>
        </div>
      </div>

      <!-- Add new card -->
      <div class="col-md-3">
        <div
          class="card shadow-sm h-100 d-flex justify-content-center align-items-center border-0"
          style="cursor: pointer"
        >
          <div class="display-6 text-muted">
            <i class="bi bi-plus-square"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Students Modal -->
    <div
      class="modal fade"
      id="studentsModal"
      tabindex="-1"
      aria-hidden="true"
      ref="studentsModal"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              Students - {{ selectedProgram?.acronym || selectedProgram?.course_name }}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <table class="table table-striped align-middle text-center">
              <thead class="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in students" :key="student.user_id">
                  <td>{{ student.user_id }}</td>
                  <td>{{ student.stud_id }}</td>
                  <td>{{ student.full_name }}</td>
                  <td>{{ student.gender }}</td>
                  <td>{{ student.email }}</td>
                  <td>{{ student.role }}</td>
                  <td>
                    {{ new Date(student.created_date).toLocaleDateString() }}
                  </td>
                </tr>
                <tr v-if="students.length === 0">
                  <td colspan="7" class="text-center text-muted">
                    No students found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Modal } from "bootstrap";

// ✅ Correct case-sensitive imports (match your file names)
import bshmLogo from "@/assets/BSHM.png";
import bsitLogo from "@/assets/BSIT.png";
import bsedLogo from "@/assets/BSED.png";
import beedLogo from "@/assets/BEED.png";
import defaultLogo from "@/assets/logo.png"; // fallback

export default {
  data() {
    return {
      programs: [],
      students: [],
      selectedProgram: null,
      modalInstance: null,
    };
  },
  mounted() {
    this.fetchPrograms();
  },
  methods: {
    async fetchPrograms() {
      try {
        const res = await axios.get("http://localhost:3001/courses");
        this.programs = res.data;
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    },
    async fetchStudents(courseId, program) {
      try {
        this.selectedProgram = program;
        const res = await axios.get(
          `http://localhost:3001/courses/${courseId}/students`
        );
        this.students = res.data.students || [];

        if (!this.modalInstance) {
          this.modalInstance = new Modal(this.$refs.studentsModal);
        }
        this.modalInstance.show();
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    },
    // ✅ Select logo based on acronym
    getProgramLogo(acronym) {
      const map = {
        BSHM: bshmLogo,
        BSIT: bsitLogo,
        BSED: bsedLogo,
        BEED: beedLogo,
      };
      return map[acronym?.toUpperCase()] || defaultLogo;
    },
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(13, 110, 253, 0.2);
}

.modal-header {
  border-bottom: none;
}

.table th,
.table td {
  vertical-align: middle;
}

.btn-outline-primary:hover {
  color: white;
}
</style>
