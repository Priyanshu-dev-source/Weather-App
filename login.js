import { alertPopUp, openScreen } from "./index.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence, sendPasswordResetEmail,} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";


const firebaseConfig = {
    apiKey: "YOUR API KEY",
    authDomain: "beats-bf385.firebaseapp.com",
    databaseURL: "YOUR BATABASE URL",
    projectId: "beats-bf385",
    storageBucket: "beats-bf385.appspot.com",
    messagingSenderId: "368226441802",
    appId: "YOUR APP ID",
    measurementId: "G-3TZX1RVZSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();
let forgotEmail = document.getElementById("forgotemail")




function signUp() {
    console.log("singup")
    var username = document.getElementById("signup-username").value
    var email = document.getElementById("signup-email").value
    var password = document.getElementById("signup-password").value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            var userId = user.uid

            set(ref(db, 'users/' + userId), {
                username: username,
                email: email
            });
            // ...
            // console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            alertPopUp("User already exists", "red")
            // ..
        });
}

function signIn() {
    console.log("login")
    var email = document.getElementById("login-email").value
    var password = document.getElementById("login-password").value

    if (!email && !password) return alertPopUp("Enter Credentials", "red")

    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)



                // ...
            })
                .catch((error) => {
                    const errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === "auth/too-many-requests") {
                        alertPopUp("Please try later", "red")
                    }
                    else if (errorCode === "auth/wrong-password") {
                        alertPopUp("Invalid Credential", "red")
                    }
                    console.log(errorCode)
                });;
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            alertPopUp(errorCode, "red")
            console.log(errorCode)
        });

}

function isUserLoggedIn() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const dbRef = ref(getDatabase());
            const uid = user.uid;

            get(child(dbRef, `users/${uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    // console.log(snapshot.val());
                    sessionStorage.setItem("username", snapshot.val().username)
                    sessionStorage.setItem("email", snapshot.val().email)
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });

            document.getElementById("signout").style.display = "block"
            document.getElementsByClassName("login-signup-form")[0].style.transform = "translateY(100%)"
            setTimeout(() => {
                document.getElementsByClassName("login-signup-form")[0].style.display = "none"
                document.getElementsByClassName("head-container")[0].style.display = "flex"
                setTimeout(() => {
                    document.getElementsByClassName("side-navbar")[0].style.transform = "translateX(0)"
                    document.getElementsByClassName("middle-items-container")[0].style.transform = "translateX(0%)"
                    openScreen("main")
                }, 100);
            }, 300);
            // console.log("Logged in")
            alertPopUp("Logged in", "lightgreen")
            document.getElementsByClassName("create-account-button")[0].style.display = "none"
            // ...
        } else {
            // User is signed out
            // ...
            // document.getElementsByClassName("create-account-button")[0].style.display="flex"

            document.getElementById("signout").style.display = "none"

            // console.log("Logged out")
            alertPopUp("Logged out", "lightgreen")
        }
    });
}


function logout() {
    signOut(auth).then(() => {
        console.log("Signedout sucessfully")
    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
}

function passwordReset() {
    sendPasswordResetEmail(auth, forgotEmail.value)
        .then(() => {
            forgotEmail = ""
            alertPopUp("Message Sent", "lightgreen")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alertPopUp("Enter correct Email", "red")
        });

}

document.getElementById("signup-submit").addEventListener("click", () => {
    signUp()
})
document.getElementById("login-submit").addEventListener("click", () => {
    signIn()
})
document.getElementById("signout").addEventListener("click", () => {
    window.location.reload()
    logout()
})

document.getElementById("forgot-button").addEventListener("click", () => {
    passwordReset()
})
isUserLoggedIn()



