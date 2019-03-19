# minesweeper

A unique version of the classic computer game "Minesweeper".

## Get Started Using Project for Developers

1. Clone or download the repo
1. Run `npm install` to download the dependencies
1. To view the project in action, open the index.html file
1. To format the code, run `npm run format`
1. To build documentation, run `npm run documentation`
1. To view documentation, open the index.html file inside the documentation folder. You need to have built the documentation first (see previous step).

## Documentation of Meetings

The meetings the team held are documented on the [Wiki home page](https://github.com/CompSciLauren/minesweeper/wiki).

## Best Practices

On the Wiki is a [Best Practices page](https://github.com/CompSciLauren/minesweeper/wiki/Best-Practices) to help any developers who are new to the project or JavaScript, or anyone who wants to review the best practices.

## Developer FAQ

On the Wiki is a [Developer FAQ page](https://github.com/CompSciLauren/minesweeper/wiki/Developer-FAQ) to help any developers who are new to collaborating on GitHub.

## Credits

This README was inspired by a variety of other READMEs on GitHub. The list that includes them can be found on [the awesome-readme repo by @matiassingers](https://github.com/matiassingers/awesome-readme).

N-dimensional array was borrowed from [here](https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938).




## -------------- KU Varsity Hackers ------------------##
## Meeting Documentation
3/9/19: 9:15am - 10:45am
Attendees: Nathan, Michael, Tiernon
Location: LEEP2
Accomplishments: 
1) Determine code needing refactoring / erasing
2) Plan add-on (slot machine with power-ups)
3) Fork codebase

3/9/19: 3:30pm - 6pm
Attendees: Michael, Nathan, Andre, Colin, Tiernon
Location: Google Hangout
Accomplishments: 
1) Divide tasks (see individual contribution section for more details on what we each did)
2) Begin work refactoring, restart on most of the original js
3) Design slot machine

3/11/19: 4pm-5:30pm
Attendees: Andre, Colin, Tiernon, Nathan, Michael
Location: Google Hangout
Accomplishments: 
1) Check on progress
2) Plan Spring Break work

Remaining communications facilitated by Slack


## Individual Contributions
Nathan - 

Andre - 

Michael - Michael was responsible for writing several of the functions in the board.js file (primarily ones that are called by the index.js file), as well as the boardspaces.js file. Michael's primary contribution was the addition of the slot machine, timer, and powerup capabilities. He incorporated the html and javascript for these aspects, making three powerup functions.

Colin - 

Tiernon - Tiernon migrated code for the slot machine into the js files from html files, ensuring that they maintained functionality. Additionally, Tiernon connected the powerup results to the board, ensuring that a "win" in the slot machine translated into a tangible difference for the user's game.


## Works Cited
The Slot machine included in the html was heavily adapted from:
https://codereview.stackexchange.com/questions/51532/html-js-slot-machine-simulator

Timer countdown in index.js adapted from:
https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer

## Future Features
1) Provide option to have the timer on the game or not
2) Set the start time of the timer
3) Exciting animations with slot machines
4) Generate a final score (if you win) based on amount of time taken, number of mines, and board size

## Challenges
The initial challenge we faced was inheriting a code base that did not meet project 1 requirements. The game did not function, was not modular, and was poorly organized. This made us decide to rewrite essentially all of the javascript to meet both project 1 and project 2 requirements. We were able to salvage the html and css and adapt it to fit our new js code.

Another challenge we faced involved adapting the slot machine so that it only shows when the board shows up. This issue was resolved by moving the related function calls to within the startGame function in index.js, ensuring that the code wasn't read (thus no slot machine generated) until the actual game starts and the board is generated and shown.

## What we would do differently
Overall, we are much more content with our progress than for project 1. This is because we heeded our advice last time on what we would do differently, namely not make drastic last-minute changes. HOwever, there is always an opportunity for improvement. This time, we would still better define individual tasks. There was some overlap and miscommunication that led to simultaneous work being done and merge conflicts. A lot of this was on bug fixes rather than primary features though. 