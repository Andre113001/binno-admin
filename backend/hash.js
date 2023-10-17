const bcrypt = require('bcrypt');
const hash = require('sha256');

// Function to test bcrypt
async function testBcrypt() {
  try {

    const accessKey_string = '111222333';

    const accessKey = hash(accessKey_string).toString('base64');

    console.log(accessKey);

    // Replace 'entered_password' with the actual password you want to hash
    const entered_password = 'password2';

    // Hash the password
    const hashedPassword = await bcrypt.hash(entered_password, 10)

    console.log('Original Password:', entered_password);
    console.log('Hashed Password:', hashedPassword);

    // Simulate password comparison
    const passwordMatch = await bcrypt.compare(entered_password, hashedPassword);

    if (passwordMatch) {
      console.log('Password matches!');
    } else {
      console.log('Password does not match!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the test function
testBcrypt();
