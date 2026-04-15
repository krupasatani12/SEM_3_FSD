const sup = supabase.createClient(
    "https://kbpzvbkwxvyovlpqbemv.supabase.co",
    "sb_publishable_DZyz8ucJpXARt52y7BeHDQ_EWLD2m4n"
);

document.addEventListener("DOMContentLoaded", () => {
    const up = document.getElementById("updateForm");
    up.addEventListener("submit", updateProduct);

    // const dlt = document.getElementById("deleteForm");
    // dlt.addEventListener("submit", deleteProduct);

    loadProducts();
    // loadProductsdel();

});

const userId = localStorage.getItem("user_id");

async function loadProducts() {

    const { data, error } = await sup
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

async function updateProduct(e) {
    e.preventDefault();


    const name = document.getElementById("product").value;
    const new_price = document.getElementById("newPrice").value.trim();

    const { data } = await sup
        .from('inventory')
        .select("buying_price")
        .eq("item_name", name)
        .eq("user_id", userId)

    if (data[0].buying_price >= new_price) {
        showModal("Price Error", "Selling price must be higher than buying price.");
        return;
    }

    const { data: updated } = await sup
        .from('inventory')
        .update({ selling_price: new_price })
        .eq('user_id', userId)
        .eq('item_name', name)
    showModal("Success", "Price Updated Successfully")
    document.getElementById("updateForm").reset()
}


// async function loadProductsdel() {

//     const { data, error } = await sup
//         .from("inventory")
//         .select("*")
//         .eq("user_id", userId);

//     if (error) return console.error("Load Error:", error.message);

//     const select = document.getElementById("del");
//     select.innerHTML = `<option value="" disabled selected>Select product</option>`;

//     data.forEach(item => {
//         if (item.quantity > 0) {
//             select.innerHTML += `<option value="${item.item_name}">${item.item_name} (Stock: ${item.quantity})</option>`;
//         }
//     });
// }

// async function deleteProduct(e) {
//     const delpro = document.getElementById('del').value;
//     const { data, err } = await sup
//         .from('inventory')
//         .delete()
//         .eq('item_name', delpro)
//         .eq('user_id', userId)


//     showModal("Delete", "Item Deleted Successfully")
//     return

//     if (err) {
//         alert(err)
//     }
// }

function showModal(title, message) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalBody").innerText = message;

    const modal = new bootstrap.Modal(document.getElementById("messageModal"));
    modal.show();
}
