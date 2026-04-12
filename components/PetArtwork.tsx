import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

const ARTWORKS: Record<string, string> = {
  // Using direct transparent PNGs for a "sitting on podium" effect
  'Golden Retriever': 'https://pngimg.com/uploads/golden_retriever/golden_retriever_PNG28.png',
  'Siamese Cat': 'https://pngimg.com/uploads/cat/cat_PNG50414.png',
  'Bulldog': 'https://pngimg.com/uploads/dog/dog_PNG50348.png',
  'Beagle': 'https://pngimg.com/uploads/dog/dog_PNG188.png',
  'Poodle': 'https://pngimg.com/uploads/dog/dog_PNG50321.png',
  'German Shepherd': 'https://pngimg.com/uploads/dog/dog_PNG50341.png',
  // Fallbacks
  'dog': 'https://pngimg.com/uploads/golden_retriever/golden_retriever_PNG28.png',
  'cat': 'https://pngimg.com/uploads/cat/cat_PNG50414.png',
  'rabbit': 'https://pngimg.com/uploads/rabbit/rabbit_PNG3775.png',
};

interface PetArtworkProps {
  breed?: string;
  type?: 'dog' | 'cat' | 'rabbit';
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'contain' | 'cover' | 'stretch';
}

export const PetArtwork: React.FC<PetArtworkProps> = ({ 
  breed, 
  type = 'dog', 
  style, 
  resizeMode = 'contain' 
}) => {
  const sourceUrl = ARTWORKS[breed || ''] || ARTWORKS[type || ''] || ARTWORKS['dog'];

  return (
    <Image 
      source={{ uri: sourceUrl }} 
      style={style} 
      resizeMode={resizeMode} 
    />
  );
};
