import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { grey } from "@mui/material/colors";

export default function BasicTable({
  columns,
  rows,
  assignButton,
  canView,
  canRemove,
  handleRemove = () => {},
  handleView = () => {},
  handleAssign = () => {},
}) {
  let headCells = [
    ...columns,
    { id: "assign", title: "Assign" },
    { id: "view", title: "View" },
    { id: "remove", title: "Remove" },
  ];

  headCells = !assignButton
    ? headCells.filter((item) => item.id !== "assign")
    : headCells;

  headCells = !canView
    ? headCells.filter((item) => item.id !== "view")
    : headCells;

  headCells = !canRemove
    ? headCells.filter((item) => item.id !== "remove")
    : headCells;

  let rowFilter = (key) => key !== "approveStatus" && key != "id";

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: grey[300] }}>
            {headCells?.map((head) => (
              <TableCell>{head.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <TableRow
              hover
              key={row.id}
              sx={{
                height: 50,
                "& td": { height: 50, padding: "8px 16px" }, // ensure the cells respect the height
                "& th": { height: 50, padding: "8px 16px" },
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell key={index} component="th" scope="row">
                {index + 1}
              </TableCell>
              {Object.keys(row)
                .filter(rowFilter)
                .map((val, index) => {
                  if (val === "status") {
                    return (
                      <TableCell key={index} component="th" scope="row">
                        <div>
                          {row[val] === true ? (
                            <div className="text-green-500">Active</div>
                          ) : (
                            <div className="text-red-500">Not Active</div>
                          )}
                        </div>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={index} component="th" scope="row">
                        {row[val]}
                      </TableCell>
                    );
                  }
                })}
              {assignButton && (
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleAssign(row)}
                  >
                    Assign
                  </Button>
                </TableCell>
              )}

              {canView && (
                <TableCell>
                  <Button
                    onClick={() => handleView(row.id)}
                    size="small"
                    color="success"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Button>
                </TableCell>
              )}

              {canRemove && (
                <TableCell>
                  <Button
                    onClick={() => handleRemove(row.id)}
                    size="small"
                    color="error"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
