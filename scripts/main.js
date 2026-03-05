const fetchData = async() => {
    const catPromise = await fetch('https://openapi.programming-hero.com/api/categories');
    const catData = await catPromise.json();
    loadCategoryData(catData.categories);

    const treePromise = await fetch('https://openapi.programming-hero.com/api/plants');
    const treeData = await treePromise.json();
    loadAllTree(treeData.plants);
}

fetchData();

loadCategoryData = (data) => {
    // console.log(data)
    const categoryContainer = document.getElementById('category-container');
    data.forEach(cat => {
        const catBtn = document.createElement('button');
        catBtn.classList.add('btn', 'btn-outline', 'capitalize', 'w-full', 'cat-btn-all');
        catBtn.innerHTML = `
        ${cat.category_name}
        `
        categoryContainer.append(catBtn);
    });
}

loadAllTree = (data) => {
const allTreeContainer = document.getElementById('all-tree-container');
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
        <button onclick="addToCart()" class="btn btn-accent capitalize">cart</button>
    </div>
</div>
</div>
`
allTreeContainer.append(div);
});
}