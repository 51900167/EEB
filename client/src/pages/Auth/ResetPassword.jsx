// import React, { useState } from 'react';

// const ResetPassword = ({ email }) => {
//   const [code, setCode] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}auth/reset-password`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, code, newPassword }),
//       });
//       const data = await response.text();
  
//       if (response.ok) {
//         setMessage(data || 'Password reset successfully');
//       } else {
//         setMessage(data || 'Failed to reset password');
//       }
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       setMessage('Failed to reset password');
//     }
//   };
  

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Reset Code:</label>
//           <input
//             type="text"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>New Password:</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Reset Password</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ResetPassword;