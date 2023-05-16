from flask import Flask, jsonify
from flask_cors import CORS
import dbModule

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    db_class = dbModule.Database()
    return jsonify(db_class.executeAll("select * from car"))


@app.route('/aa')
def aa():
    return 'aa'


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

application = app
