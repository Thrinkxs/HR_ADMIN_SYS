import React, { useState } from "react";
import useEmployeeData from "../../hooks/useEmployeeData";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../Axios";

const EmployeeList = () => {
  const { employeeData } = useEmployeeData();
  const Employees = employeeData;
  const getRowId = (employee) => employee._id;
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    navigate(`/employees/${employee._id}/edit`);
  };

  const handleDeactivate = (employeeId) => {
    const updatedData = { status: "inactive" };

    Axios.patch(`/api/employees/${employeeId}`, updatedData, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.success) {
          console.log("Employee deactivated");
        } else {
          console.log("Failed to update employee");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const buttonStyle = {
    fontSize: "7px",
    padding: "6px 12px",
  };

  const columns: GridColDef[] = [
    {
      field: "Actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <div className="flex gap-2">
            <Button
              size={"small"}
              variant="contained"
              color="primary"
              startIcon={<EditIcon className="w-1" />}
              onClick={() => handleEditClick(params.row)}
              style={buttonStyle}
            >
              Edit
            </Button>
            <Button
              size={"small"}
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleDeactivate(params.row)}
              style={buttonStyle}
            >
              Deactivate
            </Button>
          </div>
        </>
      ),
    },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    {
      field: "phone",
      headerName: "Telephone Number",
      width: 120,
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 250,
      sortable: false,
    },
    {
      field: "manager",
      headerName: "Manager ",
      width: 90,
    },
    {
      field: "status",
      headerName: "Status ",
      width: 90,
    },
  ];

  return (
    <>
      <h1 className="text-3xl py-6 mx-10"> Employees</h1>
      <div style={{ height: 400, width: 1000 }}>
        <DataGrid
          rows={Employees}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          getRowId={getRowId}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </>
  );
};

export default EmployeeList;
