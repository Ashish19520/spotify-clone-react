import { useParams } from "react-router-dom";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetArtistDetailsQuery
} from "../redux/services/shazamCore";


const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { id: artistId } = useParams();

  const { 
         data: artistData,
         isFetching: isFetchingArtistDetails,
         error
  } = useGetArtistDetailsQuery(artistId);

       console.log(artistData);


  if ( isFetchingArtistDetails) {
    return <Loader title="Searching Artist Details...." />;
  }
  
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
