const nameElement = document.getElementById("name");
const nameText = "Daniel Lofeodo";
const caret = "|";

let i = 0;
function typeWriter() {
    if ( i < nameText.length )
    {
        nameElement.textContent += nameText.charAt(i);
        const caretIndex = nameElement.textContent.indexOf(caret);
        if ( caretIndex !== -1 )
        {
            nameElement.textContent = getStringWithoutCaret() + caret;
        }
        i++;
        setTimeout(typeWriter, 125);
    }
}

function blinkingCaret(){
    const caretIndex = nameElement.textContent.indexOf(caret);
    if ( caretIndex !== -1 )
    {
        nameElement.textContent = getStringWithoutCaret();
    }
    else
    {
        nameElement.textContent += caret;
    }
    setTimeout(blinkingCaret, 500);
}

function getStringWithoutCaret()
{
    const caretIndex = nameElement.textContent.indexOf(caret);
    if ( caretIndex !== -1 )
    {
        return nameElement.textContent.slice(0, caretIndex) + nameElement.textContent.slice(caretIndex + 1);
    }
    return nameElement.textContent;
}

blinkingCaret();
typeWriter();