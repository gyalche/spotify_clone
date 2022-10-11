import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { reducerCases } from '../utils/constant';
import { useStateProvider } from '../utils/StateProvider';
const CurrentTrack = () => {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        'https://api.spotify.com/v1/me/player/currently-playing',
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('currnnt playing', response);

      if (response.data !== '') {
        const currentlyPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.album.artists.map(
            (artist) => artist.name
          ),
          image: response.data.item.album.images[2].url,
        };
        dispatch({
          type: reducerCases.CURRENT_PLAYLIST,
          currentlyPlaying: currentlyPlaying,
        });
      }
    };
    getCurrentTrack();
    // console.log(playlists);
  }, [token, dispatch]);
  return (
    <Container>
      {currentlyPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentlyPlaying?.image} alt="currentplaying" />
          </div>
          <div className="track__info">
            <h4>{currentlyPlaying.name}</h4>
            <h6>{currentlyPlaying.artists.join(', ')}</h6>
          </div>
        </div>
      )}
    </Container>
  );
};
const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      h4 {
        color: white;
      }
      h4 {
        color: #b3b3b3;
      }
    }
  }
`;
export default CurrentTrack;
