import React from 'react'

const Room = ({ name, _id }) => {
    return (
        <div className="card horizontal">
            <div className="card-stacked">
                <div className="card-content">
                    <p>{name} - {_id}</p>
                </div>
                
            </div>
        </div>
    )
}

export default Room