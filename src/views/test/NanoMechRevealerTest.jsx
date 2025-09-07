import {
    Container,
    Typography,
    Box,
    Stack,
} from "@mui/material";

import NanoMechRevealer from "../../components/NanoMechRevealer";

export default function NanoMechRevealerTest() {

    return (
        <Stack direction="column">
            <Typography variant="h3">Mech Revealer Test</Typography>
            <Box>
                <NanoMechRevealer />
            </Box>
        </Stack>
    )
}
