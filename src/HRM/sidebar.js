import React, { useEffect, useRef, useState  } from "react";

function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
      <h4 className="fw-bold mb-4">Menu</h4>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item mb-2">
          <a className="nav-link active bg-warning text-dark" href="#">Dashboard</a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#">Employees</a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#">Attendance</a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#">Payroll</a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#">Departments</a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#">Leave Management</a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#">Reports</a>
        </li>
        <li className="nav-item mt-4">
          <a className="nav-link text-danger" href="#">Logout</a>
        </li>
      </ul>
    </div>
  );
}

function AutoScrollImages() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollSpeed = 1;

    const interval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollTop += scrollSpeed;
        if (
          scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight
        ) {
          scrollContainer.scrollTop = 0;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="overflow-auto bg-light"
      style={{ height: "100vh", flexGrow: 1 }}
    >
      {/* Image List (repeat as needed) */}
      
      <img src="https://www.salesgush.com/wp-content/uploads/2023/10/human-resources-concept-with-hand.jpg" className="img-fluid mb-2" alt="2" />
      <img src="https://www.zinghr.com/wp-content/uploads/2022/01/How-A-Digital-HRMS-Can-Help-With-Employee-Management-Issues.jpg" className="img-fluid mb-2" alt="2"   style={{ width: "100%"}}/>
       
    </div>
  );
}

function SidebarWithImageScroll() {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar />
      <AutoScrollImages />
    </div>
  );
}

export default SidebarWithImageScroll;
