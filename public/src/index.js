"use strict";

(function(){
    window.addEventListener("load", init);

    const url = 'http://localhost:5500/encyclopedia/flagships/';
    const baseUrl = 'http://localhost:5500/'

    function init() {
        hide();
        // console.log("hello");
        // fetch('http://localhost:5500/encyclopedia/flagships/details')
        //     .then(statusCheck)
        //     .then((res) => res.json())
        //     .then(process)
        //     .catch(e => console.error("Error: ", e));
        id("home-btn").addEventListener("click", () => toggleContent("home"));
        id("about-btn").addEventListener("click", () => toggleContent("about"));
        id("search-btn").addEventListener("click", () => toggleContent("monster"));

        id("search-btn").addEventListener("click", findMon);
        id("input").addEventListener("keydown", e => {
            if (e.key === 'Enter') {
                findMon();
            };
        });
    }

    function hide() {
        let allContent = qsa(".content");
        allContent.forEach(content => {
            content.style.display = 'none';
        });
    }

    function toggleContent(option) {
        hide();
        if (option === "monster") {
            findMon();
        } else {
            id(option).style.display = 'block';
        }
    }

    function findMon() {
        let input = id("input").value;
        if (input !== "") {
            input = input.split(" ").map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).join(' ');
            fetchApi(input);
            id("input").value = "";
        }

    }


    function fetchApi(input) {
            fetch(url + input)
            .then(statusCheck)
            .then(res => res.json())
            .then(process)
            .catch(handleError);
    }


    function process(data) {
        let name = data["name"];
        let monClass = data["class"];
        let elements = data["elements"];
        let ailments = data["ailments"]
        let debut = data["debut"];
        let altForm = data["relatedMonsters"];
        let imagePath = data["imagePath"]

        console.log(imagePath);
        
        id("render").src = baseUrl + imagePath + name + '_icon.jpg';

        id("name").textContent = name;
        id("class").textContent = "Monster Classification: " + monClass;
        id("elements").textContent = "Elements: " + elements.join(", ");
        id("ailments").textContent = "Ailments: " + ailments.join(", ");
        id("debutGame").textContent = "Game Introduced: " + debut.join(", ");
        id("altForms").textContent = "Related Monsters: " + altForm.join(", ");

        id("monster").style.display = 'block'
    }
    async function statusCheck(res) {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
    }
    
    function handleError(e) {
        id("monster").textContent = e;
        id("monster").style.display = 'block'
    }

    function id(id) {
        return document.getElementById(id);
    }

    function className(className) {
        return document.getElementsByClassName(className);
    }

    function qs(selector) {
        return document.querySelector(selector);
    }
    
    function qsa(selector) {
        return document.querySelectorAll(selector);
    }

    function create(tag) {
        return document.createElement(tag)
    }
   
})();