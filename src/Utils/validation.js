export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push("Mật khẩu phải có ít nhất 8 ký tự");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("Mật khẩu phải chứa ít nhất một chữ thường");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("Mật khẩu phải chứa ít nhất một chữ hoa");
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push("Mật khẩu phải chứa ít nhất một số");
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Mật khẩu phải chứa ít nhất một ký tự đặc biệt");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}; 