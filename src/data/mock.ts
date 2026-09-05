export const COMPANY = {
  name: "STELGROW HR HOUSE PRIVATE LIMITED",
  short: "STELGROW HR HOUSE",
  tagline: "HR & Payroll Management",
  cin: "U78300PN2026PTC255544",
  address:
    "C.S NO 269-9, PUSHPA APP, TFL C-4, TARABAI PARK, Karvir, Kolhapur, Maharashtra, 416003, India",
};

export const CURRENT_MONTH = "September 2026";

export type Status = "Active" | "Inactive";

export type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: "Male" | "Female";
  dob: string;
  joiningDate: string;
  department: string;
  designation: string;
  employmentType: "Full Time" | "Part Time" | "Contract" | "Intern";
  basic: number;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  pan: string;
  uan: string;
  esic: string;
  address: string;
  status: Status;
};

export const DEPARTMENT_NAMES = [
  "Human Resources",
  "Information Technology",
  "Finance",
  "Sales",
  "Marketing",
  "Operations",
  "Administration",
  "Customer Support",
] as const;

export type Department = {
  id: string;
  name: string;
  head: string;
  employees: number;
  status: Status;
};

export const DEPARTMENTS: Department[] = [
  { id: "DEP-01", name: "Human Resources", head: "Priya Patil", employees: 24, status: "Active" },
  {
    id: "DEP-02",
    name: "Information Technology",
    head: "Amit Kulkarni",
    employees: 62,
    status: "Active",
  },
  { id: "DEP-03", name: "Finance", head: "Sneha Joshi", employees: 21, status: "Active" },
  { id: "DEP-04", name: "Sales", head: "Rohit Deshmukh", employees: 48, status: "Active" },
  { id: "DEP-05", name: "Marketing", head: "Neha Shinde", employees: 18, status: "Active" },
  { id: "DEP-06", name: "Operations", head: "Akash Pawar", employees: 35, status: "Active" },
  { id: "DEP-07", name: "Administration", head: "Pooja Jadhav", employees: 14, status: "Active" },
  { id: "DEP-08", name: "Customer Support", head: "Saurabh More", employees: 28, status: "Active" },
];

export type Designation = {
  id: string;
  title: string;
  department: string;
  employees: number;
  status: Status;
};

export const DESIGNATIONS: Designation[] = [
  { id: "DSG-01", title: "HR Manager", department: "Human Resources", employees: 3, status: "Active" },
  { id: "DSG-02", title: "HR Executive", department: "Human Resources", employees: 9, status: "Active" },
  {
    id: "DSG-03",
    title: "Software Developer",
    department: "Information Technology",
    employees: 34,
    status: "Active",
  },
  { id: "DSG-04", title: "Team Leader", department: "Information Technology", employees: 8, status: "Active" },
  { id: "DSG-05", title: "Accountant", department: "Finance", employees: 11, status: "Active" },
  { id: "DSG-06", title: "Sales Executive", department: "Sales", employees: 26, status: "Active" },
  { id: "DSG-07", title: "Sales Manager", department: "Sales", employees: 6, status: "Active" },
  { id: "DSG-08", title: "Operations Manager", department: "Operations", employees: 5, status: "Active" },
  {
    id: "DSG-09",
    title: "Office Administrator",
    department: "Administration",
    employees: 7,
    status: "Active",
  },
  { id: "DSG-10", title: "Support Executive", department: "Customer Support", employees: 22, status: "Active" },
  { id: "DSG-11", title: "Marketing Executive", department: "Marketing", employees: 12, status: "Inactive" },
];

