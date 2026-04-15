const _supabase = supabase.createClient(
    "https://kbpzvbkwxvyovlpqbemv.supabase.co",
    "sb_publishable_DZyz8ucJpXARt52y7BeHDQ_EWLD2m4n"
);

document.addEventListener("DOMContentLoaded", () => {
    const stock = document.getElementById("stockin");
    stock.onsubmit = stockIn;
});


async function stockIn(e) {
    e.preventDefault();

    // 1. Get values and fix types
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("cat").value;
    const qty = parseInt(document.getElementById("qty").value);
    const exp = document.getElementById("exp").value;
    const buy = parseFloat(document.getElementById("buy").value);
    const sell = parseFloat(document.getElementById("sell").value);

    // FIX: Add 'const' to u_id
    const u_id = localStorage.getItem("user_id");

    // const today = new Date();
    // today.setHours(0, 0, 0, 0); 
    const today = new Date().toLocaleDateString('en-CA');
    const expDate = new Date(exp).toLocaleDateString('en-CA');

    // 2. Validations
    if (expDate <= today) {
        showModal("Date Error", "Expiry date must be greater than current date");
        return;
    }

    if (buy >= sell) {
        showModal("Price Error", "Selling price must be higher than buying price.");
        return;
    }

    // 3. Duplicate Check
    const { data, error: fetchError } = await _supabase
        .from('inventory')
        .select('id')
        .eq('item_name', name)
        .eq('user_id', u_id);

    if (fetchError) {
        console.error("Fetch error:", fetchError);
        return;
    }

    if (data && data.length > 0) {
        showModal("Name Error", "Item already exists in your inventory!");
        return;
    }

    const { error } = await _supabase
        .from("inventory")
        .insert([{
            user_id: u_id,
            item_name: name,
            category: category,
            quantity: qty,
            exp_date: expDate,
            buying_price: buy,
            selling_price: sell,
            arrived:expDate
        }]);

    if (error) {
        console.error("Supabase Error:", error);
        alert("Error: " + error.message);
        return;
    }

    showModal("Success", "Item added successfully!");
    document.getElementById('stockin').reset();
}


function showModal(title, message) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalBody").innerText = message;

    const modal = new bootstrap.Modal(document.getElementById("messageModal"));
    modal.show();
}