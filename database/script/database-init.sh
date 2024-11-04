set -e

# tail -f > /dev/null

# service mariadb start

# until mariadb -uroot -p"${MYSQL_PW}" -e ""; do
#   echo "Waiting for MariaDB to start..."
#   sleep 5
# done

tail -f > /dev/null

# sleep 5

# # # Check if a specific table exists to avoid re-running the script
# if ! mariadb -u "root" -p"${MYSQL_PW}" -e 'USE Reservierungen; SHOW TABLES;' 2>/dev/null; then
#     echo "Adding tables and columns..."
#     mariadb -u "root" -p"${MYSQL_PW}" "${MYSQL_DB}" <<-EOSQL
#     CREATE TABLE IF NOT EXISTS TischTyp (
#         id INT PRIMARY KEY AUTO_INCREMENT,
#         plätze INT,
#     );

#     CREATE TABLE IF NOT EXISTS Gebäude (
#         id INT PRIMARY KEY AUTO_INCREMENT,
#         name VARCHAR(50),
#     );

#     CREATE TABLE IF NOT EXISTS Tische (
#         id INT PRIMARY KEY AUTO_INCREMENT,
#         tischtyp_id INT,
#         gebäude_id INT,
#         FOREIGN KEY (tischtyp_id) REFERENCES (TischTyp.id) ON DELETE CASCADE ON UPDATE CASCADE,
#         FOREIGN KEY (gebäude_id) REFERENCES (Gebäude.id) ON DELETE CASCADE ON UPDATE CASCADE,
#     );

#     CREATE TABLE IF NOT EXISTS Reservierungen (
#         id INT PRIMARY KEY AUTO_INCREMENT,
#         tisch_id INT,
#         reserv_start DATETIME,
#         reserv_end DATETIME,
#         reserv_created DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
#         status VARCHAR(50),
#         FOREIGN KEY (tisch_id) REFERENCES (Tisch.id) ON DELETE CASCADE ON UPDATE CASCADE,
#     )
# EOSQL
# else
#     echo "Tables and columns already added. Skipping initialization."
# fi

