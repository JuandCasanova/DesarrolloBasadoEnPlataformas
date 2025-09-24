import mysql.connector
from mysql.connector import Error

try:
    connection = mysql.connector.connect(  # connection
        host="127.0.0.1",  # Servidor
        port="3307",  # Puerto
        user="root",  # Usuario de MySQL
        password=""  # Contraseña de MySQL
    )

    if connection.is_connected():
        cursor = connection.cursor()

        cursor.execute("CREATE DATABASE IF NOT EXISTS TiendaOnline")
        print("Base de datos creada exitosamente o ya existia.")

        # Selecciona la base de datos para trabajar en ella
        cursor.execute("USE TiendaOnline")

        # TABLA CATEGORIAS 
        create_table_categorias = """
        CREATE TABLE IF NOT EXISTS categorias (
            id_categoria INT AUTO_INCREMENT,
            nombre_categoria VARCHAR(255) NOT NULL,
            PRIMARY KEY (id_categoria)
        )
        """
        cursor.execute(create_table_categorias)
        print("Tabla 'categorias' creada o ya existe.")

        # TABLA PRODUCTOS
        create_table_productos = """
        CREATE TABLE IF NOT EXISTS productos (
            id_producto INT AUTO_INCREMENT,
            nombre_producto VARCHAR(255) NOT NULL,
            descripcion TEXT,
            precio DECIMAL(10, 2) NOT NULL,
            stock INT NOT NULL,
            id_categoria INT,
            PRIMARY KEY (id_producto),
            FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
        )
        """
        cursor.execute(create_table_productos)
        print("Tabla 'productos' creada o ya existe.")

        # TABLA CLIENTES
        create_table_clientes = """
        CREATE TABLE IF NOT EXISTS clientes (
            id_cliente INT AUTO_INCREMENT,
            nombre VARCHAR(255) NOT NULL,
            apellido VARCHAR(255),
            email VARCHAR(255) NOT NULL UNIQUE,
            contraseña VARCHAR(255) NOT NULL,
            direccion VARCHAR(255),
            telefono VARCHAR(20),
            PRIMARY KEY (id_cliente)
        )
        """
        cursor.execute(create_table_clientes)
        print("Tabla 'clientes' creada o ya existe.")

        # TABLA PEDIDOS 
        create_table_pedidos = """
        CREATE TABLE IF NOT EXISTS pedidos (
            id_pedido INT AUTO_INCREMENT,
            fecha_pedido DATETIME NOT NULL,
            estado VARCHAR(50) NOT NULL,
            total DECIMAL(10, 2) NOT NULL,
            id_cliente INT,
            PRIMARY KEY (id_pedido),
            FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
        )
        """
        cursor.execute(create_table_pedidos)
        print("Tabla 'pedidos' creada o ya existe.")

        # TABLA DETALLE_PEDIDO 
        create_table_detalle_pedido = """
        CREATE TABLE IF NOT EXISTS detalle_pedido (
            id_detalle INT AUTO_INCREMENT,
            cantidad INT NOT NULL,
            precio_unitario DECIMAL(10, 2) NOT NULL,
            id_pedido INT,
            id_producto INT,
            PRIMARY KEY (id_detalle),
            FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
            FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
        )
        """
        cursor.execute(create_table_detalle_pedido)
        print("Tabla 'detalle_pedido' creada o ya existe.")

        # TABLA HOME
        create_table_home = """
        CREATE TABLE IF NOT EXISTS home (
            id_home INT AUTO_INCREMENT,
            titulo VARCHAR(255) NOT NULL,
            contenido TEXT,
            PRIMARY KEY (id_home)
        )
        """
        cursor.execute(create_table_home)
        print("Tabla 'home' creada o ya existe.")

        # TABLA CONTACTANOS
        create_table_contactanos = """
        CREATE TABLE IF NOT EXISTS contactanos (
            id_contacto INT AUTO_INCREMENT,
            nombre VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            mensaje TEXT,
            PRIMARY KEY (id_contacto)
        )
        """
        cursor.execute(create_table_contactanos)
        print("Tabla 'contactanos' creada o ya existe.")

        # Confirmar los cambios
        connection.commit()

except Error as e:
    print("Error al conectarse a MySQL", e)

finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("Conexion cerrada con la base de datos")