import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";


import {
    Container,
    Typography,
    Box,
    Stack,
    Button,
} from "@mui/material";

function createPartFromUri(data, mimeType) {
    return {
        inlineData: {
            data,
            mimeType,
        },
    };
}

export default function BananaUploadTest() {
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inputImage, setInputImage] = useState(null);

    const apiKey = import.meta.env.VITE_API_KEY;

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
            <Typography variant="h3">Test Nano Banana (image)</Typography>
            <Box>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <Button variant="contained" onClick={handleGenerateImage} disabled={loading || !inputImage} sx={{ ml: 2 }}>
                    Send Image to GenAI
                </Button>
                {imageData && (
                    <Box mt={2}>
                        <img src={imageData} alt="Generated" style={{ maxWidth: '100%' }} />
                    </Box>
                )}
                {inputImage && (
                    <Box mt={2}>
                        <img src={`data:image/png;base64,${inputImage.data}`} alt="Input" style={{ maxWidth: '100%' }} />
                    </Box>
                )}
                {loading && <Typography>Loading...</Typography>}
            </Box>
        </Stack>
    )
}
