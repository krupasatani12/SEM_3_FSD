const _supabase = supabase.createClient("https://kbpzvbkwxvyovlpqbemv.supabase.co",
    "sb_publishable_DZyz8ucJpXARt52y7BeHDQ_EWLD2m4n");

document.addEventListener("DOMContentLoaded", () => {
    sales_table()
});

user_id = localStorage.getItem('user_id')

async function sales_table() {
    const { data, error } = await _supabase
        .from("sales")
        .select("*")
        .eq("user_id",user_id)
        .order("id", { ascending: false });

    if (error) {
        console.log(error);
        return;
    }

    const tableBody = document.getElementById("sbody");
    tableBody.innerHTML = "";

    data.forEach((sales) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
      <td>${sales.item_name}</td>
      <td>${sales.quantity_sold}</td>
      <td>${sales.total_amount}</td>
      <td>${sales.profit}</td>
      <td>${sales.sold_date}</td>

    `;

        tableBody.appendChild(tr);
    });
}