export const EMPLOYEES: Employee[] = [
  {
    id: "STG-1001",
    name: "Rahul Sharma",
    email: "rahul.sharma@stelgrowhr.com",
    phone: "+91 98220 41235",
    gender: "Male",
    dob: "1992-04-12",
    joiningDate: "2021-06-01",
    department: "Information Technology",
    designation: "Software Developer",
    employmentType: "Full Time",
    basic: 62500,
    bankName: "HDFC Bank",
    accountNumber: "50100234567891",
    ifsc: "HDFC0000123",
    pan: "AKQPS1234C",
    uan: "100234567891",
    esic: "3100234567",
    address: "Plot 12, Rajarampuri, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1002",
    name: "Priya Patil",
    email: "priya.patil@stelgrowhr.com",
    phone: "+91 98903 55621",
    gender: "Female",
    dob: "1989-11-23",
    joiningDate: "2020-02-17",
    department: "Human Resources",
    designation: "HR Manager",
    employmentType: "Full Time",
    basic: 78000,
    bankName: "ICICI Bank",
    accountNumber: "62100987654321",
    ifsc: "ICIC0004521",
    pan: "BQRPP7781L",
    uan: "100234567892",
    esic: "3100234568",
    address: "Tarabai Park, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1003",
    name: "Amit Kulkarni",
    email: "amit.kulkarni@stelgrowhr.com",
    phone: "+91 97654 12008",
    gender: "Male",
    dob: "1986-01-09",
    joiningDate: "2019-08-05",
    department: "Information Technology",
    designation: "Team Leader",
    employmentType: "Full Time",
    basic: 92000,
    bankName: "State Bank of India",
    accountNumber: "38100456712398",
    ifsc: "SBIN0002145",
    pan: "CDEPK4432M",
    uan: "100234567893",
    esic: "3100234569",
    address: "Shahupuri, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1004",
    name: "Sneha Joshi",
    email: "sneha.joshi@stelgrowhr.com",
    phone: "+91 90283 77410",
    gender: "Female",
    dob: "1991-07-30",
    joiningDate: "2021-01-11",
    department: "Finance",
    designation: "Accountant",
    employmentType: "Full Time",
    basic: 54000,
    bankName: "Bank of Maharashtra",
    accountNumber: "60123409876512",
    ifsc: "MAHB0001098",
    pan: "DFGPJ9087N",
    uan: "100234567894",
    esic: "3100234570",
    address: "Kasba Bawada, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1005",
    name: "Rohit Deshmukh",
    email: "rohit.deshmukh@stelgrowhr.com",
    phone: "+91 99700 33188",
    gender: "Male",
    dob: "1988-03-18",
    joiningDate: "2018-11-26",
    department: "Sales",
    designation: "Sales Manager",
    employmentType: "Full Time",
    basic: 85000,
    bankName: "Axis Bank",
    accountNumber: "91801245673311",
    ifsc: "UTIB0001234",
    pan: "EGHPD1122P",
    uan: "100234567895",
    esic: "3100234571",
    address: "Nagala Park, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1006",
    name: "Neha Shinde",
    email: "neha.shinde@stelgrowhr.com",
    phone: "+91 98811 24509",
    gender: "Female",
    dob: "1994-09-02",
    joiningDate: "2022-03-14",
    department: "Marketing",
    designation: "Marketing Executive",
    employmentType: "Full Time",
    basic: 45000,
    bankName: "Kotak Mahindra Bank",
    accountNumber: "77500123456780",
    ifsc: "KKBK0000456",
    pan: "FHIPS3344Q",
    uan: "100234567896",
    esic: "3100234572",
    address: "Rankala, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1007",
    name: "Akash Pawar",
    email: "akash.pawar@stelgrowhr.com",
    phone: "+91 88061 90032",
    gender: "Male",
    dob: "1987-12-21",
    joiningDate: "2019-05-20",
    department: "Operations",
    designation: "Operations Manager",
    employmentType: "Full Time",
    basic: 76000,
    bankName: "HDFC Bank",
    accountNumber: "50100987612345",
    ifsc: "HDFC0000871",
    pan: "GIJPP5566R",
    uan: "100234567897",
    esic: "3100234573",
    address: "Ichalkaranji, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1008",
    name: "Pooja Jadhav",
    email: "pooja.jadhav@stelgrowhr.com",
    phone: "+91 70301 88214",
    gender: "Female",
    dob: "1993-05-16",
    joiningDate: "2021-09-06",
    department: "Administration",
    designation: "Office Administrator",
    employmentType: "Full Time",
    basic: 38000,
    bankName: "ICICI Bank",
    accountNumber: "62100456789012",
    ifsc: "ICIC0001180",
    pan: "HJKPJ7788S",
    uan: "100234567898",
    esic: "3100234574",
    address: "Gandhinagar, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1009",
    name: "Saurabh More",
    email: "saurabh.more@stelgrowhr.com",
    phone: "+91 96574 21100",
    gender: "Male",
    dob: "1995-02-08",
    joiningDate: "2022-07-18",
    department: "Customer Support",
    designation: "Support Executive",
    employmentType: "Full Time",
    basic: 35000,
    bankName: "State Bank of India",
    accountNumber: "38100234509871",
    ifsc: "SBIN0000876",
    pan: "IKLPM9900T",
    uan: "100234567899",
    esic: "3100234575",
    address: "Ruikar Colony, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1010",
    name: "Anjali Patil",
    email: "anjali.patil@stelgrowhr.com",
    phone: "+91 93712 55603",
    gender: "Female",
    dob: "1996-08-27",
    joiningDate: "2023-01-09",
    department: "Human Resources",
    designation: "HR Executive",
    employmentType: "Full Time",
    basic: 42000,
    bankName: "Axis Bank",
    accountNumber: "91801234567890",
    ifsc: "UTIB0000912",
    pan: "JLMPP1212U",
    uan: "100234567900",
    esic: "3100234576",
    address: "Sagarmala, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1011",
    name: "Vikram Chavan",
    email: "vikram.chavan@stelgrowhr.com",
    phone: "+91 98505 76210",
    gender: "Male",
    dob: "1990-10-04",
    joiningDate: "2020-10-12",
    department: "Information Technology",
    designation: "Software Developer",
    employmentType: "Full Time",
    basic: 58000,
    bankName: "HDFC Bank",
    accountNumber: "50100112233445",
    ifsc: "HDFC0000450",
    pan: "KMNPC3434V",
    uan: "100234567901",
    esic: "3100234577",
    address: "Kadamwadi, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1012",
    name: "Kavita Salunkhe",
    email: "kavita.salunkhe@stelgrowhr.com",
    phone: "+91 91300 44872",
    gender: "Female",
    dob: "1992-12-19",
    joiningDate: "2021-04-05",
    department: "Finance",
    designation: "Accountant",
    employmentType: "Full Time",
    basic: 49000,
    bankName: "Bank of Baroda",
    accountNumber: "20100987611223",
    ifsc: "BARB0KOLHAP",
    pan: "LNOPS5656W",
    uan: "100234567902",
    esic: "3100234578",
    address: "Laxmipuri, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1013",
    name: "Ganesh Bhosale",
    email: "ganesh.bhosale@stelgrowhr.com",
    phone: "+91 84600 21197",
    gender: "Male",
    dob: "1985-06-11",
    joiningDate: "2017-09-01",
    department: "Operations",
    designation: "Team Leader",
    employmentType: "Full Time",
    basic: 67000,
    bankName: "Union Bank of India",
    accountNumber: "51010023456712",
    ifsc: "UBIN0553611",
    pan: "MOPPB7878X",
    uan: "100234567903",
    esic: "3100234579",
    address: "Ujlaiwadi, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1014",
    name: "Shruti Gaikwad",
    email: "shruti.gaikwad@stelgrowhr.com",
    phone: "+91 90495 33012",
    gender: "Female",
    dob: "1997-03-25",
    joiningDate: "2023-06-19",
    department: "Customer Support",
    designation: "Support Executive",
    employmentType: "Part Time",
    basic: 28000,
    bankName: "IDBI Bank",
    accountNumber: "10230045678123",
    ifsc: "IBKL0000345",
    pan: "NPQPG9090Y",
    uan: "100234567904",
    esic: "3100234580",
    address: "Phulewadi, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1015",
    name: "Nilesh Kadam",
    email: "nilesh.kadam@stelgrowhr.com",
    phone: "+91 98220 90013",
    gender: "Male",
    dob: "1991-01-30",
    joiningDate: "2020-07-27",
    department: "Sales",
    designation: "Sales Executive",
    employmentType: "Full Time",
    basic: 41000,
    bankName: "HDFC Bank",
    accountNumber: "50100556677889",
    ifsc: "HDFC0000234",
    pan: "OQRPK1313Z",
    uan: "100234567905",
    esic: "3100234581",
    address: "Bawada Road, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1016",
    name: "Manisha Sawant",
    email: "manisha.sawant@stelgrowhr.com",
    phone: "+91 70588 12245",
    gender: "Female",
    dob: "1994-04-06",
    joiningDate: "2022-11-14",
    department: "Marketing",
    designation: "Marketing Executive",
    employmentType: "Full Time",
    basic: 39000,
    bankName: "Yes Bank",
    accountNumber: "01450023456789",
    ifsc: "YESB0000145",
    pan: "PRSPS2424A",
    uan: "100234567906",
    esic: "3100234582",
    address: "Mangalwar Peth, Kolhapur, Maharashtra",
    status: "Inactive",
  },
  {
    id: "STG-1017",
    name: "Prashant Mane",
    email: "prashant.mane@stelgrowhr.com",
    phone: "+91 99215 66740",
    gender: "Male",
    dob: "1989-09-15",
    joiningDate: "2019-02-04",
    department: "Information Technology",
    designation: "Software Developer",
    employmentType: "Full Time",
    basic: 71000,
    bankName: "ICICI Bank",
    accountNumber: "62100112233440",
    ifsc: "ICIC0000765",
    pan: "QSTPM3535B",
    uan: "100234567907",
    esic: "3100234583",
    address: "Sambhajinagar, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1018",
    name: "Deepali Nikam",
    email: "deepali.nikam@stelgrowhr.com",
    phone: "+91 87679 30021",
    gender: "Female",
    dob: "1995-11-11",
    joiningDate: "2023-03-27",
    department: "Human Resources",
    designation: "HR Executive",
    employmentType: "Contract",
    basic: 36000,
    bankName: "Canara Bank",
    accountNumber: "04120056781234",
    ifsc: "CNRB0000412",
    pan: "RTUPN4646C",
    uan: "100234567908",
    esic: "3100234584",
    address: "Shivaji Peth, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1019",
    name: "Sagar Yadav",
    email: "sagar.yadav@stelgrowhr.com",
    phone: "+91 96895 44120",
    gender: "Male",
    dob: "1993-02-02",
    joiningDate: "2021-12-06",
    department: "Finance",
    designation: "Accountant",
    employmentType: "Full Time",
    basic: 46000,
    bankName: "Axis Bank",
    accountNumber: "91801990011223",
    ifsc: "UTIB0000561",
    pan: "SUVPY5757D",
    uan: "100234567909",
    esic: "3100234585",
    address: "Peth Vadgaon, Kolhapur, Maharashtra",
    status: "Active",
  },
  {
    id: "STG-1020",
    name: "Aarti Kamble",
    email: "aarti.kamble@stelgrowhr.com",
    phone: "+91 89283 71156",
    gender: "Female",
    dob: "1998-07-21",
    joiningDate: "2024-01-15",
    department: "Administration",
    designation: "Office Administrator",
    employmentType: "Intern",
    basic: 22000,
    bankName: "HDFC Bank",
    accountNumber: "50100778899001",
    ifsc: "HDFC0000998",
    pan: "TVWPK6868E",
    uan: "100234567910",
    esic: "3100234586",
    address: "Jaysingpur, Kolhapur, Maharashtra",
    status: "Active",
  },
];

