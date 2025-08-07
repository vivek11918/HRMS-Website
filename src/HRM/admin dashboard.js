import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  // State for admin dashboard
  const [users, setUsers] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    departments: 5,
    recentActivity: []
  });
  const [settings, setSettings] = useState({
    companyName: 'HR Pro System',
    theme: 'light',
    allowRegistration: true,
    maintenanceMode: false
  });
  const [showUserModal, setShowUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'HR Manager',
    department: 'Human Resources',
    status: 'Active'
  });

  // Initialize with sample data
  useEffect(() => {
    const sampleUsers = [
      {
        id: 'ADM001',
        name: 'Admin User',
        email: 'admin@hrpro.com',
        role: 'System Admin',
        department: 'Administration',
        lastLogin: '2023-06-15T09:30:00',
        status: 'Active'
      },
      {
        id: 'HRM001',
        name: 'Jane Smith',
        email: 'jane.smith@hrpro.com',
        role: 'HR Manager',
        department: 'Human Resources',
        lastLogin: '2023-06-14T14:15:00',
        status: 'Active'
      },
      {
        id: 'HRM002',
        name: 'Robert Johnson',
        email: 'robert.j@hrpro.com',
        role: 'HR Manager',
        department: 'Human Resources',
        lastLogin: '2023-06-13T11:20:00',
        status: 'Inactive'
      },
      {
        id: 'MGR001',
        name: 'Emily Davis',
        email: 'emily.d@hrpro.com',
        role: 'Department Manager',
        department: 'Engineering',
        lastLogin: '2023-06-15T08:45:00',
        status: 'Active'
      },
      {
        id: 'MGR002',
        name: 'Michael Brown',
        email: 'michael.b@hrpro.com',
        role: 'Department Manager',
        department: 'Marketing',
        lastLogin: '2023-06-12T16:30:00',
        status: 'Active'
      }
    ];

    const sampleActivity = [
      { id: 1, action: 'System Update', user: 'Admin User', time: '2023-06-15T10:00:00', details: 'Updated to v2.3.1' },
      { id: 2, action: 'User Created', user: 'Admin User', time: '2023-06-14T15:30:00', details: 'Created user: Robert Johnson' },
      { id: 3, action: 'Settings Changed', user: 'Jane Smith', time: '2023-06-14T09:15:00', details: 'Changed company name' },
      { id: 4, action: 'User Deactivated', user: 'Admin User', time: '2023-06-13T17:45:00', details: 'Deactivated user: Old Employee' },
      { id: 5, action: 'Backup Completed', user: 'System', time: '2023-06-13T03:00:00', details: 'Nightly backup successful' }
    ];

    setUsers(sampleUsers);
    setSystemStats({
      totalUsers: sampleUsers.length,
      activeUsers: sampleUsers.filter(u => u.status === 'Active').length,
      departments: 5,
      recentActivity: sampleActivity
    });
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  // Handle settings changes
  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Save settings
  const saveSettings = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  // Add new user
  const addUser = (e) => {
    e.preventDefault();
    const userWithId = {
      ...newUser,
      id: `USR${100 + users.length + 1}`,
      lastLogin: new Date().toISOString()
    };
    setUsers([...users, userWithId]);
    setSystemStats({
      ...systemStats,
      totalUsers: systemStats.totalUsers + 1,
      activeUsers: newUser.status === 'Active' ? systemStats.activeUsers + 1 : systemStats.activeUsers
    });
    setNewUser({
      name: '',
      email: '',
      role: 'HR Manager',
      department: 'Human Resources',
      status: 'Active'
    });
    setShowUserModal(false);
  };

  // Toggle user status
  const toggleUserStatus = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
        return { ...user, status: newStatus };
      }
      return user;
    }));

    setSystemStats({
      ...systemStats,
      activeUsers: users.reduce((count, user) => {
        if (user.id === id) {
          return user.status === 'Active' ? count - 1 : count + 1;
        }
        return user.status === 'Active' ? count + 1 : count;
      }, 0)
    });
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <h2><i className="fas fa-cog"></i> Admin Dashboard</h2>
        <div className="admin-actions">
          <button className="btn btn-primary" onClick={() => setShowUserModal(true)}>
            <i className="fas fa-user-plus"></i> Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon bg-primary">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p>{systemStats.totalUsers}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-success">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="stat-info">
            <h3>Active Users</h3>
            <p>{systemStats.activeUsers}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-info">
            <i className="fas fa-building"></i>
          </div>
          <div className="stat-info">
            <h3>Departments</h3>
            <p>{systemStats.departments}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-warning">
            <i className="fas fa-history"></i>
          </div>
          <div className="stat-info">
            <h3>Recent Activities</h3>
            <p>{systemStats.recentActivity.length}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="content-section">
          <div className="section-header">
            <h3><i className="fas fa-user-shield"></i> User Management</h3>
            <div className="section-actions">
              <input
                type="text"
                placeholder="Search users..."
                className="search-input"
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Last Login</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          <img 
                            src="https://placehold.co/40x40" 
                            alt={`Profile of ${user.name}`} 
                          />
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role.toLowerCase().replace(' ', '-')}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.department}</td>
                    <td>{formatDate(user.lastLogin)}</td>
                    <td>
                      <span className={`status-badge ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className={`status-toggle ${user.status === 'Active' ? 'deactivate' : 'activate'}`}
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button className="edit-btn">
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="content-grid">
          <div className="content-section">
            <div className="section-header">
              <h3><i className="fas fa-list"></i> Recent Activity</h3>
            </div>
            <div className="activity-list">
              {systemStats.recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    <i className={`fas fa-${getActivityIcon(activity.action)}`}></i>
                  </div>
                  <div className="activity-details">
                    <div className="activity-header">
                      <strong>{activity.action}</strong>
                      <span>{formatDate(activity.time)}</span>
                    </div>
                    <p>By: {activity.user}</p>
                    <small>{activity.details}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="content-section">
            <div className="section-header">
              <h3><i className="fas fa-cogs"></i> System Settings</h3>
            </div>
            <form onSubmit={saveSettings}>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleSettingsChange}
                />
              </div>
              <div className="form-group">
                <label>Theme</label>
                <select
                  name="theme"
                  value={settings.theme}
                  onChange={handleSettingsChange}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="blue">Blue</option>
                </select>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="allowRegistration"
                  name="allowRegistration"
                  checked={settings.allowRegistration}
                  onChange={handleSettingsChange}
                />
                <label htmlFor="allowRegistration">Allow New User Registration</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleSettingsChange}
                />
                <label htmlFor="maintenanceMode">Maintenance Mode</label>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showUserModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New User</h3>
              <button 
                className="close-modal"
                onClick={() => setShowUserModal(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={addUser}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Role</label>
                  <select
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                  >
                    <option value="System Admin">System Admin</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Department Manager">Department Manager</option>
                    <option value="HR Staff">HR Staff</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select
                    name="department"
                    value={newUser.department}
                    onChange={handleInputChange}
                  >
                    <option value="Human Resources">Human Resources</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={newUser.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-actions">
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowUserModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
const getActivityIcon = (action) => {
  const icons = {
    'System Update': 'sync',
    'User Created': 'user-plus',
    'Settings Changed': 'sliders-h',
    'User Deactivated': 'user-minus',
    'Backup Completed': 'save'
  };
  return icons[action] || 'info-circle';
};

// CSS styling
const adminStyles = `
  /* Admin Dashboard Styles */
  .admin-dashboard {
    padding: 1.5rem;
    background-color: #f8f9fa;
    min-height: 100vh;
  }

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #dee2e6;
  }

  .admin-header h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .admin-header h2 i {
    color: #3498db;
  }

  .admin-actions {
    display: flex;
    gap: 1rem;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
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

  .stat-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
  }

  .bg-primary { background-color: #3498db; }
  .bg-success { background-color: #2ecc71; }
  .bg-info { background-color: #17a2b8; }
  .bg-warning { background-color: #f39c12; }

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

  .admin-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .content-section {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }

  .section-header h3 {
    font-size: 1.2rem;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .section-actions {
    display: flex;
    gap: 1rem;
  }

  .search-input {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.95rem;
  }

  .table-responsive {
    overflow-x: auto;
  }

  .user-table {
    width: 100%;
    border-collapse: collapse;
  }

  .user-table th {
    background-color: #f8f9fa;
    color: #2c3e50;
    font-weight: 600;
    text-align: left;
    padding: 1rem;
    font-size: 0.9rem;
  }

  .user-table td {
    padding: 1rem;
    border-top: 1px solid #eee;
    font-size: 0.95rem;
    vertical-align: middle;
  }

  .user-table tbody tr:hover {
    background-color: #f8f9fa;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .role-badge {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .role-badge.system-admin {
    background-color: #d1ecf1;
    color: #0c5460;
  }

  .role-badge.hr-manager {
    background-color: #d4edda;
    color: #155724;
  }

  .role-badge.department-manager {
    background-color: #fff3cd;
    color: #856404;
  }

  .role-badge.hr-staff {
    background-color: #e2e3e5;
    color: #383d41;
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

  .status-toggle {
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
  }

  .status-toggle.activate {
    background-color: #d4edda;
    color: #155724;
  }

  .status-toggle.deactivate {
    background-color: #f8d7da;
    color: #721c24;
  }

  .edit-btn {
    background: transparent;
    border: 1px solid #ddd;
    color: #3498db;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 992px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .activity-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: 4px;
    background-color: #f8f9fa;
  }

  .activity-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e9ecef;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: #6c757d;
    flex-shrink: 0;
  }

  .activity-details {
    flex: 1;
  }

  .activity-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
  }

  .activity-header strong {
    font-weight: 600;
  }

  .activity-header span {
    font-size: 0.8rem;
    color: #6c757d;
  }

  .activity-details p {
    font-size: 0.9rem;
    color: #495057;
    margin-bottom: 0.3rem;
  }

  .activity-details small {
    font-size: 0.8rem;
    color: #6c757d;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #495057;
  }

  .form-group input,
  .form-group select {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 0.95rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-check {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .form-check input {
    width: auto;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background-color: #3498db;
    color: white;
  }

  .btn-primary:hover {
    background-color: #2980b9;
  }

  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }

  .btn-secondary:hover {
    background-color: #5a6268;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: white;
    border-radius: 8px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
  }

  .modal-header h3 {
    font-size: 1.3rem;
    color: #2c3e50;
    margin: 0;
  }

  .close-modal {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6c757d;
  }

  .modal-content form {
    padding: 1.5rem;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
  }
`;

const AdminDashboardWithStyles = () => (
  <>
    <style>{adminStyles}</style>
    <link 
      rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" 
    />
    <AdminDashboard />
  </>
);

export default AdminDashboardWithStyles;
