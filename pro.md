# **🔥 Database Schema with Fields & Relationships**

## **1️⃣ Customers**

Stores customer details.

- `customer_id` (PK)
- `name`
- `email`
- `phone`
- `address`

**🔗 Relationships:**

- `customer_id` → Orders (`customer_id` in Orders)
- `customer_id` → Rentals (`customer_id` in Rentals)

---

## **2️⃣ Orders**

Stores order details.

- `order_id` (PK)
- `customer_id` (FK → Customers)
- `order_date`
- `total_amount`
- `shipped` (BOOLEAN)

**🔗 Relationships:**

- `order_id` → Order_Items (`order_id` in Order_Items)

---

## **3️⃣ Products**

Stores product details.

- `product_id` (PK)
- `product_name`
- `price`
- `stock_quantity`

**🔗 Relationships:**

- `product_id` → Order_Items (`product_id` in Order_Items)
- `product_id` → Product_Suppliers (`product_id` in Product_Suppliers)

---

## **4️⃣ Order_Items**

Stores which products belong to an order.

- `order_item_id` (PK)
- `order_id` (FK → Orders)
- `product_id` (FK → Products)
- `quantity`

**🔗 Relationships:**

- Links **Orders** and **Products**

---

## **5️⃣ Suppliers**

Stores supplier information.

- `supplier_id` (PK)
- `supplier_name`
- `contact_email`
- `phone`

**🔗 Relationships:**

- `supplier_id` → Product_Suppliers (`supplier_id` in Product_Suppliers)

---

## **6️⃣ Product_Suppliers**

Links products to their suppliers.

- `product_id` (FK → Products)
- `supplier_id` (FK → Suppliers)

**🔗 Relationships:**

- Many-to-Many between **Products** and **Suppliers**

---

## **7️⃣ Employees**

Stores employee information.

- `employee_id` (PK)
- `name`
- `department_id` (FK → Departments)

**🔗 Relationships:**

- `employee_id` → Tasks (`employee_id` in Tasks)
- `department_id` → Departments (`department_id` in Departments)

---

## **8️⃣ Departments**

Stores department details.

- `department_id` (PK)
- `department_name`

**🔗 Relationships:**

- `department_id` → Employees (`department_id` in Employees)

---

## **9️⃣ Tasks**

Stores tasks assigned to employees.

- `task_id` (PK)
- `employee_id` (FK → Employees)
- `task_description`

**🔗 Relationships:**

- `employee_id` → Employees (`employee_id` in Employees)

---

## **🔟 Stores**

Stores store details.

- `store_id` (PK)
- `store_name`
- `location`

**🔗 Relationships:**

- `store_id` → Rentals (`store_id` in Rentals)
- `store_id` → Staff (`store_id` in Staff)

---

## **1️⃣1️⃣ Rentals**

Stores rentals for movie stores.

- `rental_id` (PK)
- `customer_id` (FK → Customers)
- `movie_id`
- `staff_id` (FK → Staff)
- `rental_date`

**🔗 Relationships:**

- `customer_id` → Customers (`customer_id` in Customers)
- `staff_id` → Staff (`staff_id` in Staff)

---

## **1️⃣2️⃣ Staff**

Stores staff members working at stores.

- `staff_id` (PK)
- `name`
- `store_id` (FK → Stores)

**🔗 Relationships:**

- `store_id` → Stores (`store_id` in Stores)
- `staff_id` → Rentals (`staff_id` in Rentals)

# **🔥 10 Ultimate SQL Challenges (INSANELY HARD) 🚀**

## **1️⃣ Unmatched Customers & Orders**

Retrieve all customers who **never placed an order** and all orders that **don’t belong to a valid customer**.  
Display:

- `customer name` (if available)
- `order ID` (if available)

---

## **2️⃣ Employee Workload Analysis**

Find employees who **processed fewer orders than the average number of orders per employee**.  
Display:

- `employee name`
- `total orders processed`

---

## **3️⃣ The Mystery Product**

Find the **most frequently ordered product**, but **only if it appears in at least 2 different orders**.  
Display:

- `product name`
- `total quantity ordered`

---

## **4️⃣ Customers Who Ordered Every Product**

Find customers who **have ordered every product at least once**.  
Display:

- `customer name`

---

## **5️⃣ Missing Shipments**

Find orders that were **paid for but never shipped**.  
Display:

- `order ID`
- `customer name`
- `order total`

---

## **6️⃣ Most Loyal Customers Per Store**

For each store, find the **customer who placed the highest number of orders**.  
Display:

- `store ID`
- `customer name`
- `total orders placed`

---

## **7️⃣ Employees With No Tasks**

Find employees who **belong to a department but have no assigned tasks**.  
Display:

- `employee name`
- `department name`

---

## **8️⃣ Shared Customers & Suppliers**

Find all businesses that exist **both as a customer and a supplier**.  
Display:

- `business name`
- `customer ID`
- `supplier ID`

---

## **9️⃣ Orders with Unavailable Products**

Find orders that **contain at least one product that is currently out of stock**.  
Display:

- `order ID`
- `customer name`
- `out-of-stock product name`

---

## **🔟 The Impossible Query**

Find the **top 3 customers who have spent the most in the last year**, along with the **top 2 products they ordered**, but **only if they ordered from more than one store**.  
Display:

- `customer name`
- `total spent`
- `top product name`
- `product quantity ordered`
- `store count`

---
