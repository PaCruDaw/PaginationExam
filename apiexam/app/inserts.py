import mysql.connector
from faker import Faker

def generate_fake_data(num_records):
    fake = Faker()
    data = [(fake.first_name(), fake.last_name(), fake.email()) for _ in range(num_records)]
    return data

def insert_users(data):
    try:
        # Conectar a la base de datos MySQL
        conn = mysql.connector.connect(
            host="mysql",
            user="user",
            password="userpwd",
            database="testexam"
        )

        # Crear un cursor
        cursor = conn.cursor()

        # Query para insertar usuarios
        query = "INSERT INTO users (name, surname, email) VALUES (%s, %s, %s)"

        # Insertar datos en lotes de 1000 registros
        batch_size = 100
        for i in range(0, len(data), batch_size):
            batch_data = data[i:i+batch_size]
            cursor.executemany(query, batch_data)
            conn.commit()
            print("Datos falsos insertados correctamente.")
        print("Datos falsos insertados correctamente.")

    except mysql.connector.Error as error:
        print("Error al insertar los datos falsos:", error)

    finally:
        # Cerrar el cursor y la conexión
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    num_records = 1000100
    fake_data = generate_fake_data(num_records)
    insert_users(fake_data)
