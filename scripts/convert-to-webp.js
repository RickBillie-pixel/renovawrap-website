import sharp from 'sharp';
import fs from 'fs';

const convert = async (input, output) => {
  try {
    await sharp(input).toFormat('webp').toFile(output);
    console.log(`Converted ${input} to ${output}`);
  } catch (err) {
    console.error(`Error converting ${input}:`, err);
  }
};

convert('./public/afzuigkap_before.png', './public/afzuigkap_before.webp');
convert('./public/afzuigkap_after.png', './public/afzuigkap_after.webp');
