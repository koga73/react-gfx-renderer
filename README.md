# react-gfx-renderer

React wrapper for gfx-renderer

## Usage

```jsx
import React, {useState} from "react";
import ReactGFXRenderer from "react-gfx-renderer";

const MyComponent = () => {
	var testPosition = [0, 0];
	var testSpeed = [100, 100]; //Pixels per second as normalized by delta

	function handle_render(delta) {
		const canvas = this.canvas;
		const context = this.context;

		//Update Position
		testPosition[0] += testSpeed[0] * delta;
		testPosition[1] += testSpeed[1] * delta;

		//Clear
		context.clearRect(0, 0, canvas.width, canvas.height);

		//Draw BG
		context.fillStype = "#000000";
		context.fillRect(0, 0, canvas.width, canvas.height);

		//Draw Circle
		context.save();
		context.fillStyle = "#FFFFFF";
		context.globalAlpha = 0.5;
		context.beginPath();
		context.arc(testPosition[0], testPosition[1], 64, 0, Math.PI << 1);
		context.fill();
		context.closePath();
		context.restore();

		if (testPosition[1] > 500) {
			this.paused = true;
		}
	}

	return <ReactGFXRenderer onRender={handle_render} style={{width: "100vw", height: "100vh"}} />;
};
export default MyComponent;
```
