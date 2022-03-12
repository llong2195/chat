import React from 'react'
import { Link } from 'react-router-dom'
import Room from './Room'
const RoomList = ({ rooms }) => {
  return (
    <div>
      {rooms && rooms.map(room => (
        <Link to={'/chat/' + room._id+'/'+room.name}>
          <Room name={room.name} _id = {room._id} />
        </Link>
      ))}
    </div>
  )
}

export default RoomList