document.addEventListener("DOMContentLoaded", function() {
    //LANGUAGE MAP - for quick swap to highlight.js etc
    const prismLanguageMap = {
        golang: "go",
        curl: "bash",
        typescript: "typescript",
        javascript: "javascript",
        html: "markup",
        css: "css",
        python: "python",
        rust: "rust",
        elixir: "elixir",
        java: "java",
    };    

    //CODE SWITCHER ANIMATION
    const tabs = document.querySelectorAll(".code-container__tab");
    const codeBlocks = document.querySelectorAll(".code-container__code");

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            const language = this.getAttribute("data-language");

            tabs.forEach(t => t.classList.remove("code-container__tab--active"));
            codeBlocks.forEach(c => c.classList.remove("code-container__code--active"));

            this.classList.add("code-container__tab--active");
            document.querySelector(`.code-container__code--${language}`).classList.add("code-container__code--active");

            // GET LANGUAGE - PRISM default (use mapping or fallback to original language)
            const prismLanguage = prismLanguageMap[language] || language;

            const codeElement = document.querySelector(`.code-container__code--${language} code`);
            if (codeElement) {
                //remove original language classes
                codeElement.className = codeElement.className.replace(/language-\w+/g, '');
                //add the desired language class - PRISM default
                codeElement.classList.add(`language-${prismLanguage}`);
                Prism.highlightElement(codeElement);
            }
        });
    });
});

//COPY CODE RESPONDER
function copyCode() {
    const codeElement = document.querySelector('.code-container__code--active code');
    const codeText = codeElement.innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        alert('Code copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}