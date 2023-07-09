export const validateForm = (userData, users, userId = null) => {
  const errors = {};

  const validations = {
    firstName: {
      required: 'First Name is required'
    },
    lastName: {
      required: 'Last Name is required'
    },
    username: {
      required: 'Username is required',
      duplicateErrorMessage: 'Username already exists',
    },
    email: {
      required: 'Email is required',
      format: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      formatErrorMessage: 'Invalid email format',
      duplicateErrorMessage: 'Email already exists',
    },
    password: {
      required: 'Password is required',
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      patternErrorMessage:
        'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    },
    confirmPassword: {
      required: 'Confirm Password is required',
      matchField: 'password',
      matchErrorMessage: 'Passwords do not match',
    },
    expiredDate: {
      required: 'Expired Date is required',
      pastDateErrorMessage: 'Expired date cannot be in the past',
    },
    groupAccess: {
      required: 'Group access is required'
    }
  };

  for (const field in validations) {
    const fieldValidation = validations[field];

    if (typeof fieldValidation === 'string') {
      if (!userData[field]) {
        errors[field] = `${fieldValidation} is required`;
      }
    } else {
      if (fieldValidation.required && !userData[field]) {
        errors[field] = fieldValidation.required;
      }

      if (fieldValidation.format && userData[field] && !fieldValidation.format.test(userData[field])) {
        errors[field] = fieldValidation.formatErrorMessage;
      }

      if (fieldValidation.duplicateErrorMessage && userData[field]) {
        const isDuplicate = users.some((user) => user[field] === userData[field] && user.id !== userId);
        if (isDuplicate) {
          errors[field] = fieldValidation.duplicateErrorMessage;
        }
      }

      if (fieldValidation.pattern && userData[field] && !fieldValidation.pattern.test(userData[field])) {
        errors[field] = fieldValidation.patternErrorMessage;
      }

      if (fieldValidation.matchField && userData[field] !== userData[fieldValidation.matchField]) {
        errors[field] = fieldValidation.matchErrorMessage;
      }

      if (fieldValidation.pastDateErrorMessage && userData[field] && new Date(userData[field]) < new Date()) {
        errors[field] = fieldValidation.pastDateErrorMessage;
      }
    }
  }

  return errors;
};