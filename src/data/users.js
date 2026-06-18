export const currentUser = {
  id: "USR-2048",
  name: "Ananya Sharma",
  email: "ananya.sharma@example.com",
  phone: "+91 98765 43210",
  address: "Koramangala 5th Block, Bengaluru, Karnataka",
  bloodGroup: "O+",
  role: "user",
  safetyStatus: "Protected",
  avatarColor: "from-roseguard-500 to-brand-500"
};

export const users = [
  currentUser,
  {
    id: "USR-1832",
    name: "Nisha Rao",
    email: "nisha.rao@example.com",
    phone: "+91 99887 77665",
    address: "Indiranagar, Bengaluru",
    role: "user",
    safetyStatus: "Active"
  },
  {
    id: "USR-1550",
    name: "Meera Nair",
    email: "meera.nair@example.com",
    phone: "+91 90909 12345",
    address: "HSR Layout, Bengaluru",
    role: "user",
    safetyStatus: "Protected"
  }
];

export const demoAccounts = {
  user: {
    ...currentUser,
    email: "ananya.sharma@example.com",
    role: "user"
  },
  volunteer: {
    id: "VOL-101",
    name: "Asha K.",
    email: "asha.volunteer@example.com",
    phone: "+91 98980 11223",
    address: "Koramangala, Bengaluru",
    role: "volunteer",
    safetyStatus: "Responder Online",
    avatarColor: "from-brand-500 to-blue-500"
  },
  admin: {
    id: "ADM-001",
    name: "Sakshi Saxena",
    email: "admin@bsafe.app",
    phone: "+91 90000 11122",
    address: "bSafe Operations Center",
    role: "admin",
    safetyStatus: "Admin Active",
    avatarColor: "from-slate-800 to-brand-500"
  }
};
