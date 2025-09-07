import React from 'react';
import sampleImages from '../data/sampleImage.json';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const SampleSelector = ({ onSelect, iconSize = 100 }) => {
    const sampleToBase64 = (sampleData) => {
        return `data:${sampleData.mimeType};base64,${sampleData.data}`;
    }

    return (
        <Stack direction="row" spacing={2}>
            {sampleImages.map((sample, idx) => (
                <Card sx={{ width: iconSize }}>
                    <CardActionArea onClick={() => onSelect && onSelect(sample)}>
                        <CardMedia
                            component="img"
                            height={iconSize}
                            width={iconSize}
                            image={sampleToBase64(sample)}
                            sx={{ objectFit: 'cover', borderRadius: 1 }}
                        />
                    </CardActionArea>
                </Card>
            ))}
        </Stack>
    );
};

export default SampleSelector;