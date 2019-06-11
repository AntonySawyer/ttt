import React from 'react';
import './gameControls.css';

export default (props) => {
	return (
		<div className="gameControls">
				<button disabled={props.disabledControls} onClick={props.changeOnClick}>Change first player</button>
				<button disabled={!props.disabledControls} onClick={props.undoOnClick}>Undo</button>
				<button onClick={props.clearOnClick}>
					{(props.disabledControls && 'Clear') || 'New game'}
				</button>
		</div>
	);
}
