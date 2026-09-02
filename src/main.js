const fs = require("fs");
const path = require("path");

const PATH_INPUT = path.join(__dirname,"..","input","raw-text.txt");
const PATH_OUTPUT = path.join(__dirname,"..","output","sample-output.json");

// ========================================
// EMAIL EXTRACTION AND VALIDATION
// ========================================

const rawText = fs.readFileSync(PATH_INPUT, "utf8");
// Reads all the text from raw-text.txt.

// Finds possible email addresses in the raw text.
const emailRegex =
    /(?<![\w.%+-])[\w.%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+/g;

// Extracts all possible emails.
const possibleEmails = rawText.match(emailRegex) || [];


// Checks whether an email is properly formed.
function isValidEmail(email) {
    const validEmailRegex =
        /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

    return validEmailRegex.test(email);
}


// Checks which ALU email type the address belongs to.
function getALUEmailType(email) {

    const domain = email.split("@")[1].toLowerCase();

    if (domain === "alueducation.com") {
        return "ALU Official";
    }

    if (domain === "alumni.alueducation.com") {
        return "ALU Alumni";
    }

    if (domain === "si.alueducation.com") {
        return "ALU SI";
    }

    return "Other";
}


// Keep only properly formed emails.
const validEmails = possibleEmails.filter(isValidEmail);


// Organize the emails by type.
function maskEmail(email) {
    const [username, domain] = email.split("@");

    if (username.length <= 2) {
        return "*@" + domain;
    }

    return username[0] + "*".repeat(username.length - 1) + "@" + domain;
}

const emailResult = validEmails.map(email => ({
    email: maskEmail(email),
    type: getALUEmailType(email)
}));

console.log(emailResult);
// ===============================
// TIME EXTRACTION AND VALIDATION
// ===============================

const time12Regex = /(?:0?[1-9]|1[0-2]):[0-5][0-9]\s?(?:AM|PM)/gi;// this regex will extract time that is near a pm/am word regardless of uppercase or lower case
const time12 = rawText.match(time12Regex) || [];
console.log(time12);
//24 hour format identifying regex
const time24Regex = /(?<![\d:])(?:[01]\d|2[0-3]):[0-5]\d(?![\d:]|\s?(?:AM|PM)\b)/gi;
const time24 = rawText.match(time24Regex) || [];
console.log(time24);

// =======================================
// HASHTAGS EXTRACTION AND VALIDATION
// =======================================

const hashTagRegex = /#[\p{L}\p{N}_\p{M}\p{Pd}]+/gu;//this finds hashtags containing letters, numbers, underscores, accents, and hyphens from many languages
const HashTag = rawText.match(hashTagRegex) || [];
console.log(HashTag);

// =======================================
// CREDIT CARDS EXTRACTION AND VALIDATION
// =======================================

function passesLuhnCheck(digitsOnly){
    let sum = 0;
    let shouldDouble = false;

    for(let i =digitsOnly.length -1; i>=0; i--){
        let digit = parseInt(digitsOnly[i], 10);

        if(shouldDouble){
            digit *= 2;

            if(digit > 9){
                digit -=9;
            }
        }

        sum += digit
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Credit card regex

const cardRegex = /(?<!\d)(?:\d[ -]?){12,18}\d(?!\d)/g;

const possibleCards = rawText.match(cardRegex);

// luhn validation will check if the cards are valid along with the card regex

const validCards = possibleCards
  ? possibleCards.filter(card => {
      const digitsOnly = card.replace(/[ -]/g, "");

      return (
        digitsOnly.length >= 13 &&
        digitsOnly.length <= 19 &&
        passesLuhnCheck(digitsOnly)
      );
    })
  : [];

// the fuction below is for masking cards

function maskCard(card) {
    return card.replace(/\d(?=(?:\D*\d){4})/g, "*");
}

const maskedCards = validCards.map(maskCard);

console.log(maskedCards);

const Output = {
    Cards: maskedCards,
    Emails: emailResult,
    Time12hourFormat: time12,
    Time24hourFormat: time24,
    HashTags: HashTag
}
fs.writeFileSync(
    PATH_OUTPUT,
    JSON.stringify(Output, null, 2),
    "utf8"
)
console.log("Output saved to: ",PATH_OUTPUT);