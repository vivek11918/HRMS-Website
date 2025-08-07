// src/components/EmployeeForm.js
import React from 'react';

const EmployeeForm = ({ employee, onChange, onSave, editMode }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        {editMode ? 'Edit Employee' : 'Add New Employee'}
      </div>
      <div className="card-body">
        <div className="row">
          {[
            { name: 'name', placeholder: 'Name' },
            { name: 'position', placeholder: 'Position' },
            { name: 'email', placeholder: 'Email' },
            { name: 'phone', placeholder: 'Phone' },
            { name: 'salary', placeholder: 'Salary' },
            { name: 'joinDate', type: 'date', placeholder: 'Join Date' },
            { name: 'address', placeholder: 'Address' },
          ].map((field, idx) => (
            <div className="col-md-4 mb-3" key={idx}>
              <input
                className="form-control"
                type={field.type || 'text'}
                placeholder={field.placeholder}
                name={field.name}
                value={employee[field.name]}
                onChange={onChange}
              />
            </div>
          ))}
          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              name="department"
              value={employee.department}
              onChange={onChange}
            >
              <option>Engineering</option>
              <option>HR</option>
              <option>Marketing</option>
              <option>Finance</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              name="status"
              value={employee.status}
              onChange={onChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary" onClick={onSave}>
          {editMode ? 'Update' : 'Add'} Employee
        </button>
      </div>
    </div>
  );
};

export default EmployeeForm;
