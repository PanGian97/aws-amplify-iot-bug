This is a sample application built only for demonstration of a bug i recently discovered with AWS Amplify PubSub library (same behavior is seen on aws-iot-device-sdk too).

This app is linked with a cognito user pool that contains 2 users.
* User 1 with the email 'pangianmain@gmail.com' (which happens to be my email :P) with permissions to connect to aws-iot.
* User 2 with email 'pg@gmail.com' (artificial email address only for testing purpuses, though i manually verified it from user pool settings) without permissions to connect to aws-iot.
Both share the same password '1234qwer'

The purpose of this example is to demonstrate that the connection of one user to aws iot is not closed automatically on user sign-out. The connection stays valid even after next user sign-in. This can create a serious problem cause basically the next user will still recieve previous user's data EVEN if he does NOT has permission even to connect to aws-iot.

On this example both users attempt to connect on aws-iot and subscribe to a topic(you can put one in the required field in the code), later on browser console you can see the message if connection and subscription is succesfull or an error message if the user does not has the required permission ('pg@gmail.com' in our case). 

Feel free to notice that if you connect with User1 and then sign-out and switch to User2 you will notice that you will still be able to recieve messages (keeps User1 connection open) and vice versa.

**IF YOU RELOAD THE PAGE AFTER SIGN-IN EVERYTHING WORKS FINE (it closes the previous open connection)**

The only way i found to fix this is by removing manually the connection "PubSub.removePluggable()" on user sign-out after unsubscribing from the topic (far from a best prectice though).

Feel free to inform me for further info or any better solution :))
