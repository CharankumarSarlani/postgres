# **Sample Database Schema**

## **Tables**

### 1. Customers

| customer_id | name    | email             |
| ----------- | ------- | ----------------- |
| 1           | Alice   | alice@email.com   |
| 2           | Bob     | bob@email.com     |
| 3           | Charlie | charlie@email.com |

### 2. Orders

| order_id | customer_id | order_date |
| -------- | ----------- | ---------- |
| 101      | 1           | 2024-01-01 |
| 102      | 2           | 2024-01-03 |
| 103      | 4           | 2024-01-05 |

### 3. Products

| product_id | product_name | price |
| ---------- | ------------ | ----- |
| 201        | Laptop       | 1000  |
| 202        | Phone        | 800   |
| 203        | Tablet       | 500   |

### 4. Order_Items

| order_id | product_id | quantity |
| -------- | ---------- | -------- |
| 101      | 201        | 1        |
| 101      | 202        | 2        |
| 102      | 203        | 3        |

### 5. Employees

| employee_id | name  | department_id |
| ----------- | ----- | ------------- |
| 301         | Dave  | 1             |
| 302         | Sarah | 2             |
| 303         | Mike  | NULL          |

### 6. Departments

| department_id | department_name |
| ------------- | --------------- |
| 1             | Sales           |
| 2             | IT              |

---

# **SQL Challenges (Increasing Difficulty)**

## **1. INNER JOIN Questions**

1️⃣ Get a list of all customers and their orders.  
2️⃣ Retrieve customer names along with the products they ordered.  
3️⃣ Find employees and their department names.  
4️⃣ List product names and the quantity sold in each order.  
5️⃣ Retrieve customers who placed an order after `2024-01-01`.  
6️⃣ Get all employees who belong to a department.  
7️⃣ Show customers who ordered at least 2 different products.  
8️⃣ Find employees who work in IT.  
9️⃣ Retrieve customers and their total number of orders.  
🔟 Find employees who share a department with at least one other employee.

1. select customers.name , products.product_name
   from orders
   inner join customers
   on customers.customer_id = orders.customer_id
   inner join order_items
   on order_items.order_id = orders.order_id
   inner join products
   on products.product_id = order_items.product_id

---

## **2. FULL OUTER JOIN Questions**

1️⃣ Get all customers and orders, including those without an order.  
2️⃣ Show all employees and their departments, even if some employees don’t belong to any department.  
3️⃣ Retrieve all products and their order quantities, even if some products are never ordered.  
4️⃣ Find all employees and departments, even if some departments have no employees.  
5️⃣ List all customers and their emails, including those who never placed an order.  
6️⃣ Get all employees, their departments, and the total number of employees per department.  
7️⃣ Find all orders and customers, including orders without a valid customer.  
8️⃣ List employees and their managers (self-join) even if some employees don’t have managers.  
9️⃣ Retrieve all movies and rentals, even if some movies were never rented.  
🔟 Get all employees and the projects they worked on, even if some projects had no employees assigned.

---

## **3. LEFT OUTER JOIN Questions**

1️⃣ Get all customers and their orders, including customers with no orders.  
2️⃣ Retrieve all products and their suppliers, even if some products have no suppliers.  
3️⃣ Find employees and their departments, even if some employees don’t belong to a department.  
4️⃣ Show orders with product details, even if some products were never ordered.  
5️⃣ List all orders and the customers who placed them.  
6️⃣ Get all customers and the total amount they spent, including those who never purchased anything.  
7️⃣ Find employees and their tasks, even if some employees have no assigned tasks.  
8️⃣ Show all stores and their sales, even if some stores had no sales.  
9️⃣ Retrieve all customers and their latest order, even if they never ordered.  
🔟 List all departments and the number of employees in them, including departments with zero employees.

---

## **4. RIGHT OUTER JOIN Questions**

1️⃣ Get all orders and their customers, including orders without a customer.  
2️⃣ Retrieve all products and their suppliers, including suppliers with no products.  
3️⃣ Find all employees and their department names, including departments with no employees.  
4️⃣ Show all orders and their total amount, even if no customer is associated.  
5️⃣ Retrieve all students and courses, including courses without students.  
6️⃣ Find all rental transactions and the employees who processed them.  
7️⃣ Get all employees and the projects they worked on, even if some projects had no employees.  
8️⃣ Retrieve all shipments and the warehouses they came from.  
9️⃣ Find all job positions and the employees holding them.  
🔟 Show all branches and the managers assigned to them, including branches with no managers.

---

## **5. UNION Questions**

1️⃣ Combine all customer names and employee names into a single list.  
2️⃣ List all product names and order item names in one result set.  
3️⃣ Get a combined list of customer and supplier emails.  
4️⃣ Merge all employees and customers with their respective IDs.  
5️⃣ Show all movie titles and book titles in one column.  
6️⃣ Retrieve a unified list of all locations (store locations + customer addresses).  
7️⃣ Combine lists of past and future events.  
8️⃣ List all active and inactive users in one column.  
9️⃣ Merge datasets from two different stores into a single result.  
🔟 Combine student enrollments from two different years into a single report.

---

## **6. GROUP BY Questions**

1️⃣ Find the total number of orders placed by each customer.  
2️⃣ Get the total revenue generated from each product.  
3️⃣ Show the count of employees in each department.  
4️⃣ Find the number of products sold in each category.  
5️⃣ List the total number of orders per customer, sorted by customer name.  
6️⃣ Get the average price of products in each category.  
7️⃣ Find the department with the most employees.  
8️⃣ Show the total sales per store.  
9️⃣ Retrieve the number of transactions per month.  
🔟 Find the category with the highest total revenue.

select sum(price) as total_price, product_id
from Products
group by product_id

SELECT d.department_id, COUNT(e.employee_id) AS total_employees  
FROM Departments d  
LEFT JOIN Employees e  
ON d.department_id = e.department_id  
GROUP BY d.department_id;

select count(order_id), product_name
from Products
left outer join Order_items
on Products.product_id = Order_items.product_id
group by product_name;

select count(order_id), name
from Customers
left outer join Orders
on Customers.customer_id = Orders.customer_id
group by customer_id;

---

## **7. HAVING Questions**

1️⃣ Find customers who placed more than 2 orders.  
2️⃣ Get products with an average price greater than $500.  
3️⃣ Show departments with more than 5 employees.  
4️⃣ Retrieve categories that sold more than 100 items.  
5️⃣ List stores with total sales above $10,000.  
6️⃣ Find the top 3 products with the highest sales.  
7️⃣ Show customers who spent over $5,000.  
8️⃣ Get employees who worked on more than 3 projects.  
9️⃣ Retrieve managers with more than 10 direct reports.  
🔟 List suppliers providing more than 50 different products.

---

## **8. ORDER BY Questions**

1️⃣ Sort customers by name alphabetically.  
2️⃣ Order products by price in descending order.  
3️⃣ Show employees sorted by department name.  
4️⃣ Retrieve movies sorted by release year.  
5️⃣ List orders sorted by order date.  
6️⃣ Show employees ordered by their hire date.  
7️⃣ Retrieve products sorted by category, then price.  
8️⃣ Get customers sorted by total amount spent.  
9️⃣ Show employees sorted by department size.  
🔟 Retrieve movies ordered by rating and then title.
