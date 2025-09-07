import {
    Container,
    Typography,
    Box,
    Stack,
} from "@mui/material";
import ReactCompareImage from 'react-compare-image';
import SampleImage from './sampleImage.json'
import NanoMechRevealerDisplay from "../../components/NanoMechRevealerDisplay";
{/* <ReactCompareImage leftImage="image1.jpg" rightImage="image2.jpg" />; */ }

export default function ImageCompareTest() {
    const leftImage = SampleImage.robot1;
    const rightImage = ""; // SampleImage.robot2;

    return (
        <Stack direction="column">
            <Typography variant="h3">Test Image Compare</Typography>

            <Typography variant="h4">Nano Mech Revealer</Typography>

            <NanoMechRevealerDisplay
                sourceImage={leftImage}
                resultImage={rightImage}
                isLoading={true}
            />

            <Typography variant="h4">Original Compare</Typography>

            {/* <ReactCompareImage
                leftImage={leftImage}
                rightImage={rightImage}
                hover={true}
                sliderLineColor="#fff"
                sliderLineWidth={4}
            /> */}

        </Stack>
    )
}