/* ---------- Salary computation (mock, frontend only) ---------- */

export type SalaryBreakup = {
  basic: number;
  hra: number;
  conveyance: number;
  medical: number;
  special: number;
  bonus: number;
  overtime: number;
  gross: number;
  pf: number;
  esic: number;
  pt: number;
  tds: number;
  loan: number;
  other: number;
  deductions: number;
  net: number;
};

export function computeSalary(basic: number, opts?: { loan?: number; bonus?: number }): SalaryBreakup {
  const hra = Math.round(basic * 0.4);
  const conveyance = 1600;
  const medical = 1250;
  const special = Math.round(basic * 0.12);
  const bonus = opts?.bonus ?? Math.round(basic * 0.05);
  const overtime = Math.round((basic / 240) * 6);
  const gross = basic + hra + conveyance + medical + special + bonus + overtime;

  const pf = Math.round(Math.min(basic, 15000) * 0.12);
  const esic = gross <= 21000 ? Math.round(gross * 0.0075) : 0;
  const pt = 200;
  const tds = gross > 60000 ? Math.round(gross * 0.05) : gross > 40000 ? Math.round(gross * 0.02) : 0;
  const loan = opts?.loan ?? 0;
  const other = 150;
  const deductions = pf + esic + pt + tds + loan + other;

  return {
    basic,
    hra,
    conveyance,
    medical,
    special,
    bonus,
    overtime,
    gross,
    pf,
    esic,
    pt,
    tds,
    loan,
    other,
    deductions,
    net: gross - deductions,
  };
}

