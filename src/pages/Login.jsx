import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/account"; 
import { IoMail, IoEye, IoEyeOff } from "react-icons/io5";
import { FiLock } from "react-icons/fi";

const Login = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showAlert = (message) => {
    alert(message);
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showAlert("Email không đúng định dạng");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      showAlert("Mật khẩu phải có ít nhất 8 ký tự.");
      return false;
    }
    return true;
  };

const handleLogin = async () => {
  if (!validateEmail() || !validatePassword()) return;

  try {
    setLoading(true);
    const result = await login(email, password);
    
    if (result?.accessToken) {
      showAlert("Đăng nhập thành công!");
      navigate("/shopdashboards");
    } else {
      showAlert(result?.error || "Sai tài khoản hoặc mật khẩu hoặc đã bị khóa");
    }
  } catch (error) {
    showAlert("Lỗi hệ thống! Vui lòng thử lại sau.");
    console.error("Lỗi login:", error);
  } finally {
    setLoading(false);
  }
};


  const CardLogo = memo(() => (
    <div style={styles.containerLogo}>
      <img
        src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTAzKCbdTwdT1HkRMtF0BS_jqw71dJhBybbEQ-tGKZLfwzVgM_7"
        alt="Logo"
        style={styles.sizeImage}
      />
    </div>
  ));

  return (
    <div style={styles.pageContainer}>
      <div style={styles.screen}>
        <CardLogo />
        <div style={styles.containerInput}>
          <label style={styles.textTitleInput}>Email</label>
          <div style={styles.lineInput}>
            <IoMail size={24} color="#8d9a9b" style={styles.iconInput} />
            <input
              type="email"
              placeholder="Nhập email của bạn!"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.textInput}
            />
          </div>
        </div>
        <div style={styles.containerInput}>
          <label style={styles.textTitleInput}>Mật khẩu</label>
          <div style={styles.lineInput}>
            <FiLock size={24} color="#8d9a9b" style={styles.iconInput} />
            <input
              type={isPasswordShown ? "text" : "password"}
              placeholder="Nhập mật khẩu!"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.textInput}
            />
            <button
              onClick={() => setIsPasswordShown(!isPasswordShown)}
              style={styles.iconShowPassword}
            >
              {isPasswordShown ? <IoEyeOff size={24} color="#8d9a9b" /> : <IoEye size={24} color="#8d9a9b" />}
            </button>
          </div>
        </div>
        <button onClick={handleLogin} style={styles.buttonSubmit} disabled={loading}>
          {loading ? "Đang tải..." : "Tiếp tục"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#fff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    padding: "20px",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  containerLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  sizeImage: {
    width: "100%",
    maxWidth: "400px",
    height: "auto",
  },
  textTitleInput: {
    color: "#777",
    fontSize: "16px",
    marginBottom: "5px",
    display: "block",
    textAlign: "left",
    width: "100%",
  },
  containerInput: {
    marginBottom: "15px",
    width: "100%",
  },
  lineInput: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #777",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: "#fff",
  },
  textInput: {
    flex: "1",
    border: "none",
    outline: "none",
    fontSize: "16px",
    color: "#777",
    paddingLeft: "10px",
  },
  iconInput: {
    marginRight: "5px",
  },
  iconShowPassword: {
    border: "none",
    background: "none",
    cursor: "pointer",
    marginLeft: "5px",
  },
  buttonSubmit: {
    marginTop: "20px",
    backgroundColor: "#fac125cb",
    color: "#fff",
    padding: "15px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "300px",
  },
};

export default Login;
