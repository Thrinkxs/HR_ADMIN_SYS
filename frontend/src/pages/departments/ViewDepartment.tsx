import React, { useState } from "react";
import useDepartmentData from "../../hooks/useDepartmentData";
import { Button } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
const ViewDepartment = () => {
  const { departmentData } = useDepartmentData();
  const Departments = departmentData;
  const getRowId = (department) => department._id;
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const navigate = useNavigate();
  const handleEditClick = (department) => {
    setSelectedDepartment(department);
    navigate(`/departments/${department._id}/edit`);
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
              onClick={() => handleEditClick(params.row)}
              style={buttonStyle}
            >
              Deactivate
            </Button>
          </div>
        </>
      ),
    },
    { field: "name", headerName: " Name", width: 130 },
    { field: "manager", headerName: "Manager ", width: 130 },

    {
      field: "status",
      headerName: "Status ",
      width: 90,
    },
  ];

  return (
    <>
      <h1 className="text-3xl py-6 mx-10"> Departments</h1>
      <div style={{ height: 400, width: 1000 }}>
        <DataGrid
          rows={Departments}
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

export default ViewDepartment;
