# 🚗 Garage Management System

![Home Page Dashboard](screenshots/img3.jpeg)

A comprehensive Full-Stack Web Application designed to streamline garage and auto-repair shop operations. Built with a modern **Angular** frontend and a robust **Spring Boot (Java)** backend, this system allows shop owners to easily manage customers, vehicles, mechanics, service requests, inventory, and invoices all in one sleek dashboard.

## ✨ Key Features

- **👥 Customer Management:** Keep track of customer profiles, contact info, and addresses.
- **🏎️ Vehicle Tracking:** Register vehicles and assign them to specific customers.
- **👨‍🔧 Mechanic Directory:** Maintain a roster of mechanics and their specializations.
- **🔧 Service Requests:** Schedule and track repairs, link them to specific mechanics and vehicles, and update statuses (Pending, In Progress, Completed).
- **📦 Inventory System:** Manage auto parts, track quantities, unit prices, and supplier details.
- **🧾 Invoicing:** Generate invoices based on service requests with auto-calculated totals and tax amounts.
- **📱 Responsive UI:** A premium, glassmorphism-inspired aesthetic that looks great on any device.

## 🛠️ Technology Stack

**Frontend:**
- Angular 17 (Standalone Components)
- TypeScript
- Vanilla CSS (Glassmorphism UI)
- RxJS

**Backend:**
- Java 17
- Spring Boot 3
- Spring Data JPA / Hibernate
- Spring Web (REST APIs)
- Spring Security (Configured for Development)
- MySQL Database

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Angular CLI](https://angular.io/cli)
- [Java Development Kit (JDK 17)](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Maven](https://maven.apache.org/)
- [MySQL Server](https://dev.mysql.com/downloads/)

### 1. Backend Setup (Spring Boot)
1. Open MySQL and create a database named `garage_db`:
   ```sql
   CREATE DATABASE garage_db;
   ```
2. Navigate to the backend directory:
   ```bash
   cd backend/backend
   ```
3. Ensure your `application.properties` (inside `src/main/resources`) is configured with your MySQL username and password:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/garage_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```
4. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   *(The backend will start on `http://localhost:8081`)*

### 2. Frontend Setup (Angular)
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend/garage-frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   npm start
   ```
   *(The frontend will start on `http://localhost:4201`)*

### 3. Usage
Open your browser and navigate to `http://localhost:4201/home` to access the main dashboard.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

