import { useEffect, useMemo, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import DeleteModal from "./components/DeleteModal";
import '../src/styles.css'

const STORAGE_KEY = "employee-management-employees-v1";
const DEPARTMENTS = ["PHP", "Flutter", "React", "Testing"];

const demoEmployees = [
  { id: "emp-demo-rahul", name: "Rahul Sharma", email: "rahul@gmail.com", mobile: "9876543210", department: "Flutter", salary: 30000 },
  { id: "emp-demo-amit", name: "Amit Verma", email: "amit@gmail.com", mobile: "9123456780", department: "Testing", salary: 25000 }
];

export default function App() {
  const [count, setCount] = useState(0)
  const [employees, setEmployees] = useState(() => loadEmployees());
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 2800);
    return () => clearTimeout(timer);
  }, [notice]);

  const filteredEmployees = useMemo(() => {
    const q = query.trim().toLowerCase();
    return employees.filter((employee) => {
      const matchesName = !q || employee.name.toLowerCase().includes(q);
      const matchesDepartment = !department || employee.department === department;
      return matchesName && matchesDepartment;
    });
  }, [employees, query, department]);

  const totalSalary = employees.reduce((sum, employee) => sum + Number(employee.salary || 0), 0);

  function saveEmployee(data) {
    if (editing) {
      setEmployees((current) => current.map((item) => item.id === editing.id ? { ...data, id: editing.id } : item));
      setNotice({ type: "success", text: "Employee updated successfully." });
      setEditing(null);
    } else {
      const newEmployee = { ...data, id: `emp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
      setEmployees((current) => [newEmployee, ...current]);
      setNotice({ type: "success", text: "Employee added successfully." });
    }
  }

  function confirmDelete() {
    if (!deleting) return;
    setEmployees((current) => current.filter((item) => item.id !== deleting.id));
    setDeleting(null);
    if (editing?.id === deleting.id) setEditing(null);
    setNotice({ type: "success", text: "Employee deleted successfully." });
  }

  function seedDemo() {
    const existingNames = new Set(employees.map((e) => e.name));
    const additions = demoEmployees.filter((e) => !existingNames.has(e.name));
    setEmployees((current) => [...additions, ...current]);
    setNotice({ type: "success", text: additions.length ? "Sample employees added." : "Sample employees are already present." });
  }

  function clearAll() {
    if (!employees.length) return;
    if (window.confirm("Clear all employee records? This cannot be undone.")) {
      setEmployees([]);
      setEditing(null);
      setNotice({ type: "success", text: "All employee records cleared." });
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">EM</div>
          <div>
            <strong>Employee<span>Hub</span></strong>
            <small>Management dashboard</small>
          </div>
        </div>
        <div className="storage-status"><span /> Saved locally</div>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <p className="eyebrow">Employee Management</p>
            <h1>Manage your team <em>simply.</em></h1>
            <p className="hero-copy">Create, edit, search and organize employee records from one clean dashboard.</p>
          </div>
          <button className="btn primary hero-btn" onClick={() => { setEditing(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            + Add Employee
          </button>
        </section>

        <section className="stats-grid">
          <Stat label="Total Employees" value={employees.length} accent="blue" />
          <Stat label="Departments" value={new Set(employees.map(e => e.department)).size} accent="purple" />
          <Stat label="Total Payroll" value={`₹${totalSalary.toLocaleString("en-IN")}`} accent="green" />
          <Stat label="Filtered Results" value={filteredEmployees.length} accent="orange" />
        </section>

        <div className="content-grid">
          <EmployeeForm
            employee={editing}
            onSave={saveEmployee}
            onCancel={() => setEditing(null)}
          />

          <section className="card list-card">
            <div className="list-header">
              <div>
                <p className="eyebrow">Directory</p>
                <h2>Employee List <span>{filteredEmployees.length}</span></h2>
              </div>
              <div className="list-tools">
                <label className="search-box">
                  <span>⌕</span>
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name..." />
                </label>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} aria-label="Filter by department">
                  <option value="">All departments</option>
                  {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <EmployeeTable employees={filteredEmployees} onEdit={setEditing} onDelete={setDeleting} />

            <div className="list-footer">
              <button className="text-btn" onClick={seedDemo}>Load sample data</button>
              <button className="text-btn muted" onClick={clearAll}>Clear all</button>
            </div>
          </section>
        </div>
      </main>

      {notice && <div className={`toast ${notice.type}`}><span>✓</span>{notice.text}</div>}
      <DeleteModal employee={deleting} onConfirm={confirmDelete} onCancel={() => setDeleting(null)} />

      <footer>EmployeeHub • React CRUD Machine Test • Data persists in your browser</footer>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className={`stat-card ${accent}`}>
      <div className="stat-dot" />
      <div><span>{label}</span><strong>{value}</strong></div>
    </div>
  );
}

function loadEmployees() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}