import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setFileType(file.type);
        } else {
            alert("Please upload a valid zip file.");
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            setUploading(true);
            console.log('File ready for upload:', selectedFile);
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('name', fileName);
                formData.append('type', fileType);

                const response = await axios.post("https://iiit-colloboration-app-backend-2.vercel.app/api/v1/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true // Include credentials with the request
                });

                console.log({ response });
                toast.success('File uploaded successfully');
            } catch (error) {
                console.error("Upload failed:", error);
            } finally {
                setUploading(false);
            }
        } else {
            alert("No file selected.");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-12 p-8 bg-gray-50 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Your Project</h1>

            <div className="mb-6">
                <label
                    htmlFor="file-upload"
                    className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer"
                >
                    <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-150 ease-in-out">
                        <svg
                            className="w-12 h-12 text-gray-400 mb-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16l5-5 5 5H7z"
                            />
                        </svg>
                        <span className="text-gray-600">Drag & drop your file here or click to select</span>
                    </div>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".zip"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
            </div>

            {selectedFile && (
                <div className="mb-6 p-4 bg-white shadow-sm rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700 font-medium">Selected File Details:</p>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                        <input
                            type="text"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type:</label>
                        <input
                            type="text"
                            value={fileType}
                            onChange={(e) => setFileType(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </div>
                </div>
            )}

            {uploading && (
                <div className="flex justify-center items-center mb-6">
                    <svg
                        className="animate-spin h-8 w-8 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 12a8 8 0 0115.14-3.62A6.03 6.03 0 0120 12a6.02 6.02 0 01-1.86 4.62A8 8 0 014 12z"
                        />
                    </svg>
                </div>
            )}

            <button
                onClick={handleUpload}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors duration-300 ease-in-out"
                disabled={uploading}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};

export default UploadPage;
