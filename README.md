# Game BackLog

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
## /api/games
## GET 
## pass case
<img width="1162" height="155" alt="image" src="https://github.com/user-attachments/assets/02f29d0f-0d33-4e7b-936d-dc49b5f37c19" />
## fail case
<img width="450" height="281" alt="image" src="https://github.com/user-attachments/assets/cc928b54-995c-47fe-843d-16c2b3fc081a" />

## POST
## pass case
<img width="1177" height="185" alt="image" src="https://github.com/user-attachments/assets/6ec5b622-cba5-4960-ab4c-fadafe53e564" />
## fail case
<img width="643" height="142" alt="image" src="https://github.com/user-attachments/assets/3f10381b-cf6f-49d6-8dc4-530f1df9fee7" />

## PUT
## pass case
<img width="1177" height="177" alt="image" src="https://github.com/user-attachments/assets/24263ff8-3d9c-4271-94ed-c82927aef4ef" />
## fail case
<img width="933" height="126" alt="image" src="https://github.com/user-attachments/assets/b7247668-cc2f-4f34-a6d7-551ca41a897e" />
<img width="475" height="105" alt="image" src="https://github.com/user-attachments/assets/cfb3179b-bbe5-4463-9868-e3faa46de070" />

## DELETE
## pass case
<img width="697" height="103" alt="image" src="https://github.com/user-attachments/assets/cb435cb0-f04f-4ac0-a287-616d7013350f" />
## fail case
<img width="657" height="101" alt="image" src="https://github.com/user-attachments/assets/b7a198bb-b3dd-4e51-be79-a0812a268307" />
<img width="542" height="101" alt="image" src="https://github.com/user-attachments/assets/3dedda5a-d5ae-46f2-9152-d6a017f54998" />

## /api/steam/search
## GET
## pass case
<img width="1345" height="247" alt="image" src="https://github.com/user-attachments/assets/b217e880-ed58-4e7e-bfc5-7a4723673c94" />
## fail case (empty)
<img width="596" height="106" alt="image" src="https://github.com/user-attachments/assets/9e1328c7-8670-4a4b-97af-569766ede121" />

## /api/steam/details/:appid
## GET
## pass case
<img width="1295" height="95" alt="image" src="https://github.com/user-attachments/assets/f23e45c3-6783-4297-ac85-efa795e1ed41" />
## fail case
<img width="513" height="111" alt="image" src="https://github.com/user-attachments/assets/f4b7df0e-2adc-401c-b035-b9bcd54f31c2" />
<img width="665" height="110" alt="image" src="https://github.com/user-attachments/assets/2c443c73-719c-49f6-9854-5498677078d0" />






