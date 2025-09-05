<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>RESERVATION DETAILS</h2>
      <div class="input-group" style="width: 250px">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search for..."
        />
        <button class="btn btn-primary">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
      <div class="col" v-for="(card, index) in filteredCards" :key="index">
        <div class="card p-3 text-center">
          <img
            :src="card.image"
            class="student-image mx-auto mb-2"
            alt="Student"
          />
          <div class="my-2">
            <i class="bi bi-database fs-3"></i>
            <div class="fw-bold">{{ card.room }}</div>
          </div>
          <p class="mb-1">Student ID: {{ card.id }}</p>
          <p class="mb-1">Student: {{ card.name }}</p>
          <p class="mb-1">Reservation date: {{ card.date }}</p>
          <p class="mb-1">Course: {{ card.course }}</p>
          <p class="mb-3">Email: {{ card.email }}</p>
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-primary btn-sm" @click="approve(card.id)">
              Approve
            </button>
            <button class="btn btn-danger btn-sm" @click="cancel(card.id)">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReservationCards',
  data() {
    return {
      searchQuery: '',
      cards: [
        {
          id: '20230001',
          name: 'John Doe',
          date: '04/01/2025',
          course: 'BSIT',
          email: 'example@gmail.com',
          room: 'A1',
          image: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        {
          id: '20230002',
          name: 'Jane Smith',
          date: '04/01/2025',
          course: 'BSIT',
          email: 'jane@example.com',
          room: 'A1',
          image: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        {
          id: '20230003',
          name: 'Mike Johnson',
          date: '04/01/2025',
          course: 'BSIT',
          email: 'mike@example.com',
          room: 'A1',
          image: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        {
          id: '20230004',
          name: 'Anna Reyes',
          date: '04/01/2025',
          course: 'BSIT',
          email: 'anna@example.com',
          room: 'A1',
          image: 'https://randomuser.me/api/portraits/women/4.jpg'
        },
        {
          id: '20230005',
          name: 'Leo Tan',
          date: '04/01/2025',
          course: 'BSIT',
          email: 'leo@example.com',
          room: 'A1',
          image: 'https://randomuser.me/api/portraits/men/5.jpg'
        }
      ]
    };
  },
  computed: {
    filteredCards() {
      const q = this.searchQuery.toLowerCase();
      return this.cards.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.course.toLowerCase().includes(q)
      );
    }
  },
  methods: {
    approve(id) {
      alert(`Approved reservation for student ID: ${id}`);
    },
    cancel(id) {
      alert(`Cancelled reservation for student ID: ${id}`);
    }
  }
};
</script>

<style scoped>
.student-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}
.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
