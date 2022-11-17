import { fbapp, functions, auth } from "../data/fbase.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-functions.js";
import { sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
// import { getMaxListeners } from "process";

export class BDSSignon extends HTMLElement {
	constructor() {
		super();

		this.innerHTML = `
			<div class="container">
				<div class="signon">
					<h3 class="signonheader">Login</h3>
					<form class="login">
						<input type="email" name="email" placeholder="Email">
						<input type="password" name="password" placeholder="Password">
						<button>Login</button>
						<p class="error"></p>
					</form>
					<div>No account? <a href="#" id="register">Register Instead</a></div>
					<br/>
				</div>
		
				<div class="signon">
					<h3 class="signonheader">Register</h3>
					<form class="register">
						<input type="email" name="email" placeholder="Email">
						<input type="password" name="password" placeholder="Password">
						<button>Register</button>
						<p class="error"></p>
					</form>
					<div>Have an account? <a href="#" id="login">Login Instead</a></div>
					<br/>
				</div>
			</div>
		`;
	}

	connectedCallback() {
		this.addEventListener("submit", (e) => {
			e.preventDefault();
			console.log(e.target.classList.value);
			if (e.target.classList.value === "register") {
				const signonForm = document.querySelector(".register");
				const email = signonForm["email"].value;
				const password = signonForm["password"].value;
				console.log(email,password);
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => { 
                        sendEmailVerification(userCredential.user)
                        .then(() => {
                          // Email verification sent!
                          console.log(`Verification Email sent`);
                        });  
                        // signout to fecilitate email verification
                        signOut(auth).then(() => {}).catch((error) => {});                   
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(`${errorCode} - ${errorMessage}` );
                    });
				 
				// emailjs.send("service_o2qcu12", "template_hi8z58o", {name:email,email:email})
				// 	.then(function(response) {
				// 	   console.log('SUCCESS!', response.status, response.text);
				// 	   alert("Thanks for Registering on Bookdatasolutions.com!");
				// 	}, function(error) {
				// 	   console.log('FAILED...', error);
				// 	});

				// const sendBDSMail = httpsCallable(functions, "sendBDSMail");
				// console.log(`calling sendBDSEmail...`);
				// sendBDSMail({toEmail: email}).then(result => {
				//   console.log(result.data);
				// }).catch(reason => console.log(reason));	

				// Email.send({
				// 	// SecureToken: "8ef9664a-5f6e-4104-8c1a-96d5bcc709b8",
				// 	Host: "mcreg81@gmail.com",//"smtp.zoho.com",//
				// 	Username: "mcreg81@gmail.com",//"support@bookdatasolutions.com",//
				// 	Password: "imnwdsvaqkodmvat",//"3wdd3rmZ3Q2V", //
				// 	To: email,
				// 	From: "mcreg81@gmail.com",//"support@bookdatasolutions.com",//
				// 	Subject: `BDS - Successfull Registeration!`,
				// 	Body: `You have Registered Successfully on BookDataSolutions`
				//   }).then((message) => {
				// 	alert("Thanks for Registering on Bookdatasolutions.com!");
				//   });
			}
            else if (e.target.classList.value === "login") {
				const signonForm = document.querySelector(".login");
				const email = signonForm["email"].value;
				const password = signonForm["password"].value;
                // console.log(email, password);
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        console.log(userCredential.user);
                        if (!userCredential.user.emailVerified) {
                            signOut(auth).then(() => {}).catch((error) => {});
                            alert (`Please Verify Email Before Signing In!`);
                        }
                        else {
                            alert (`${userCredential.user.email} Signed In!`)
                        }
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(`${errorCode} - ${errorMessage}` );
                    });
            }
		
		  });		

		  this.addEventListener("click", (e) => {
			console.log(e.target.id);
			if (e.target.id === "login") {
				const signon = document.querySelectorAll(".signon");
				signon[0].classList.add("active");
				signon[1].classList.remove("active");
			}  
			if (e.target.id === "register") {
				const signon = document.querySelectorAll(".signon");
				signon[1].classList.add("active");
				signon[0].classList.remove("active");
			}
		});

        document.getElementById ("signout").addEventListener("click", (e) => {
                signOut(auth).then(() => {
                    // Sign-out successful.
                  }).catch((error) => {
                    // An error happened.
                  });
        });
  	}
}
window.customElements.define("bds-signon", BDSSignon);