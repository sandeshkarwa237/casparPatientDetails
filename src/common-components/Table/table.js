import { Fragment } from "react";
import { useSortableData } from "../../utils/customTableHook";
import DeleteIcon from "../../assets/icons/delete.svg";
import "./table.css";

const CustomTable = ({
  tableData,
  onRowClick,
  isRowDeletable,
  tableContentKeys,
  deleteRow,
  noResultsText,
}) => {
  const { items, requestSort, sortConfig } = useSortableData(tableData);

  const getClassNamesFor = (key) => {
    if (!!sortConfig) {
      return sortConfig.key === key ? sortConfig.direction : undefined;
    }
  };

  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            {tableContentKeys.map((tableContentKey) => {
              return (
                <th key={tableContentKey.label}>
                  <button
                    type="button"
                    onClick={() => requestSort(tableContentKey.key)}
                    className={getClassNamesFor(tableContentKey.key)}
                  >
                    {tableContentKey.label}
                  </button>
                </th>
              );
            })}

            {isRowDeletable && <th></th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.patient_id}
              onClick={() => onRowClick(item.patient_id)}
            >
              <td>{item.patient_id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              {isRowDeletable && (
                <td>
                  <img
                    src={DeleteIcon}
                    alt="deleteIcon"
                    className="deleteButton"
                    onClick={(event) => deleteRow(event, item.patient_id)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && <div className="noResults">{noResultsText}</div>}
    </Fragment>
  );
};

export default CustomTable;
