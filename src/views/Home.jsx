import {
    Container,
    Typography,
    Box,
    Stack,
    Divider,
} from "@mui/material";

import NanoMechRevealer from "../components/NanoMechRevealer";

export default function Home() {

    return (
        <Stack direction="column">
            <Typography variant="h4">Mechanical X-Ray</Typography>
            <Typography sx={{ color: '#aaa' }} variant="h6">Mech Revealer Test</Typography>
            <Divider color="white" sx={{ my: 2 }} />
            <Box>
                <NanoMechRevealer />
            </Box>
        </Stack>
    )
}
