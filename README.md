# Game Library API

เว็บแอปสำหรับค้นหาเกมจาก Steam และจัดการรายการเกมส่วนตัว โดยผู้ใช้สามารถค้นหาเกม ดูรายละเอียด เพิ่มเกมลงในรายการเกม แก้ไขสถานะ/คะแนน และลบเกมได้ ข้อมูลรายการเกมถูกจัดเก็บใน MongoDB ส่วนหน้าเว็บอยู่ในโฟลเดอร์ `public` และเซิร์ฟเวอร์ใช้ Node.js กับ Express

## ความต้องการของระบบ

- Node.js 18 ขึ้นไป
- MongoDB ที่สามารถเชื่อมต่อได้
- npm

## การติดตั้ง

1. Clone หรือดาวน์โหลดโปรเจกต์
2. เปิด Terminal ในโฟลเดอร์โปรเจกต์
3. ติดตั้ง dependencies

```bash
npm install
```

4. สร้างไฟล์ `.env` ที่ root ของโปรเจกต์

```env
MONGO_URI=mongodb://127.0.0.1:27017/game-library
PORT=3000
```

## การรันโปรเจกต์

```bash
npm run dev
```

เมื่อเซิร์ฟเวอร์เริ่มทำงาน ให้เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์ โดย `npm run dev` จะรันเซิร์ฟเวอร์ด้วย Node.js watch mode และรีสตาร์ตเมื่อไฟล์มีการเปลี่ยนแปลง

## รายการ API Endpoints

### Games API

Base URL: `/api/games`

| Method | Endpoint | รายละเอียด | สำเร็จ | ข้อผิดพลาดหลัก |
|---|---|---|---|---|
| `GET` | `/api/games` | ดึงรายการเกมทั้งหมด เรียงจากรายการใหม่ไปเก่า | `200` | — |
| `POST` | `/api/games` | เพิ่มเกมใหม่ | `201` | `400` เมื่อข้อมูลไม่ถูกต้อง |
| `PUT` | `/api/games/:id` | แก้ไขข้อมูลเกมตาม MongoDB ObjectId | `200` | `400`, `404` |
| `DELETE` | `/api/games/:id` | ลบเกมตาม MongoDB ObjectId | `204` | — |

ตัวอย่าง body สำหรับ `POST` และ `PUT`:

```json
{
  "title": "Portal 2",
  "appid": 620,
  "platform": "PC",
  "cover": "https://example.com/portal-2.jpg",
  "genre": "Puzzle",
  "status": "backlog",
  "rating": 9
}
```

ค่า `status` ที่รองรับคือ `backlog`, `playing`, `completed` และ `dropped` ส่วน `rating` รองรับค่าตั้งแต่ `0` ถึง `10`

### Steam API

Base URL: `/api/steam`

| Method | Endpoint | รายละเอียด | สำเร็จ | ข้อผิดพลาดหลัก |
|---|---|---|---|---|
| `GET` | `/api/steam/search?q=คำค้นหา` | ค้นหาเกมจาก Steam และส่งผลลัพธ์สูงสุด 8 รายการ | `200` | `502` เมื่อเรียก Steam ไม่สำเร็จ |
| `GET` | `/api/steam/details/:appid` | ดึงรายละเอียดเกมจาก Steam ตาม App ID | `200` | `400`, `404`, `502` |

## โครงสร้างข้อมูลเกม

แต่ละเกมมีฟิลด์หลักดังนี้:

- `title` — ชื่อเกม จำเป็นต้องระบุ
- `appid` — Steam App ID
- `platform` — แพลตฟอร์ม
- `cover` — URL รูปปกเกม
- `genre` — ประเภทเกม
- `status` — สถานะการเล่น
- `rating` — คะแนนตั้งแต่ 0 ถึง 10
- `createdAt`, `updatedAt` — วันที่สร้างและแก้ไขข้อมูล

## หลักฐานการดีบัก

วางภาพหลักฐานการดีบักทั้งสองภาพไว้ในโฟลเดอร์ `docs` ด้วยชื่อไฟล์ต่อไปนี้ แล้วภาพจะแสดงใน README:

### ภาพที่ 1: การรันเซิร์ฟเวอร์และการเชื่อมต่อ MongoDB

![Debug 1 - server running](docs/debug-1.png)

### ภาพที่ 2: การทดสอบ API หรือผลลัพธ์จากหน้าเว็บ

![Debug 2 - API test](docs/debug-2.png)

