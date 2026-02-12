export type EmployeeStatus = "active" | "on-leave" | "contract";

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  location: string;
  status: EmployeeStatus;
}

export const employees: Employee[] = [
  {
    id: "emp-001",
    name: "Ava Chen",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=ava-chen",
    role: "Product Designer",
    department: "Design",
    location: "Remote",
    status: "active",
  },
  {
    id: "emp-002",
    name: "Noah Patel",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=noah-patel",
    role: "Frontend Engineer",
    department: "Engineering",
    location: "London",
    status: "active",
  },
  {
    id: "emp-003",
    name: "Mia Johnson",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mia-johnson",
    role: "Customer Success",
    department: "Support",
    location: "Austin",
    status: "active",
  },
  {
    id: "emp-004",
    name: "Ethan Kim",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=ethan-kim",
    role: "Data Analyst",
    department: "Operations",
    location: "Remote",
    status: "contract",
  },
  {
    id: "emp-005",
    name: "Sophia Martinez",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=sophia-martinez",
    role: "Account Executive",
    department: "Sales",
    location: "New York",
    status: "active",
  },
  {
    id: "emp-006",
    name: "Liam Wilson",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=liam-wilson",
    role: "Backend Engineer",
    department: "Engineering",
    location: "Berlin",
    status: "on-leave",
  },
  {
    id: "emp-007",
    name: "Isabella Rossi",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=isabella-rossi",
    role: "People Ops",
    department: "People",
    location: "Remote",
    status: "active",
  },
  {
    id: "emp-008",
    name: "James Brown",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=james-brown",
    role: "QA Engineer",
    department: "Engineering",
    location: "Toronto",
    status: "contract",
  },
  {
    id: "emp-009",
    name: "Olivia Davis",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=olivia-davis",
    role: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    status: "active",
  },
  {
    id: "emp-010",
    name: "Benjamin Lee",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=benjamin-lee",
    role: "Finance Analyst",
    department: "Finance",
    location: "Sydney",
    status: "active",
  },
];

export function getHeadcountByDepartment() {
  const counts = new Map<string, number>();
  for (const employee of employees) {
    counts.set(employee.department, (counts.get(employee.department) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([department, value]) => ({ department, value }));
}
