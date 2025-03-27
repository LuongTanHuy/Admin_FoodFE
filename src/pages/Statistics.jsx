import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { Select, Button } from "antd";

import "../css/Statistics.css";

const { Option } = Select;

const Statistics = () => {
  const [year, setYear] = useState("2024");

  const revenueData = [
    { month: "Tháng 1", revenue: 0 },
    { month: "Tháng 2", revenue: 0 },
    { month: "Tháng 3", revenue: 0 },
    { month: "Tháng 4", revenue: 0 },
    { month: "Tháng 5", revenue: 0 },
    { month: "Tháng 6", revenue: 0 },
    { month: "Tháng 7", revenue: 0 },
    { month: "Tháng 8", revenue: 170 },
    { month: "Tháng 9", revenue: 0 },
    { month: "Tháng 10", revenue: 0 },
    { month: "Tháng 11", revenue: 0 },
    { month: "Tháng 12", revenue: 0 },
  ];

  const orderData = [
    { name: "Đơn Mới", value: 10, color: "#FF6961" },
    { name: "Đang Giao", value: 20, color: "#77DD77" },
    { name: "Đã Giao", value: 15, color: "#AEC6CF" },
    { name: "Đã Hủy", value: 5, color: "#2B2B2B" },
  ];

  return (
    <div style={{ display: "flex", borderRadius: 10, flexDirection: "column", alignItems: "center", background: "#0E1621", padding: 20, color: "white" }}>
      <h2 style={{ marginBottom: 40, marginLeft: -950}} >THỐNG KÊ DOANH THU</h2>
      
        {/* Lọc the0 năm*/}
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Select value={year} onChange={setYear} style={{ width: 120 }}>
          {[2020, 2021, 2022, 2023, 2024, 2025].map((y) => (
            <Option key={y} value={y.toString()}>
              {y}
            </Option>
          ))}
        </Select>
        <Button type="primary">Lọc</Button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 50, marginTop: 20 }}>
        {/* Biểu đồ cột */}
        <BarChart width={700} height={500} data={revenueData}>
          <XAxis dataKey="month" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#FF8C00" name="Tổng Doanh Thu Các Mặt Hàng" />
        </BarChart>

        {/* Biểu đồ tròn + Chú thích */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <PieChart width={300} height={300}>
            <Pie data={orderData} cx={150} cy={150} outerRadius={100} fill="#8884d8" dataKey="value">
              {orderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>

          {/* Chú thích trạng thái đơn hàng */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
            {orderData.map((item, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                <div style={{ width: 15, height: 15, backgroundColor: item.color, marginRight: 10, borderRadius: 3 }}></div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
