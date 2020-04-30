# Spring Boot JWT Example with Firebase Authentication
> Spring Security OAuth2 implementation to make use of JSON Web Tokens

- Firebase Authentication
- Cloud Firestore
- React
- Spring Boot
- Spring Security
- JWT

> [Do it yourself!](DIY.md)

## Project Structure
```
└── src
    └── main
        ├── docker 
        ├── java
        ├── javascript
        └── resources
```

# Usage
1. Create a Firebase Application on Firebase ([more information](https://gitlab.eteration.com/blogs/www/blob/master/2019/October/Firebase.md#creating-a-firebase-application))
    - Activate Sign-in Providers: Email/Password and Google.
    - Create Database (Cloud Firestore)
2. Create a web app on your Firebase Project Settings
    - Replace your config with `src/main/javascript/app/firebaseConfig.js`
    ```js
    const firebaseConfig = {
        apiKey: '<your-apiKey>',
        authDomain: '<your-authDomain>',
        databaseURL: '<your-databaseURL>',
        projectId: '<your-projectId>',
        storageBucket: '<your-storageBucket>',
        messagingSenderId: '<your-messagingSenderId>',
        appId: '<your-appId>',
    };

    export default firebaseConfig;
    ```
3. Create a service account for Java on your Firebase Project Settings
    - Replace your config with `src/main/resources/firebase-service-credentials.json`
    ```json
    {
        "type": "<your-type>",
        "project_id": "<your-project_id>",
        "private_key_id": "<your-private_key_id>",
        "private_key": "<your-private_key>",
        "client_email": "<your-client_email>",
        "client_id": "<your-client_id>",
        "auth_uri": "<your-auth_uri>",
        "token_uri": "<your-token_uri>",
        "auth_provider_x509_cert_url": "<your-auth_provider_x509_cert_url>",
        "client_x509_cert_url": "<your-client_x509_cert_url>"
    }
    ```
4. Replace your `project id` on `src/main/resources/application.yml`

## React
Open the project from CLI and run the following commands:

    cd src/main/javascript
    npm i
    npm start

## Spring Boot
Open the project from CLI and run the following commands:

To install npm packages: 
> If you installed packages you don't need to run this command

    ./gradlew npmInstall

To build react app:
    
    ./gradlew npmBuild

To copy build output to src/main/resources/web:
    
    ./gradlew copyNewBuild

To build Java app:

    ./gradlew build

To create docker image for the whole application:

    ./gradlew docker 

Once the build has finished, you can start the application via the command-line. Go to `build/libs` folder and execute the jar file:

    java -jar firebase-0.0.1-SNAPSHOT.jar

Point your browser to it and you should see the newly created React app running.

    http://localhost:8080

To dockerize the application:

    ./gradlew docker

To run docker image:

    docker run --rm -it -p 8080:8080 iethem/firebase

# Retrieving/Validating ID tokens
> Use the React application to get ID tokens, the Spring Boot application does not provide ID tokens.

When a user or device successfully signs in, Firebase creates a corresponding ID token that uniquely identifies them and grants them access to several resources, such as Firebase Realtime Database and Cloud Storage. We can re-use that ID token to identify the user or device on our custom backend server. To retrieve the ID token from the client (React), make sure the user is signed in and then get the ID token from the signed-in user:
```js
firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
  console.log(idToken)
  // Send token to your backend via HTTPS
  // ...
}).catch(function(error) {
  // Handle error
});

// Check src/main/javascript/app/utils/request.js
```

Once we have an ID token, we can send that JWT to our backend and validate it:
```command
curl http://localhost:8080/api/user
	-H "Accept: application/json"
	-H "Authorization: Bearer {idToken}"
```

# Reference
You can find a related post for this repository [here](https://gitlab.eteration.com/blogs/www/blob/master/2019/October/Firebase.md). 

# License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
