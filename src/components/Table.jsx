import TableRow from "./TableRow";
import { useSelector, useDispatch } from "react-redux";
import {
  handleAllocationPercentage,
  handleAllocationValue,
} from "../slices/tableSlice";

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>Label</th>
        <th>Value</th>
        <th>Input</th>
        <th>Allocation %</th>
        <th>Allocation Val</th>
        <th>Variance %</th>
      </tr>
    </thead>
  );
};

const TableFoot = ({ total }) => {
  return (
    <tfoot>
      <tr>
        <td>Total</td>
        <td>{total}</td>
      </tr>
    </tfoot>
  );
};

const Table = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.table.data);
  const total = data?.rows?.reduce((acc, row) => acc + row.value, 0);

  return (
    <table>
      <TableHead />
      <tbody>
        {data?.rows?.map((parentRow, index) => (
          <>
            <TableRow
              key={`parent${index}`}
              {...parentRow}
              onAllocPercentClick={getAllocPercentClick(parentRow.id)}
              onAllocValClick={getAllocValClick(parentRow.id)}
            />
            {parentRow.children &&
              parentRow.children.map((childRow, childIndex) => (
                <TableRow
                  isChild
                  key={`child${index}-${childIndex}`}
                  {...childRow}
                  onAllocPercentClick={getAllocPercentClick(
                    childRow.id,
                    parentRow.id
                  )}
                  onAllocValClick={getAllocValClick(childRow.id, parentRow.id)}
                />
              ))}
          </>
        ))}
      </tbody>
      <TableFoot total={total} />
    </table>
  );

  function getAllocPercentClick(id, parentId) {
    return (input) => {
      dispatch(handleAllocationPercentage({ id, parentId, input }));
    };
  }

  function getAllocValClick(id, parentId) {
    return (input) => {
      dispatch(handleAllocationValue({ id, parentId, input }));
    };
  }
};

export default Table;
