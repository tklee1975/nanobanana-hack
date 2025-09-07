import {
    Container,
    Typography,
    Box,
    Stack,
} from "@mui/material";


import SampleImage from "./sampleImage.json";


export default function TestSimple() {
    console.log("Sample Image Data:", SampleImage);

    return (
        <Stack direction="column">
            <Typography variant="h3">Sample Images</Typography>
            <Box>
                <img src={SampleImage.robot1} alt="Generated" style={{ maxWidth: '100%' }} />
                <img src={SampleImage.robot2} alt="Generated" style={{ maxWidth: '100%' }} />
            </Box>
        </Stack>
    )
}
