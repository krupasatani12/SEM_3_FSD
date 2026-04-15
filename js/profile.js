const _supabase = window.supabase.createClient(
    "https://kbpzvbkwxvyovlpqbemv.supabase.co",
    "sb_publishable_DZyz8ucJpXARt52y7BeHDQ_EWLD2m4n"
);

document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
});

async function loadProfile() {

    const userId = localStorage.getItem("user_id");

    if (!userId) {
        return;
    }

    const { data, error } = await _supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) {
        console.log(error);
        return;
    }

    document.getElementById("profileName").textContent = data.username;
    document.getElementById("profileMobile").textContent = data.mobile;
    document.getElementById("profileEmail").textContent = data.email;
}

function handleLogout() {
    localStorage.clear()
    window.location.href = "login.html";
}