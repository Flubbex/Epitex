# Main goal

Write a text adventure engine akin to a single player MUD game.

## Folder structure:

- Component: These are React components solely intended for rendering the game and catching any user input
- Content: Contains all the content for the game, in future: make game expandable by supporting subfolders.
- Style: Only contains CSS styles and is not really important for the topic at hand.
- Trash: Just a folder to temporarily store anything that I might not need anymore, also not very important right now.
- Util: Contains utility functions that I might use anywhere else

Engine:

- Engine: Contains all the engine functionality
- Engine/module: Core functionality for the engine
- Engine/api: Wrapper layer for module functionality that contains functionality for commands
- Engine/command: Holds lists of commands that can be entered by the user
- Engine/model: Thin data models to represent data, mostly for structure
- Engine/class: This folder holds any generic class that I may use anywhere else

## Epitex 2 notes

Engine has been overhauled for the most part, see the above for more details.

Important distinction from now on: Actions vs commands

- A command is inserted by the player or ran by the system, and supported throughout the entire game
- An action is a unique command only available inside a room or from an object

## Technical ideas

- Add a custom class for entity tags (something that lets me check a "has" function instead of indexOf == -1 everywhere)

#### A virtual ref model type for use in content that works as follows:

{type:"ref","target":"SOMEID",refType:"enemy"}
The engine recognizes this as a reference and plucks the required item from content
The current pitfall I'm realizing is that the refered item might not be in content yet
Perhaps load everything first, THEN resolve any references
The usecase is as follows:
Say we have a list of enemies (Which we do) and a spawner
Instead of directly inserting the enemy into the spawner, we give it a ref to an enemy
The world loader takes that reference and places said enemy in the spawner when running

## Engine flow

- Engine construction
