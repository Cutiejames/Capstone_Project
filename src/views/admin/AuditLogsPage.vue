<template>
  <div class="container mt-4">
    <!-- Date Picker -->
    <div class="d-flex justify-content-end mb-3">
      <input type="date" class="form-control w-auto" v-model="selectedDate" />
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-bordered text-center">
        <thead class="table-light">
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Student ID</th>
            <th>Locker Code</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="index">
            <td>{{ item.date }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.studentId }}</td>
            <td>{{ item.lockerCode }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <nav>
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
          @click="changePage(currentPage - 1)"
        >
          <a class="page-link">Prev</a>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
          @click="changePage(page)"
        >
          <a class="page-link">{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
          @click="changePage(currentPage + 1)"
        >
          <a class="page-link">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: '2025-04-01',
      currentPage: 1,
      perPage: 5,
      tableData: [
        {
          date: 'April 01, 2025',
          time: '11:30 AM',
          studentId: '20220001',
          lockerCode: 'B1',
          status: 'Reserve'
        },
        {
          date: 'April 01, 2025',
          time: '11:25 AM',
          studentId: '20220001',
          lockerCode: 'B1',
          status: 'Rent'
        },
        {
          date: 'April 01, 2025',
          time: '11:25 AM',
          studentId: '20220001',
          lockerCode: 'B1',
          status: 'Rent'
        },
        {
          date: 'April 01, 2025',
          time: '11:25 AM',
          studentId: '20220001',
          lockerCode: 'B1',
          status: 'Renew'
        },
        {
          date: 'April 01, 2025',
          time: '11:25 AM',
          studentId: '20220001',
          lockerCode: 'B1',
          status: 'Renew'
        },
        {
          date: 'April 01, 2025',
          time: '11:25 AM',
          studentId: '20220001',
          lockerCode: 'B1',
          status: 'Reserve'
        },
        {
          date: 'April 01, 2025',
          time: '11:25 AM',
          studentId: '20220001',
          lockerCode: 'B1',
          status: 'Reserve'
        },
        {
          date: 'April 01, 2025',
          time: '11:25 AM',
          studentId: '20220001',
          lockerCode: 'B1',
          status: 'Rent'
        },
        {
          date: 'April 01, 2025',
          time: '11:25 AM',
          studentId: '20220001',
          lockerCode: 'B1',
          status: 'Rent'
        },
        {
          date: 'April 01, 2025',
          time: '11:25 AM',
          studentId: '20220001',
          lockerCode: 'B1',
          status: 'Renew'
        },
        {
          date: 'April 01, 2025',
          time: '11:25 AM',
          studentId: '20220001',
          lockerCode: 'B1',
          status: 'Rent'
        }
      ]
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.tableData.length / this.perPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.tableData.slice(start, start + this.perPage);
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  }
};
</script>

<style>
.table {
  border-radius: 8px;
}
.page-link {
  cursor: pointer;
}
</style>
