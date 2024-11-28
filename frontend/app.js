document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // User Authentication
    const loginForm = document.getElementById('Login');
    const signupForm = document.getElementById('SignUp');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const userNameDisplay = document.getElementById('userNameDisplay');

    // Simple user storage (in a real app, use secure backend authentication)
    const users = JSON.parse(localStorage.getItem('users')) || {};

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (users[username] && users[username] === password) {
            welcomeMessage.classList.remove('hidden');
            userNameDisplay.textContent = username;
            loginForm.reset();
        } else {
            alert('Invalid username or password');
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        if (users[username]) {
            alert('Username already exists');
        } else {
            users[username] = password;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Sign up successful! Please log in.');
            signupForm.reset();

            // Automatically switch to login tab
            document.querySelector('.tab-btn[data-tab="login"]').click();
        }
    });

    // Thought Addition Logic
    const thoughtInput = document.getElementById('thoughtInput');
    const addThoughtBtn = document.getElementById('addThoughtBtn');

    addThoughtBtn.onclick = async ()=>{
        const thoughtText = thoughtInput.value;

        let Res = await axios.post("http://localhost:8000/api/message/",{"Data":thoughtText,"User":User})
    }
    
    
});

const thoughtList = document.getElementById('ThoughtList');

let Data = [
    { id: 1, text: "I love coding!" },
    { id: 2, text: "I'm excited about the future of technology!" },
    { id: 3, text: "I'm grateful for the opportunities I've had." }
]

function renderThoughts() {
    console.log(thoughtList);
    thoughtList.innerHTML = "";
    Data.forEach(thought => {
       
        thoughtList.innerHTML+= `

        <p>${thought.text}</p>

        `
    });
}


renderThoughts()





let signup = document.getElementById('signup');

let User;
signup.addEventListener('submit', async function(e) {
    e.preventDefault(); // prevent form from submitting
    console.log('Sign up clicked');
    let username = e.target[0].value;
    let password = e.target[1].value;

    let Res = await axios.post("http://localhost:8000/auth/signup/",{username: username, password: password});
    console.log(Res);
    if(Res.status == 201){
        alert("Sign up successful");
        User = Res.data;
        
    }else{
        alert("Username already exists");
    }

});


let login = document.getElementById('loin');


signup.addEventListener('submit', async function(e) {
    e.preventDefault(); // prevent form from submitting
    console.log('login clicked');
    let username = e.target[0].value;
    let password = e.target[1].value;

    let Res = await axios.post("http://localhost:8000/auth/login/",{username: username, password: password});
    console.log(Res);
    if(Res.status == 201){
        alert("Login  successful");

    }else{
        alert("Lonim already exists");
    }

});




