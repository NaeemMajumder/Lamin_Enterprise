# 🚗 Laima Enterprise 🚗

**Laima Enterprise** is a fully functional, responsive car-selling web application built specifically for **desktop users**. It enables users to seamlessly buy and sell cars with secure authentication, custom APIs, smooth pagination, and more. This platform is designed to provide a reliable and user-friendly experience for both buyers and sellers, ensuring efficient management and navigation of listings.

### 🌐 Live Demo
You can view the live version of the application [here](https://lamia-enterprise-main-qs8ttmg44.vercel.app/).

---

## ✨ Features ✨

- **🚙 Car Listings**: A platform to browse and add car listings for sale.
- **🔐 User Authentication**: Secure login and registration, with JWT authentication.
- **📄 Smooth Pagination**: Efficient pagination for large data sets of car listings.
- **🔧 Custom APIs**: Custom-built APIs to handle various operations like adding cars and updating user profiles.
- **🔑 Password Management**: Users can change their passwords securely.
- **✅ Form Validation**: Ensures all inputs are validated before being submitted using **Joi** validation.

---

## 🚧 Challenges Faced 🚧

During the development of **Laima Enterprise**, I encountered and overcame several challenges that enhanced my skills:

1. **🔄 Pagination**:  
   Implementing pagination for large data sets, ensuring smooth navigation between pages and maintaining high performance even with a significant amount of data.

2. **🔐 JWT Authentication**:  
   Setting up secure authentication using JWT to protect sensitive user data and secure routes for authenticated users.

3. **🔒 Route Validation**:  
   Implementing route validation to ensure that users' requests are valid before processing, preventing errors and maintaining the integrity of the data.

4. **🔑 Password Change Functionality**:  
   Adding the ability for users to securely change their password, implementing best practices to protect user data during this sensitive operation.

5. **📜 Joi Validation**:  
   Using Joi validation for input validation in forms to ensure all data received from users adheres to specified formats and is safe to process.

---

## 🛠 Technologies Used 🛠

This project uses several modern technologies to build a scalable, responsive, and secure application:

- **🎨 Frontend**: 
  - Tailwind CSS for responsive design and layout
  - DaisyUI for pre-built UI components
  - Swiper for car image slider

- **💻 Backend**: 
  - Node.js with Express.js for the server-side logic
  - MongoDB with Mongoose for database management
  - Passport.js for authentication (using Passport Local strategy)
  - Cloudinary for storing images
  
---

## ⚙️ Tools I Used ⚙️

- **📝 HTML** for the structure of the web pages
- **🎨 CSS** and **Tailwind CSS** for styling and layout
- **📦 Bootstrap** for responsive design
- **💻 JavaScript** for the interactive elements
- **🌐 Node.js** and **Express.js** for server-side logic
- **🗄 MongoDB** and **Mongoose** for database management
- **🔐 Passport.js** for user authentication
- **☁️ Cloudinary** for image uploads
- **🛠 Joi** for input validation
- **🚗 Swiper** for the car image slider

---

## 📥 Installation 📥

To run this project locally, follow these steps:

1. Clone this repository to your local machine.

    ```bash
    git clone https://github.com/yourusername/laima-enterprise.git
    cd laima-enterprise
    ```

2. Install the dependencies.

    ```bash
    npm install
    ```

3. Create a `.env` file and add the necessary environment variables such as your **MongoDB URI**, **JWT secret**, and **Cloudinary credentials**.

4. Run the app locally.

    ```bash
    npm run dev
    ```

5. Visit `http://localhost:3000` to view the app.

---

## 📦 Package Versions 📦

The following are the key dependencies used in this project:

**🔑 Dependencies:**
```json
"cloudinary": "^1.21.0",
"connect-flash": "^0.1.1",
"connect-mongo": "^5.1.0",
"cookie-parser": "^1.4.7",
"daisyui": "^4.12.13",
"dotenv": "^16.4.5",
"ejs": "^3.1.10",
"ejs-mate": "^4.0.0",
"express": "^4.21.1",
"express-session": "^1.18.1",
"joi": "^17.13.3",
"method-override": "^3.0.0",
"mongodb": "^6.9.0",
"mongoose": "^8.7.1",
"multer": "^1.4.5-lts.1",
"multer-storage-cloudinary": "^4.0.0",
"nodemon": "^3.1.7",
"passport": "^0.7.0",
"passport-local": "^1.0.0",
"passport-local-mongoose": "^8.0.0",
"swiper": "^11.1.14"
```


🖥️ Note 🖥️
This web application is designed exclusively for desktop users. The layout and features are optimized for larger screens to provide the best user experience.

🤝 Contributing 🤝
Contributions are welcome! If you’d like to contribute to this project, feel free to fork the repository, make your changes, and create a pull request. Ensure that your code adheres to the existing style guide and includes tests for new functionality.


