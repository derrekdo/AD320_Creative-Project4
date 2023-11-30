/*
  Name: Derrek Do
  Date: 11/23/2023

  API for the website, currently only contains the flagship monsters (and their information)
  of the monster hunter series and has every monster classification that is not used as of this moment
  
  This file also include the backend server that allows for api data to be accessed and sent back.
  Currently only has get requests to retrieve data. post requests created but currently unsuable
*/
'use strict';
const express = require('express');
const path = require('path');
const app = express();
const port = 5500
const cors = require('cors');
app.use(cors());

//Text files:
//list of all monsters
let flagshipMonsters = ["Rathalos", "Azure Rathalos", "Kushala Daora", "Tigrex", "Nargacuga",
                    "Lagiacrus", "Zinogre", "Brachydios", "Gore Magala", "Seregios",
                        "Glavenus", "Valstrax", "Nergigante", "Velkhana", "Magnamalo", "Malzeno"];

//Json Files
//data in api, that contains all info for each monster
let monstersDetails = [
  { name: "Rathalos",
    class: "Flying Wyvern",
    elements: ["Fire"],
    ailments: ["Fireblight"],
    relatedMonsters: ["Azure Rathalos", "Silver Rathalos", "Dreadking Rathalos", "Apex Rathalos"],
    debut: ["Monster Hunter"],
    imagePath: "renders/rathalos/",
    comments: ["cool", "lame"]
  }, 
  { name: "Azure Rathalos",
    class: "Flying Wyvern",
    elements: ["Fire"],
    ailments: ["Fireblight"],
    relatedMonsters: ["Rathalos", "Silver Rathalos", "Dreadking Rathalos", "Apex Rathalos"],
    debut: ["Monster Hunter G"],
    imagePath: "renders/azurerathalos/",
    comments: []
  },
  { name: "Kushala Daora",
    class: "Elder Dragon",
    elements: ["Ice", "Dragon"],
    ailments: ["Iceblight", "Dragonblight"],
    relatedMonsters: ["Rusted Kushala Daora", "Risen Kushala Daora"],
    debut: ["Monster Hunter 2"],
    imagePath: "renders/kushala/",
    comments: []
  },
  { name: "Tigrex",
    class: "Flying Wyvern",
    elements: ["None"],
    ailments: ["None"],
    relatedMonsters: ["Brute Tigrex", "Molten Tigrex", "Grimclaw Trigrex"],
    debut: ["Monster Hunter Portable 2nd", "Monster Hunter Freedom 2"],
    imagePath: "renders/tigrex/",
    comments: []
  },
  { name: "Nargacuga",
    class: "Flying Wyvern",
    elements: ["None"],
    ailments: ["Bleed"],
    relatedMonsters: ["Green Nargacuga", "Lucent Nargacuga", "Silverwind Nargacuga"],
    debut: ["Monster Hunter Portable 2nd G", "Monster Hunter Freedom Unite"],
    imagePath: "renders/nargacuga/",
    comments: []
  },
  { name: "Lagiacrus",
    class: "Leviathan",
    elements: ["Thunder"],
    ailments: ["Thunderblight"],
    relatedMonsters: ["Ivory Lagiacrus", "Abyssal Lagiacrus"],
    debut: ["Monster Hunter 3"],
    imagePath: "renders/lagiacrus/",
    comments: []
  },
  { name: "Zinogre",
    class: "Fanged Wyvern",
    elements: ["Thunder"],
    ailments: ["Thunderblight"],
    relatedMonsters: ["Stygian Zinogre", "Thunderlord Zinogre", "Apex Zinogre"],
    debut: ["Monster Hunter Portable 3rd"],
    imagePath: "renders/zinogre/",
    comments: []
  },
  { name: "Brachydios",
    class: "Brute Wyvern",
    elements: ["None"],
    ailments: ["Blastblight"],
    relatedMonsters: ["Raging Brachydios"],
    debut: ["Monster Hunter 3G", "Monster Hunter 3 Ultimate"],
    imagePath: "renders/brachydios/",
    comments: []
  },
  { name: "Gore Magala",
    class: "???",
    elements: ["None"],
    ailments: ["Frenzy Virus"],
    relatedMonsters: ["Shagaru Magala", "Chaotic Gore Magala", "Risen Shagaru Magala"],
    debut: ["Monster Hunter 4"],
    imagePath: "renders/goremagala/",
    comments: []
  },
  { name: "Seregios",
    class: "Flying Wyvern",
    elements: ["None"],
    ailments: ["Bleed"],
    relatedMonsters: ["None"],
    debut: ["Monster Hunter 4G", "Monster Hunter 4 Ultimate"],
    imagePath: "renders/seregios/",
    comments: []
  },
  { name: "Glavenus",
    class: "Brute Wyvern",
    elements: ["Fire"],
    ailments: ["Fireblight"],
    relatedMonsters: ["Hellblade Glavenus", "Acidic Glavenus"],
    debut: ["Monster Hunter X", "Monster Hunter Generations"],
    imagePath: "renders/glavenus/",
    comments: []
  },
  { name: "Valstrax",
    class: "Elder Dragon",
    elements: ["Dragon"],
    ailments: ["Dragonblight"],
    relatedMonsters: ["Crimson Glow Valstrax", "Risen Crimson Glow Valstrax"],
    debut: ["Monster Hunter XX", "Monster Hunter Generations Ultimate"],
    imagePath: "renders/valstrax/",
    comments: []
  },
  { name: "Nergigante",
    class: "Elder Dragon",
    elements: ["None"],
    ailments: ["None"],
    relatedMonsters: ["Ruiner Nergigante"],
    debut: ["Monster Hunter World"],
    imagePath: "renders/nergigante/",
    comments: []
  },
  { name: "Velkhana",
    class: "Elder Dragon",
    elements: ["Ice"],
    ailments: ["IceBlight"],
    relatedMonsters: ["None"],
    debut: ["Monster Hunter World: Iceborne"],
    imagePath: "renders/velkhana/",
    comments: []
  },
  { name: "Magnamalo",
    class: "Fanged Wyvern",
    elements: ["None"],
    ailments: ["Hellfireblight"],
    relatedMonsters: ["Scorned Magnamalo"],
    debut: ["Monster Hunter Rise"],
    imagePath: "renders/magnamalo/",
    comments: []
  },
  { name: "Malzeno",
    class: "Elder Dragon",
    elements: ["Dragon"],
    ailments: ["Dragonblight", "Bloodblight"],
    relatedMonsters: ["Primordial Malzeno"],
    debut: ["Monster Hunter Rise: Sunbreak"],
    imagePath: "renders/malzeno/",
    comments: []
  }  
];

