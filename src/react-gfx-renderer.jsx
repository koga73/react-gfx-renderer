/*
 * react-gfx-renderer v1.0.0 Copyright (c) 2021 AJ Savino
 * https://github.com/koga73/react-gfx-renderer
 * MIT License
 */
import React, {forwardRef, useRef, useState, useEffect} from "react";
import PropTypes from "prop-types";

import GFXRenderer from "gfx-renderer";

const propTypes = {
	contextType: PropTypes.string,
	paused: PropTypes.bool,
	onRender: PropTypes.func,
	onResize: PropTypes.func
};
const defaultProps = {
	contextType: "2d",
	paused: false,
	onRender: null,
	onResize: null
};

const ReactGFXRenderer = forwardRef(function ReactGFXRenderer({contextType, paused, onRender, onResize, ...props}, ref) {
	const refCanvas = ref || useRef();

	const [stateGFX, setStateGFX] = useState(null);

	//Create GFXRenderer
	useEffect(
		function canvasUpdated() {
			if (stateGFX) {
				stateGFX.destroy();
			}

			if (refCanvas.current) {
				const gfx = new GFXRenderer({
					canvas: refCanvas.current,
					contextType,
					paused,
					onRender,
					onResize
				});
				setStateGFX(gfx);
			}

			return () => {
				if (stateGFX) {
					stateGFX.destroy();
					setStateGFX(null);
				}
			};
		},
		[contextType, refCanvas.current]
	);

	//Prop Updated
	useEffect(
		function propUpdated() {
			if (stateGFX) {
				stateGFX.paused = paused;
				stateGFX.onRender = onRender;
				stateGFX.onResize = onResize;
			}
		},
		[stateGFX, paused, onRender, onResize]
	);

	return <canvas ref={refCanvas} {...props}></canvas>;
});
ReactGFXRenderer.propTypes = propTypes;
ReactGFXRenderer.defaultProps = defaultProps;

export default ReactGFXRenderer;
