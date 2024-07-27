import React, { useState } from "react";
import { Link } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState("request"); // Bắt đầu ở bước request

  // Gửi mã xác thực
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username }), // Gửi cả email và username
        }
      );
      const data = await response.text(); // Chuyển sang text để kiểm tra phản hồi

      if (response.ok) {
        setMessage(data || "Reset code sent");
        setStep("verify"); // Chuyển sang bước nhập mã xác thực
      } else {
        setMessage(data || "Failed to send reset code");
      }
    } catch (error) {
      console.error("Error sending reset code:", error);
      setMessage("Failed to send reset code");
    }
  };

  // Xác thực mã và chuyển sang bước reset password
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const code = e.target.elements.code.value; // Lấy mã xác thực từ form
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}auth/verify-reset-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code }), // Gửi cả email và code để xác thực
        }
      );
      const data = await response.text();

      if (response.ok) {
        setMessage(data || "Code verified successfully");
        setStep("reset"); // Chuyển sang bước reset password
      } else {
        setMessage(data || "Failed to verify code");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setMessage("Failed to verify code");
    }
  };

  // Đặt lại mật khẩu
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newPassword = e.target.elements.newPassword.value;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );
      const data = await response.text();

      if (response.ok) {
        setMessage(data || "Password reset successfully");
        // Có thể thực hiện chuyển hướng tới trang login hoặc thông báo thành công
      } else {
        setMessage(data || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Failed to reset password");
    }
  };

  return (
    <div>
      {step === "request" && (
        <div>
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <button type="submit">Send Reset Code</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}

      {step === "verify" && (
        <div>
          <h2>Verify Reset Code</h2>
          <form onSubmit={handleVerifyCode}>
            <div>
              <label>Reset Code:</label>
              <input
                type="text"
                name="code" // Đảm bảo tên của trường input là 'code'
                required
              />
            </div>
            <button type="submit">Verify Code</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}

      {step === "reset" && (
        <div>
          <h2>Reset Password</h2>
          <form onSubmit={handleResetPassword}>
            <div>
              <label>New Password:</label>
              <input type="password" name="newPassword" required />
            </div>
            <button type="submit">Reset Password</button>
          </form>
          {message && <p>{message}</p>}
        </div>

      )}
      <Link to="/" className="mt-3 text-sm text-stone-500 hover:text-stone-700 focus:text-stone-700 focus:outline-none">
              Quay lại trang đăng nhập
            </Link>
    </div>
  );
};

export default ForgotPassword;
