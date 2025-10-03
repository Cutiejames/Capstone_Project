<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Programs</h2>
      <button class="btn btn-primary d-flex align-items-center">
        <i class="bi bi-person-plus me-2"></i> Add Student
      </button>
    </div>

    <!-- Programs Grid -->
    <div class="row g-4">
      <div v-for="program in programs" :key="program.course_id" class="col-md-3">
        <div class="card shadow-sm h-100 text-center">
          <div class="card-body">
            <!-- Always placeholder for now -->
            <img
              src="https://via.placeholder.com/80"
              alt="logo"
              class="img-fluid mb-3"
              style="height: 80px"
            />
            <h5 class="fw-bold">
              {{ program.acronym || program.course_name }}
            </h5>
            <p class="text-muted small">{{ program.course_name }}</p>
            <button
              class="btn btn-primary btn-sm"
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
          class="card shadow-sm h-100 d-flex justify-content-center align-items-center"
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
          <div class="modal-header">
            <h5 class="modal-title">
              Students - {{ selectedProgram?.acronym || selectedProgram?.course_name }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <table class="table table-striped">
              <thead>
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
                  <td colspan="7" class="text-center">No students found</td>
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

        // show modal
        if (!this.modalInstance) {
          this.modalInstance = new Modal(this.$refs.studentsModal);
        }
        this.modalInstance.show();
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    },
  },
};
</script>

<style scoped>
.card:hover {
  transform: scale(1.02);
  transition: 0.2s ease-in-out;
}
</style>
