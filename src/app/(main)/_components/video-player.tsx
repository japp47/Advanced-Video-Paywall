"use client";
import { useCheckPremium } from '@/lib/hooks/users/user-check-premium'
import React from 'react'
import { Upgrade } from './upgrade';

export const VideoPlayer = () => {

    const {
        data: isPremium,
        isPending,
        isError
    } = useCheckPremium();

    if(isPending) {
        return <div>Loading...</div>;
    }
    if(isError) {
        return <div>Error...</div>;
    }
    if(!isPremium) {
        return <div>
          <p>Upgrade to premium to watch the video</p>
            <Upgrade />
        </div>;
    }
  return (
    <iframe
          src="https://iframe.mediadelivery.net/embed/340348/7ccb80ee-5931-43e5-aa2e-1098ef6c8f34?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
          loading="lazy"
          style={{
            border: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
          }}
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
          allowFullScreen={true}
        ></iframe>
  )
}

