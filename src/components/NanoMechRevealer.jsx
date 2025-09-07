import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import NanoMechRevealerDisplay from "./NanoMechRevealerDisplay";
import SampleSelector from "./SampleSelector";

import {
    Container,
    Typography,
    Box,
    Stack,
    Button,
    Card,
    CardContent,
    Divider,
} from "@mui/material";

function createPartFromUri(data, mimeType) {
    return {
        inlineData: {
            data,
            mimeType,
        },
    };
}

export default function NanoMechRevealer() {
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inputImage, setInputImage] = useState(null);

    const apiKey = import.meta.env.VITE_API_KEY;

    const handleSampleSelect = (data) => {
        console.log("Sample selected:", data);
        setInputImage(data);
        setImageData(null);
        setLoading(false);
    };

    // Handle file input and convert to base64
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            // Remove the data URL prefix to get only the base64 string
            const base64String = event.target.result.split(",")[1];
            setInputImage({
                data: base64String,
                mimeType: file.type
            });
            setImageData(null);
            setLoading(false);
        };
        reader.readAsDataURL(file);
    };



    const extractImageBase64 = (response) => {
        // Extract image parts from the response
        const parts = response.candidates?.[0]?.content?.parts || [];

        // Filter and map to get the base64 image data
        let imageData = parts.filter((part) => part.inlineData);
        if (imageData.length == 0) {
            imageData = null;
        }

        // Return the first image part as a data URL
        let data = imageData ? imageData[0].inlineData.data : null;
        let mimeType = imageData ? imageData[0].inlineData.mimeType : null;

        return `data:${mimeType};base64,${data}`; ï

    }

    const handleGenerateImage = async () => {
        setLoading(true);
        setImageData(null);

        try {
            const ai = new GoogleGenAI({ apiKey });

            // Prepare contents: if inputImage is present, send as image part
            let contents = [];
            if (inputImage) {
                console.log("Input Image:", inputImage);
                contents.push(
                    createPartFromUri(inputImage.data, inputImage.mimeType),
                    // inlineData: {
                    //     data: inputImage.data,
                    //     mimeType: inputImage.mimeType
                    // }
                );
            }
            // Add a prompt as well
            // contents.push("Turn to pink color");
            contents.push("Generate the inside  mechanics detail of the subject. Keep the shape and form or the generated image same as the original subject");

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-image-preview",
                contents
            });

            const imageBase64Data = extractImageBase64(response);
            console.log("Extracted Image Data:", imageBase64Data);

            if (imageBase64Data != null) {
                setImageData(imageBase64Data);
            } else {
                setImageData(null);
            }
        } catch (error) {
            console.error("Error generating image:", error);
            setImageData(null);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Stack direction="column" spacing={2}>


            <Stack direction="row" alignItems="center" spacing={2}>
                <Card sx={{ padding: 0, backgroundColor: '#444', height: 140 }}>
                    <CardContent sx={{ padding: 1, }}>
                        <Stack direction="column" alignItems="center" spacing={1}>
                        <Typography color="#ccc" variant="body">Upload an image to analyze its mechanical details.</Typography>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        </Stack>
                    </CardContent>
                </Card>
                <Typography variant="h7" color="#fff" >OR</Typography>
                 <Card sx={{ padding: 0, backgroundColor: '#444', height: 140 }}>
                    <CardContent sx={{ padding: 1, }}>
                        <Stack direction="column" alignItems="center" spacing={1}>
                        <Typography color="#ccc" variant="body">Pick a sample.</Typography>
                        <SampleSelector iconSize={80} onSelect={handleSampleSelect} />
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>




            
            {/* <Typography color="#ccc" variant="body">Pick a sample image.</Typography>
            <SampleSelector iconSize={80} onSelect={handleSampleSelect} />
        </Stack>
                </CardContent >
            </Card > */}




            <Button variant="contained" onClick={handleGenerateImage} disabled={loading || !inputImage} sx={{ ml: 2 }}>
                Start Analysis the Mechanical Detail
            </Button>

            <Box sx={{height:200}}>
                <NanoMechRevealerDisplay
                    sourceImage={inputImage ? `data:${inputImage.mimeType};base64,${inputImage.data}` : null}
                    resultImage={imageData}
                    isLoading={loading}
                />
            </Box>

        </Stack >
    )
}
