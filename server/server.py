from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
from flask_cors import CORS
from datetime import datetime
from decimal import Decimal

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/store_management'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Model definition
class Product(db.Model):
    id_product = db.Column(db.Integer, primary_key=True)
    name_product = db.Column(db.String(100), nullable=False)
    description_product = db.Column(db.String(255))
    cost = db.Column(db.Integer, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    id_category = db.Column(db.Integer, db.ForeignKey('category.id_category'))

class Customer(db.Model):
    id_customer = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255))
    email = db.Column(db.String(50))
    hp = db.Column(db.String(20))

class CustomerOrder(db.Model):
    __tablename__ = 'customerorder'  # Menyesuaikan dengan nama tabel di database
    
    id_order = db.Column(db.Integer, primary_key=True)
    id_customer = db.Column(db.Integer, db.ForeignKey('customer.id_customer'))  # Menggunakan customer_id
    id_product = db.Column(db.Integer, db.ForeignKey('product.id_product'))
    total_orders = db.Column(db.Integer, nullable=False)
    order_date = db.Column(db.Date)
    total_purchases = db.Column(db.Integer)
    status = db.Column(db.Boolean, default=False)  # Kolom status ditambahkan
    name = db.Column(db.String(50))  # Tambah kolom name
    address = db.Column(db.String(255))  # Tambah kolom address

    def as_dict(self):
        return {
            'id_order': self.id_order,
            'id_customer': self.id_customer,
            'id_product': self.id_product,
            'total_orders': self.total_orders,
            'order_date': self.order_date.isoformat() if isinstance(self.order_date, datetime.date) else self.order_date,
            'total_purchases': float(self.total_purchases) if isinstance(self.total_purchases, Decimal) else self.total_purchases,
            'status': "Completed" if self.status else "In Shipping",  # Ubah status menjadi string
            'name': self.name,
            'address': self.address
        }

class Purchases(db.Model):
    id_purchases = db.Column(db.Integer, primary_key=True)
    id_order = db.Column(db.Integer, db.ForeignKey('customerorder.id_order'))
    id_customer = db.Column(db.Integer, db.ForeignKey('customer.id_customer'))
    method = db.Column(db.String(50))
    date = db.Column(db.Date)

class Category(db.Model):
    id_category = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))

class Officer(db.Model):
    id_officer = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255))
    email = db.Column(db.String(50))
    hp = db.Column(db.String(20))
    position = db.Column(db.String(50))
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)

# Add the as_dict method to models that need it
def as_dict(self):
    return {c.name: getattr(self, c.name) for c in self.__table__.columns}

for model in [Product, Customer, CustomerOrder, Purchases, Category, Officer]:
    model.as_dict = as_dict

# Routes
@app.route('/api/home', methods=['GET'])
def home():
    return jsonify({
        "message": "Hello World"
    })

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if username == 'boss' and password == 'boss123' :
        access_token = create_access_token(identity='admin')
        return jsonify(access_token=access_token, user_type='isBoss')
    
    if username == 'admin' and password == 'admin':
        access_token = create_access_token(identity='admin')
        return jsonify(access_token=access_token, user_type='isOfficer')
    
    officer = Officer.query.filter_by(username=username).first()
    if officer and check_password_hash(officer.password, password):
        access_token = create_access_token(identity=officer.id_officer)
        return jsonify(access_token=access_token, user_id=officer.id_officer, user_type='isOfficer')
    
    customer = Customer.query.filter_by(username=username).first()
    if customer and check_password_hash(customer.password, password):
        access_token = create_access_token(identity=customer.id_customer)
        return jsonify(access_token=access_token, user_id=customer.id_customer, user_type='isCustomer')
    
    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/api/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({"msg": "Successfully logged out"}), 200

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data['username']
    email = data['email']
    password = data['password']
    confirm_password = data['confirmPassword']

    if password != confirm_password:
        return jsonify({'message': 'Passwords do not match'}), 400

    hashed_password = generate_password_hash(password)

    new_customer = Customer(
        username=username,
        email=email,
        password=hashed_password
    )

    try:
        db.session.add(new_customer)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'message': 'Error: {}'.format(e)}), 500

@app.route('/api/products', methods=['GET'])
@jwt_required()
def get_products():
    products = Product.query.all()
    return jsonify([product.as_dict() for product in products])

