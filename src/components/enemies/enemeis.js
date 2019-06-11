import React from 'react';

export default (props) => {
    return (
        <div className="enemies">
            <label>
                <input type="radio" id="human" name="gameMode" defaultChecked disabled={props.disabled} onChange={props.onChange} />
                human
            </label>
            <label>
                <input type="radio" id="aiFirst" name="gameMode" disabled={props.disabled} onChange={props.onChange} />
                aiFirst
            </label>
            <label>
                <input type="radio" id="aiSecond" name="gameMode" disabled={props.disabled} onChange={props.onChange} />
                aiSecond
            </label>
        </div>
    )
}