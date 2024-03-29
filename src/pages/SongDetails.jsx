import { useParams } from "react-router-dom";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
const SongDetails = () => {
  const { songid, id: artistId } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  const {
    data: relatedSongData,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });

  if (isFetchingRelatedSongs && isFetchingSongDetails) {
    return <Loader title="Searching Songs Details...." />;
  }
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i, data) => {
    dispatch(setActiveSong({ song, i, data }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5"></div>
        {songData?.sections[1].type === "LYRICS" ? (
          songData?.sections[1]?.text.map((line, i) => (
            <p
              key={`lyrics-${line}-${i}`}
              className="text-gray-400 text-base my-1"
            >
              {line}
            </p>
          ))
        ) : (
          <p className="text-gray-400 text-base my-1">Sorry,No Data Found</p>
        )}
      </div>
      <RelatedSongs
        data={relatedSongData}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={() => handlePlayClick(song, i, data)}
      />
    </div>
  );
};

export default SongDetails;
