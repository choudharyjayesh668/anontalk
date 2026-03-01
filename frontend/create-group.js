const token = localStorage.getItem("token");
const API = "http://localhost:5000/api/groups";

if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
}

/* ================= CREATE GROUP ================= */

async function createGroup() {
    // 🔥 SAFE WAY — get element at click time
    const input = document.getElementById("groupName");

    if (!input) {
        alert("Input not found. Please refresh page.");
        console.error("groupName input not found");
        return;
    }

    const name = input.value.trim();

    if (!name) {
        alert("Enter group name");
        return;
    }

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ name }),
        });

        const data = await res.json();
        console.log("Create group response:", data);

        if (!res.ok) {
            alert(data.message || "Error creating group");
            return;
        }

        alert("Group created ✅");
        window.location.href = "group.html";

    } catch (err) {
        console.error("Create group error:", err);
        alert("Server error");
    }
}