/* ---------- Attendance ---------- */

export type AttendanceStatus = "Present" | "Absent" | "Half Day" | "Leave" | "Work From Home";

export type AttendanceRow = {
  employeeId: string;
  name: string;
  department: string;
  checkIn: string;
  checkOut: string;
  hours: number;
  status: AttendanceStatus;
};

const ATT_PATTERN: AttendanceStatus[] = [
  "Present",
  "Present",
  "Work From Home",
  "Present",
  "Half Day",
  "Present",
  "Leave",
  "Present",
  "Absent",
  "Present",
];

export const ATTENDANCE: AttendanceRow[] = EMPLOYEES.map((e, i) => {
  const status = ATT_PATTERN[i % ATT_PATTERN.length] ?? "Present";
  const worked = status === "Absent" || status === "Leave" ? 0 : status === "Half Day" ? 4.5 : 8.5;
  return {
    employeeId: e.id,
    name: e.name,
    department: e.department,
    checkIn: worked === 0 ? "—" : i % 3 === 0 ? "09:32 AM" : "09:12 AM",
    checkOut: worked === 0 ? "—" : worked === 4.5 ? "01:45 PM" : "06:40 PM",
    hours: worked,
    status,
  };
});

export const MONTHLY_ATTENDANCE_SUMMARY = {
  workingDays: 26,
  present: 22,
  absent: 1,
  halfDay: 2,
  leave: 1,
};

