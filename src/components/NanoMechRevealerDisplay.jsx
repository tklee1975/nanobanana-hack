import React from 'react';
import ReactCompareImage from 'react-compare-image';
import { Stack, Typography, Box } from '@mui/material';

const NanoMechRevealerDisplay = ({ sourceImage, resultImage, isLoading }) => {
    // When source image is not available, return empty
    if (!sourceImage) {
        return <></>;
    }

    return (
        <>
            {!resultImage && (
                <Stack direction={"column"} spacing={2} alignItems="center" mb={2}>
                    <Box component="img" src={sourceImage}
                        sx={{ maxWidth: 400, margin: 'auto' }} />
                    {isLoading && <Typography>Analyzing the Mechanic Detail ...</Typography>}
                </Stack>
            )}

            {resultImage && (
                <Box sx={{ maxWidth: 400, margin: 'auto' }}>
                    <ReactCompareImage
                        leftImage={sourceImage}
                        rightImage={resultImage}
                        sliderLineWidth={4}
                        hover={true}
                        sliderLineColor="#fff"
                    />
                </Box>

            )}
        </>
    );
};

export default NanoMechRevealerDisplay;