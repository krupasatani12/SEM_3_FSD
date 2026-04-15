const sup = supabase.createClient(
    "https://qpvbdomdkhqxinbyjgvu.supabase.co",
    "sb_publishable_wbuxJIUhF6vWpwb89EDz0Q_yZO9sYcw"
);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("deleteForm");
    form.addEventListener("submit", delProduct);
    loadProducts();
});

const userId = localStorage.getItem("user_id");

async function loadProducts() {
    const { data, error } = await sup
        .from("inventory")
        .select("*")
        .eq("user_id", userId);

    if (error) return console.error("Load Error:", error.message);

    const select = document.getElementById("delete_product");
    select.innerHTML = `<option value="" disabled selected>Select product</option>`;

    data.forEach(item => {
        if (item.quantity > 0) {
            select.innerHTML += `<option value="${item.item_name}">${item.item_name} (Stock: ${item.quantity})</option>`;
        }
    });
}

async function delProduct(e) {
    e.preventDefault();


    const name = document.getElementById("delete_product").value;

    const { data : err} = await sup
        .from('inventory')
        .delete()
        .eq("item_name", name)
        .eq("user_id", userId)

    if (err) {
        showModal("Error", "Something Went Wrong");
        return;
    }

    showModal("Success", "Product Deleted Successfully")
    document.getElementById("deleteForm").reset()
}

function showModal(title, message) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalBody").innerText = message;

    const modal = new bootstrap.Modal(document.getElementById("messageModal"));
    modal.show();
}