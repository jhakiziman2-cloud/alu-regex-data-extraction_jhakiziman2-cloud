ALU REGEX DATA EXTRACTION

PROJECT DESCRIPTION

This project reads raw text from a text file and uses Regular Expressions (Regex) and JavaScript functions to extract and validate different types of data.

The program extracts:

Email addresses
12-hour and 24-hour time formats
Hashtags
Credit card numbers

The extracted information is then validated, masked where necessary, categorized, and saved into a JSON output file.

PROJECT STRUCTURE

alu-regex-data-extraction/

input/
    raw-text.txt

output/
    sample-output.json

src/
    main.js

FILES AND FOLDERS

input/raw-text.txt

Contains the raw text that the program reads and analyzes.

src/main.js

Contains the JavaScript code responsible for extraction, validation, masking, and generating the output.

output/sample-output.json

Contains the final extracted and processed results.

TECHNOLOGIES USED

JavaScript
Node.js
Regular Expressions (Regex)
File System (fs) module
Path (path) module
JSON

HOW THE PROGRAM WORKS

The program follows these main steps:

Raw Text
↓
Read the file
↓
Extract possible data
↓
Validate the data
↓
Mask sensitive information
↓
Categorize ALU emails
↓
Create JSON output
↓
Save output file

READING THE INPUT FILE

The program uses Node.js fs and path modules.

The input and output paths are created using path.join().

The raw text is then read from input/raw-text.txt.

This reads all the text from the input file.

EMAIL EXTRACTION

The program searches the text for possible email addresses using a Regular Expression.

The email regex allows common email characters and different domain formats.

The "g" flag allows the program to find multiple emails in the text.

EMAIL VALIDATION

A second regex is used to check whether the extracted email is properly formed.

Only emails that pass this validation are kept.

ALU EMAIL CLASSIFICATION

The program checks the email domain and assigns it an ALU email type.

alueducation.com => ALU Official => alumni.alueducation.com => ALU Alumni=> si.alueducation.com => ALU SI=> Other domains => Other


EMAIL MASKING

Emails are masked to protect the username portion.

Example:

john@gmail.com

becomes:

j***@gmail.com

This helps protect personal information in the output.

12-HOUR TIME EXTRACTION

The program extracts times using the 12-hour format.

Examples:

9:30 AM
09:30 PM
12:45 AM

The regex accepts AM and PM in uppercase or lowercase.

24-HOUR TIME EXTRACTION

The program also extracts times using the 24-hour format.

Examples:

00:30
09:45
13:20
23:59

The regex allows hours from 00 to 23 and minutes from 00 to 59.

HASHTAG EXTRACTION

The program extracts hashtags using a Unicode-supported regex.

It supports:

Letters from different languages
Numbers
Underscores
Accent marks
Different types of hyphens and dashes

Examples:

#ALU
#Student2026
#goal_tracking
#développement

CREDIT CARD EXTRACTION

The program searches for possible credit card numbers.

It supports numbers written with:

No spaces
Spaces
Hyphens

Examples:

1234567890123456
1234-5678-9012-3456
1234 5678 9012 3456

CREDIT CARD VALIDATION

Finding a number that looks like a credit card does not mean that it is valid.

The program uses the Luhn algorithm to validate the card number.

The program also checks that the card contains between 13 and 19 digits.

Only cards that pass both checks are included in the output.

CREDIT CARD MASKING

Valid credit cards are masked so that only the last four digits remain visible.

Example:

4111-1111-1111-1111

becomes:

--***-1111

This helps protect sensitive card information.

CREATING THE OUTPUT

The program combines all extracted information into one JavaScript object.

The output contains:

Cards
Emails
Time12hourFormat
Time24hourFormat
HashTags

The object is converted into JSON and saved as:

output/sample-output.json

HOW TO RUN THE PROJECT

Step 1: Open the project in VS Code.

Step 2: Put the text you want to analyze inside:

input/raw-text.txt

Step 3: Open the terminal.

Step 4: Run:

node src/main.js

Step 5: Check the generated output in:

output/sample-output.json

OUTPUT EXAMPLE

{
"Cards": [
"--**-1111"
],
"Emails": [
{
"email": "j*@alueducation.com",
"type": "ALU Official"
}
],
"Time12hourFormat": [
"09:30 AM"
],
"Time24hourFormat": [
"14:30"
],
"HashTags": [
"#ALU2026"
]
}

IMPORTANT NOTES

The program reads from input/raw-text.txt.
You can add or change text in raw-text.txt and run the program again.
The output file is regenerated each time the program runs.
Emails and credit card numbers are masked before being written to the output.
Credit cards must pass the Luhn check before being included.
The program uses Regex for extraction and JavaScript functions for validation and processing.