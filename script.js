import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg = null;
let selectedFile = null;

// DOM Elements
const dropzone = document.getElementById('dropzone');
const videoInput = document.getElementById('videoInput');
const editorSection = document.getElementById('editorSection');
const fileName = document.getElementById('fileName');
const changeFile = document.getElementById('changeFile');
const loopCountInput = document.getElementById('loopCount');
const decLoop = document.getElementById('decLoop');
const incLoop = document.getElementById('incLoop');
const processBtn = document.getElementById('processBtn');
const statusSection = document.getElementById('statusSection');
const progressBar = document.getElementById('progressBar');
const statusText = document.getElementById('statusText');
const resultSection = document.getElementById('resultSection');
const resultPreview = document.getElementById('resultPreview');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');

// FFmpeg Initialization
const initFFmpeg = async () => {
    if (ffmpeg) return;

    ffmpeg = new FFmpeg();

    ffmpeg.on('log', ({ message }) => {
        console.log(message);
    });

    ffmpeg.on('progress', ({ progress }) => {
        const percent = Math.round(progress * 100);
        progressBar.style.width = `${percent}%`;
        statusText.innerText = `Processing... ${percent}%`;
    });

    try {
        statusText.innerText = 'Loading FFmpeg core (this may take a moment)...';
        // Use local public directory for FFmpeg core files
        const baseURL = '/ffmpeg-core';
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        console.log('FFmpeg loaded successfully');
    } catch (err) {
        console.error('Failed to load FFmpeg core', err);
        statusText.innerText = 'Error loading FFmpeg. Your browser may not support this feature.';
        throw err;
    }
};

// Event Listeners
dropzone.onclick = () => videoInput.click();

videoInput.onchange = (e) => {
    handleFile(e.target.files[0]);
};

dropzone.ondragover = (e) => {
    e.preventDefault();
    dropzone.classList.add('active');
};

dropzone.ondragleave = () => {
    dropzone.classList.remove('active');
};

dropzone.ondrop = (e) => {
    e.preventDefault();
    dropzone.classList.remove('active');
    handleFile(e.dataTransfer.files[0]);
};

const handleFile = (file) => {
    if (!file || !file.type.startsWith('video/')) {
        alert('Please select a valid video file.');
        return;
    }
    selectedFile = file;
    fileName.innerText = file.name;
    dropzone.classList.add('hidden');
    editorSection.classList.remove('hidden');
};

changeFile.onclick = () => {
    selectedFile = null;
    dropzone.classList.remove('hidden');
    editorSection.classList.add('hidden');
    videoInput.value = '';
};

decLoop.onclick = () => {
    if (loopCountInput.value > 2) loopCountInput.value--;
};

incLoop.onclick = () => {
    if (loopCountInput.value < 50) loopCountInput.value++;
};

processBtn.onclick = async () => {
    if (!selectedFile) return;

    editorSection.classList.add('hidden');
    statusSection.classList.remove('hidden');
    statusText.innerText = 'Initializing...';
    progressBar.style.width = '0%';

    try {
        await initFFmpeg();

        const count = parseInt(loopCountInput.value);
        const inputName = 'input.mp4';
        const outputName = 'output.mp4';

        statusText.innerText = 'Reading video file...';
        await ffmpeg.writeFile(inputName, await fetchFile(selectedFile));

        statusText.innerText = 'Processing video...';

        // Using -stream_loop for efficient looping without re-encoding
        await ffmpeg.exec([
            '-stream_loop', (count - 1).toString(),
            '-i', inputName,
            '-c', 'copy',
            outputName
        ]);

        const data = await ffmpeg.readFile(outputName);
        const blob = new Blob([data.buffer], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);

        resultPreview.src = url;
        downloadBtn.href = url;
        downloadBtn.download = `looped_${selectedFile.name.split('.')[0]}.mp4`;

        statusSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    } catch (err) {
        console.error(err);
        statusText.innerText = 'Error processing video. Try a different file or refresh the page.';
        setTimeout(() => {
            statusSection.classList.add('hidden');
            editorSection.classList.remove('hidden');
        }, 3000);
    }
};

resetBtn.onclick = () => {
    resultSection.classList.add('hidden');
    dropzone.classList.remove('hidden');
    selectedFile = null;
    videoInput.value = '';
    resultPreview.src = '';
};
