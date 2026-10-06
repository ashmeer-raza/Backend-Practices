# File Uploading with Node.js, Express & Multer

A simple backend practice project demonstrating how to upload files using **Node.js**, **Express.js**, and **Multer**.

## 📌 What I Practiced

- Creating a basic Express server
- Organizing backend code into routes and configuration
- Handling `multipart/form-data`
- Uploading a single file with Multer
- Storing uploaded files locally using `diskStorage`
- Understanding `req.body` and `req.file`
- Understanding Multer methods such as:
  - `upload.single()`
  - `upload.array()`
  - `upload.fields()`
- Using `memoryStorage()` for scenarios such as cloud storage uploads

## 🛠️ Technologies Used

- Node.js
- Express.js
- Multer
- JavaScript
- REST API

## 📁 Project Structure

```
02.FileUploading/
│
├── src/
│   ├── config/
│   │   └── multer.js
│   │
│   ├── routes/
│   │   └── file.route.js
│   │
│   └── app.js
│
├── uploads/
├── package.json
├── package-lock.json
└── server.js
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ashmeer-raza/Backend-Practices.git
cd Backend-Practices/02.FileUploading
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
npm start
```

The server runs on:

```
http://localhost:3000
```

## 📤 File Upload API

### Endpoint

```
POST /file/
```

### Request Type

Use:

```
multipart/form-data
```

In Postman, select **Body → form-data** and add:

| Key | Type | Value |
|---|---|---|
| image | File | Select a file |
| name | Text | Optional text value |

The field name for the uploaded file must be **image** because the route uses:

```javascript
upload.single("image")
```

### Example Response

```json
{
  "message": "File Recieved"
}
```

Uploaded files are stored inside the:

```
uploads/
```

directory.

## 🔍 How Multer Works

The project uses Multer as middleware:

```javascript
router.post("/", upload.single("image"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
});
```

### `req.body`

Contains normal text fields sent with the form.

### `req.file`

Contains information about the uploaded file, such as:

- original filename
- generated filename
- file path
- MIME type
- file size

## 📦 Multer Upload Methods

### Single File

```javascript
upload.single("image")
```

Used when uploading one file.

### Multiple Files

```javascript
upload.array("image", 5)
```

Used when uploading multiple files with the same field name.

### Multiple Fields

```javascript
upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 }
])
```

Used when uploading files from different form fields.

## 💾 Storage

This project uses Multer's `diskStorage()` to save files locally:

```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});
```

For cloud storage workflows, Multer can also use:

```javascript
multer.memoryStorage()
```

This keeps the uploaded file in memory so it can be processed or sent to services such as object storage.

## 🧪 Testing with Postman

1. Start the server.
2. Open Postman.
3. Create a **POST** request.
4. Use:

```
http://localhost:3000/file/
```

5. Go to **Body → form-data**.
6. Add a key named `image`.
7. Change its type from **Text** to **File**.
8. Select a file.
9. Click **Send**.

## 🎯 Learning Outcome

This practice helped me understand the basic file-upload flow in an Express backend:

```
Client
  ↓
multipart/form-data
  ↓
Multer Middleware
  ↓
File Processing
  ↓
Local Storage
  ↓
req.file / req.body
  ↓
API Response
```

---

**Part of my Backend Development Practice Repository.**
