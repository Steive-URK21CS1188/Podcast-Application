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

### Registration/Login

![register](https://github.com/user-attachments/assets/35af76c5-2421-410e-bb76-5973a187424a)

![login](https://github.com/user-attachments/assets/a926d9d2-c651-491c-bb11-3fd7017f144e)

### Admin Podcast Home

![admin home](https://github.com/user-attachments/assets/f254833a-ac8f-4792-aa1f-7d4e7d8039c1)

### User Podcast Home

![user home](https://github.com/user-attachments/assets/3e12b5c1-7b78-4f15-9391-e86461c4400c)

### Episodes Page

![episodes](https://github.com/user-attachments/assets/23a5203f-250e-4000-b5ea-76ea0b1775db)

### Subscription Page

![subscrip](https://github.com/user-attachments/assets/2e943154-2cc1-42fe-9781-d830346b1c36)

### Profile Page

![profile ](https://github.com/user-attachments/assets/b5551115-b2d9-4f79-9daa-ae027b528652)

---

## ⚡ Getting Started  

### 1. Clone the Repository  
```bash
git clone https://github.com/Steive-URK21CS1188/podcast-management-app.git
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
