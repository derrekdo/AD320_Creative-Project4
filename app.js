// create get reqs here

'use strict';
const express = require('express');
const app = express();
const port = 5500
const cors = require('cors');
app.use(cors());
//Text files:
let desc = "This"
let flagshipMonsters = ["Rathalos", "Azure Rathalos", "Kushala Daora", "Tigrex", "Nargacuga",
                    "Lagiacrus", "Zinogre", "Brachydios", "Gore Magala", "Seregios",
                        "Glavenus", "Valstrax", "Nergigante", "Velkhana", "Magnamalo", "Malzeno"];
let apiInfo = "This API contains information for each Flagship monster in the Monster Hunter series";

//Json Files
let monstersDetails = [
  { name: "Rathalos",
    class: "Flying Wyvern",
    elements: ["Fire"],
    ailments: ["Fireblight"],
    relatedMonsters: ["Azure Rathalos", "Silver Rathalos", "Dreadking Rathalos", "Apex Rathalos"],
    debut: ["Monster Hunter"],
    imagePath: "/renders/rathalos"
  }, 
  { name: "Azure Rathalos",
    class: "Flying Wyvern",
    elements: ["Fire"],
    ailments: ["Fireblight"],
    relatedMonsters: ["Rathalos", "Silver Rathalos", "Dreadking Rathalos", "Apex Rathalos"],
    debut: ["Monster Hunter G"],
    imagePath: "/renders/azurerathalos"
  },
  { name: "Kushala Daora",
    class: "Elder Dragon",
    elements: ["Ice", "Dragon"],
    ailments: ["Iceblight", "Dragonblight"],
    relatedMonsters: ["Rusted Kushala", "Risen Kushala"],
    debut: ["Monster Hunter 2"],
    imagePath: "/renders/kushala"
  },
  { name: "Tigrex",
    class: "Flying Wyvern",
    elements: ["None"],
    ailments: ["None"],
    relatedMonsters: ["Brute Tigrex", "Molten Tigrex", "Grimclaw Trigrex"],
    debut: ["Monster Hunter Portable 2nd", "Monster Hunter Freedom 2"],
    imagePath: "/renders/tigrex"
  },
  { name: "Nargacuca",
    class: "Flying Wyvern",
    elements: ["None"],
    ailments: ["Bleed"],
    relatedMonsters: ["Green Nargacuga", "Lucent Nargacuga", "Silverwind Nargacuga"],
    debut: ["Monster Hunter Portable 2nd G", "Monster Hunter Freedom Unite"],
    imagePath: "/renders/nargacuga"
  },
  { name: "Lagiacrus",
    class: "Leviathan",
    elements: ["Thunder"],
    ailments: ["Thunderblight"],
    relatedMonsters: ["Ivory Lagiacrus", "Abyssal Lagiacrus"],
    debut: ["Monster Hunter 3"],
    imagePath: "/renders/lagiacrus"
  },
  { name: "Zinogre",
    class: "Fanged Wyvern",
    elements: ["Thunder"],
    ailments: ["Thunderblight"],
    relatedMonsters: ["Stygian Zinogre", "Thunderlord Zinogre", "Apex Zinogre"],
    debut: ["Monster Hunter Portable 3rd"],
    imagePath: "/renders/zinogre"
  },
  { name: "Brachydios",
    class: "Brute Wyvern",
    elements: ["None"],
    ailments: ["Blastblight"],
    relatedMonsters: ["Raging Brachydios"],
    debut: ["Monster Hunter 3G", "Monster Hunter 3 Ultimate"],
    imagePath: "/renders/brachydios"
  },
  { name: "Gore Magala",
    class: "???",
    elements: ["None"],
    ailments: ["Frenzy Virus"],
    relatedMonsters: ["Shagaru Magala", "Chaotic Gore Magala", "Risen Shagaru Magala"],
    debut: ["Monster Hunter 4"],
    imagePath: "/renders/goremagala"
  },
  { name: "Seregios",
    class: "Flying Wyvern",
    elements: ["None"],
    ailments: ["Bleed"],
    relatedMonsters: ["None"],
    debut: ["Monster Hunter 4G", "Monster Hunter 4 Ultimate"],
    imagePath: "/renders/seregios"
  },
  { name: "Glavenus",
    class: "Brute Wyvern",
    elements: ["Fire"],
    ailments: ["Fireblight"],
    relatedMonsters: ["Hellblade Glavenus", "Acidic Glavenus"],
    debut: ["Monster Hunter X", "Monster Hunter Generations"],
    imagePath: "/renders/glavenus"
  },
  { name: "Valstrax",
    class: "Elder Dragon",
    elements: ["Dragon"],
    ailments: ["Dragonblight"],
    relatedMonsters: ["Crimson Glow Valstrax", "Risen Crimson Glow Valstrax"],
    debut: ["Monster Hunter XX", "Monster Hunter Generations Ultimate"],
    imagePath: "/renders/valstrax"
  },
  { name: "Nergigante",
    class: "Elder Dragon",
    elements: ["None"],
    ailments: ["None"],
    relatedMonsters: ["Ruiner Nergigante"],
    debut: ["Monster Hunter World"],
    imagePath: "/renders/nergigante"
  },
  { name: "Velkhana",
    class: "Elder Dragon",
    elements: ["Ice"],
    ailments: ["IceBlight"],
    relatedMonsters: ["None"],
    debut: ["Monster Hunter World: Iceborne"],
    imagePath: "/renders/velkhana"
  },
  { name: "Magnamalo",
    class: "Fanged Wyern",
    elements: ["None"],
    ailments: ["Hellfireblight"],
    relatedMonsters: ["Scorned Magnamalo"],
    debut: ["Monster Hunter Rise"],
    imagePath: "/renders/magnamalo"
  },
  { name: "Malzeno",
    class: "Elder Dragon",
    elements: ["Dragon"],
    ailments: ["Dragonblight", "Bloodblight"],
    relatedMonsters: ["Primordial Malzeno"],
    debut: ["Monster Hunter Rise: Sunbreak"],
    imagePath: "/renders/malzeno"
  }

  /*create another json taht will carry all elements and their description
    ailments and their description
    monster class
    subspecies/variants/deviants/etc
    the game and descripton
  */
];

app.use(express.static('public'));
app.use(express.static('renders'));
const PORT = process.env.PORT || 5500;
app.listen(PORT);

app.get('/encyclopedia/flagships', (req, res) => {
  res.type('text');
  let result = "";
  for (let i = 0; i < flagshipMonsters.length; i++) {
        result += flagshipMonsters[i] + " ";
    }
  res.send(result);
});



app.get('/encyclopedia/flagships/details', (req, res) => {
  res.type('json');
  res.send(monstersDetails);
});

app.get('/encyclopedia/flagships/:name', (req, res) => {
  let name = req.params.name;
  let monData = monstersDetails.find(mon => mon.name === name) 
  if (monData) {
    res.type('json');
    res.send(monData);
  } else {
    res.status(404).send('Monster is not included or does not exist')
  }
});