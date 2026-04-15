const _supabase = supabase.createClient(
  "https://kbpzvbkwxvyovlpqbemv.supabase.co",
  "sb_publishable_DZyz8ucJpXARt52y7BeHDQ_EWLD2m4n"
);

document.addEventListener("DOMContentLoaded", () => {
  loadDashboard()
});


async function loadDashboard() {
  const u_id = localStorage.getItem("user_id");
  const { data: inventory } = await _supabase.from("inventory").select("*").eq("user_id", u_id);

  // Get dates for 7-day alert check
  const today = new Date();
  const day7 = new Date();
  day7.setDate(today.getDate() + 7);

  let tableHTML = "";
  let alertHTML = "";

  inventory.forEach(item => {
    // 1. Build the Table Row for every item
    tableHTML += `
            <tr>
                <td>${item.item_name}</td>
                <td>${item.quantity}</td>
                <td>${item.exp_date}</td>
                <td>${item.selling_price}</td>
                <td>${item.buying_price}</td>
            </tr>`;

    // 2. Build the Alert Card ONLY if expiring within 7 days
    const expDate = new Date(item.exp_date);
    if (expDate > today && expDate <= day7) {
      alertHTML += `
                <div class="card bg-dark text-white p-2 mb-2">
                    <strong>${item.item_name}</strong>
                    <span class="text-danger">Expires: ${item.exp_date}</span>
                </div>`;
    }
  });

  // 3. Push the strings into your HTML
  document.getElementById("inventoryBody").innerHTML = tableHTML;
  document.getElementById("alertSection").innerHTML = alertHTML || "<p>No alerts!</p>";
}
