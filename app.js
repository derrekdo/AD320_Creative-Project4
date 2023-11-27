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
  }, 
  { name: "Azure Rathalos",
    class: "Flying Wyvern",
    elements: ["Fire"],
    ailments: ["Fireblight"],
    relatedMonsters: ["Rathalos", "Silver Rathalos", "Dreadking Rathalos", "Apex Rathalos"],
    debut: ["Monster Hunter G"]
  },
  { name: "Kushala Daora",
    class: "Elder Dragon",
    elements: ["Ice", "Dragon"],
    ailments: ["Iceblight", "Dragonblight"],
    relatedMonsters: ["Rusted Kushala", "Risen Kushala"],
    debut: ["Monster Hunter 2"]
  },
  { name: "Tigrex",
    class: "Flying Wyvern",
    elements: ["None"],
    ailments: ["None"],
    relatedMonsters: ["Brute Tigrex", "Molten Tigrex", "Grimclaw Trigrex"],
    debut: ["Monster Hunter Portable 2nd", "Monster Hunter Freedom 2"]
  },
  { name: "Nargacuca",
    class: "Flying Wyvern",
    elements: ["None"],
    ailments: ["Bleed"],
    relatedMonsters: ["Green Nargacuga", "Lucent Nargacuga", "Silverwind Nargacuga"],
    debut: ["Monster Hunter Portable 2nd G", "Monster Hunter Freedom Unite"]
  },
  { name: "Lagiacrus",
    class: "Leviathan",
    elements: ["Thunder"],
    ailments: ["Thunderblight"],
    relatedMonsters: ["Ivory Lagiacrus", "Abyssal Lagiacrus"],
    debut: ["Monster Hunter 3"]
  },
  { name: "Zinogre",
    class: "Fanged Wyvern",
    elements: ["Thunder"],
    ailments: ["Thunderblight"],
    relatedMonsters: ["Stygian Zinogre", "Thunderlord Zinogre", "Apex Zinogre"],
    debut: ["Monster Hunter Portable 3rd"]
  },
  { name: "Brachydios",
    class: "Brute Wyvern",
    elements: ["None"],
    ailments: ["Blastblight"],
    relatedMonsters: ["Raging Brachydios"],
    debut: ["Monster Hunter 3G", "Monster Hunter 3 Ultimate"]
  },
  { name: "Gore Magala",
    class: "???",
    elements: ["None"],
    ailments: ["Frenzy Virus"],
    relatedMonsters: ["Shagaru Magala", "Chaotic Gore Magala", "Risen Shagaru Magala"],
    debut: ["Monster Hunter 4"]
  },
  { name: "Seregios",
    class: "Flying Wyvern",
    elements: ["None"],
    ailments: ["Bleed"],
    relatedMonsters: ["None"],
    debut: ["Monster Hunter 4G", "Monster Hunter 4 Ultimate"]
  },
  { name: "Glavenus",
    class: "Brute Wyvern",
    elements: ["Fire"],
    ailments: ["Fireblight"],
    relatedMonsters: ["Hellblade Glavenus", "Acidic Glavenus"],
    debut: ["Monster Hunter X", "Monster Hunter Generations"]
  },
  { name: "Valstrax",
    class: "Elder Dragon",
    elements: ["Dragon"],
    ailments: ["Dragonblight"],
    relatedMonsters: ["Crimson Glow Valstrax", "Risen Crimson Glow Valstrax"],
    debut: ["Monster Hunter XX", "Monster Hunter Generations Ultimate"]
  },
  { name: "Nergigante",
    class: "Elder Dragon",
    elements: ["None"],
    ailments: ["None"],
    relatedMonsters: ["Ruiner Nergigante"],
    debut: ["Monster Hunter World"]
  },
  { name: "Velkhana",
    class: "Elder Dragon",
    elements: ["Ice"],
    ailments: ["IceBlight"],
    relatedMonsters: ["None"],
    debut: ["Monster Hunter World: Iceborne"]
  },
  { name: "Magnamalo",
    class: "Fanged Wyern",
    elements: ["None"],
    ailments: ["Hellfireblight"],
    relatedMonsters: ["Scorned Magnamalo"],
    debut: ["Monster Hunter Rise"]
  },
  { name: "Malzeno",
    class: "Elder Dragon",
    elements: ["Dragon"],
    ailments: ["Dragonblight", "Bloodblight"],
    relatedMonsters: ["Primordial Malzeno"],
    debut: ["Monster Hunter Rise: Sunbreak"]
  }
];

app.use(express.static('public'));
const PORT = process.env.PORT || 5500;
app.listen(PORT);
app.get('/', (req, res) => {
    res.send("helo");
});
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