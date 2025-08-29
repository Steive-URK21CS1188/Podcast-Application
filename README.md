# 🎙️ Podcast Management Application  

A full-stack **Podcast Management System** built using **Angular, .NET (C#), and SQL Server**.  
This application enables users to create, manage, and listen to podcasts with an intuitive interface, role-based access, and modern UI/UX.  

---

## 🚀 Features  

### 🔑 Authentication & User Management  
- Secure **login & registration** with JWT-based authentication.  
- Role-based access: **Admin** (approve/manage podcasts) & **User** (create/subscribe).  
- Profile management with profile picture upload.  

### 🎧 Podcast Module  
- Add new podcasts with cover image upload.  
- Edit & update podcast details (including cover image).  
- Delete or view podcast details.  
- Admin can approve/unapprove podcasts.  
- All podcasts displayed in a **uniform card layout** with equal sizing.  

### 🎵 Episode Module  
- Upload and manage podcast episodes (with audio upload).  
- Edit episode details (including audio file update).  
- Play audio using a **custom sleek audio player**:  
  - Always visible at the bottom.  
  - Play/Pause, Close, and Seek bar with current time & duration.  
  - Mobile-friendly and responsive.  

### ❤️ Subscriptions  
- Users can subscribe/unsubscribe to podcasts.  
- View all subscribed podcasts in a dedicated section.  

### 👤 Profile  
- View profile details: Name, Email, Phone, Role.  
- Profile picture upload & display.  

### 🎨 UI/UX Enhancements  
- Responsive & mobile-friendly design.  
- Consistent navbar (top + side navigation).  
- Buttons aligned properly across all pages.  
- Dark mode toggle with brand colors.  
- Modern fonts from **Google Fonts** (Poppins, Inter).  
- Professional CSS with equal card sizes, spacing, and animations.  

---

## 🛠️ Tech Stack  

- **Frontend**: Angular, Bootstrap, Custom CSS  
- **Backend**: .NET (C#), REST APIs  
- **Database**: SQL Server  
- **Tools**: Git, Postman, Visual Studio, VS Code  

---

## 📸 Screenshots  
(Add screenshots of your app pages: Login, Dashboard, Podcast List, Subscriptions, Profile, Audio Player, etc.)  

---

## ⚡ Getting Started  

### 1. Clone the Repository  
```bash
git clone https://github.com/your-username/podcast-management-app.git
cd podcast-management-app
```
### 2. Backend Setup (.NET + SQL Server) 
- Open backend solution in Visual Studio.
- Update appsettings.json with your SQL Server connection string.
- Run database migrations (if applicable).
- Start the backend:
```bash
dotnet run
```
Backend runs at: http://localhost:5000
### 3. Frontend Setup (Angular)  
```bash
cd frontend
npm install
ng serve
```
Frontend runs at: http://localhost:4200
