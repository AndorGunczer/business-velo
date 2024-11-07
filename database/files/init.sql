DROP DATABASE IF EXISTS Reservierungen;
CREATE DATABASE Reservierungen;
USE Reservierungen;

-- Drop tables if they exist to reset
DROP TABLE IF EXISTS Reservierungen;
DROP TABLE IF EXISTS Tische;
DROP TABLE IF EXISTS Gebäude;
DROP TABLE IF EXISTS TischTyp;
DROP TABLE IF EXISTS Blocked;

-- Create Block table
CREATE TABLE Blocked (
    id INT AUTO_INCREMENT PRIMARY KEY,
    block_date DATE,
    block_hour_start DATETIME,
    block_hour_end DATETIME,
    ganze_tag BOOLEAN
);

-- Create TischTyp table
CREATE TABLE TischTyp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plätze INT
);

-- Insert initial TischTyp data (2, 3, 4, and 6 person tables)
INSERT INTO TischTyp (plätze) VALUES (2), (3), (4), (6);

-- Create Gebäude table
CREATE TABLE Gebäude (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

-- Insert initial Gebäude data (locations)
INSERT INTO Gebäude (name) VALUES ('Oben'), ('Unten'), ('Terrasse');

-- Create Tische table
CREATE TABLE Tische (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tischtyp_id INT,
    gebäude_id INT,
    FOREIGN KEY (tischtyp_id) REFERENCES TischTyp(id),
    FOREIGN KEY (gebäude_id) REFERENCES Gebäude(id)
);

-- Insert sample Tische data
INSERT INTO Tische (tischtyp_id, gebäude_id) VALUES (1, 1), (2, 2), (3, 3);

-- Create Reservierungen table
CREATE TABLE Reservierungen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tisch_id INT,
    reserv_start DATETIME,
    reserv_end DATETIME,
    reserv_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    FOREIGN KEY (tisch_id) REFERENCES Tische(id)
);

-- Insert example Reservierungen data
INSERT INTO Reservierungen (tisch_id, reserv_start, reserv_end, status)
VALUES 
    (1, '2024-11-10 12:00:00', '2024-11-10 14:00:00', 'confirmed'),
    (2, '2024-11-10 15:00:00', '2024-11-10 17:00:00', 'pending');
