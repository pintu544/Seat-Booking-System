
<!DOCTYPE  html>

<html  lang="en">

<head>

<meta  charset="UTF-8">

<meta  name="viewport"  content="width=device-width, initial-scale=1.0">

<title>Seat Booking System Documentation</title>

</head>

<body>

<h1>Seat Booking System</h1>

  

<p>A full-stack application for booking seats in a theater or train coach with an intelligent seat allocation algorithm that prioritizes keeping groups together in the same row when possible.</p>

  

<img src="https://res.cloudinary.com/dfrhy6m3m/image/upload/v1689589749/dnd7h6s237vrgnpnt4fa.png" alt="Seat Booking System">

  

<h2>Features</h2>

  

<div class="feature-list">

<div class="feature-item">

<strong>Smart Seat Allocation:</strong> Prioritizes booking seats in the same row

</div>

<div class="feature-item">

<strong>User Authentication:</strong> Secure signup/login functionality

</div>

<div class="feature-item">

<strong>Interactive UI:</strong> Visual distinction between available and booked seats

</div>

<div class="feature-item">

<strong>Responsive Design:</strong> Works on both desktop and mobile devices

</div>

<div class="feature-item">

<strong>Real-time Updates:</strong> Instant visual feedback after booking

</div>

<div class="feature-item">

<strong>Personal Bookings:</strong> Users can reset only their own bookings

</div>

<div class="feature-item">

<strong>Admin Controls:</strong> Admin users can reset all seats in the system

</div>

</div>

  

<h2>Architecture</h2>

  

<h3>Frontend</h3>

<div class="tech-stack">

<div class="tech">React</div>

<div class="tech">Chakra UI</div>

<div class="tech">Context API</div>

<div class="tech">Axios</div>

<div class="tech">React Icons</div>

</div>

  

<h3>Backend</h3>

<div class="tech-stack">

<div class="tech">Node.js</div>

<div class="tech">Express</div>

<div class="tech">PostgreSQL</div>

<div class="tech">Prisma</div>

<div class="tech">JWT</div>

<div class="tech">bcrypt</div>

</div>

  

<h2>Setup Instructions</h2>

  

<h3>Backend Setup</h3>

<pre><code class="bash"># Clone the repository

git clone &lt;https://github.com/pintu544/Seat-Booking-System&gt;

  

#  Navigate to backend directory

cd jati-rita/backend

  

#  Install dependencies

npm install

  

#  Set up environment variables

#  Create a .env file with the following:

DATABASE_URL="postgresql://username:password@host:port/database"

DIRECT_URL="postgresql://username:password@host:port/database"

JWT_SECRET="your-secret-key-for-jwt"

  

#  Initialize the database with seats

node scripts/initSeats.js

  

#  Start the server

npm start</code></pre>

  

<h3>Frontend Setup</h3>

<pre><code class="bash"># Navigate to frontend directory

cd ../frontend

  

#  Install dependencies

npm install

  

#  Set up environment variable for API URL

echo "REACT_APP_API_URL=http://localhost:8080" > .env

  

#  Start the application

npm start</code></pre>

  

<h2>API Endpoints</h2>

  

<h3>Authentication</h3>

<table>

<thead>

<tr>

<th>Method</th>

<th>Endpoint</th>

<th>Description</th>

<th>Auth Required</th>

</tr>

</thead>

<tbody>

<tr>

<td>POST</td>

<td><code>/api/auth/signup</code></td>

<td>Register new user</td>

<td>No</td>

</tr>

<tr>

<td>POST</td>

<td><code>/api/auth/login</code></td>

<td>Login existing user</td>

<td>No</td>

</tr>

</tbody>

</table>

  

<h3>Seats</h3>

<table>

<thead>

<tr>

<th>Method</th>

<th>Endpoint</th>

<th>Description</th>

<th>Auth Required</th>

</tr>

</thead>

<tbody>

<tr>

<td>GET</td>

