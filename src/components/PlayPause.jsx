import {FaPauseCircle,FaPlayCircle} from 'react-icons/fa'
const PlayPause = ({song,handalPlay,handalPause,isPlaying,activeSong}) =>
 (isPlaying&&activeSong?.title===song.title?(
  <FaPauseCircle
  size={35}
  className="text-gray-300"
  onClick={handalPause}
  />
 ):
 <FaPlayCircle
 size={35}
 className="text-gray-300"
 onClick={handalPlay}
 />
    
);

export default PlayPause;
