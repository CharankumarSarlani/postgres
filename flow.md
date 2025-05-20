# SQL Query Execution Order (Step-by-Step Flow)

When you write an SQL query, it **is not executed from top to bottom** as written. Instead, SQL follows a specific order to process the query.

## **Flow of SQL Query Execution**

| Execution Order | SQL Clause                        | What It Does                                            |
| --------------- | --------------------------------- | ------------------------------------------------------- |
| **1**           | `FROM`                            | Chooses the base table(s) to retrieve data from.        |
| **2**           | `JOIN` (INNER, LEFT, RIGHT, FULL) | Combines data from multiple tables based on conditions. |
| **3**           | `ON`                              | Defines how tables should be joined.                    |
| **4**           | `WHERE`                           | Filters rows based on conditions before aggregation.    |
| **5**           | `GROUP BY`                        | Groups rows into categories based on a column.          |
| **6**           | `HAVING`                          | Filters grouped data after aggregation.                 |
| **7**           | `SELECT`                          | Chooses the columns to display.                         |
| **8**           | `ORDER BY`                        | Sorts the final result.                                 |
| **9**           | `LIMIT` / `OFFSET`                | Restricts the number of rows in the output.             |

---

## **Example Query:**

```sql
SELECT customer_id, staff_id, SUM(amount)
FROM payment
WHERE amount > 50
GROUP BY customer_id, staff_id
HAVING SUM(amount) > 100
ORDER BY customer_id, staff_id
LIMIT 10;
```

## **How SQL Executes This Query (Step by Step)**

1. **`FROM payment`** → Get all records from the `payment` table.
2. **`WHERE amount > 50`** → Filter out rows where `amount` is 50 or less.
3. **`GROUP BY customer_id, staff_id`** → Group the remaining rows by `customer_id` and `staff_id`.
4. **`HAVING SUM(amount) > 100`** → Filter the grouped data, keeping only groups where the total `amount` is greater than 100.
5. **`SELECT customer_id, staff_id, SUM(amount)`** → Select the required columns.
6. **`ORDER BY customer_id, staff_id`** → Sort the final result by `customer_id`, then by `staff_id`.
7. **`LIMIT 10`** → Show only the first 10 rows.

---

## **Key Takeaways**

- **`FROM` comes first**, even though it appears later in the query.
- **`WHERE` filters before grouping (`GROUP BY`).**
- **`HAVING` filters after grouping**, while `WHERE` filters before grouping.
- **`SELECT` comes late in the process!** You can’t reference column aliases in `WHERE` because they don’t exist yet.
- **`ORDER BY` comes near the end**, after filtering and grouping.

---
