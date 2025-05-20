# SQL JOIN - Rule of Thumb for Choosing the Starting Table

| Join Type           | Best Starting Table                      | Reason                                                                            |
| ------------------- | ---------------------------------------- | --------------------------------------------------------------------------------- |
| **INNER JOIN**      | **Central (Junction) Table**             | Ensures efficient filtering and avoids unnecessary computations.                  |
| **LEFT JOIN**       | **Main Table (Retaining All Rows)**      | Ensures that all rows from this table appear in the result, even without matches. |
| **RIGHT JOIN**      | **Secondary Table (Retaining All Rows)** | Like LEFT JOIN, but reversed; keeps all rows from the second table.               |
| **FULL OUTER JOIN** | **Main Entities (Both Tables Involved)** | Ensures all records from both tables are included, even if there are no matches.  |

---

## **Example Queries**

### **INNER JOIN - Start with the Central Table**

```sql
SELECT customers.name, movies.title
FROM rentals
INNER JOIN customers ON rentals.customer_id = customers.customer_id
INNER JOIN movies ON rentals.movie_id = movies.movie_id;
```

### **FULL OUTER JOIN**

SELECT customers.name, movies.title
FROM customers
FULL OUTER JOIN rentals ON customers.customer_id = rentals.customer_id
FULL OUTER JOIN movies ON rentals.movie_id = movies.movie_id;
