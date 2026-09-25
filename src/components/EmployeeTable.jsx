const DEPARTMENT_CLASS = {
  PHP: "php",
  Flutter: "flutter",
  React: "react",
  Testing: "testing"
};

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  if (!employees.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⌕</div>
        <h3>No employee records found</h3>
        <p>Add your first employee or change the search/filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Salary</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div className="employee-cell">
                  <div className="avatar">{initials(employee.name)}</div>
                  <div>
                    <strong>{employee.name}</strong>
                    <small>Employee ID: {employee.id.slice(-6).toUpperCase()}</small>
                  </div>
                </div>
              </td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td><span className={`department ${DEPARTMENT_CLASS[employee.department]}`}>{employee.department}</span></td>
              <td className="salary">₹{Number(employee.salary).toLocaleString("en-IN")}</td>
              <td>
                <div className="row-actions">
                  <button className="icon-btn edit" title="Edit employee" onClick={() => onEdit(employee)}>Edit</button>
                  <button className="icon-btn delete" title="Delete employee" onClick={() => onDelete(employee)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(x => x[0]).join("").toUpperCase();
}