import React, { useState, useEffect } from 'react';

// Employee Dashboard Component
const EmployeeDashboard = () => {
  // Application state
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    id: '',
    name: '',
    position: '',
    department: 'Engineering',
    email: '',
    salary: '',
    joinDate: '',
    status: 'Active',
    phone: '',
    address: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    departments: {}
  });
  const [announcements, setAnnouncements] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [payslips, setPayslips] = useState([]);

  // Initialize with sample data
  useEffect(() => {
    const sampleEmployees = [
      {
        id: 'EMP101',
        name: 'John Doe',
        position: 'Senior Software Engineer',
        department: 'Engineering',
        email: 'john.doe@company.com',
        salary: '120000',
        joinDate: '2020-05-15',
        status: 'Active',
        phone: '(555) 123-4567',
        address: '123 Tech Street, Silicon Valley, CA'
      },
      {
        id: 'EMP102',
        name: 'Jane Smith',
        position: 'HR Director',
        department: 'Human Resources',
        email: 'jane.smith@company.com',
        salary: '150000',
        joinDate: '2018-03-10',
        status: 'Active',
        phone: '(555) 234-5678',
        address: '456 Corporate Blvd, New York, NY'
      },
      // Add more sample employees as needed
    ];
    setEmployees(sampleEmployees);
    calculateStats(sampleEmployees);
    setAnnouncements([
      { id: 1, message: "Company-wide meeting on Friday at 10 AM." },
      { id: 2, message: "New health insurance options available." },
    ]);
    setAttendanceRecords([
      { date: '2023-06-01', status: 'Present' },
      { date: '2023-06-02', status: 'Present' },
      { date: '2023-06-03', status: 'Absent' },
    ]);
    setPayslips([
      { id: 'PAYS101', month: 'June 2023', amount: '$5000' },
      { id: 'PAYS102', month: 'May 2023', amount: '$5000' },
    ]);
  }, []);

  // Calculate statistics
  const calculateStats = (empList) => {
    const activeCount = empList.filter(e => e.status === 'Active').length;
    
    const deptStats = empList.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {});
    
    setStats({
      totalEmployees: empList.length,
      activeEmployees: activeCount,
      departments: deptStats
    });
  };

  // Input change handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value
    });
  };

  const addEmployee = (e) => {
    e.preventDefault();
    const employeeWithId = {
      ...newEmployee,
      id: `EMP${100 + employees.length + 1}`,
      joinDate: new Date().toISOString().split('T')[0]
    };
    const updatedEmployees = [...employees, employeeWithId];
    setEmployees(updatedEmployees);
    calculateStats(updatedEmployees);
    
    setNewEmployee({
      id: '',
      name: '',
      position: '',
      department: 'Engineering',
      email: '',
      salary: '',
      joinDate: '',
      status: 'Active',
      phone: '',
      address: ''
    });
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    calculateStats(updatedEmployees);
  };

  const editEmployee = (employee) => {
    setEditMode(true);
    setCurrentEmployee({ ...employee });
  };

  const updateEmployee = (e) => {
    e.preventDefault();
    const updatedEmployees = employees.map(employee => 
      employee.id === currentEmployee.id ? currentEmployee : employee
    );
    setEmployees(updatedEmployees);
    calculateStats(updatedEmployees);
    setEditMode(false);
    setCurrentEmployee(null);
  };

  // Filter employees
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply for leave
  const applyForLeave = (employeeId) => {
    const leaveRequest = {
      id: leaveRequests.length + 1,
      employeeId,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setLeaveRequests([...leaveRequests, leaveRequest]);
  };

  return (
    <div className="employee-dashboard">
      <header>
        <h1>Employee Dashboard</h1>
        <div>
          <input 
            type="text" 
            placeholder="Search employees..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </header>

      <section>
        <h2>Statistics</h2>
        <div>
          <p>Total Employees: {stats.totalEmployees}</p>
          <p>Active Employees: {stats.activeEmployees}</p>
        </div>
      </section>

      <section>
        <h2>Employee List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{employee.status}</td>
                <td>
                 <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => editEmployee(employee)}>Edit</button>
                  <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                  <button onClick={() => applyForLeave(employee.id)}>Apply for Leave</button>
                 </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>{editMode ? 'Edit Employee' : 'Add New Employee'}</h2>
        <form onSubmit={editMode ? updateEmployee : addEmployee}>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={editMode ? currentEmployee.name : newEmployee.name} 
            onChange={editMode ? (e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value }) : handleInputChange} 
            required 
          />
          <input 
            type="text" 
            name="position" 
            placeholder="Position" 
            value={editMode ? currentEmployee.position : newEmployee.position} 
            onChange={editMode ? (e) => setCurrentEmployee({ ...currentEmployee, position: e.target.value }) : handleInputChange} 
            required 
          />
          <input 
            type="text" 
            name="department" 
            placeholder="Department" 
            value={editMode ? currentEmployee.department : newEmployee.department} 
            onChange={editMode ? (e) => setCurrentEmployee({ ...currentEmployee, department: e.target.value }) : handleInputChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={editMode ? currentEmployee.email : newEmployee.email} 
            onChange={editMode ? (e) => setCurrentEmployee({ ...currentEmployee, email: e.target.value }) : handleInputChange} 
            required 
          />
          <input 
            type="number" 
            name="salary" 
            placeholder="Salary" 
            value={editMode ? currentEmployee.salary : newEmployee.salary} 
            onChange={editMode ? (e) => setCurrentEmployee({ ...currentEmployee, salary: e.target.value }) : handleInputChange} 
            required 
          />
          <button type="submit">{editMode ? 'Update Employee' : 'Add Employee'}</button>
        </form>
      </section>

      <section>
        <h2>Payslips</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Month</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payslips.map(payslip => (
              <tr key={payslip.id}>
                <td>{payslip.id}</td>
                <td>{payslip.month}</td>
                <td>{payslip.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Announcements</h2>
        <ul>
          {announcements.map(announcement => (
            <li key={announcement.id}>{announcement.message}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Attendance Records</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map(record => (
              <tr key={record.date}>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

// CSS styling
const styles = `
  /* Base Styles */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .employee-dashboard {
    padding: 1.5rem;
    background-color: #f5f7fa;
    min-height: 100vh;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  header h1 {
    font-size: 2rem;
    color: #2c3e50;
  }

  header input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  section {
    margin-bottom: 2rem;
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  section h2 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 1rem;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f8f9fa;
    color: #2c3e50;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #2980b9;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  form input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
`;

// Render the application
const App = () => (
  <>
    <style>{styles}</style>
    <EmployeeDashboard />
  </>
);

export default App;
