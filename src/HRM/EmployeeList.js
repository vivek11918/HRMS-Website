// src/components/EmployeeList.js
import React from 'react';

const EmployeeList = ({
  employees,
  onEdit,
  onDelete,
  searchTerm,
  setSearchTerm,
  selectedDepartment,
  setSelectedDepartment
}) => (
  <div className="card mb-4">
    <div className="card-header d-flex justify-content-between align-items-center">
      <input
        className="form-control w-50"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <select
        className="form-select w-25"
        value={selectedDepartment}
        onChange={e => setSelectedDepartment(e.target.value)}
      >
        <option value="All">All Departments</option>
        <option value="Engineering">Engineering</option>
        <option value="HR">HR</option>
        <option value="Marketing">Marketing</option>
        <option value="Finance">Finance</option>
      </select>
    </div>
    <div className="card-body p-0">
      <table className="table table-striped mb-0">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.email}</td>
              <td>{emp.status}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(emp)}>
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(emp.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default EmployeeList;
