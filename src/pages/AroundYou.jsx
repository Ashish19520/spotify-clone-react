import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Error,SongCard,Loader } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
     const {activeSong, isPlaying}=useSelector((state)=>state.player);
     const {data,isFetching,error}=useGetSongsByCountryQuery(country);
    // at_EOdPYWYhgJDBsZ0jiRsMJyArId4J6;

    

    // console.log(data)

    useEffect(() => {
     axios.get(
       "https://geo.ipify.org/api/v2/country?apiKey=at_EOdPYWYhgJDBsZ0jiRsMJyArId4J6"
     ).then((res)=>setCountry(res?.data?.location?.country)
     ).catch((error)=>console.log(error)
     ).finally(()=>setLoading(false));
    }, [country]);

    if (loading && isFetching) return <Loader />;

   

    return (
      <div className="flex flex-col">
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
          Around you <span className="font-black">{country}</span>
        </h2>

        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data?.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
            />
          ))}
        </div>
      </div>
    );
};

export default AroundYou;