<td><code>/api/seats</code></td>

<td>Get all seats with status</td>

<td>No</td>

</tr>

<tr>

<td>POST</td>

<td><code>/api/seats</code></td>

<td>Reset all seat bookings (admin)</td>

<td>No</td>

</tr>

<tr>

<td>POST</td>

<td><code>/api/seats/book</code></td>

<td>Book specified number of seats</td>

<td>Yes</td>

</tr>

<tr>

<td>POST</td>

<td><code>/api/seats/reset</code></td>

<td>Reset user's booked seats</td>

<td>Yes</td>

</tr>

</tbody>

</table>

  

<h2>Request/Response Examples</h2>

  

<h3>Authentication</h3>

  

<h4>Signup</h4>

<pre><code class="bash">POST /api/auth/signup</code></pre>

<p>Request Body:</p>

<pre><code class="json">{

"email": "user@example.com",

"password": "securepassword"

}</code></pre>

  

<p>Success Response:</p>

<pre><code class="json">{

"user": {

"id": 1,

"email": "user@example.com"

},

"token": "jwt-token-here"

}</code></pre>

  

<h4>Login</h4>

<pre><code class="bash">POST /api/auth/login</code></pre>

<p>Request Body:</p>

<pre><code class="json">{

"email": "user@example.com",

"password": "securepassword"

}</code></pre>

  

<p>Success Response:</p>

<pre><code class="json">{

"user": {

"id": 1,

"email": "user@example.com"

},

"token": "jwt-token-here"

}</code></pre>

  

<h3>Seats</h3>

  

<h4>Book Seats</h4>

<pre><code class="bash">POST /api/seats/book</code></pre>

<p>Request Body:</p>

<pre><code class="json">{

"numOfSeats": 5

}</code></pre>

  

<p>Success Response:</p>

<pre><code class="json">{

"data": [

{ "id": 1, "seatNumber": 1, "rowNumber": 1, "isBooked": true, "userId": 1 },

// ...more seats

]

}</code></pre>

  

<h4>Reset User Bookings</h4>

<pre><code class="bash">POST /api/seats/reset</code></pre>

  

<p>Success Response:</p>

<pre><code class="json">{

"message": "Your bookings have been reset",

"count": 5

}</code></pre>

  

<h2>Data Models</h2>

  

<h3>User</h3>

<pre><code class="prisma">model User {

id Int @id @default(autoincrement())

email String @unique

password String

createdAt DateTime @default(now())

updatedAt DateTime @updatedAt

}</code></pre>

  

<h3>Seat</h3>

<pre><code class="prisma">model Seat {

id Int @id @default(autoincrement())

seatNumber Int

rowNumber Int

isBooked Boolean @default(false)

userId Int?

}</code></pre>

  

<h2>Project Structure</h2>

  

<h3>Backend</h3>

<pre><code>backend/

├── config/ # Database and configuration

├── controller/ # Request handlers

├── middleware/ # Authentication middleware

├── models/ # Data models

├── prisma/ # Prisma schema and migrations

├── routes/ # API routes

├── scripts/ # Database initialization scripts

└── index.js # Main application entry</code></pre>

  

<h3>Frontend</h3>

<pre><code>frontend/

├── public/ # Static files

├── src/

│ ├── components/ # React components

│ │ ├── Auth/ # Authentication components

│ │ └── ... # Other components

│ ├── context/ # React Context API

│ ├── App.js # Main application component

│ └── index.js # Entry point

├── .env # Environment variables

└── package.json # Dependencies</code></pre>

  

<h2>Future Improvements</h2>

<ul>

<li>Seat pricing tiers</li>

<li>Booking history</li>

<li>Email confirmation</li>

<li>Cancellation functionality</li>

<li>Improved seat selection UI with drag-select</li>

<li>Admin dashboard for seat management</li>

<li>Responsive design improvements for mobile users</li>



</ul>

  



</body>

</html>
