const _supabase = supabase.createClient(
    "https://kbpzvbkwxvyovlpqbemv.supabase.co",
    "sb_publishable_DZyz8ucJpXARt52y7BeHDQ_EWLD2m4n"
);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("salesForm");
    form.addEventListener("submit", sellProduct);
    loadProducts();
});

const userId = localStorage.getItem("user_id");

async function loadProducts() {
    const { data, error } = await _supabase
        .from("inventory")
        .select("*")
        .eq("user_id", userId);

    if (error) return console.error("Load Error:", error.message);

    const select = document.getElementById("product");
    select.innerHTML = `<option value="" disabled selected>Select product</option>`;

    data.forEach(item => {
        if (item.quantity > 0) {
            select.innerHTML += `<option value="${item.item_name}">${item.item_name} (Stock: ${item.quantity})</option>`;
        }
    });
}

async function sellProduct(e) {
    e.preventDefault();

    const productName = document.getElementById("product").value;
    const qty = parseInt(document.getElementById("sellQty").value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Fetch item details
    const { data, error: fetchError } = await _supabase
        .from("inventory")
        .select("*")
        .eq("item_name", productName)
        .eq("user_id", userId);

    // FIX: Check if data array has results
    if (fetchError || !data || data.length === 0) {
        showModal("Product Error", "Product Not Found !!");
        return;
    }

    const item = data[0]; // FIX: Get the actual item object from the array

    // FIX: Check quantity correctly
    if (qty > item.quantity) {
        showModal("Stock Error", `Insufficient stock !`);
        return
    }

    if(item.exp_date <= today){
        showModal("Expiry Alert","Product Is expired !!")
        return
    }

    if(item.quantity-qty === 0 ){
        const { data } = await _supabase
        .from("inventory")
        .delete()
        .eq('item_name',productName)
        .eq('user_id',userId)

    }
    // 2. Insert into Sales Table
    const { error: salesError } = await _supabase
        .from("sales")
        .insert([{
            user_id: userId,
            item_name: productName,
            quantity_sold: qty,
            selling_price: item.selling_price,
            total_amount: qty * item.selling_price,
            profit: qty * (item.selling_price - item.buying_price),
            sold_date: new Date() // Use ISO string for better DB compatibility
        }]);

    if (salesError) {
        console.error("Sales Error:", salesError.message);
        return alert("Failed to record sale: " + salesError.message);
    }

    // 3. Update Inventory Table
    const newQty = item.quantity - qty;
    const { error: invError } = await _supabase
        .from("inventory")
        .update({ quantity: newQty })
        .eq("item_name", productName)
        .eq("user_id", userId);

    if (invError) {
        return alert("Sale recorded, but inventory failed to update.");
    }

    showModal("Item(s) Sold","Transaction Successful!");
    document.getElementById('salesForm').reset()
}

function showModal(title, message) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalBody").innerText = message;

    const modal = new bootstrap.Modal(document.getElementById("messageModal"));
    modal.show();
}