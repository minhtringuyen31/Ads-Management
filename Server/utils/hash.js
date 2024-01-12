import bcrypt from 'bcrypt';

const hashPassword = async (plainPassword) => {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(plainPassword, salt);
      return hash;
    } catch (error) {
      throw error;
    }
  };
  
  const comparePasswords = async (password, hashedPassword) => {
    try {
      const result = await bcrypt.compare(password, hashedPassword);
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  export { hashPassword, comparePasswords };