import React from 'react';
import './gameControls.css';

export default function gameControls(props) {
	return (
		<div className="gameControls">
				<button disabled={props.disabledControls} onClick={props.changeOnClick}>Change first player</button>
				<button onClick={props.undoOnClick}>Undo</button>
				<button onClick={props.clearOnClick}>Clear</button>
		</div>
	);
}
