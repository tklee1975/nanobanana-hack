import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";


import {
    Container,
    Typography,
    Box,
    Stack,
    Button,
} from "@mui/material";

export default function TestSimple() {
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(false);

    const apiKey = import.meta.env.VITE_API_KEY;
    
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
            // Create a single client object
            const ai = new GoogleGenAI({ apiKey });

            // Access API methods through services on the client object
            const response = await ai.models.generateContent(
                {
                    model: "gemini-2.5-flash-image-preview",
                    // model: "gemini-2.0-flash",
                    contents: "Create a photorealistic image of a cat with green eyes, sitting on a couch."
                });
            // const response = await ai.models.generateContent({
            //     model: "gemini-2.5-flash",
            //     contents: "Explain how AI works in a few words",
            // });

            // console.log("Response:", response);
            const imageBase64Data = extractImageBase64(response);
            console.log("Extracted Image Data:", imageBase64Data);

            if (imageBase64Data != null) {
                setImageData(imageBase64Data);
            } else {
                setImageData(null);
            }
            // console.log("JSON Response:", JSON.stringify(imageData, null, 2));


            // const chat = ai.chats.create(...);
            // const uploadedFile = await ai.files.upload(...);
            // const cache = await ai.caches.create(...);

            // const genAI = new GoogleGenAI(API_KEY);
            // const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image-preview" });
            // const prompt = "Create a photorealistic image of an orange cat with green eyes, sitting on a couch.";

            // const result = await model.generateContent(prompt);
            // const response = await result.response;
            // const parts = response.candidates?.[0]?.content?.parts || [];

            // const imageParts = parts
            //     .filter((part) => part.inlineData)
            //     .map((part) => part.inlineData.data);


        } catch (error) {
            console.error("Error generating image:", error);
            setImageData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateText = async () => {
        setLoading(true);
        setImageData(null);

        try {
            // Create a single client object
            const ai = new GoogleGenAI({ apiKey: API_KEY });

            // Access API methods through services on the client object
            // const response = await ai.models.generateContent(
            //     {
            //         // model: "gemini-2.5-flash-image-preview",
            //         model: "gemini-2.0-flash",
            //         contents: "Create a photorealistic image of an orange cat with green eyes, sitting on a couch."
            //     });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: "Explain how AI works in a few words",
            });

            console.log("Response:", response);
            // const chat = ai.chats.create(...);
            // const uploadedFile = await ai.files.upload(...);
            // const cache = await ai.caches.create(...);

            // const genAI = new GoogleGenAI(API_KEY);
            // const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image-preview" });
            // const prompt = "Create a photorealistic image of an orange cat with green eyes, sitting on a couch.";

            // const result = await model.generateContent(prompt);
            // const response = await result.response;
            // const parts = response.candidates?.[0]?.content?.parts || [];

            // const imageParts = parts
            //     .filter((part) => part.inlineData)
            //     .map((part) => part.inlineData.data);

            // if (imageParts.length > 0) {
            //     setImageData(`data:image/png;base64,${imageParts[0]}`);
            // } else {
            //     setImageData(null);
            // }
        } catch (error) {
            console.error("Error generating image:", error);
            setImageData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack direction="column">
            <Typography variant="h3">Test Nano Banana</Typography>
            <Box>
                <Button variant="contained" onClick={handleGenerateImage} disabled={loading}>
                    Generate Text
                </Button>
                {imageData && (
                    <Box mt={2}>
                        <img src={imageData} alt="Generated" style={{ maxWidth: '100%' }} />
                    </Box>
                )}
                {loading && <Typography>Loading...</Typography>}
            </Box>
        </Stack>
    )
}
