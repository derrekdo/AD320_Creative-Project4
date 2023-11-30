/*
  Name: Derrek Do
  Date: 11/23/2023

  Scripts for the website to add functionality. Once the apge loads, the home page will be displayed
  along with buttons that display other pages. 
  The home button when clicked will unhide the home page and displays information about the website and displays a table with all monsters
  The about button when clicked will unhide the about page and displays information about the monster hunter series
  The search monster button will display monster information for the current monster in the search bar. Pressing 'enter' will do the same
  Additionaly the list of monsters on the home page has the same function as search, where each monster name is clickable which
  will display taht monsters information

  There is a comment section on the monster information page, but is currently unfunctional (post requests are currently unavailable)

*/

"use strict";

(function(){
    window.addEventListener("load", init);

    const url = 'http://localhost:5500/encyclopedia/flagships/';
    const baseUrl = 'http://localhost:5500/';

    function init() {
        toggleContent("home");
        home();
        id("home-btn").addEventListener("click", () => toggleContent("home"));
        id("about-btn").addEventListener("click", () => toggleContent("about"));
        id("search-btn").addEventListener("click", () => toggleContent("monster"));
        id("input").addEventListener("keydown", e => {
            if (e.key === 'Enter') {
                toggleContent("monster");
            };
        });
    }

    /**
     * hides each page
     */
    function hide() {
        let allContent = qsa(".content");
        allContent.forEach(content => {
            content.style.display = 'none';
        });
    }

    /**
     * determines which page will be displayed
     * @param option the button clicked
     */
    function toggleContent(option) {
        hide();
        if (option === "monster") {
            findMon();
        } else {
            id(option).style.display = 'block';
        }
    }

    /**
     * fetch request to api to get all monsters
     */
    function home() {
        fetch(url)
            .then(statusCheck)
            .then(res => res.text())
            .then(listMon)
            .catch(handleError);
    }

    /**
     * adds all monsters into the table for the home page
     * @param data the array of all monsters
     */
    function listMon(data) {
        let mons = data.split(", ");
        mons.forEach(name => {
            id("existMons").appendChild(createLink(name));
            id("existMons").append(document.createTextNode(", "));
        });
    }

    /**
     * Creates a span tag for the monster and makes it clickable, which leads
     * to its information page
     * @param name the name of the monster
     * @returns the span tag with the mosnter
     */
    function createLink(name) {
        let span = create("span");
        span.textContent = name;
        span.id = "clickable";
        span.addEventListener('click', () => {
            hide();
            fetchApi(name);
        });
        return span;
    }

     /**
     * Checks if there is input and looks up the monster
     * uses regex if input does not follow the same format as the api 
     */
    function findMon() {
        let input = id("input").value;
        if (input !== "") {
            input = input.split(" ").map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).join(' ');
            fetchApi(input);
            id("input").value = "";
        }
    }
    
    /**
     * makes get request to get the monster data
     *
     * @param input the name of the monster being searched
     */
    function fetchApi(input) {
        fetch(url + input)
        .then(statusCheck)
        .then(res => res.json())
        .then(displayMon)
        .catch(handleError);
    }

    /**
     * Displays all information of the monster
     *
     * @param data json data of the monster from api
     */
    function displayMon(data) {
        let name = data["name"];
        let monClass = data["class"];
        let elements = data["elements"];
        let ailments = data["ailments"]
        let debut = data["debut"];
        let altForm = data["relatedMonsters"];
        let imagePath = data["imagePath"]

        id("render").src = baseUrl + imagePath + name + '.jpg';
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
    
     /**
     * catches the error and displays it
     *
     * @param e is the error sent from the servr
     */
    function handleError(e) {
        id("errorMsg").textContent = e;
        id("error").style.display = 'block';

    }

    //helper functions to access dom elemnts
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