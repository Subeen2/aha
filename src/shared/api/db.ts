// pages/api/db.js
import { Pool } from "pg";

const pool = new Pool({
  user: "subeen",
  host: "localhost",
  database: "postgres",
  password: process.env.PG_PASSWORD,
  port: 5432, // 기본 포트
});

export default pool;
