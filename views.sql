create or replace view customer_info as
select FIRST_name ,last_name, address,district from customer
INNER join address
on customer.address_id = address.address_id