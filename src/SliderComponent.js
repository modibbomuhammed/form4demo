import React from 'react'

const SliderComponent = ({ name, handleSlider, status }) => {
    return (
        <div className="form-group">
            <div className="on-off-slider">
                <label className="switch">
                    <input type="checkbox" onChange={() => handleSlider(name)} checked={status} />
                    <span className="slider round">{name}</span>
                </label>
            </div>
        </div>
    )
}

export default SliderComponent