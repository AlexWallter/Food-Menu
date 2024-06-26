const menu = [
    {
      id: 1,
      title: "buttermilk pancakes",
      category: "breakfast",
      price: 15.99,
      img: "./images/item-1.jpeg",
      desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    },
    {
      id: 2,
      title: "diner double",
      category: "lunch",
      price: 13.99,
      img: "./images/item-2.jpeg",
      desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    },
    {
      id: 3,
      title: "godzilla milkshake",
      category: "shakes",
      price: 6.99,
      img: "./images/item-3.jpeg",
      desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    },
    {
      id: 4,
      title: "country delight",
      category: "breakfast",
      price: 20.99,
      img: "./images/item-4.jpeg",
      desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
      id: 5,
      title: "egg attack",
      category: "lunch",
      price: 22.99,
      img: "./images/item-5.jpeg",
      desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    },
    {
      id: 6,
      title: "oreo dream",
      category: "shakes",
      price: 18.99,
      img: "./images/item-6.jpeg",
      desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    },
    {
      id: 7,
      title: "bacon overflow",
      category: "breakfast",
      price: 8.99,
      img: "./images/item-7.jpeg",
      desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
    },
    {
      id: 8,
      title: "american classic",
      category: "lunch",
      price: 12.99,
      img: "./images/item-8.jpeg",
      desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    },
    {
      id: 9,
      title: "quarantine buddy",
      category: "shakes",
      price: 16.99,
      img: "./images/item-9.jpeg",
      desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
  ];

const menuItems = document.querySelector('.items-container');
const buttonContainer = document.querySelector('.btn-container')
const category = menu.map(item=> item.category);
const uniCat = Array.from(new Set(category));
uniCat.unshift('All')

const popUp = document.querySelector('.pop-up')
const popUpMenuItem = document.querySelector('.pop-up__menu-item')

window.addEventListener('DOMContentLoaded', function() {
  displayItems(menu);
  displayBttuns();
  filter()
}
);

function displayBttuns() {
  let displayButtons = uniCat.map(item =>
     `<button class="${item} btn" data-id=${item}>
     ${item}
     </button>`)
     buttonContainer.innerHTML = displayButtons.join("")
}

function displayItems(array) {
  let displayItems =  array.map(item =>     
    `<div class="menu-item">
        <div class = "image-container">
          <div><img src="${item.img}" alt="${item.title}" class = "image"></div>
        </div>
        <div class = "item-bottom">
          <div class="basic-info">
            <div class="name"><p>${item.title}</p></div>
            <div class="price">${item.price}</div>
          </div>
          <div class="description">${item.desc}</div>
        </div>
      </div>`)
      menuItems.innerHTML = displayItems.join("")
   popUpClick()
}

function filter() {
  const buttons = document.querySelectorAll('.btn')
  buttons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      const category = e.target.dataset.id;
      const showItems = menu.filter(function(item) {
        if(item.category == category) {
          return item
        }
      });
      if(category=='All') {
        displayItems(menu)
      } else {
        displayItems(showItems);
      }
    })
  })
}

function popUpClick() {
  const productName = document.querySelectorAll('.name')
  const productNameArr = Array.from(productName)
  
  productNameArr.map((e)=>{e.addEventListener('click', ()=> {
    popUp.classList.add('open')
    const orderValue = e.parentElement.lastElementChild.innerHTML
    let displayPopUP = e.parentElement.parentElement.parentElement
    
    popUpMenuItem.innerHTML = displayPopUP.innerHTML + 
    `<div class="pop-up__buy">
    <div class="pop-up__buy--quantidy">
    <div class="pop-up__buy--minus">-</div>
    <label for="quantidy">quantidy:</label>
    <input type="text" value="1" disabled class="pop-up__buy--total" id = "quantidy">
    <div class="pop-up__buy--plus">+</div>
    </div>
    <a class="pop-up__buy--cartBtn">buy</a>
    <div class="pop-up--subTotal">
    <p>total order:</p><span class="subTotal">${orderValue}</span>
    </div>
    </div>
    <div class="close">X</div>
    `
    orderQuant(orderValue)
    const closeBtn = document.querySelector('.close')
    closeBtn.addEventListener('click', ()=>{popUp.classList.remove('open')})
  })})
}

function orderQuant(e) {
  const minusBtn = document.querySelector('.pop-up__buy--minus')
  const plusBtn = document.querySelector('.pop-up__buy--plus')
  const totalBtn = document.querySelector('.pop-up__buy--total')
  const subTotal = document.querySelector('.subTotal')
  let total = parseInt(totalBtn.value)

  minusBtn.addEventListener('click',()=>{
    if(total>1) {
      totalBtn.value=total-1
      total=parseInt(totalBtn.value)
      subTotal.innerHTML = (e*total).toFixed(2)
    }
  }
)

plusBtn.addEventListener('click',()=>{
  totalBtn.value=total+1
  total=parseInt(totalBtn.value)
  subTotal.innerHTML = (e*total).toFixed(2)
  }
)
}
