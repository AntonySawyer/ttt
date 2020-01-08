import React from 'react';
import './enemies.css';

export default ({isDisabled, onChange}) => {
    return (
        <div className="enemies">
            <label>
                <input type="radio" id="human" name="gameMode" defaultChecked disabled={isDisabled} onChange={onChange} />
                <div className="gameModeLabel">Human</div>
            </label>
            <label>
                <input type="radio" id="aiFirst" name="gameMode" disabled={isDisabled} onChange={onChange} />
                <div className="gameModeLabel">1 lvl</div>
            </label>
            <label>
                <input type="radio" id="aiSecond" name="gameMode" disabled={isDisabled} onChange={onChange} />
                <div className="gameModeLabel">2 lvl</div>
            </label>
            <label>
                <input type="radio" id="aiThird" name="gameMode" disabled={isDisabled} onChange={onChange} />
                <div className="gameModeLabel">3 lvl</div>
            </label>
        </div>
    )
}