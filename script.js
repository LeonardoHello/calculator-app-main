const output = document.querySelector("form > section output");
let calculations;
let operator = "";
let count = 0;

[...document.querySelectorAll("form > section input")].map(element => {
    element.onclick = () => {
        // Typing
            // If dot is clicked
        if (element.value === "." && output.innerHTML.length !== 0 && !output.innerHTML.endsWith(".") && !output.innerHTML.includes(".")) {
            output.innerHTML += element.value;
            // If any number is clicked
        } else if ((element.classList.contains("number") && output.innerHTML.length <= 13) && (!output.innerHTML.startsWith("0") || output.innerHTML.length !== 1)) {
            output.innerHTML += element.value;
        };

        // In case first nuber is 0, automatically set a dot for decimal numbers
        if (element.value === "0" && output.innerHTML.length === 1) {
            output.innerHTML+= "."
        }

        if (element.value === "DEL") {
            output.innerHTML = output.innerHTML.slice(0, output.innerHTML.length-1);
        };

        if (element.value === "RESET") {
            output.innerHTML = "";
            operator = "";
            calculations = undefined;
        };

        if (element.classList.contains("operator") && !isNaN(parseInt(output.innerHTML))) {
            if (output.innerHTML.includes(".")) {
                let integer;
                let decimals;
                let finalNumber;
                for (let i = 0; i < output.innerHTML.length; i++) {
                    if (output.innerHTML[i] === ".") {
                        integer = output.innerHTML.slice(0, i);
                        decimals = output.innerHTML.slice(i);
                    };
                };
    
                // Removing commas
                if (integer.includes(",")) {
                    for (let i = integer.length-1; i >= 0; i--) {
                        if (isNaN(integer[i])) {
                            integer = integer.slice(0, i) + integer.slice(i+1)
                        };
                    };
                };
    
                finalNumber = integer + decimals;
    
                if (finalNumber.endsWith(".")) {
                    finalNumber = finalNumber.slice(0, finalNumber.length-1);
                };

                finalNumber = parseFloat(finalNumber);
                
                if (operator === "") {
                    operator = element.value;
                    calculations = finalNumber;
                    output.innerHTML = "";
                } else {
                    if (operator === "+") {
                        calculations += finalNumber;
                    } else if (operator === "-") {
                        calculations -= finalNumber;
                    } else if (operator === "x") {
                        calculations *= finalNumber;
                    } else {
                        calculations /= finalNumber;
                    };
                    operator = element.value;
                };

                output.innerHTML = "";

                if (element.value === "=") {
                    output.innerHTML = calculations;
                    operator = "";
                };
            } else {
                let integer = output.innerHTML;
    
                // Removing commas
                if (integer.includes(",")) {
                    for (let i = integer.length-1; i >= 0; i--) {
                        if (isNaN(integer[i])) {
                            integer = integer.slice(0, i) + integer.slice(i+1)
                        };
                    };
                };

                integer = parseInt(integer);

                if (operator === "") {
                    operator = element.value;
                    calculations = integer;
                    output.innerHTML = "";
                } else {
                    if (operator === "+") {
                        calculations += integer;
                    } else if (operator === "-") {
                        calculations -= integer;
                    } else if (operator === "x") {
                        calculations *= integer;
                    } else if (operator === "/") {
                        calculations /= integer;
                    };
                    operator = element.value;
                };

                output.innerHTML = "";

                if (element.value === "=") {
                    output.innerHTML = calculations;
                    operator = "";
                };
            };
        };

        // Commas
        if (output.innerHTML.includes(".")) {
            let integer;
            let decimals;
            let commas = "";

            // Setting decimal and integer variables
            for (let i = 0; i < output.innerHTML.length; i++) {
                if (output.innerHTML[i] === ".") {
                    integer = output.innerHTML.slice(0, i);
                    decimals = output.innerHTML.slice(i);
                };
            };

            // Removing commas from integer variable after setting decimal numbers
            if (integer.includes(",")) {
                for (let i = integer.length-1; i >= 0; i--) {
                    if (isNaN(integer[i])) {
                        integer = integer.slice(0, i) + integer.slice(i+1);
                    };
                };
            };

            // putting commas
            for (let i = 0; i < integer.length; i++) {
                if (i % 3 === 0) {
                    commas += "," + integer[integer.length-i-1];
                } else {
                    commas += integer[integer.length-i-1];
                };
            };

            // removing single comma at the beginning since 0 % 3 === 0 so the comma is put 
            commas = commas.slice(1);

            // reverting back reversed integer with commas since every third integer from the back has a comma
            commas = commas.split("").reverse().join("");

            output.innerHTML = commas + decimals;
        } else if (output.innerHTML.length > 3) {
            let integer = output.innerHTML;
            let commas = "";

            // removing commas from integer variable
            if (integer.includes(",")) {
                for (let i = integer.length-1; i >= 0; i--) {
                    if (isNaN(integer[i])) {
                        integer = integer.slice(0, i) + integer.slice(i+1);
                    };
                };
            };

            // putting commas
            for (let i = 0; i < integer.length; i++) {
                if (i % 3 === 0) {
                    commas += "," + integer[integer.length-i-1];
                } else {
                    commas += integer[integer.length-i-1];
                };
            };

            // reverting back reversed integer with commas since every third integer from the back has a comma
            commas = commas.split("").reverse().join("");

            if (commas.endsWith(",")) {
                commas = commas.slice(0, commas.length-1);
            };

            output.innerHTML = commas;
        };
    };
});

document.querySelector("ul li:last-of-type").onclick = () => {
    count++;
    if (count % 3 === 0) {
        document.querySelector("ul li:last-of-type").style.justifyContent = "flex-start";
    } else if (count % 3 === 1) {
        document.querySelector("ul li:last-of-type").style.justifyContent = "center";
    } else {
        document.querySelector("ul li:last-of-type").style.justifyContent = "flex-end";
    };
};