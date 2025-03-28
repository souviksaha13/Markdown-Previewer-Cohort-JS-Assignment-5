const input = document.getElementById('input');
const preview = document.getElementById('preview');
const clearBtn = document.getElementById('clear-button');
const animatedHeading = document.getElementById('animated-header');


input.addEventListener('input', handleInputChange);

// hljs.highlightAll();
// marked.setOptions({
//     breaks: true,  // Enables line breaks with a single newline instead of requiring double newlines.

//     highlight: function(code, lang) {
//         if (lang && hljs.getLanguage(lang)) {
//             return hljs.highlight(lang, code).value;  // Highlights code if a valid language is provided.
//         }
//         return hljs.highlightAuto(code).value;  // Auto-detects and highlights the code if no language is specified.
//     }
// });


function handleInputChange() {
    const inputValue = input.value;
    preview.innerHTML = marked.parse(inputValue);
}

function insertion(id) {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedText = input.value.substring(start, end);
    const textBefore = input.value.substring(0, start);
    const textAfter = input.value.substring(end);
    let newText = '';
    let codeFlag = false;

    switch (id) {
        case 'h1':
            newText = '# ' + selectedText;
            break;
        
        case 'h2':
            newText = '## ' + selectedText;
            break;

        case 'h3':
            newText = '### ' + selectedText;
            break;

        case 'bold':
            newText = '**' + selectedText + '**';
            break;

        case 'italic':
            newText = '*' + selectedText + '*';
            break;
    
        case 'underline':
            newText = '__' + selectedText + '__'; // Markdown does not support underline, so HTML is used
            break;
    
        case 'strikethrough':
            newText = '~~' + selectedText + '~~';
            break;
    
        case 'unorderedList':
            newText = '- ' + selectedText; // Markdown uses "-" or "*"
            break;
    
        case 'number-list':
            newText = '1. ' + selectedText; // Markdown uses "1." for ordered lists
            break;
    
        case 'code':
            codeFlag = true;
            newText = '```\n'+selectedText +'\n```'; // Inline code in Markdown
            break;
    
        case 'blockquote':
            newText = '> ' + selectedText;
            break;

        case 'link':
            newText = '[text](url)';
            break;

        case 'image':
            newText = '![alt](image-url)';
            break;
    
        default:
            break;
    }

    input.value = textBefore + newText + textAfter;
    input.selectionStart = input.selectionEnd = start + newText.length;
    if(codeFlag) input.selectionStart = input.selectionEnd = start + newText.length - 4;
    handleInputChange();
    input.focus();
}

clearBtn.addEventListener('click', () => {
    input.value = '';
    handleInputChange();
})


function animation() {
    const text = 'Markdown Previewer...'
    let index = 0;
    function applyEffect() {
        if(index < text.length) {
            animatedHeading.innerHTML += text.charAt(index);
            index++;
            setTimeout(applyEffect, 150);
        }
    }
    applyEffect();
}



// const animate = () => setInterval(animation, 5000);

document.addEventListener('DOMContentLoaded', () => animation())