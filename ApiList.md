# TinDev

## authRouter

- POST /signup
- POST /login
- POST /logout

## ProfileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## ConnectionReqRouter

- POST /request/send/:status/:userId

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- POST /request/review/:status/:requestId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter

- GET /user/connnections
- GET /user/requests
- GET /user/feed - Gets you the profiles of the other users on platform

status : ignore, interested, accepted, rejected
