# Monster Hunter API Documentation
The Monster Hunter API aims to provide various information about the many monsters in the series

## *Fill in Endpoint 1 Title*
**Request Format:** /flagships

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Returns a string of all flagship monsters


**Example Request:** /flagships

**Example Response:**
*Fill in example response in the ticks*

```
Rathalos, Azure Rathalos, Kushala Daora, Tigrex, . . .
```

**Error Handling:**
Error 404 Monster is not included or does not exist

## *Fill in Endpoint 2 Title*
**Request Format:** /flagships/:name

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns information of the requested monster in json format

**Example Request:** /flagships/:name

**Example Response:**
*Fill in example response in the {}*

```
  { name: "Rathalos",
    class: "Flying Wyvern",
    elements: ["Fire"],
    ailments: ["Fireblight"],
    relatedMonsters: ["Azure Rathalos", "Silver Rathalos", "Dreadking Rathalos", "Apex Rathalos"],
    debut: ["Monster Hunter"],
    imagePath: "renders/rathalos/",
    comments: ["cool", "lame"]
  }
```

**Error Handling:**
Error 404 Monster is not included or does not exist
