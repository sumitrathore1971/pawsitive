export const APP_NAME = "Paw-sitive";

export const ROLE_NAV = {
  owner: [
    { label: "Dashboard", to: "/owner/dashboard" },
    { label: "My Pets", to: "/owner/pets" },
    { label: "Services", to: "/owner/services" },
    { label: "Booking History", to: "/owner/bookings" },
    { label: "Live Tracking", to: "/owner/tracking" },
    { label: "Notifications", to: "/owner/notifications" },
    { label: "Settings", to: "/owner/settings" },
  ],
  caregiver: [
    { label: "Dashboard", to: "/caregiver/dashboard" },
    { label: "Booking Requests", to: "/caregiver/jobs" },
    { label: "Active Services", to: "/caregiver/active-services" },
    { label: "Earnings", to: "/caregiver/earnings" },
    { label: "Service History", to: "/caregiver/history" },
    { label: "Notifications", to: "/caregiver/notifications" },
    { label: "Settings", to: "/caregiver/settings" },
  ],
  admin: [
    { label: "Dashboard", to: "/admin/dashboard" },
    { label: "Users", to: "/admin/users" },
    { label: "Pet Owners", to: "/admin/pet-owners" },
    { label: "Caregivers", to: "/admin/verify-caregivers" },
    { label: "Pets", to: "/admin/pets" },
    { label: "Bookings", to: "/admin/bookings" },
    { label: "Analytics", to: "/admin/analytics" },
    { label: "Notifications", to: "/admin/notifications" },
    { label: "Settings", to: "/admin/settings" },
  ],
};
