// Function to generate OTP 
function generateOTP() { 

	// Declare a digits variable 
	// which stores all digits 
	let digits = '0123456789'; 
	let OTP = ''; 
	let len = digits.length 
	for (let i = 0; i < 4; i++) { 
		OTP += digits[Math.floor(Math.random() * len)]; 
	} 
	return OTP; 
} 
