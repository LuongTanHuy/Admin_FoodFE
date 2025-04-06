import { requestWithAuth } from "../api/token";

// lấy danh sách đơn hàng theo trạng thái
const getOrderItemsByStatus = async (statusOrder) => {
  try {
    const response = await requestWithAuth(
      "get",
      `/orderItem`,
      null,
      {
        params: {
          statusOrder: statusOrder,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách OrderItem:", error.message);
    throw error;
  }
};
export {getOrderItemsByStatus};
