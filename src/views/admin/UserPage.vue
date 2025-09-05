<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Programs</h2>
      <button class="btn btn-primary d-flex align-items-center">
        <i class="bi bi-person-plus me-2"></i> Add Student
      </button>
    </div>

    <div class="row g-4">
      <div v-for="program in programs" :key="program.code" class="col-md-3">
        <div class="card shadow-sm h-100 text-center">
          <div class="card-body">
            <img
              :src="program.logo"
              alt="logo"
              class="img-fluid mb-3"
              style="height: 80px"
            />
            <h5 class="fw-bold">{{ program.code }}</h5>
            <p class="text-muted small">{{ program.name }}</p>
            <button class="btn btn-primary btn-sm">View Student's</button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      programs: [
        {
          code: 'BSIT',
          name: 'Bachelor of Science in Information Technology',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/5/56/BSIT_LOGO.png'
        },
        {
          code: 'BSHM',
          name: 'Bachelor of Science in Hospitality Management',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/HM_Logo.png/800px-HM_Logo.png'
        },
        {
          code: 'BSED',
          name: 'Bachelor of Secondary Education',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/7/74/BSED_Logo.png'
        },
        {
          code: 'BEED',
          name: 'Bachelor of Elementary Education',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/BEED_Logo.png'
        }
      ]
    };
  }
};
</script>

<style scoped>
.card:hover {
  transform: scale(1.02);
  transition: 0.2s ease-in-out;
}
</style>
