select (
sum(case when department = 'A' then 1 else 0 end) /
	NULLIF(sum(case when department = 'B' then 1 else 0 end) , 0)
) as department_ratio
from department