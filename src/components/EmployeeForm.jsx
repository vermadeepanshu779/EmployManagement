import { useEffect, useState } from "react";

const DEPARTMENTS = ["PHP", "Flutter", "React", "Testing"];
const EMPTY = { name: "", email: "", mobile: "", department: "", salary: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Employee name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!/^\d{10}$/.test(values.mobile.replace(/\D/g, ""))) {
    errors.mobile = "Mobile number must contain exactly 10 digits.";
  }
  if (!values.department) errors.department = "Please select a department.";
  if (values.salary === "" || Number.isNaN(Number(values.salary)) || Number(values.salary) < 0) {
    errors.salary = "Enter a valid salary.";
  }
  return errors;
}

export default function EmployeeForm({ employee, onSave, onCancel }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(employee ? {
      name: employee.name,
      email: employee.email,
      mobile: employee.mobile,
      department: employee.department,
      salary: String(employee.salary)
    } : EMPTY);
    setErrors({});
  }, [employee]);

  const editing = Boolean(employee);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    onSave({
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      mobile: values.mobile.replace(/\D/g, ""),
      salary: Number(values.salary)
    });
  }

  return (
    <form className="card form-card" onSubmit={submit} noValidate>
      <div className="card-heading">
        <div>
          <p className="eyebrow">{editing ? "Update record" : "New record"}</p>
          <h2>{editing ? "Edit Employee" : "Add Employee"}</h2>
        </div>
        {editing && <span className="edit-pill">Editing</span>}
      </div>

      <div className="form-grid">
        <Field label="Employee Name" error={errors.name}>
          <input value={values.name} onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Rahul Sharma" autoComplete="name" />
        </Field>

        <Field label="Email" error={errors.email}>
          <input type="email" value={values.email} onChange={(e) => update("email", e.target.value)}
            placeholder="rahul@example.com" autoComplete="email" />
        </Field>

        <Field label="Mobile Number" error={errors.mobile}>
          <input inputMode="numeric" maxLength="10" value={values.mobile}
            onChange={(e) => update("mobile", e.target.value.replace(/\D/g, ""))}
            placeholder="10 digit mobile number" autoComplete="tel" />
        </Field>

        <Field label="Department" error={errors.department}>
          <select value={values.department} onChange={(e) => update("department", e.target.value)}>
            <option value="">Select department</option>
            {DEPARTMENTS.map((department) => <option key={department}>{department}</option>)}
          </select>
        </Field>

        <Field label="Salary" error={errors.salary}>
          <div className="input-prefix">
            <span>₹</span>
            <input type="number" min="0" step="1" value={values.salary}
              onChange={(e) => update("salary", e.target.value)} placeholder="30000" />
          </div>
        </Field>
      </div>

      <div className="form-actions">
        {editing && <button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="btn primary">{editing ? "Update Employee" : "Save Employee"}</button>
      </div>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {error && <small className="error">{error}</small>}
    </label>
  );
}