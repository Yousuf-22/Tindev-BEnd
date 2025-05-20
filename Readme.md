# Data Sanitization

- Shema level validation 
- Api level validation
- "validator" library for validating email, password. dont need to write it manaully/
- NEVER Trust req.body 
- npm "bcrypt" for encrypt the password

# JWT cookie

- install cookie-parcer
- install jwtwebtoken
- create a JWT token (token having random char)
- Token stored inside the cookie
- when user login server generated a JWT token and it is stored in the browser
- whenever user do API calls like (/profile) the Jwt token is send to the server and it is validating.