@app.route('/api/guest/products', methods=['GET'])
def get_products_guest():
    products = Product.query.all()
    return jsonify([product.as_dict() for product in products])

@app.route('/api/products', methods=['POST'])
@jwt_required()
def add_product():
    data = request.json
    new_product = Product(
        name_product=data['name_product'],
        description_product=data['description_product'],
        cost=data['cost'],
        stock=data['stock'],
        id_category=data['id_category']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.as_dict()), 201

@app.route('/api/products/<int:id_product>', methods=['GET'])
@jwt_required()
def get_product(id_product):
    product = Product.query.get_or_404(id_product)
    return jsonify(product.as_dict())

@app.route('/api/products/<int:id_product>/reduce-stock', methods=['PATCH'])
@jwt_required()
def reduce_product_stock(id_product):
    data = request.json
    quantity_ordered = data.get('total_orders', 0)

    product = Product.query.get_or_404(id_product)
    current_stock = product.stock

    if current_stock < quantity_ordered:
        return jsonify({"message": "Insufficient stock"}), 400

    product.stock = current_stock - quantity_ordered
    db.session.commit()

    return jsonify(product.as_dict()), 200

@app.route('/api/products/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    data = request.json
    product = Product.query.get_or_404(id)

    product.name_product = data.get('name_product', product.name_product)
    product.description_product = data.get('description_product', product.description_product)
    product.cost = data.get('cost', product.cost)
    product.stock = data.get('stock', product.stock)
    product.id_category = data.get('id_category', product.id_category)

    try:
        db.session.commit()
        return jsonify(product.as_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error updating product: {}'.format(e)}), 500


@app.route('/api/products/<int:id_product>', methods=['DELETE'])
@jwt_required()
def delete_product(id_product):
    product = Product.query.get_or_404(id_product)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200

@app.route('/api/categories', methods=['GET'])
@jwt_required()
def get_categories():
    categories = Category.query.all()
    return jsonify([category.as_dict() for category in categories])

@app.route('/api/categories', methods=['POST'])
@jwt_required()
def add_category():
    data = request.json
    try:
        new_category = Category(
            name=data['name'],
            description=data['description']
        )
        db.session.add(new_category)
        db.session.commit()
        return jsonify(new_category.as_dict()), 201
    except Exception as e:
        db.session.rollback()  # Rollback transaksi jika terjadi kesalahan
        return jsonify({'message': 'Error adding category.'}), 500


@app.route('/api/categories/<int:id_category>', methods=['PUT'])
@jwt_required()
def update_category(id_category):
    data = request.json
    category = Category.query.get_or_404(id_category)

    category.name = data.get('name', category.name)
    category.description = data.get('description', category.description)

    db.session.commit()
    return jsonify(category.as_dict()), 200

@app.route('/api/categories/<int:id_category>', methods=['DELETE'])
@jwt_required()
def delete_category(id_category):
    category = Category.query.get_or_404(id_category)
    db.session.delete(category)
    db.session.commit()
    return jsonify({"message": "Category deleted successfully"}), 200

@app.route('/api/orders', methods=['GET'])
@jwt_required()
def get_orders():
    orders = CustomerOrder.query.all()
    return jsonify([order.as_dict() for order in orders])

@app.route('/api/orders', methods=['POST'])
@jwt_required()
def add_order():
    data = request.json
    new_order = CustomerOrder(
        id_customer=data['id_customer'],
        id_product=data['id_product'],
        total_orders=data['total_orders'],
        order_date=data['order_date'],
        total_purchases=data['total_purchases'],
        status=data.get('status', False),  # Mengatur status default ke False
        name=data.get('name'),  # Menambahkan name
        address=data.get('address')  # Menambahkan address
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify(new_order.as_dict()), 201

@app.route('/api/orders/<int:user_id>', methods=['GET'])
@jwt_required()
def get_orders_by_user_id(user_id):
    orders = CustomerOrder.query.filter_by(id_customer=user_id).all()
    if not orders:
        return jsonify({"message": "No orders found for this user"}), 404
    return jsonify([order.as_dict() for order in orders])


@app.route('/api/orders/<int:id_order>', methods=['DELETE'])
@jwt_required()
def delete_order(id_order):
    order = CustomerOrder.query.get_or_404(id_order)
    db.session.delete(order)
    db.session.commit()
    return jsonify({"message": "Order deleted successfully"}), 200

@app.route('/api/orders/<int:id_order>', methods=['PATCH'])
@jwt_required()
def update_order_status(id_order):
    order = CustomerOrder.query.get_or_404(id_order)
    order.status = True  # Sesuaikan dengan nilai boolean yang sesuai dengan 'Complete' jika itu adalah boolean
    db.session.commit()
    return jsonify(order.as_dict()), 200

@app.route('/api/customers', methods=['GET'])
@jwt_required()
def get_customers():
    customers = Customer.query.all()
    return jsonify([customer.as_dict() for customer in customers])

@app.route('/api/customers/<int:id_customer>', methods=['PUT'])
@jwt_required()
def update_customer(id_customer):
    data = request.json
    customer = Customer.query.get_or_404(id_customer)

    customer.username = data.get('username', customer.username)
    if 'password' in data:
        customer.password = generate_password_hash(data['password'])
    customer.address = data.get('address', customer.address)
    customer.email = data.get('email', customer.email)
    customer.hp = data.get('hp', customer.hp)

    db.session.commit()
    return jsonify(customer.as_dict()), 200

@app.route('/api/customers/<int:id_customer>', methods=['DELETE'])
@jwt_required()
def delete_customer(id_customer):
    customer = Customer.query.get_or_404(id_customer)
    db.session.delete(customer)
    db.session.commit()
    return jsonify({"message": "Customer deleted successfully"}), 200


@app.route('/api/officers', methods=['GET'])
@jwt_required()
def get_officers():
    officers = Officer.query.all()
    return jsonify([officer.as_dict() for officer in officers])

@app.route('/api/officers/<int:id_officer>', methods=['GET'])
@jwt_required()
def get_officer(id_officer):
    officer = Officer.query.get_or_404(id_officer)
    return jsonify(officer.as_dict())

@app.route('/api/officers', methods=['POST'])
@jwt_required()
def add_officer():
    data = request.json
    hashed_password = generate_password_hash(data['password'])

    new_officer = Officer(
        name=data['name'],
        address=data['address'],
        email=data['email'],
        hp=data['hp'],
        position=data['position'],
        username=data['username'],
        password=hashed_password
    )

    try:
        db.session.add(new_officer)
        db.session.commit()
        return jsonify(new_officer.as_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to add Officer: {}'.format(e)}), 500

@app.route('/api/officers/<int:id_officer>', methods=['PUT'])
@jwt_required()
def update_officer(id_officer):
    data = request.json
    officer = Officer.query.get_or_404(id_officer)

    officer.name = data.get('name', officer.name)
    officer.address = data.get('address', officer.address)
    officer.email = data.get('email', officer.email)
    officer.hp = data.get('hp', officer.hp)
    officer.position = data.get('position', officer.position)

    if 'password' in data:
        officer.password = generate_password_hash(data['password'])

    try:
        db.session.commit()
        return jsonify(officer.as_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update Officer: {}'.format(e)}), 500

@app.route('/api/officers/<int:id_officer>', methods=['DELETE'])
@jwt_required()
def delete_officer(id_officer):
    officer = Officer.query.get_or_404(id_officer)
    db.session.delete(officer)
    db.session.commit()
    return jsonify({"message": "Officer deleted successfully"}), 200


# Tambahkan route baru untuk mendapatkan semua pembelian
@app.route('/api/purchases', methods=['GET'])
@jwt_required()
def get_all_purchases():
    purchases = Purchases.query.all()
    return jsonify([purchase.as_dict() for purchase in purchases])

# Tambahkan route untuk menghapus pembelian berdasarkan ID
@app.route('/api/purchases/<int:id_purchase>', methods=['DELETE'])
@jwt_required()
def delete_purchase(id_purchase):
    purchase = Purchases.query.get_or_404(id_purchase)
    db.session.delete(purchase)
    db.session.commit()
    return jsonify({"message": "Purchase deleted successfully"}), 200

# Tambahkan route untuk membuat pembelian baru
@app.route('/api/purchases', methods=['POST'])
@jwt_required()
def create_purchase():
    data = request.json
    
    new_purchase = Purchases(
        id_order=data['id_order'],
        id_customer=data['id_customer'],
        method=data['method'],
        date=data['date']
    )

    try:
        db.session.add(new_purchase)
        db.session.commit()
        return jsonify({'message': 'Purchases created successfully'}), 201
    except Exception as e:
        return jsonify({'message': 'Failed to create Purchases: {}'.format(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
