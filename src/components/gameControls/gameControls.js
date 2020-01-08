import React from 'react';
import './gameControls.css';

export default ({disabledControls, changeOnClick, undoOnClick, clearOnClick}) => {
	return (
		<div className="gameControls">
				<button disabled={disabledControls} onClick={changeOnClick}>Change avatar</button>
				<button disabled={!disabledControls} onClick={undoOnClick}>Undo</button>
				<button onClick={clearOnClick}>
					{(disabledControls && 'Clear') || 'New game'}
				</button>
		</div>
	);
}