//data in api, that has all descriptions for all monster classifications
let monsterClasses = [
  { class: "Bird Wyvern", desc: "Bird Wyverns are small to medium-sized monsters with avian characteristics." },
  { class: "Brute Wyvern", desc: "Brute Wyverns are characterized by their powerful physical attacks and aggressive behavior in combat." },
  { class: "Fanged Beast", desc: "Fanged Beasts are mammalian monsters with fang-like features and varying abilities." },
  { class: "Fanged Wyvern", desc: "Fanged Wyverns are monsters with distinctive fangs and often possess unique elemental abilities." },
  { class: "Fish", desc: "Fish monsters inhabit aquatic environments and may have water-based attacks." },
  { class: "Elder Dragon", desc: "Elder Dragons are ancient and powerful creatures that often play a significant role in the Monster Hunter world." },
  { class: "Flying Wyvern", desc: "Flying Wyverns are monsters with the ability to fly and dominate the skies." },
  { class: "Herbivore", desc: "Herbivores are non-aggressive monsters that feed on plants and are generally non-threatening to hunters." },
  { class: "Leviathan", desc: "Leviathans are aquatic monsters known for their elegant swimming and water-based attacks." },
  { class: "Piscine Wyvern", desc: "Piscine Wyverns are monsters adapted to aquatic environments and have piscine features." },
  { class: "Carapaceon", desc: "Carapaceons are crustacean-like monsters with hard shells, often found in watery areas." },
  { class: "Neopteron", desc: "Neopterons are insect-like monsters that come in various shapes and sizes." },
  { class: "Snake Wyvern", desc: "Snake Wyverns are serpent-like monsters with unique locomotion and attack patterns." },
  { class: "Temnoceran", desc: "Temnocerans are spider-like monsters known for their silk-producing abilities and agile movements." },
  { class: "???", desc: "Monsters that defy easy classification and may possess unique traits or origins." }
];

app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 5500;
app.listen(PORT);

//get requests for all monsters
app.get('/encyclopedia/flagships', (req, res) => {
  res.type('text');
  let result = "Rathalos";
  for (let i = 1; i < flagshipMonsters.length; i++) {
        result += ", " + flagshipMonsters[i];
    }
  res.send(result);
});

//get request for the monster searched, returns data as json
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



//Creates and fetches comments, currently does not work
app.post('encyclopedia/flagsips/:name/comments', (req, res) => {
  let name = req.params.name;
  let comment = req.body.comment;

  if(!comment) {
    res.type('text');
    res.status(400).send('Cannot post empty comment');
  } else {
    let monData = monstersDetails.find(mon => mon.name === name);
    monData.comments.push(comment);
    res.status(200).send('successfuilly created comment');
  } 
});

app.get('encyclopedia/flagships/:name/comments', (res, req) => {
  let name = req.params.name;
  let monData = monstersDetails.find(mon => mon.name == name);
  
  res.type('json');
  res.send({comments: monData.comments});

});