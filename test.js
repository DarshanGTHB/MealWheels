let obj = { 321: 4214, 124: 412 };
console.dir(obj); //info about object

let catties = [];

let items = [
  {
    _id: "1",
    name: "Greek salad",
    image: "food_1",
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
  },
  {
    _id: "2",
    name: "Veg salad",
    image: "food_2",
    price: 18,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
  },
  {
    _id: "3",
    name: "Clover Salad",
    image: "food_3",
    price: 16,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
  },
];


let [item1, item2, item3] = items;


console.log("this is cart : ", catties);

const addItem = (item) => {
  for(let i=0; i<catties.length; i++){
    let cartItem = catties[i];
    if (cartItem._id == item._id)
    {
        catties[i].quantity++;
        console.log("this is cart after add : ", catties);
        return;
    }
  }
  const itemToBeAdded = { ...item, quantity: 1 };
  catties.push(itemToBeAdded);
  console.log("this is cart after add : ", catties);
};

const decreaseItem = (item) => {
  for(let i=0; i<catties.length; i++){
    let cartItem = catties[i];
    if (cartItem._id == item._id) {
      if(catties[i].quantity > 1) {
        catties[i].quantity--;
      } else {
        // Remove item if quantity becomes 0
        catties.splice(i, 1);
      }
      console.log("this is cart after decrease : ", catties);
      return;
    }
  }
  console.log("Item not found in cart");
};