/* ---------- Leaves ---------- */

export type LeaveStatus = "Pending" | "Approved" | "Rejected";
export type LeaveType = "Casual Leave" | "Sick Leave" | "Earned Leave" | "Paid Leave" | "Unpaid Leave";

export type LeaveRequest = {
  id: string;
  employeeId: string;
  employee: string;
  type: LeaveType;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: LeaveStatus;
};

export const LEAVES: LeaveRequest[] = [
  {
    id: "LV-2091",
    employeeId: "STG-1001",
    employee: "Rahul Sharma",
    type: "Casual Leave",
    from: "2026-09-08",
    to: "2026-09-09",
    days: 2,
    reason: "Family function at native place",
    status: "Pending",
  },
  {
    id: "LV-2092",
    employeeId: "STG-1004",
    employee: "Sneha Joshi",
    type: "Sick Leave",
    from: "2026-09-03",
    to: "2026-09-04",
    days: 2,
    reason: "Viral fever, doctor advised rest",
    status: "Approved",
  },
  {
    id: "LV-2093",
    employeeId: "STG-1009",
    employee: "Saurabh More",
    type: "Unpaid Leave",
    from: "2026-09-14",
    to: "2026-09-18",
    days: 5,
    reason: "Personal travel",
    status: "Rejected",
  },
  {
    id: "LV-2094",
    employeeId: "STG-1010",
    employee: "Anjali Patil",
    type: "Earned Leave",
    from: "2026-09-21",
    to: "2026-09-23",
    days: 3,
    reason: "Pre-planned vacation",
    status: "Pending",
  },
  {
    id: "LV-2095",
    employeeId: "STG-1005",
    employee: "Rohit Deshmukh",
    type: "Paid Leave",
    from: "2026-09-11",
    to: "2026-09-11",
    days: 1,
    reason: "Client visit rescheduled, availing leave",
    status: "Approved",
  },
  {
    id: "LV-2096",
    employeeId: "STG-1013",
    employee: "Ganesh Bhosale",
    type: "Sick Leave",
    from: "2026-09-16",
    to: "2026-09-17",
    days: 2,
    reason: "Dental surgery",
    status: "Pending",
  },
  {
    id: "LV-2097",
    employeeId: "STG-1012",
    employee: "Kavita Salunkhe",
    type: "Casual Leave",
    from: "2026-09-05",
    to: "2026-09-05",
    days: 1,
    reason: "Bank and property work",
    status: "Approved",
  },
  {
    id: "LV-2098",
    employeeId: "STG-1017",
    employee: "Prashant Mane",
    type: "Earned Leave",
    from: "2026-09-28",
    to: "2026-09-30",
    days: 3,
    reason: "Festival holidays with family",
    status: "Pending",
  },
];

