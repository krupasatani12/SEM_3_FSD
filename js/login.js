const sb = supabase.createClient(
    "https://kbpzvbkwxvyovlpqbemv.supabase.co",
    "sb_publishable_DZyz8ucJpXARt52y7BeHDQ_EWLD2m4n"
);

document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("login1");
    localStorage.removeItem("user_id");
    login.onsubmit = handleLogin;
});

async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('l_email').value.trim();
    const pass = document.getElementById('l_pass').value;

    const { data, error } = await sb
        .from('users')
        .select('id, username')
        .eq('email', email)
        .eq('password', pass);

    if (error) {
        alert("Database error!");
        console.log(error);
        return;
    }

    if (!data || data.length === 0) {
        showModal("Login Failed", "Invalid email or password", "error");
        return;
    }

    // ✅ Correct credentials
    showModal("Success", "Welcome "+ data[0].username);
    localStorage.setItem("user_id", data[0].id);
    document.getElementById('login1').reset();
    setTimeout(() => {
        window.location.href = "home.html";
    }, 1500);   // waits 1.5 seconds
}

function showModal(title, message) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalBody").innerText = message;

    const modal = new bootstrap.Modal(document.getElementById("messageModal"));
    modal.show();
}