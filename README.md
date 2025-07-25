# **Bitsap: Full-Stack Real-Time Chat Application**  

**Bitsap** is a modern, full-stack real-time chat application built with **Socket.io** for seamless communication, **JWT (JSON Web Tokens)** for secure authentication, and **TailwindCSS** for a responsive and sleek user interface. The application supports **image uploads**, enabling users to share media effortlessly in their conversations.  

## **Key Features**  
✔ **Real-Time Messaging** – Powered by **Socket.io** for instant message delivery.  
✔ **User Authentication** – Secure login & registration using **JWT (JSON Web Tokens)**.  
✔ **Image Uploads** – Share images directly in chat conversations.  
✔ **Responsive UI** – Built with **TailwindCSS** for a clean, mobile-friendly design.  
✔ **Modern Tech Stack** – Utilizes **React.js (Frontend)** and **Node.js + Express (Backend)**.  

## **Tech Stack**  
🔹 **Frontend**: React.js, TailwindCSS, Socket.io Client  
🔹 **Backend**: Node.js, Express, Socket.io  
🔹 **Authentication**: JWT (JSON Web Tokens)  
🔹 **Database**: MongoDB (for user data & messages)  
🔹 **File Storage**: Multer (for handling image uploads)  

## **Installation & Setup**  
1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/bitsap.git
   cd bitsap
   ```

2. **Install dependencies (Frontend & Backend)**  
   ```bash
   # Backend Setup
   cd server
   npm install

   # Frontend Setup
   cd ../client
   npm install
   ```

3. **Configure Environment Variables**  
   Create a `.env` file in the `server` directory with the following:  
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Run the Application**  
   ```bash
   # Start the backend server
   cd server
   npm start

   # Start the frontend
   cd ../client
   npm start
   ```

5. **Open the app in your browser**  
   Visit `http://localhost:3000` to use **Bitsap**.  


## **Contributing**  
Contributions are welcome! Feel free to open an **issue** or submit a **pull request**.  
 

---

🚀 **Experience real-time chatting with Bitsap – Fast, Secure, and User-Friendly!**  
