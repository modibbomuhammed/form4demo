import React from 'react'

const TimeComponent = ({ day, formData, handleTimeChange, timeOptions, status }) => {
    return (
        <div className="form-group" >
            <label htmlFor={`openingHours-${day}`}>{`${status.split("Time")[0]} Hours (${day}):`}</label>
            <select
                value={formData.config.openingHours[day].openingTime}
                onChange={(e) => handleTimeChange(day, status, e.target.value)}
            >
                <option value="">Select Time</option>
                {timeOptions.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default TimeComponent;