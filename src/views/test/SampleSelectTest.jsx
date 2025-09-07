import {
    Container,
    Typography,
    Box,
    Stack,
} from "@mui/material";

import SampleSelector from "../../components/SampleSelector";

export default function SampleSelectTest() {

    return (
        <Stack direction="column">
            <Typography variant="h3">Test Simple</Typography>
            <Box>
                Testing simple view
            </Box>
            <SampleSelector onSelect={(data) => console.log(data)} />
        </Stack>
    )
}
