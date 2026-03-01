const API = "http://localhost:5000/api/auth";

// ✅ LOGIN FUNCTION (called by button or form)
async function login(event) {
    if (event) event.preventDefault(); // 🔥 prevents form refresh

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Login failed");
            return;
        }

        // ✅ extract token safely
        let token = data.token || data.accessToken;

        if (!token) {
            alert("Token not received from server");
            console.error("Login response:", data);
            return;
        }

        // ✅ remove Bearer if backend sends it
        if (token.startsWith("Bearer ")) {
            token = token.slice(7).trim();
        }

        // ✅ SAVE TOKEN (CRITICAL)
        localStorage.setItem("token", token);

        console.log("TOKEN SAVED:", token);

        // ✅ redirect
        window.location.href = "index.html";

    } catch (err) {
        console.error("Login error:", err);
        alert("Server error");
    }
}

// ✅ GO TO REGISTER PAGE
function goRegister() {
    window.location.href = "register.html";
}