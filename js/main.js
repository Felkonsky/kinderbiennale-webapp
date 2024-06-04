// categories: (a)nimals, (e)nergies, (f)lood, (g)lobal warming, (m)obility, (n)ature, (s)pace
const folder_names = ["ae", "af", "ag", "am", "an", "ap", "as", "ef", "eg", "em", "en", "ep", "es", "fg", "fm", "fn", "fp", "fs", "gm", "gn", "gp", "gs", "mn", "mp", "ms", "np", "ps", "sn"];

const selection = new Set();
const ids = new Set();

const btn_ids = ["global_warming_btn", "flooding_btn", "space_btn", "mobility_btn", "animals_btn", "pollution_btn", "energies_btn", "nature_btn"];


// js object with hardcoded path for every img of a category
let categories = {};

folder_names.forEach((foldername) => {
  const key = `${foldername[0]},${foldername[1]}`;
  const paths = [];
  for (let i = 1; i <= 5; i++) {
    paths.push(`${foldername}/${foldername}_0${i}.png`);
  }
  const value = {"current_idx": 0, "paths": paths};
  categories[key] = value;
});


btn_ids.forEach((id) => {
  const btn_event = document.getElementById(id);

  btn_event.addEventListener("click", function(event) {
    const button = event.target;
    button.classList.add('clicked');
    select_category(event);
  });
  btn_event.addEventListener("touchstart", function(event) {
    const button = event.target;
    button.classList.add('clicked');
    select_category(event);
  });
});

function select_category(event) {
  
  const id_btn = event.target.id;
  const category = id_btn[0];
  ids.add(id_btn);

  const btn = document.getElementById(id_btn)
  btn.style.boxShadow = "none";
  btn.style.pointerEvents = "none";
  btn.style.cursor = "pointer";

  selection.add(category);
  
  if (selection.size === 2) {
    // console.log("Rendering the image from categories: " + Array.from(selection));
    btn_ids.forEach((id) => {
      const btn = document.getElementById(id);
      btn.style.boxShadow = "none";
      btn.style.pointerEvents = "none";
      btn.style.cursor = "pointer";
    });
    changeImage(getImageByCategories(selection));
    setTimeout(function() {
      btn_ids.forEach((id) => {
        const btn = document.getElementById(id);
        btn.style.boxShadow = "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px";
        btn.style.pointerEvents = "auto";
      });
    }, 12000);
  }
}

function changeImage(srcImage) {
  const buttons = document.querySelectorAll('button'); 
  const img = document.getElementById('frame_img_dst');  
  const board = document.getElementById('board');
  const btns = Array.from(document.getElementsByClassName('btn'))
    
  img.src = srcImage;
  img.style.opacity = 1;
  
  board.classList.add("hide_cursor");
  btns.forEach(b => {
    b.classList.add("hide_cursor");
  });
  buttons.forEach(button => {
    button.disabled = true;
    button.classList.add("hide_cursor")
  });

  setTimeout(function() {
    img.style.opacity = 0;
  }, 10000);

  setTimeout(function() {
    btns.forEach(b => {
        b.classList.remove("hide_cursor");
    });
    buttons.forEach(button => {
        button.disabled = false;
        button.classList.remove("clicked");
        button.classList.remove("hide_cursor");
        board.classList.remove("hide_cursor");
      });
      selection.clear();
      ids.clear();
  }, 13001); 
}

function getImageByCategories(selection) {
  const lookup = Array.from(selection).sort().toString();
  const list = categories[lookup]["paths"];
  categories[lookup]["current_idx"] = (categories[lookup]["current_idx"] + 1 ) % 5;
  return "./assets/img/img-ai/" +list[categories[lookup]["current_idx"]];
}

