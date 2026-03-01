async function register(){
    const email = document.getElementById("email").value.trim();
    const confirmEmail = document.getElementById("confirmEmail").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // ✅ basic checks
    if(!email || !confirmEmail || !password || !confirmPassword){
        alert("Please fill all fields");
        return;
    }

    // ✅ email match
    if(email !== confirmEmail){
        alert("Emails do not match");
        return;
    }

    // ✅ password match
    if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
    }

    try{
        const res = await fetch("http://localhost:5000/api/auth/register",{
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if(res.status === 201){
            alert("Account created ✅");
            window.location.href = "login.html";
        }else{
            alert(data.message || "Registration failed");
        }

    }catch(err){
        alert("Server error");
    }
}

function goLogin(){
    window.location.href = "login.html";
}