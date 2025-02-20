import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    data: null,
  },
  reducers: {
    handleAllocationPercentage: (state, action) => {
      const { id, parentId, input } = action.payload;
      let parentRow, currentRow;

      //identify the parent row and the current row
      if (parentId) {
        parentRow = state.data.rows.find((row) => row.id === parentId);
        currentRow = parentRow.children.find((row) => row.id === id);
      } else {
        currentRow = state.data.rows.find((row) => row.id === id);
      }
      //update the value of the current row and its children if there are any
      if (!parentId) {
        currentRow.value += (currentRow.value * input) / 100;
        sanitize(currentRow);
        currentRow.variance =
          ((currentRow.value - currentRow.originalValue) /
            currentRow.originalValue) *
          100;

        //update the value of the children
        if (currentRow.children?.length > 0) {
          currentRow.children.forEach((child) => {
            child.value += (child.value * input) / 100;
            child.variance =
              ((child.value - child.originalValue) / child.originalValue) * 100;
          });
        }
      } else {
        //update the value of the current row and its parent row
        currentRow.value = currentRow.value + (currentRow.value * input) / 100;
        sanitize(currentRow);
        currentRow.variance =
          ((currentRow.value - currentRow.originalValue) /
            currentRow.originalValue) *
          100;

        updateParentValueAndVariance(parentRow);
      }
    },
    handleAllocationValue: (state, action) => {
      const { id, parentId, input } = action.payload;
      let parentRow, currentRow;

      //identify the parent row and the current row
      if (parentId) {
        parentRow = state.data.rows.find((row) => row.id === parentId);
        currentRow = parentRow.children.find((row) => row.id === id);
      } else {
        currentRow = state.data.rows.find((row) => row.id === id);
      }

      //update the value of the current row and its children if there are any
      if (!parentId) {
        const currentValue = currentRow.value;
        currentRow.value = currentRow.value + input;
        sanitize(currentRow);
        currentRow.variance =
          ((currentRow.value - currentRow.originalValue) /
            currentRow.originalValue) *
          100;
        //update the value of the children
        if (currentRow.children?.length > 0) {
          currentRow.children.forEach((child) => {
            child.value += (child.value / currentValue) * input;
            child.variance =
              ((child.value - child.originalValue) / child.originalValue) * 100;
          });
        }
      } else {
        //update the value of the current row
        currentRow.value = currentRow.value + input;
        sanitize(currentRow);
        currentRow.variance =
          ((currentRow.value - currentRow.originalValue) /
            currentRow.originalValue) *
          100;

        //update the value of the parent row
        updateParentValueAndVariance(parentRow);
      }
    },
    initializeTable: (state, action) => {
      const data = JSON.parse(JSON.stringify(action.payload));
      data.rows.forEach((row) => {
        if (row.children) {
          row.children.forEach((child) => {
            child.originalValue = child.value;
            child.variance = 0;
          });
        }
        row.originalValue = row.children?.length > 0
          ? row.children.reduce((acc, child) => acc + child.value, 0)
          : row.value || 0;
        row.value = row.originalValue;
        row.variance = 0;
      });

      state.data = data;
    },
  },
});

function sanitize(row) {
  row.value = row.value < 0 ? 0 : row.value;
}

function updateParentValueAndVariance(parentRow) {
  parentRow.value = parentRow.children.reduce(
    (acc, child) => acc + child.value,
    0
  );
  parentRow.variance =
    ((parentRow.value - parentRow.originalValue) / parentRow.originalValue) *
    100;
}

export const {
  handleAllocationPercentage,
  handleAllocationValue,
  initializeTable,
} = tableSlice.actions;
export default tableSlice.reducer;
