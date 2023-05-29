from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)

#Conexion con la base de datos
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'bdvehiculo'

mysql = MySQL(app)

CORS(app)

@app.route('/')
def inicio():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM t_vehiculo')
    data = cur.fetchall()
    print(data)
    dataObject = []
    for el in data:
        dataObject.append({
            'id': el[0],
            'marca': el[1],
            'modelo': el[2],
            'año': el[3],
            'transmision': el[4],
            'combustible': el[5],
            'kilometraje': el[6],
            'precio': el[7],
        }) 

    return jsonify(dataObject)

@app.route('/registrarVehiculo', methods=['POST'])
def registrarVehiculo():
    if(request.method == 'POST'):
        data = request.get_json()

        marca = data['marca']
        modelo = data['modelo']
        año = data['año']
        transmision = data['transmision']
        combustible = data['combustible']
        kilometraje = data['kilometraje']
        precio = data['precio']

        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO t_vehiculo(veh_marca, veh_modelo, veh_año, veh_transmision, veh_combustible, veh_kilometraje, veh_precio) VALUES (%s,%s,%s,%s,%s,%s,%s)',(marca, modelo, año, transmision, combustible, kilometraje, precio ))
        
        mysql.connection.commit()
        return jsonify({'message': 'Vehiculo registrado exitosamente'})
    
@app.route('/eliminarVehiculo/<id>')
def eliminarVehiculo(id):
    cur = mysql.connection.cursor()
    cur.execute('DELETE FROM t_vehiculo WHERE veh_id = %s', [id])
    mysql.connection.commit()
    return jsonify({'message': 'Vehiculo eliminado exitosamente', 'id': id})

@app.route('/editarVehiculo/<id>', methods=['POST'])
def editarVehiculo(id):
    if(request.method == 'POST'):
        data = request.get_json()
        print(data)
        marca = data['marca']
        modelo = data['modelo']
        año = data['año']
        transmision = data['transmision']
        combustible = data['combustible']
        kilometraje = data['kilometraje']
        precio = data['precio']

        cur = mysql.connection.cursor()
        cur.execute(
        'UPDATE t_vehiculo SET veh_marca = %s, veh_modelo = %s, veh_año = %s, veh_transmision = %s, veh_combustible = %s, veh_kilometraje = %s, veh_precio = %s WHERE t_vehiculo.veh_id = %s', (marca, modelo, año, transmision, combustible, kilometraje, precio, id)
            )
        mysql.connection.commit()
        return jsonify({'message': 'Vehiculo editado exitosamente', 'id': id})
    
#TODO: Falta por implementar
# @app.route('/buscarVehiculo', methods=['POST'])
# def buscarVehiculo():
#     if(request.method == 'POST'):
#         buscar = request.form['buscador']
#         cur = mysql.connection.cursor()
#         cur.execute('SELECT * FROM t_estudiantes WHERE est_codigo LIKE %s OR est_primer_apellido LIKE %s', (buscar.encode('utf-8'), buscar.encode('utf-8') ))
#         data = cur.fetchall()
#         print(data)
#         return jsonify({'message': 'Vehiculo editado exitosamente'})
if __name__ == '__main__':
    app.run(debug=True, port=3001)