/* ---------- Salary components ---------- */

export type CalcMethod = "Fixed Amount" | "Percentage" | "Based on Basic Salary";

export type SalaryComponent = {
  id: string;
  name: string;
  type: "Earning" | "Deduction";
  method: CalcMethod;
  value: string;
  status: Status;
};

export const SALARY_COMPONENTS: SalaryComponent[] = [
  { id: "SC-01", name: "Basic", type: "Earning", method: "Percentage", value: "50% of CTC", status: "Active" },
  { id: "SC-02", name: "HRA", type: "Earning", method: "Based on Basic Salary", value: "40% of Basic", status: "Active" },
  { id: "SC-03", name: "Conveyance", type: "Earning", method: "Fixed Amount", value: "₹1,600", status: "Active" },
  { id: "SC-04", name: "Medical Allowance", type: "Earning", method: "Fixed Amount", value: "₹1,250", status: "Active" },
  {
    id: "SC-05",
    name: "Special Allowance",
    type: "Earning",
    method: "Based on Basic Salary",
    value: "12% of Basic",
    status: "Active",
  },
  { id: "SC-06", name: "Performance Bonus", type: "Earning", method: "Based on Basic Salary", value: "5% of Basic", status: "Active" },
  { id: "SC-07", name: "Overtime", type: "Earning", method: "Fixed Amount", value: "₹250 / hour", status: "Active" },
  { id: "SC-08", name: "Provident Fund", type: "Deduction", method: "Based on Basic Salary", value: "12% of Basic", status: "Active" },
  { id: "SC-09", name: "ESIC", type: "Deduction", method: "Percentage", value: "0.75% of Gross", status: "Active" },
  { id: "SC-10", name: "Professional Tax", type: "Deduction", method: "Fixed Amount", value: "₹200", status: "Active" },
  { id: "SC-11", name: "TDS", type: "Deduction", method: "Percentage", value: "Slab based", status: "Active" },
  { id: "SC-12", name: "Loan Deduction", type: "Deduction", method: "Fixed Amount", value: "As applicable", status: "Inactive" },
  { id: "SC-13", name: "Other Deduction", type: "Deduction", method: "Fixed Amount", value: "₹150", status: "Active" },
];

/* ---------- Payroll ---------- */

export type PayrollStatus = "Draft" | "Processing" | "Processed" | "Paid";

