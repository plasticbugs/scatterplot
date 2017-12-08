# Scatter Plot Visualization

## Specification:
Create an application that generates a minimum of 20 plot points. Each point should have a start time, a duration, and a status (pass, fail, or error). The color of the plot point should correspond to its status.

The plot points should be selectable/unselectable with a selected/unselected class name appended to the node once clicked.

## Screenshot:
![ScreenShot](/screenshot.png)

## How to run this application:

1. To build the application from the source files, and to run the server you will need Yarn and Node.js installed -- installing Yarn will install the latest stable Node if it's not already installed:

`brew install yarn`

2. Navigate to the project root and run `yarn` to install all the project's dependencies.

3. Build the uglified JS and minified CSS and start the server by running:

`yarn start`

4. Visit `http://localhost:3000/` in your browser to use the application.

## Solution:
I created a React-based application to handle the state of the application and display the scatter plot. For the chart visualization, I used [React-Vis](https://uber.github.io/react-vis/).

When the window is resized, the chart shrinks to accommodate.

The server has an api endpoint which sends an array of points to the client which is generated server-side based on the parameters in the request.

The X and Y axes also scale based on the range of the plot points provided by the API.

I also configured a build system with Webpack to compile/transpile and minify the JS/JSX and SCSS.

## Problems Encountered

Because React-Vis generates either SVG or Canvas-based charts, I didn't have as many styling options as I would have liked (hence no dropshadows on selected nodes). The plotpoint's container does get a selected/unselected class name when clicked, but the only styling added is a very subtle stroke to the SVG circle element when selected.

## How to use this application:
When the page loads, the application makes an api request for the plot points. The chart component displays the points and a toggle to set a date range. If the user chooses to select a date range within the earliest and latest start_times, the chart rerenders with only those plot points which fit within the date range.
