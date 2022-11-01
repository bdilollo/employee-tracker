INSERT INTO department (name)
VALUES  ('Sales'),
        ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES  ('Head of Sales', 100000, 1),
        ('Junior Salesperson', 65000, 1),
        ('Head of Finance', 100000, 2),
        ('Financial Analyst', 80000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Smith', 1, null),
        ('Candace', 'Winterbottom', 3, null),
        ('Sally', 'Jones', 2, 1),
        ('Bill', 'Summers', 4, 2);