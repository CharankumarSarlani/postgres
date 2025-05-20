## **Difference Between `= NULL` and `IS NULL`**

| Operator  | Behavior                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------- |
| `= NULL`  | ❌ **Does NOT work** because `NULL` represents an unknown value, and any comparison with `NULL` results in `FALSE`. |
| `IS NULL` | ✅ **Works correctly** because it specifically checks whether a value is `NULL`.                                    |

### **Example**

```sql
-- ❌ Incorrect: Always false, so it returns no rows
SELECT * FROM table_name WHERE column_name = NULL;

-- ✅ Correct: Properly filters NULL values
SELECT * FROM table_name WHERE column_name IS NULL;
```
