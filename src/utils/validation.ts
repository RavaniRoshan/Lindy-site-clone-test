export interface ValidationErrors {
  [key: string]: string;
}

export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password.trim()) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }
  return '';
};

export const validatePasswordStrength = (password: string): {
  score: number;
  feedback: string[];
  color: string;
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score += 1;
  else feedback.push('At least 8 characters');

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('One lowercase letter');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('One uppercase letter');

  if (/\d/.test(password)) score += 1;
  else feedback.push('One number');

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  else feedback.push('One special character');

  let color = 'bg-red-500';
  if (score >= 4) color = 'bg-green-500';
  else if (score >= 3) color = 'bg-yellow-500';
  else if (score >= 2) color = 'bg-orange-500';

  return { score, feedback, color };
};

export const validateName = (name: string): string => {
  if (!name.trim()) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  if (name.trim().length > 100) {
    return 'Name must not exceed 100 characters';
  }
  return '';
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword.trim()) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};

export const validateLoginForm = (email: string, password: string): ValidationErrors => {
  const errors: ValidationErrors = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = password.trim() ? '' : 'Password is required';
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateRegisterForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationErrors => {
  const errors: ValidationErrors = {};

  const nameError = validateName(name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  return errors;
};