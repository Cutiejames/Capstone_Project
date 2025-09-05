import { createRouter, createWebHistory } from 'vue-router';

// ✅ Import components
import DashboardPage from '../layouts/DashboardPage.vue';
import LoginPage from '../views/LoginPage.vue';
import SettingProfile from '../views/SettingProfile.vue';
import SupportPage from '../views/SupportPage.vue';
import RentalStatus from '../views/RentalStatus.vue';
import TestDashboard from '../layouts/TestDashboard.vue';
import ClientLocker from '../views/ClientLocker.vue';

// ✅ Admin imports
import AdminSupportPage from '../views/admin/AdminSupportPage.vue';
import AuditLogsPage from '../views/admin/AuditLogsPage.vue';
import ReservationStatusPage from '../views/admin/ReservationStatusPage.vue';
import LockerPage from '../views/admin/LockerPage.vue';
import RentalStatusPage from '../views/admin/RentalStatusPage.vue';
import AdminProfile from '../views/admin/AdminProfile.vue';
import UserPage from '../views/admin/UserPage.vue';
import AdminDashboard from '../views/admin/AdminDashboard.vue';

const routes = [
  // ✅ Login route
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },

  // ✅ Redirect root to login
  {
    path: '/',
    redirect: '/login'
  },

  // ✅ User Dashboard layout
  {
    path: '/dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }, // protect
    children: [
      {
        path: 'user-settings',
        name: 'user-settings',
        component: SettingProfile
      },
      {
        path: 'user-support',
        name: 'user-support',
        component: SupportPage
      },
      {
        path: 'user-rental',
        name: 'user-rental',
        component: RentalStatus
      },
      {
        path: 'user-locker',
        name: 'user-locker',
        component: ClientLocker
      }
    ]
  },

  // ✅ Admin Dashboard layout
  {
    path: '/TestDashboard',
    component: TestDashboard,
    meta: { requiresAuth: true }, // protect
    children: [
      {
        path: 'settings',
        name: 'settings',
        component: AdminProfile
      },
      {
        path: 'lockerpage',
        name: 'lockerpage',
        component: LockerPage
      },
      {
        path: 'rentalstatus',
        name: 'rentalstatus',
        component: RentalStatusPage
      },
      {
        path: 'reservationstatus',
        name: 'reservationstatus',
        component: ReservationStatusPage
      },
      {
        path: 'user',
        name: 'user',
        component: UserPage
      },
      {
        path: 'audit',
        name: 'audit',
        component: AuditLogsPage
      },
      {
        path: 'support',
        name: 'support',
        component: AdminSupportPage
      },
      {
        path: 'admin-dashboard',
        name: 'admin-dashboard',
        component: AdminDashboard
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router;
