//Moved template JS to Cheatsheets to extract name functions, returned this JS to basics from make-it-decaf
document.addEventListener("DOMContentLoaded", function() {
    //CODE SWITCHER ANIMATION
    const tabs = document.querySelectorAll(".code-container__tab");
    const codeBlocks = document.querySelectorAll(".code-container__code");

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            const language = this.getAttribute("data-language");

            //Remove active class from ALL tabs and code blocks
            tabs.forEach(t => t.classList.remove("code-container__tab--active"));
            codeBlocks.forEach(c => c.classList.remove("code-container__code--active"));

            //Add active class only to the clicked tab and corresponsing code block
            this.classList.add("code-container__tab--active");
            document.querySelector(`.code-container__code--${language}`).classList.add("code-container__code--active");

            //Uses Prism - remember this with theme edits
            Prism.highlightElement(document.querySelector(`.code-container__code--${language} code`));
        });
    });

    //FOOTER ANIMATION
    const footer = document.querySelector('.footer__inner');
    const footerSpans = footer.querySelectorAll('span');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footerSpans.forEach((span, index) => {
                    setTimeout (() => {
                        span.classList.add('animate');
                    }, index * 100); //delay each letter by 100ms
                });
                observer.unobserve(footer); //unobserve after animation triggers
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(footer);
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