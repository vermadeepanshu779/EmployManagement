export default function DeleteModal({ employee, onConfirm, onCancel }) {
  if (!employee) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onCancel}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="delete-title"
        onMouseDown={(e) => e.stopPropagation()}>
        <div className="warning-icon">!</div>
        <h3 id="delete-title">Delete employee?</h3>
        <p>Are you sure you want to delete this employee?</p>
        <div className="delete-target">
          <strong>{employee.name}</strong>
          <span>{employee.email}</span>
        </div>
        <div className="modal-actions">
          <button className="btn secondary" onClick={onCancel}>No, Keep</button>
          <button className="btn danger" onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}