import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'example_db',
});

connection.connect((error) => {
  if (error) {
    console.error(`Error connecting to databse: ${error}`);
    return;
  }

  console.log('Connected to MySQL database successfully!');
});

export default connection;
