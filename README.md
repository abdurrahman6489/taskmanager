# Node.js Application

## Setup Instructions

### Prerequisites
- **Node.js** (Latest LTS version recommended)
- **npm** or **yarn** installed
- **MongoDB** instance (cloud)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/abdurrahman6489/taskmanager.git
   cd taskmanager
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

3. **Create a `.env` file** in the root directory and add the following environment variables:
   ```ini
   MONGO_SERVER_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   ```

4. **Download the dependencies:**
   ```sh
   npm install
   ```
   or
   ```sh
   yarn
   ```

### Running in Development Mode
For development, use **Nodemon** for automatic restarts:
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```

### Environment Variables
- `MONGO_SERVER_URI` - MongoDB connection string
- `JWT_SECRET_KEY` - Secret key for JWT authentication

