

class GeneralFunction {
    static shareInstance = new GeneralFunction();

    toggleTheme() {
        document.getElementsByTagName("BODY")[0].classList.toggle("dark");
        let themeText = document.getElementById("theme-text");
        let theme = localStorage.getItem("theme");
    
        if (theme && theme == "dark") {
            localStorage.removeItem("theme");
            themeText.innerText = "Light Theme";
        } else {
            localStorage.setItem("theme", "dark");
            themeText.innerText = "Dark Theme";
        }
    }

    getTheme() {
        let theme = localStorage.getItem("theme");
        let themeText = document.getElementById("theme-text");
        if (theme && theme == "dark") {
            document.getElementsByTagName("BODY")[0].classList.add("dark");
            !!themeText && (themeText.innerText = "Dark Theme");
        } else {
            !!themeText && (themeText.innerText = "Light Theme");
        }
    }
}

export default GeneralFunction;