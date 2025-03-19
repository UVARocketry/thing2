# Thing

This is just a drawing board using p5.js for me to draw rocket things

Currently this repo has apogee prediction paths

The red curve drawn is the actual apogee done by a simulator (rocketpy)

The black curve is the path taken by the apogee predictor starting at the height listed by the start height textbox

the thick horizontal black line is the apogee reached by the simulator

the straight blue line is the direction of the rocket at the start of the prediction cycle

the thin horizontal black bars represent 10m

to change which prediction cycle to use, just click on the screen.
the screen is divided into sectors by the thin vertical lines, clicking on farther right sectors will move the base point farther right, and similar for farther left.
the middle sectors move the timestep by one, the next ones move it by five, then 25, then 125

## Running

To run this code, you should just be able to double click on the index.html in a file explorer to open it in a browser. depending on how much data there is, it might take a few seconds to load

