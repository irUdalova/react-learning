import React, { useState } from 'react';

type PosterImageParams = {
  posterPath: string;
  title: string;
  className: string;
  height: string;
};

export function PosterImage({ posterPath, title, className, height }: PosterImageParams) {
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  const fallbackUrl = 'assets/img/no-poster.jpg';
  const [imgUrl, setImgUrl] = useState(posterUrl);

  return (
    <img
      className={className}
      src={imgUrl}
      alt={title}
      width="auto"
      height={height}
      onError={() => {
        setImgUrl(fallbackUrl);
      }}
    />
  );
}
