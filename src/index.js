"use strict";

(function(){
    window.addEventListener("load", init);

    const url = 'http://localhost:5500/encyclopedia/flagships/'

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
        id("search-btn").addEventListener("cilck", () => toggleContent("search"));

        id("search-btn").addEventListener("click", findMon);
        id("name").addEventListener("keydown", e => {
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
        let allButtons = qsa("button");
        allButtons.forEach(button => {
            button.classList.remove("active");
        });

        let selectedButton = id(option + "-btn");
        if (selectedButton) {
            selectedButton.classList.add("active");
        }

        let selectedContent = id(option);
        if (selectedContent) {
            selectedContent.style.display = 'block';
            if (option === 'search') {
                id('search-container').style.display = 'flex';
            } else {
                id('search-container').style.display = 'none';
            }
        } else {
            console.error("Content for " + option + " not found.");
        }
    }

    function findMon() {
        let input = id("name").value;
        input = input.split(" ").map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).join('');
        // input = input.toLowerCase();
        // input = input[0].toUpperCase() + input.slice(1);
        // console.log(input);
        fetchApi(input);
    }


    function fetchApi(input) {
            fetch('http://localhost:5500/encyclopedia/flagships/' + input)
            .then(statusCheck)
            .then((res) => res.json())
            .then(process)
            .catch(e => console.error("Error: ", e));
    }


    function process(data) {
        console.log(data);
    }
    async function statusCheck(res) {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
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

   
})();