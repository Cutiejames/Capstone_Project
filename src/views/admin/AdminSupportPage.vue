<template>
  <div class="container mt-5">
    <!-- Filter Dropdown -->
    <div class="d-flex justify-content-end mb-3">
      <select v-model="filter" class="form-select w-auto">
        <option value="All">All</option>
        <option value="Answered">Answered</option>
        <option value="Pending">Pending</option>
      </select>
    </div>

    <div class="row">
      <!-- Ticket List -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span><i class="bi bi-list"></i> List</span>
            <button class="btn btn-sm" @click="isOpen = !isOpen">
              <i :class="isOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
            </button>
          </div>

          <div v-if="isOpen" class="card-body p-0">
            <div
              v-for="ticket in filteredTickets"
              :key="ticket.id"
              class="border-bottom p-3 d-flex ticket-item"
              @click="selectTicket(ticket)"
            >
              <img
                src="https://via.placeholder.com/40"
                alt="avatar"
                class="rounded-circle me-3"
              />
              <div>
                <div class="fw-bold text-primary">
                  #{{ ticket.id }} - {{ ticket.subject }}
                  <span
                    class="badge ms-2"
                    :class="{
                      'bg-secondary': ticket.status === 'Answered',
                      'bg-danger': ticket.status === 'Pending'
                    }"
                  >
                    {{ ticket.status }}
                  </span>
                </div>
                <div>{{ ticket.name }}</div>
                <div>{{ ticket.email }}</div>
                <div class="text-muted">{{ ticket.date }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ticket Details -->
      <div class="col-md-8" v-if="selectedTicket">
        <div class="row">
          <!-- Left: Ticket Info -->
          <div class="col-md-4">
            <div class="card p-3">
              <h5>Tickets #{{ selectedTicket.id }}</h5>
              <p><strong>Status:</strong> {{ selectedTicket.status }}</p>
              <p><strong>Name:</strong> {{ selectedTicket.name }}</p>
              <p><strong>Email:</strong> {{ selectedTicket.email }}</p>
              <p><strong>Created:</strong> {{ selectedTicket.date }}</p>
              <button class="btn btn-danger btn-sm" @click="selectedTicket = null">
                Back
              </button>
            </div>
          </div>

          <!-- Right: Conversation -->
          <div class="col-md-8">
            <div class="card p-3">
              <h5>{{ selectedTicket.subject }}</h5>
              <div v-if="loadingMessages" class="text-center my-3">Loading...</div>
              <div v-else>
                <div
                  v-for="(msg, idx) in messages"
                  :key="idx"
                >
                  <div
                    class="d-flex mb-2"
                    :class="msg.sender === 'User' ? 'justify-content-start' : 'justify-content-end'"
                  >
                    <div
                      class="p-2 rounded"
                      :class="msg.sender === 'User' ? 'bg-light' : 'bg-primary text-white'"
                    >
                      {{ msg.text }}
                    </div>
                  </div>
                  <div class="text-muted small mb-3">
                    {{ msg.sender }} - {{ msg.date }}
                  </div>
                </div>
              </div>

              <!-- Reply Box -->
              <div class="mt-3">
                <textarea
                  v-model="newMessage"
                  class="form-control mb-2"
                  placeholder="Message"
                  rows="2"
                ></textarea>
                <button class="btn btn-primary" @click="sendMessage">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const isOpen = ref(true);
const filter = ref("All");
const tickets = ref([]);
const selectedTicket = ref(null);
const messages = ref([]);
const newMessage = ref("");
const loadingMessages = ref(false);

// Fetch tickets list
const fetchTickets = async () => {
  try {
    const res = await axios.get("http://localhost:3001/tickets");
    tickets.value = Array.isArray(res.data) ? res.data : res.data.data || [];

    // auto-open first "Answered" ticket
    const answered = tickets.value.find((t) => t.status === "Answered");
    if (answered) {
      selectTicket(answered);
    }
  } catch (err) {
    console.error("Error fetching tickets:", err);
    tickets.value = [];
  }
};

onMounted(fetchTickets);

// Filter tickets
const filteredTickets = computed(() => {
  if (filter.value === "All") return tickets.value;
  return tickets.value.filter((t) => t.status === filter.value);
});

// Select a ticket and load messages
const selectTicket = async (ticket) => {
  selectedTicket.value = ticket;
  messages.value = [];
  loadingMessages.value = true;

  try {
    const res = await axios.get(`http://localhost:3001/tickets/${ticket.id}/messages`);
    messages.value = Array.isArray(res.data) ? res.data : res.data.data || [];
  } catch (err) {
    console.error("Error fetching messages:", err);
    messages.value = [];
  } finally {
    loadingMessages.value = false;
  }
};

// Send new message (POST)
const sendMessage = async () => {
  if (!newMessage.value.trim() || !selectedTicket.value) return;

  try {
    await axios.post(`http://localhost:3001/tickets/${selectedTicket.value.id}/messages`, {
      text: newMessage.value,
      sender: "You",
      date: new Date().toISOString()
    });

    // reload messages
    const res = await axios.get(
      `http://localhost:3001/tickets/${selectedTicket.value.id}/messages`
    );
    messages.value = Array.isArray(res.data) ? res.data : res.data.data || [];
    newMessage.value = "";
  } catch (err) {
    console.error("Error sending message:", err);
  }
};
</script>

<style scoped>
.ticket-item {
  cursor: pointer;
}
.ticket-item:hover {
  background: #f8f9fa;
}
</style>
