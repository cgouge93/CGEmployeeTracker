INSERT INTO department
  (department_name)
VALUES
  ('Member Service'),
  ('Technology'),
  ('Risk Management'),
  ('Operations');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Relationship Advisor', 33000 , 1),
  ('Electronic Services Advisor', 36000 , 1),
  ('IT Support Specialist', 41000, 2),
  ('Software Engineer', 80000, 2),
  ('Risk Analyst', 50000, 3),
  ('Operations Leader', 80000, 4),
  ('Operations Support Specialist', 40000, 4);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Kelly', 'Kapoor', 1, NULL),
  ('Jim', 'Halpert', 2, 1),
  ('Michael', 'Scott', 3, NULL),
  ('Dwight', 'Schrute', 4, 3),
  ('Creed', 'Bratton', 5, NULL),
  ('Meredith', 'Palmer', 6, NULL),
  ('Pam', 'Beesly', 7, 6);