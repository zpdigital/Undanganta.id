const baseUrl = "https://zp.webinvit.id";

const phoneNumber = "6287851484392";

const categoryUrl =
baseUrl + "/seller/api/v1/categories";

let nextPageUrl =
baseUrl + "/seller/api/v1/products/websites?limit=12";

let currentCategoryId = null;



// LOAD THEMES
async function loadThemes(reset = false){

  const container =
  document.getElementById("themes");

  const btn =
  document.getElementById("loadMore");

  btn.innerText = "Loading...";
  
if(reset){

  container.innerHTML = "";

  for(let i = 0; i < 8; i++){

    container.innerHTML += `

      <div
        class="theme-card skeleton"
        style="height:420px"
      >
      </div>

    `;

  }

}



  // RESET
  if(reset){

    container.innerHTML = "";

    nextPageUrl =
    `${baseUrl}/seller/api/v1/products/websites?limit=12`;

    if(currentCategoryId){

      nextPageUrl +=
      `&categoryId=${currentCategoryId}`;

    }

  }



  // STOP
  if(!nextPageUrl){

    btn.style.display = "none";
    return;

  }



  try{

    const response =
    await fetch(nextPageUrl);

    const result =
    await response.json();

    const themes =
    result.data.data || [];



    nextPageUrl =
    result.data.next_page_url || null;



    if(nextPageUrl){

      nextPageUrl =
      nextPageUrl.replace(
        "http:",
        "https:"
      );

    }



    // LOOP
    themes.forEach(theme => {

      const card =
      document.createElement("div");

      card.className =
      "theme-card";



card.innerHTML = `
        <div class="badge-best">

  Best Seller 🔥

</div>
        <div class="theme-image">

        <img
  loading="lazy"
  src="${theme.featured_image}"
  alt="${theme.name}"
>
          >

        </div>

        <div class="theme-content">

          <h3>

            ${theme.name}

          </h3>

          <div class="theme-buttons">

            <a
              href="${baseUrl}/preview/${theme.slug}"
              target="_blank"
              class="preview-btn"
            >

              Preview

            </a>

            <a
              href="https://wa.me/${phoneNumber}?text=Halo Kak Saya mau pesan tema ${theme.name}"
              target="_blank"
              class="order-btn"
            >

              Pesan

            </a>

          </div>

        </div>

      `;
      
      card.classList.add(
  "fade-in"
);

      container.appendChild(card);

    });



    // HIDE BUTTON
    if(!nextPageUrl){

      btn.style.display = "none";

    }

  }catch(error){

    console.log(error);

  }



  btn.innerText = "Load More";

}



// LOAD CATEGORY
async function loadCategories(){

  const container =
  document.getElementById("categories");



  try{

    const response =
    await fetch(categoryUrl);

    const result =
    await response.json();

    const categories =
    result.data || [];



    // BUTTON SEMUA
    const allBtn =
    document.createElement("button");

    allBtn.innerText = "Semua";

    allBtn.className =
    "category-btn active-category";



    allBtn.onclick = () => {

      currentCategoryId = null;

      document
      .querySelectorAll(".category-btn")
      .forEach(btn =>
        btn.classList.remove(
          "active-category"
        )
      );

      allBtn.classList.add(
        "active-category"
      );

      loadThemes(true);

    };



    container.appendChild(allBtn);




    // LOOP CATEGORY
    categories.forEach(category => {

      const button =
      document.createElement("button");

      button.innerText =
      category.name;

      button.className =
      "category-btn";



      button.onclick = () => {

        currentCategoryId =
        category.id;

        document
        .querySelectorAll(".category-btn")
        .forEach(btn =>
          btn.classList.remove(
            "active-category"
          )
        );

        button.classList.add(
          "active-category"
        );

        loadThemes(true);

      };



      container.appendChild(button);

    });

  }catch(error){

    console.log(error);

  }

}



// SEARCH
const searchInput =
document.getElementById("searchInput");



if(searchInput){

  searchInput.addEventListener(
    "keyup",
    function(){

      const value =
      this.value.toLowerCase();

      const cards =
      document.querySelectorAll(
        ".theme-card"
      );



      cards.forEach(card => {

        const title =
        card.innerText.toLowerCase();

        if(title.includes(value)){

          card.style.display =
          "block";

        }else{

          card.style.display =
          "none";

        }

      });

    }
  );

}



// LOAD MORE BUTTON
const loadMoreBtn =
document.getElementById(
  "loadMore"
);



if(loadMoreBtn){

  loadMoreBtn.addEventListener(
    "click",
    () => loadThemes()
  );

}



// INIT
loadCategories();
loadThemes();

// AUTO HIDE HEADER
let lastScroll = 0;

const header =
document.querySelector(".header");

window.addEventListener(
  "scroll",
  () => {

    const currentScroll =
    window.pageYOffset;

    if(currentScroll > lastScroll){

      header.style.transform =
      "translateY(-100%)";

    }else{

      header.style.transform =
      "translateY(0)";

    }

    lastScroll =
    currentScroll;

  }
);