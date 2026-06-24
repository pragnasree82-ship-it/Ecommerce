const cart = JSON.parse(localStorage.getItem("cart")) || [];

const addButtons = document.querySelectorAll(".product-card button");

addButtons.forEach(button => {
    button.addEventListener("click", () => {

        const card = button.parentElement;

        const product = {
            name: card.querySelector("h3").innerText,
            price: card.querySelector(".price").innerText
        };

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(product.name + " added to cart");
    });
});
const cartItemsContainer = document.getElementById("cart-items");

if(cartItemsContainer){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach((item,index)=>{

        const div = document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.price}</p>
            <button onclick="removeItem(${index})">
                Remove
            </button>
        `;

        cartItemsContainer.appendChild(div);
    });

    document.getElementById("total-items").innerText =
    `Total Items: ${cart.length}`;
}

function removeItem(index){

    const cart = JSON.parse(localStorage.getItem("cart"));

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
}
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        try {

            const response = await fetch(
                "/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data =
                await response.json();

            alert(data.message);

            if (response.ok) {
                window.location.href =
                    "login.html";
            }

        } catch (error) {

            console.log(error);

            alert("Registration failed");
        }
    });
}
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;

        try {

            const response = await fetch(
                "/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data =
                await response.json();

            if (response.ok) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                alert("Login Successful");

                window.location.href =
                    "index.html";

            } else {

                alert(data.message);
            }

        } catch (error) {

            console.error(error);

            alert("Login failed");
        }
    });
}