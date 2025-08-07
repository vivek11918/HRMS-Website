import React, { useState, useEffect } from 'react';



const HRMSApp = () => {
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
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    departments: {}
  });

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
      {
        id: 'EMP103',
        name: 'Robert Johnson',
        position: 'Marketing Head',
        department: 'Marketing',
        email: 'robert.j@company.com',
        salary: '130000',
        joinDate: '2019-11-22',
        status: 'Active',
        phone: '(555) 345-6789',
        address: '789 Creative Lane, Chicago, IL'
      },
      {
        id: 'EMP104',
        name: 'Emily Davis',
        position: 'UX Design Lead',
        department: 'Design',
        email: 'emily.d@company.com',
        salary: '110000',
        joinDate: '2021-01-05',
        status: 'Active',
        phone: '(555) 456-7890',
        address: '101 Design Ave, Seattle, WA'
      },
      {
        id: 'EMP105',
        name: 'Michael Brown',
        position: 'Product Manager',
        department: 'Product',
        email: 'michael.b@company.com',
        salary: '140000',
        joinDate: '2019-07-30',
        status: 'Active',
        phone: '(555) 567-8901',
        address: '202 Product Road, Boston, MA'
      },
      {
        id: 'EMP106',
        name: 'Sarah Wilson',
        position: 'Sales Executive',
        department: 'Sales',
        email: 'sarah.w@company.com',
        salary: '95000',
        joinDate: '2022-02-18',
        status: 'Active',
        phone: '(555) 678-9012',
        address: '303 Sales Drive, Austin, TX'
      },
      {
        id: 'EMP107',
        name: 'David Lee',
        position: 'DevOps Engineer',
        department: 'Engineering',
        email: 'david.lee@company.com',
        salary: '115000',
        joinDate: '2020-09-12',
        status: 'Active',
        phone: '(555) 789-0123',
        address: '404 Cloud Way, Portland, OR'
      },
      {
        id: 'EMP108',
        name: 'Lisa Garcia',
        position: 'Recruiter',
        department: 'Human Resources',
        email: 'lisa.g@company.com',
        salary: '85000',
        joinDate: '2021-08-25',
        status: 'Active',
        phone: '(555) 890-1234',
        address: '505 Talent Street, Denver, CO'
      }
    ];
    setEmployees(sampleEmployees);
    calculateStats(sampleEmployees);
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

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({
      ...currentEmployee,
      [name]: value
    });
  };

  // Notification helper
  const showMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Employee CRUD operations
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
    
    showMessage('Employee added successfully!');
    setCurrentView('employees');
  };

  const deleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updatedEmployees = employees.filter(employee => employee.id !== id);
      setEmployees(updatedEmployees);
      calculateStats(updatedEmployees);
      showMessage('Employee deleted successfully!');
    }
  };

  const editEmployee = (employee) => {
    setEditMode(true);
    setCurrentEmployee({ ...employee });
    setCurrentView('add');
  };

  const updateEmployee = (e) => {
    e.preventDefault();
    const updatedEmployees = employees.map(employee => 
      employee.id === currentEmployee.id ? currentEmployee : employee
    );
    setEmployees(updatedEmployees);
    calculateStats(updatedEmployees);
    showMessage('Employee updated successfully!');
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditMode(false);
    setCurrentEmployee(null);
    setCurrentView('employees');
  };

  // Filter employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      selectedDepartment === 'All' || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Main render
  return (
    <div className="hrms-container">
      {/* Header */}
      <header className="hrms-header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <img src="/logo.png" alt="Company logo - Blue square with white human silhouette icon representing HR services" />
            </div>
            <h1>Emp<span>lync</span>System</h1>
          </div>
          <nav className="main-nav">
            <button 
              className={currentView === 'dashboard' ? 'active' : ''} 
              onClick={() => setCurrentView('dashboard')}
            >
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </button>
            <button 
              className={currentView === 'employees' ? 'active' : ''} 
              onClick={() => setCurrentView('employees')}
            >
              <i className="fas fa-users"></i> Employees
            </button>
            <button 
              className={currentView === 'add' ? 'active' : ''} 
              onClick={() => {
                setCurrentView('add');
                setEditMode(false);
              }}
            >
              <i className="fas fa-user-plus"></i> Add Employee
            </button>
          </nav>
          <div className="user-info">
            <div className="user-avatar">
              <img src="https://placehold.co/40x40" alt="User profile picture - Circular image showing HR manager with professional attire and smile" />
            </div>
            <div className="user-details">
              <span className="username">Admin User</span>
              <span className="role">HR Manager</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="hrms-main">
        {/* Page Title */}
        <div className="page-header">
          <h2>
            {currentView === 'dashboard' && 'HR Dashboard'}
            {currentView === 'employees' && 'Employee Directory'}
            {currentView === 'add' && (editMode ? 'Edit Employee' : 'Add New Employee')}
          </h2>
          {currentView === 'employees' && (
            <div className="search-filter">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                value={selectedDepartment} 
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="All">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Human Resources">HR</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Product">Product</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          )}
        </div>

        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div className="dashboard-grid">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card primary">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-info">
                  <h3>Total Employees</h3>
                  <p>{stats.totalEmployees}</p>
                </div>
              </div>
              <div className="stat-card success">
                <div className="stat-icon">
                  <i className="fas fa-user-check"></i>
                </div>
                <div className="stat-info">
                  <h3>Active</h3>
                  <p>{stats.activeEmployees}</p>
                </div>
              </div>
              <div className="stat-card warning">
                <div className="stat-icon">
                  <i className="fas fa-user-clock"></i>
                </div>
                <div className="stat-info">
                  <h3>On Leave</h3>
                  <p>0</p>
                </div>
              </div>
              <div className="stat-card danger">
                <div className="stat-icon">
                  <i className="fas fa-user-slash"></i>
                </div>
                <div className="stat-info">
                  <h3>Inactive</h3>
                  <p>{stats.totalEmployees - stats.activeEmployees}</p>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="charts-row">
              <div className="chart-card">
                <h3>Employees by Department</h3>
                <div className="bar-chart">
                  {Object.entries(stats.departments).map(([dept, count]) => (
                    <div key={dept} className="bar-container">
                      <div className="bar-label">{dept}</div>
                      <div className="bar-track">
                        <div 
                          className="bar-fill" 
                          style={{ 
                            width: `${(count / stats.totalEmployees) * 100}%`,
                            backgroundColor: getDepartmentColor(dept)
                          }}
                        >
                          <span>{count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-card">
                <h3>Status Distribution</h3>
                <div className="pie-chart-container">
                  <div className="pie-chart">
                    <div 
                      className="pie-segment active" 
                      style={{ 
                        '--percentage': `${(stats.activeEmployees / stats.totalEmployees) * 360}deg`,
                        '--color': '#4CAF50'
                      }}
                    ></div>
                    <div 
                      className="pie-segment inactive" 
                      style={{ 
                        '--percentage': `${((stats.totalEmployees - stats.activeEmployees) / stats.totalEmployees) * 360}deg`,
                        '--color': '#F44336'
                      }}
                    ></div>
                    <div className="pie-center">
                      <div className="pie-label">
                        <span>{Math.round((stats.activeEmployees / stats.totalEmployees) * 100)}%</span>
                        <small>Active</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="activity-card">
              <h3>Recent Hiring Activity</h3>
              <div className="activity-list">
                {employees
                  .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
                  .slice(0, 5)
                  .map(employee => (
                    <div key={employee.id} className="activity-item">
                      <div className="activity-icon">
                        <i className="fas fa-user-plus"></i>
                      </div>
                      <div className="activity-details">
                        <p>
                          <strong>{employee.name}</strong> joined as <strong>{employee.position}</strong>
                        </p>
                        <small>{formatDate(employee.joinDate)} • {employee.department}</small>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="events-card">
              <h3>Upcoming Events</h3>
              <div className="events-list">
                {[1, 2, 3].map((event, index) => (
                  <div key={index} className="event-item">
                    <div className="event-date">
                      <span className="day">{15 + index}</span>
                      <span className="month">JUN</span>
                    </div>
                    <div className="event-details">
                      <p>Team Training Session {event}</p>
                      <small>10:00 AM - 12:00 PM</small>
                    </div>
                    <button className="event-action">
                      <i className="fas fa-calendar-plus"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Employees List View */}
        {currentView === 'employees' && (
          <div className="employee-directory">
            <div className="employee-table-container">
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Employee</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map(employee => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>
                          <div className="employee-info">
                            <div className="employee-avatar">
                              <img 
                                src="https://placehold.co/40x40" 
                                alt={`Profile picture of ${employee.name}`} 
                              />
                            </div>
                            <div className="employee-details">
                              <strong>{employee.name}</strong>
                              <small>{employee.email}</small>
                            </div>
                          </div>
                        </td>
                        <td>{employee.position}</td>
                        <td>
                          <span className="dept-badge" style={{ backgroundColor: getDepartmentColor(employee.department) }}>
                            {employee.department}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${employee.status === 'Active' ? 'active' : 'inactive'}`}>
                            {employee.status}
                          </span>
                        </td>
                        <td>${formatSalary(employee.salary)}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-btn edit" 
                              onClick={() => editEmployee(employee)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="action-btn delete" 
                              onClick={() => deleteEmployee(employee.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                            <button className="action-btn view">
                              <i className="fas fa-eye"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-results">
                        No employees found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Employee View */}
        {(currentView === 'add') && (
          <div className="employee-form-container">
            <div className="form-header">
              <h3>{editMode ? 'Edit Employee' : 'Add New Employee'}</h3>
              <button 
                className="back-button"
                onClick={() => {
                  setCurrentView('employees');
                  if (editMode) cancelEdit();
                }}
              >
                <i className="fas fa-arrow-left"></i> Back to Employees
              </button>
            </div>
            
            <form onSubmit={editMode ? updateEmployee : addEmployee}>
              <div className="form-grid">
                <div className="form-section">
                  <h4>Basic Information</h4>
                  
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={editMode ? currentEmployee.name : newEmployee.name}
                      onChange={editMode ? handleEditInputChange : handleInputChange}
                      required
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="position">Position *</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={editMode ? currentEmployee.position : newEmployee.position}
                      onChange={editMode ? handleEditInputChange : handleInputChange}
                      required
                      placeholder="Enter job position"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="department">Department *</label>
                      <select
                        id="department"
                        name="department"
                        value={editMode ? currentEmployee.department : newEmployee.department}
                        onChange={editMode ? handleEditInputChange : handleInputChange}
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Design">Design</option>
                        <option value="Product">Product</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="status">Status *</label>
                      <select
                        id="status"
                        name="status"
                        value={editMode ? currentEmployee.status : newEmployee.status}
                        onChange={editMode ? handleEditInputChange : handleInputChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <h4>Contact Information</h4>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editMode ? currentEmployee.email : newEmployee.email}
                      onChange={editMode ? handleEditInputChange : handleInputChange}
                      required
                      placeholder="employee@company.com"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={editMode ? currentEmployee.phone : newEmployee.phone}
                      onChange={editMode ? handleEditInputChange : handleInputChange}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      value={editMode ? currentEmployee.address : newEmployee.address}
                      onChange={editMode ? handleEditInputChange : handleInputChange}
                      placeholder="123 Main St, City, State, ZIP"
                    />
                  </div>
                </div>
                
                <div className="form-section">
                  <h4>Employment Details</h4>
                  
                  <div className="form-group">
                    <label htmlFor="salary">Annual Salary *</label>
                    <div className="input-with-symbol">
                      <span className="input-symbol">$</span>
                      <input
                        type="number"
                        id="salary"
                        name="salary"
                        value={editMode ? currentEmployee.salary : newEmployee.salary}
                        onChange={editMode ? handleEditInputChange : handleInputChange}
                        required
                        placeholder="Enter annual salary"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="joinDate">Join Date</label>
                    <input
                      type="date"
                      id="joinDate"
                      name="joinDate"
                      value={editMode ? currentEmployee.joinDate : (
                        newEmployee.joinDate || new Date().toISOString().split('T')[0]
                      )}
                      onChange={editMode ? handleEditInputChange : handleInputChange}
                    />
                  </div>
                  
                  {editMode && (
                    <div className="form-group">
                      <label>Employee ID</label>
                      <div className="readonly-field">{currentEmployee.id}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-actions">
                {editMode && (
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                )}
                <button 
                  type="submit" 
                  className="submit-btn"
                >
                  {editMode ? 'Update Employee' : 'Add Employee'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Notification */}
      {showNotification && (
        <div className="notification">
          {notificationMessage}
          <button 
            className="close-notification" 
            onClick={() => setShowNotification(false)}
          >
            &times;
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="hrms-footer">
        <div className="footer-content">
          <p>© 2023 HR Pro System. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatSalary = (salary) => {
  return parseFloat(salary).toLocaleString('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const getDepartmentColor = (department) => {
  const colors = {
    'Engineering': '#2196F3',
    'Human Resources': '#4CAF50',
    'Marketing': '#FF9800',
    'Design': '#9C27B0',
    'Product': '#673AB7',
    'Sales': '#E91E63',
    'Finance': '#009688',
    'Operations': '#607D8B'
  };
  return colors[department] || '#9E9E9E';
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

  html, body, #root {
    height: 100%;
  }

  .hrms-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f5f7fa;
    color: #333;
  }

  /* Header Styles */
  .hrms-header {
    background-color: #2c3e50;
    color: white;
    padding: 0.8rem 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .logo-icon img {
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .logo h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .logo span {
    color: #3498db;
  }

  .main-nav {
    display: flex;
    gap: 1rem;
  }

  .main-nav button {
    background: transparent;
    border: none;
    color: #ecf0f1;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }

  .main-nav button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .main-nav button.active {
    background-color: #3498db;
    color: white;
  }

  .main-nav i {
    font-size: 0.9rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .user-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #3498db;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .user-details {
    display: flex;
    flex-direction: column;
  }

  .username {
    font-weight: 600;
    font-size: 0.95rem;
  }

  .role {
    font-size: 0.8rem;
    color: #bdc3c7;
  }

  /* Main Content Styles */
  .hrms-main {
    flex: 1;
    padding: 1.5rem 2rem;
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .page-header h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    font-weight: 600;
  }

  .search-filter {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .search-box {
    position: relative;
  }

  .search-box i {
    position: absolute;
    left: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
    color: #7f8c8d;
  }

  .search-box input {
    padding: 0.6rem 1rem 0.6rem 2.2rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.95rem;
    min-width: 250px;
    transition: all 0.3s ease;
  }

  .search-box input:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }

  .search-filter select {
    padding: 0.6rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.95rem;
    background-color: white;
    cursor: pointer;
  }

  /* Dashboard Styles */
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: transform 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-5px);
  }

  .stat-card.primary {
    border-left: 4px solid #3498db;
  }

  .stat-card.success {
    border-left: 4px solid #2ecc71;
  }

  .stat-card.warning {
    border-left: 4px solid #f39c12;
  }

  .stat-card.danger {
    border-left: 4px solid #e74c3c;
  }

  .stat-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .stat-card.primary .stat-icon {
    background-color: rgba(52, 152, 219, 0.2);
    color: #3498db;
  }

  .stat-card.success .stat-icon {
    background-color: rgba(46, 204, 113, 0.2);
    color: #2ecc71;
  }

  .stat-card.warning .stat-icon {
    background-color: rgba(243, 156, 18, 0.2);
    color: #f39c12;
  }

  .stat-card.danger .stat-icon {
    background-color: rgba(231, 76, 60, 0.2);
    color: #e74c3c;
  }

  .stat-info h3 {
    font-size: 0.95rem;
    color: #7f8c8d;
    font-weight: 500;
    margin-bottom: 0.3rem;
  }

  .stat-info p {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2c3e50;
  }

  .charts-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 992px) {
    .charts-row {
      grid-template-columns: 1fr;
    }
  }

  .chart-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .chart-card h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    font-weight: 600;
  }

  .bar-chart {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .bar-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .bar-label {
    width: 120px;
    font-size: 0.9rem;
  }

  .bar-track {
    flex: 1;
    height: 30px;
    background-color: #ecf0f1;
    border-radius: 15px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    border-radius: 15px;
    position: relative;
    transition: width 0.8s ease;
    animation: fillAnimation 1s ease-out;
  }

  @keyframes fillAnimation {
    from { width: 0; }
  }

  .bar-fill span {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .pie-chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }

  .pie-chart {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    position: relative;
    background-color: #f5f7fa;
  }

  .pie-segment {
    position: absolute;
    width: 100%;
    height: 100%;
    clip: rect(0, 90px, 180px, 0);
    border-radius: 50%;
    transform: rotate(var(--percentage));
  }

  .pie-segment::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    clip: rect(0, 90px, 180px, 0);
    transform: rotate(calc(var(--percentage) / 2));
    background-color: var(--color);
  }

  .pie-center {
    position: absolute;
    width: 140px;
    height: 140px;
    background-color: white;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1) inset;
  }

  .pie-label {
    text-align: center;
  }

  .pie-label span {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2c3e50;
  }

  .pie-label small {
    display: block;
    font-size: 0.9rem;
    color: #7f8c8d;
  }

  .activity-card, .events-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .activity-card h3, .events-card h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    font-weight: 600;
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .activity-item {
    display: flex;
    gap: 1rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid #eee;
  }

  .activity-item:last-child {
    border-bottom: none;
  }

  .activity-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(52, 152, 219, 0.2);
    color: #3498db;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
  }

  .activity-details {
    flex: 1;
  }

  .activity-details p {
    font-size: 0.95rem;
    color: #2c3e50;
  }

  .activity-details small {
    font-size: 0.8rem;
    color: #7f8c8d;
  }

  .events-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .event-item {
    display: flex;
    gap: 1rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid #eee;
  }

  .event-item:last-child {
    border-bottom: none;
  }

  .event-date {
    width: 50px;
    height: 50px;
    background-color: #3498db;
    border-radius: 4px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .event-date .day {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .event-date .month {
    font-size: 0.7rem;
    text-transform: uppercase;
  }

  .event-details {
    flex: 1;
  }

  .event-details p {
    font-size: 0.95rem;
    color: #2c3e50;
  }

  .event-details small {
    font-size: 0.8rem;
    color: #7f8c8d;
  }

  .event-action {
    background: transparent;
    border: none;
    color: #3498db;
    cursor: pointer;
    font-size: 1rem;
  }

  /* Employee Directory Styles */
  .employee-directory {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .employee-table-container {
    overflow-x: auto;
  }

  .employee-table {
    width: 100%;
    border-collapse: collapse;
  }

  .employee-table th {
    background-color: #f8f9fa;
    color: #2c3e50;
    font-weight: 600;
    text-align: left;
    padding: 1rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .employee-table td {
    padding: 1rem;
    border-top: 1px solid #eee;
    font-size: 0.95rem;
    vertical-align: middle;
  }

  .employee-table tbody tr:hover {
    background-color: #f8f9fa;
  }

  .employee-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .employee-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .employee-details {
    display: flex;
    flex-direction: column;
  }

  .employee-details strong {
    font-weight: 600;
  }

  .employee-details small {
    font-size: 0.8rem;
    color: #7f8c8d;
  }

  .dept-badge {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 500;
    color: white;
  }

  .status-badge {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .status-badge.active {
    background-color: #d4edda;
    color: #155724;
  }

  .status-badge.inactive {
    background-color: #f8d7da;
    color: #721c24;
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .action-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    background: transparent;
    transition: all 0.3s ease;
  }

  .action-btn.edit {
    color: #3498db;
    border: 1px solid #3498db;
  }

  .action-btn.edit:hover {
    background-color: rgba(52, 152, 219, 0.1);
  }

  .action-btn.delete {
    color: #e74c3c;
    border: 1px solid #e74c3c;
  }

  .action-btn.delete:hover {
    background-color: rgba(231, 76, 60, 0.1);
  }

  .action-btn.view {
    color: #2ecc71;
    border: 1px solid #2ecc71;
  }

  .action-btn.view:hover {
    background-color: rgba(46, 204, 113, 0.1);
  }

  .no-results {
    text-align: center;
    padding: 2rem;
    color: #7f8c8d;
  }

  /* Employee Form Styles */
  .employee-form-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 1.5rem;
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .form-header h3 {
    font-size: 1.5rem;
    color: #2c3e50;
    font-weight: 600;
  }

  .back-button {
    background: transparent;
    border: 1px solid #ddd;
    color: #3498db;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }

  .back-button:hover {
    background-color: rgba(52, 152, 219, 0.1);
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
  }

  .form-section {
    margin-bottom: 1.5rem;
  }

  .form-section h4 {
    font-size: 1.1rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }

  .form-group {
    margin-bottom: 1.2rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #2c3e50;
    font-size: 0.95rem;
  }

  .form-group label[required]::after {
    content: ' *';
    color: #e74c3c;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.7rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }

  .form-group textarea {
    min-height: 80px;
    resize: vertical;
  }

  .input-with-symbol {
    position: relative;
  }

  .input-symbol {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #7f8c8d;
    font-weight: 500;
  }

  .input-with-symbol input {
    padding-left: 2.5rem !important;
  }

  .readonly-field {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.7rem 1rem;
    font-size: 0.95rem;
    color: #333;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
  }

  .cancel-btn {
    background: transparent;
    border: 1px solid #ddd;
    color: #7f8c8d;
    padding: 0.7rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }

  .cancel-btn:hover {
    background-color: #f8f9fa;
  }

  .submit-btn {
    background-color: #3498db;
    border: none;
    color: white;
    padding: 0.7rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .submit-btn:hover {
    background-color: #2980b9;
  }

  /* Notification Styles */
  .notification {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: #2ecc71;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .close-notification {
    background: transparent;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
  }

  /* Footer Styles */
  .hrms-footer {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 1rem 2rem;
    margin-top: 2rem;
  }

  .footer-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-content p {
    font-size: 0.9rem;
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;
  }

  .footer-links a {
    color: #bdc3c7;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
  }

  .footer-links a:hover {
    color: white;
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    .main-nav {
      width: 100%;
      overflow-x: auto;
      padding-bottom: 0.5rem;
    }

    .hrms-main {
      padding: 1rem;
    }

    .form-row {
      grid-template-columns: 1fr;
    }
  }
`;

// Render the application
const App = () => (
  <>
    <style>{styles}</style>
    <link 
      rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" 
    />
    <HRMSApp />
  </>
);

export default App;
