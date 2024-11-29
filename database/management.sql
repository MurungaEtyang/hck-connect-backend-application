
CREATE TABLE IF NOT EXISTS users (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(50) NOT NULL,
     last_name VARCHAR(50) NOT NULL,
     middle_name VARCHAR(50) DEFAULT NULL,
     email VARCHAR(100) NOT NULL UNIQUE,
     phone_number VARCHAR(20) NOT NULL UNIQUE,
     user_id VARCHAR(100) NOT NULL UNIQUE,
     confirmation_code VARCHAR(100) NOT NULL,
     is_confirmed BOOLEAN DEFAULT FALSE,
     password VARCHAR(255) NOT NULL,
     role ENUM('landlord', 'caretaker', 'tenant') NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS landlords (
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     user_id VARCHAR(100) NOT NULL,
     full_name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phone_number VARCHAR(20) NOT NULL,
     user_national_id VARCHAR(20) NOT NULL,
     property_name VARCHAR(255) NOT NULL,
     property_type VARCHAR(100) NOT NULL,
     location VARCHAR(255) NOT NULL,
     number_of_units INT NOT NULL,
     price_range VARCHAR(50) NOT NULL,
     amenities JSON,
     bank_name VARCHAR(100),
     account_number VARCHAR(100),
     branch VARCHAR(100),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
     CONSTRAINT unique_national_id UNIQUE (user_national_id)
);

CREATE TABLE IF NOT EXISTS properties (
      id INT AUTO_INCREMENT PRIMARY KEY,
      landlord_id VARCHAR(20) NOT NULL,
      property_name VARCHAR(255) NOT NULL,
      property_type VARCHAR(100) NOT NULL,
      location VARCHAR(255) NOT NULL,
      number_of_units INT NOT NULL,
      price_range VARCHAR(50) NOT NULL,
      amenities JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      property_unique_id VARCHAR(255) NOT NULL,
      FOREIGN KEY (landlord_id) REFERENCES landlords(user_national_id) ON DELETE CASCADE,
      CONSTRAINT unique_property_unique_id UNIQUE (property_unique_id)
);


CREATE TABLE IF NOT EXISTS caretakers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id VARCHAR(100) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20) NOT NULL,
      national_id VARCHAR(20),
      job_title VARCHAR(100) NOT NULL,
      assigned_property VARCHAR(255) NOT NULL,
      work_schedule VARCHAR(50),
      salary DECIMAL(10, 2),
      emergency_contact_name VARCHAR(255),
      emergency_contact_phone VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tenants (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id VARCHAR(100) NOT NULL,
   full_name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   phone_number VARCHAR(20) NOT NULL,
   national_id VARCHAR(20),
   date_of_birth DATE NOT NULL,
   property_address VARCHAR(255) NOT NULL,
   lease_start_date DATE NOT NULL,
   lease_end_date DATE NOT NULL,
   monthly_rent DECIMAL(10, 2) NOT NULL,
   payment_method VARCHAR(100) NOT NULL,
   security_deposit DECIMAL(10, 2),
   tenant_references JSON,
   emergency_contact_name VARCHAR(255),
   emergency_contact_phone VARCHAR(20),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS rent_payments (
         id INT AUTO_INCREMENT PRIMARY KEY,
         tenant_id INT NOT NULL,
         payment_date DATE NOT NULL,
         amount DECIMAL(10, 2) NOT NULL,
         payment_method VARCHAR(100) NOT NULL,
         reference_number VARCHAR(100),
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
         FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS maintenance_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id INT NOT NULL,
        tenant_id INT NOT NULL,
        description TEXT NOT NULL,
        request_date DATE NOT NULL,
        status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
        FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS roles (
       id INT AUTO_INCREMENT PRIMARY KEY,
       role_name VARCHAR(255) NOT NULL UNIQUE,
       description TEXT
);

CREATE TABLE IF NOT EXISTS permissions (
     id INT AUTO_INCREMENT PRIMARY KEY,
     permission_name VARCHAR(255) NOT NULL UNIQUE,
     description TEXT
);

CREATE TABLE IF NOT EXISTS role_permissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      role_id INT,
      permission_id INT,
      FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
      FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
      UNIQUE (role_id, permission_id)
);


UPDATE properties
SET property_unique_id = CONCAT('PROP-', LPAD(id, 6, '0'));
