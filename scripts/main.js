const fetchData = async() => {
    const catPromise = await fetch('https://openapi.programming-hero.com/api/categories');
    const catData = await catPromise.json();
    loadCategoryData(catData.categories);

    const treePromise = await fetch('https://openapi.programming-hero.com/api/plants');
    const treeData = await treePromise.json();
    loadAllTree(treeData.plants);
}

fetchData();

const cartDes = document.getElementById('cart-des');
const cartInfo = document.getElementById('cart-info');
const categoryContainer = document.getElementById('category-container');
const allTreeContainer = document.getElementById('all-tree-container');
const totalCartPrice = document.querySelector('.total-cart-price');

let cart = [];

const loadCategoryData = (data) => {
    // console.log(data)
    data.forEach(cat => {
        const catBtn = document.createElement('button');
        catBtn.classList.add('btn', 'btn-outline', 'capitalize', 'w-full', 'cat-btn-all');
        catBtn.innerHTML = `
        ${cat.category_name}
        `
        categoryContainer.appendChild(catBtn);
        catBtn.addEventListener('click', () => selectCategory(cat.id));
    });
}

const loadAllTree = (data) => {
data.forEach(tree => {
    // console.log(tree)
    const div = document.createElement('div');
div.classList.add('card', 'bg-base-100', 'shadow-sm');
div.innerHTML = `
<div class="card bg-base-100">
  <figure>
    <img class='h-50 w-full' src=${tree.image}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">
      ${tree.name}
      <div class="badge badge-secondary">NEW</div>
    </h2>
    <p>${tree.description}</p>
    <div class="card-actions justify-start">
      <div class="badge badge-outline">${tree.category}</div>
    </div>
    <div class="flex justify-around items-center">
        <p class='font-bold text-xl'>$ <span>${tree.price}</span></p>
        <button onclick="addToCart('${tree.name}', '${tree.price}')" class="btn btn-accent capitalize">cart</button>
    </div>
</div>
</div>
`
allTreeContainer.appendChild(div);
});
}

const selectCategory = (id) => {
  console.log(id)
}

const addToCart = (name, price) => {
  const existingCart = cart.find(item => item.name === name);
  if (existingCart) {
    existingCart.quantity++;
  } else {
    const treeCartData = {
    name,
    price: Number(price),
    quantity: 1
  }
  cart.push(treeCartData);
  }
  renderCart();
}

const renderCart = () => {
  cartInfo.innerHTML = '';
    let total = 0;
  cart.forEach(item => {
    const p = document.createElement('p');
    p.classList.add('font-bold');
    p.innerHTML = `
    ${item.name} ${item.price} x ${item.quantity} = ${item.price * item.quantity}
    `
    cartInfo.appendChild(p);
    total = total + (item.price * item.quantity);
  })
  totalCartPrice.textContent = `$${total}`;
}