export type PayrollRow = {
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  basic: number;
  allowances: number;
  gross: number;
  deductions: number;
  net: number;
  status: PayrollStatus;
};

const PAYROLL_STATUS_PATTERN: PayrollStatus[] = [
  "Paid",
  "Paid",
  "Processed",
  "Paid",
  "Processing",
  "Draft",
  "Paid",
  "Processed",
  "Draft",
  "Paid",
];

export const PAYROLL: PayrollRow[] = EMPLOYEES.filter((e) => e.status === "Active").map((e, i) => {
  const s = computeSalary(e.basic, { loan: i % 5 === 0 ? 2500 : 0 });
  return {
    employeeId: e.id,
    name: e.name,
    department: e.department,
    designation: e.designation,
    basic: s.basic,
    allowances: s.gross - s.basic,
    gross: s.gross,
    deductions: s.deductions,
    net: s.net,
    status: PAYROLL_STATUS_PATTERN[i % PAYROLL_STATUS_PATTERN.length] ?? "Draft",
  };
});

export const MONTHS = [
  "April 2026",
  "May 2026",
  "June 2026",
  "July 2026",
  "August 2026",
  "September 2026",
];

export const PAYROLL_TREND = [
  { month: "Jan", value: 1520000, label: "₹15.2L" },
  { month: "Feb", value: 1610000, label: "₹16.1L" },
  { month: "Mar", value: 1680000, label: "₹16.8L" },
  { month: "Apr", value: 1740000, label: "₹17.4L" },
  { month: "May", value: 1810000, label: "₹18.1L" },
  { month: "Jun", value: 1850000, label: "₹18.5L" },
];

export const ATTENDANCE_OVERVIEW = [
  { label: "Present", value: 232, tone: "success" as const },
  { label: "Absent", value: 6, tone: "danger" as const },
  { label: "Half Day", value: 10, tone: "warning" as const },
  { label: "Leave", value: 12, tone: "info" as const },
];

export const DEPARTMENT_SALARY = [
  { name: "HR", value: 260000 },
  { name: "IT", value: 620000 },
  { name: "Finance", value: 285000 },
  { name: "Sales", value: 410000 },
  { name: "Operations", value: 335000 },
  { name: "Administration", value: 140000 },
];

export const MONTHLY_PAYROLL_HISTORY = [
  { month: "September 2026", gross: 2150000, deductions: 300000, net: 1850000, paid: 1610000, pending: 240000 },
  { month: "August 2026", gross: 2090000, deductions: 280000, net: 1810000, paid: 1810000, pending: 0 },
  { month: "July 2026", gross: 2010000, deductions: 270000, net: 1740000, paid: 1740000, pending: 0 },
  { month: "June 2026", gross: 1950000, deductions: 270000, net: 1680000, paid: 1680000, pending: 0 },
  { month: "May 2026", gross: 1870000, deductions: 260000, net: 1610000, paid: 1610000, pending: 0 },
  { month: "April 2026", gross: 1770000, deductions: 250000, net: 1520000, paid: 1520000, pending: 0 },
];

export const EMPLOYEE_ATTENDANCE_REPORT = EMPLOYEES.map((e, i) => {
  const present = 20 + (i % 5);
  const absent = i % 3;
  const halfDay = i % 2;
  const leave = i % 4;
  return {
    employeeId: e.id,
    name: e.name,
    department: e.department,
    present,
    absent,
    halfDay,
    leave,
    percentage: Math.round(((present + halfDay * 0.5) / 26) * 100),
  };
});

export const PAYROLL_HISTORY_BY_EMPLOYEE = [
  { month: "August 2026", gross: 0, deductions: 0, net: 0, status: "Paid" as PayrollStatus },
  { month: "July 2026", gross: 0, deductions: 0, net: 0, status: "Paid" as PayrollStatus },
  { month: "June 2026", gross: 0, deductions: 0, net: 0, status: "Paid" as PayrollStatus },
];
