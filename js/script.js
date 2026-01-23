// This script is a pencil pusher. No really.
// It does not evaluate, execute, or summon anything.
// It only moves text from one safe place to another.

// ==========================================
// MAP LANGUAGES - LOAD TEMPLATES
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

  // Map special cases for Prism language class
    const prismLanguageMap = {
        golang: "go", // Golang tab maps to Prism 'go'
        curl: "bash", // Curl tab maps to Prism 'bash'
        typescript: "typescript", // explicitly include if needed
        javascript: "javascript",
        html: "markup",
        css: "css",
        python: "python",
        rust: "rust",
        elixir: "elixir",
        java: "java",
    };

// Setup tabs & default
    const tabs = document.querySelectorAll(".code-container__tab");
    const codeBlocks = document.querySelectorAll(".code-container__code");

  // Load code from template into a pre/code block
  function loadCode(language) {
    const template = document.getElementById(`sample-${language}`);
    const codeBlock = document.querySelector(
      `.code-container__code--${language} code`
    );

    console.log("Loading:", language, template, codeBlock);

    if (!template || !codeBlock) return;

    // Set Prism language class properly
    const prismLang = prismLanguageMap[language] || language;
    codeBlock.className = `language-${prismLang}`;

    // Insert template content
    codeBlock.textContent = template.textContent.trim();

    // Highlight with Prism
    Prism.highlightElement(codeBlock);
  }

    // Initialize default tab (first tab active)
    const defaultTab = document.querySelector(".code-container__tab--active");
    if (defaultTab) loadCode(defaultTab.getAttribute("data-language"));

    // Tab click handling
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
          const language = tab.ddataset.language;

          // Remove all active states
          tabs.forEach(t => t.classList.remove("code-container__tab--active"));
          codeBlocks.forEach(c => c.classList.remove("code-container__code--active"));

          // Activate clicked tab and corresponding code block
          tab.classList.add("code-container__tab--active");
          const activeBlock = document.querySelector(`.code-container__code--${language}`);
          if (activeBlock) activeBlock.classList.add("code-container__code--active");

          // Load template content safely
          loadCode(language);
        });
    });
});

// =====================================
// COPY CODE - Language-proofed
// =====================================
function copyCode() {
  // Find the currently active code block
  const activeCodeBlock = document.querySelector(".code-container__code--active code");
  if (!activeCodeBlock) return;

  // Copy text to clipboard
  navigator.clipboard.writeText(activeCodeBlock.textContent)
    .then(() => {
      console.log("Code copied to clipboard!");
    })
    .catch(err => {
      console.error("Failed to copy code: ", err);
    });
}