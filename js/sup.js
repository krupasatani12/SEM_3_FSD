const sbase = supabase.createClient(
  "https://kbpzvbkwxvyovlpqbemv.supabase.co",
  "sb_publishable_DZyz8ucJpXARt52y7BeHDQ_EWLD2m4n"
);

const u_id = localStorage.getItem("user_id");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("supplier").onsubmit = addSupplier
  supp_table();
});

async function addSupplier(e) {
  e.preventDefault();

  const name = document.getElementById("sname").value.trim();
  const email = document.getElementById("semail").value.trim();
  const mobile = document.getElementById("snum").value.trim();

  // Basic Email Regex
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showMessage("Email Error", "Invalid Email format!");
    return;
  }

  // Duplicate Check
  const { data: existing } = await sbase
    .from("suppliers")
    .select("email, phone")
    .or(`email.eq.${email},phone.eq.${mobile}`)
    .eq("user_id", u_id);

  if (existing && existing.length > 0) {
    showMessage("Duplicate Entry", "This Email or Mobile is already registered.");
    return;
  }

  // Insert to Database
  const { error: insertError } = await sbase.from("suppliers").insert([
    {
      supplier_name: name,
      email: email,
      phone: mobile,
      user_id: u_id // MUST be a valid UUID format
    }
  ]);

  if (insertError) {
    console.error("Insert Error:", insertError);
    // Show the actual error message to debug the 400 error
    showMessage("Database Error", insertError.message);
    return;
  }

  showMessage("Success", "Supplier added successfully!");
  document.getElementById('supplier').reset();
  supp_table();
}

async function supp_table() {
  const { data, error } = await sbase
    .from("suppliers")
    .select("*")
    .eq("user_id", u_id)
    .order("id", { ascending: false });

  if (error) return console.error("Load Error:", error);

  const tableBody = document.getElementById("sbody");
  let tableHTML = "";
  data.forEach(item => {
    // 1. Build the Table Row for every item
    tableHTML += `
            <tr>
                <td>${item.supplier_name}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
            </tr>`;
      }
  )
  tableBody.innerHTML = tableHTML;
  
}

function showMessage(title, message) {
      document.getElementById("modalTitle").innerText = title;
      document.getElementById('modalBody').innerText = message;
      const modal = new bootstrap.Modal(document.getElementById("messageModal"));
      modal.show();
    }