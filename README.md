Created as part of Lumel coding assignment.

Hosted at: https://lumel-table.netlify.app/

## **Problem statement**

### **Simple Hierarchical Table Website**

**Objective:**
Create a simple website using ReactJS. The website will contain a table with hierarchical rows. Each row will have two columns: the label and its value. Each row will include an input field for numeric values and two buttons with specific functionalities as described below.

```jsx
{
  "rows": [
    {
      "id": "electronics",
      "label": "Electronics",
      "value": 1400, //this value needs to be calculated from the children values (800+700)
      "children": [
        {
          "id": "phones",
          "label": "Phones",
          "value": 800
        },
        {
          "id": "laptops",
          "label": "Laptops",
          "value": 700
        }
      ]
    },
    {
      "id": "furniture",
      "label": "Furniture",
      "value": 1000, //this need to be calculated from the children values (300+700)
      "children": [
        {
          "id": "tables",
          "label": "Tables",
          "value": 300
        },
        {
          "id": "chairs",
          "label": "Chairs",
          "value": 700
        }
      ]
    }
  ]
}
```

**Requirements:**

1. **Table Structure:**
    - The table should have a label column and a value column.
    - Rows will be hierarchical, with each parent row potentially having child rows.
    - The table should have a Grand Total Row that sums up all its values
2. **Input Field and Buttons:**
    - Each row should have an input field to take a numeric value.
    - Beside each input field, there should be two buttons :
        1. **Allocation % Button Functionality:**
            - When a user types a percentage (e.g., 10%), clicking this button should increase the current row’s value by that percentage.
            - The change should be reflected in the row's value and update any relevant subtotals.
        2. **Allocation Val Button Functionality:**
            - When a user types a number, clicking this button should set the row's value to that number directly.
            - The change should update the value and the relevant subtotals.
3. **Variance Display:**
    - When either button is used to update a value, display the variance percentage based on the original value from the data.
4. **Hierarchy and Subtotals:**
    - Ensure that updates to child rows affect the parent row's subtotal.
    - The hierarchy can have multiple levels and subtotals  should be updated accordingly when there is a change in value. if a subtotal value is changed it should distribute it to its leaves.

## Example Scenario

### **Initial State of the Table**

When you first load the application with the provided sales data, the table looks like this:

| **Label** | **Value** | **Input** | **Allocation %** | **Allocation Val** | **Variance %** |
| --- | --- | --- | --- | --- | --- |
| Electronics | 1500 |  | [button1] | [button2] | 0% |
| -- Phones | 800 |  | [button1] | [button2] | 0% |
| -- Laptops | 700 |  | [button1] | [button2] | 0% |
| Furniture | 1000 |  | [button1] | [button2] | 0% |
| -- Tables | 300 |  | [button1] | [button2] | 0% |
| -- Chairs | 700 |  | [button1] | [button2] | 0% |

### **Updating a Value by Percentage**

Let's say you want to increase the value of "Phones" by 10%. You enter `10` in the input field next to "Phones" and click the "Allocation %" button.

After this update, the value of "Phones" becomes `800 + 10% of 800 = 880`. The variance displayed will be `10%`.

The updated table will be:

| **Label** | **Value** | **Input** | **Allocation %** | **Allocation Val** | **Variance %** |
| --- | --- | --- | --- | --- | --- |
| Electronics | 1580 |  | [button1] | [button2] | 5.33% |
| -- Phones | 880 |  | [button1] | [button2] | 10% |
| -- Laptops | 700 |  | [button1] | [button2] | 0% |
| Furniture | 1000 |  | [button1] | [button2] | 0% |
| -- Tables | 300 |  | [button1] | [button2] | 0% |
| -- Chairs | 700 |  | [button1] | [button2] | 0% |

Notice that the value of "Electronics" is updated to reflect the new subtotal (`880 + 700 = 1580`), and its variance is calculated based on the change (`1580 - 1500 = 80`, which is `80/1500 * 100 = 5.33%`).

### **Updating a Value Directly**

Now, let's say you want to change the value of "Tables" directly to 400. You enter `400` in the input field next to "Tables" and click the "Allocation Val" button.

After this update, the value of "Tables" becomes `400`. The variance displayed will be `33.33%` (since `(400 - 300) / 300 * 100 = 33.33%`).

The updated table will be:

| **Label** | **Value** | **Input** | **Allocation %** | **Allocation Val** | **Variance %** |
| --- | --- | --- | --- | --- | --- |
| Electronics | 1580 |  | [button1] | [button2] | 5.33% |
| -- Phones | 880 |  | [button1] | [button2] | 10% |
| -- Laptops | 700 |  | [button1] | [button2] | 0% |
| Furniture | 1100 |  | [button1] | [button2] | 10% |
| -- Tables | 400 |  | [button1] | [button2] | 33.33% |
| -- Chairs | 700 |  | [button1] | [button2] | 0% |

The value of "Furniture" is updated to reflect the new subtotal (`400 + 700 = 1100`), and its variance is calculated based on the change (`1100 - 1000 = 100`, which is `100/1000 * 100 = 10%`).

### **Updating Value of a Subtotal**

Now, let's say you want to change the value of " Furniture" directly to 2000. You enter `2000` in the input field next to "Furniture" and click the "Allocation Val" button.

After this update, the value of "Furniture" becomes `2000`. The variance displayed will be `100%` (since `(2000 - 1000) / 100 * 100 = 100%`). 

the leaves of  “Furniture” will be updated according to its contribution to the “Furniture” 

“Furniture → Tables” contributed `36.36% (400/1100 * 100) = 36.36` to “Furniture” so its updated value will be `36.36%` of `2000`

 You can round the number after the 2nd decimal

The updated table will be:

| Label | Value | Input | Allocation % | Allocation Val | Variance % |
| --- | --- | --- | --- | --- | --- |
| Electronics | 1580 |  | [button1] | [button2] | 5.33% |
| -- Phones | 880 |  | [button1] | [button2] | 10% |
| -- Laptops | 700 |  | [button1] | [button2] | 0% |
| Furniture | 2000 |  | [button1] | [button2] | 100% |
| -- Tables | 727.2727 |  | [button1] | [button2] | 142.42% |
| -- Chairs | 1272.7272 |  | [button1] | [button2] | 81.81% |

### **Deliverables:**

1. A ReactJS application implementing the table with the described functionalities.
2. The application should be structured, with components for the table, rows, and input/button controls.
3. State management should be handled appropriately to reflect the hierarchical updates.
4. Styling should be simple but clean, using basic CSS or any preferred styling library.

### **Evaluation Criteria:**

- **Correctness:** The application meets the functional requirements specified.
- **Code Quality:** The code is clean, well-organized, and follows best practices.
- **User Experience:** The interface is user-friendly and updates are reflected accurately.
- **Completeness:** The application handles edge cases and errors gracefully.

### **Submission:**

- Upload your code to public git repository (GitHub, GitLab, etc.)
- Ideally host your application with github pages or any other static page provider and add the url in github readme
- Share the github url through email
