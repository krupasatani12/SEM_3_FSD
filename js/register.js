const sb1 = supabase.createClient(
  "https://kbpzvbkwxvyovlpqbemv.supabase.co",
  "sb_publishable_DZyz8ucJpXARt52y7BeHDQ_EWLD2m4n"
);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("reg").onsubmit = registerUser;
});

async function registerUser(e) {
  e.preventDefault();

  const uname = document.getElementById("uname").value.trim();
  const uemail = document.getElementById("uemail").value.trim();
  const umobile = document.getElementById("umobile").value.trim();
  const upass = document.getElementById("upass").value;

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(uemail)) {
    showMessage("Invalid Email Format","Please enter a valid email.");
    return;
  }

  // Password validation
  const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;
  if (!passPattern.test(upass)) {
    showMessage("Invalid Password format","Password must be 5+ chars with 1 Upper, 1 Lower & 1 Digit.");
    return;
  }

  const { data:checkmobile ,error : err1 } = await sb1
  .from('users')
  .select('id')
  .eq("mobile", umobile);

  if(checkmobile && checkmobile.length > 0){
    showMessage("Mobile NUmber Error" ,"Mobile number already registered.");
    return;
  }
  // Check if email already exists
  const { data : checkemail } = await sb1
    .from("users")
    .select("id")
    .eq("email", uemail);

  if (checkemail && checkemail.length > 0) {
    showMessage("Email Error" ,"Email already registered.");
    return;
  }

  // Insert user
  const { error } = await sb1
    .from("users")
    .insert({ 
      "username":uname, 
      "email":uemail,
      "mobile":umobile,
      "password":upass 
    });

  if (error) {
    showMessage("Registration","Registration failed.");
    return;
  }

  showMessage("Registration","Registration successful!");
  document.getElementById("reg").reset();

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}


function showMessage(title,message) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById('modalBody').innerText = message;
  const modal = new bootstrap.Modal(document.getElementById("messageModal"));
  modal.show();
}
