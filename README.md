# MusicWaveform.JS
A 100% pur JS way to catch frequencies and display a track's waveform using an offline audio context.

The waveform should be generated within 10 seconds once the upload is done.

# Method

Contrary to most of the existing plugins, we do not use any sort of canvas/images.

The waveform is directly generated by creating dynamically HTML <div> elements inside a container.

# Example

See it working here: http://liocrea.com/ultraFastGen/test


# Setup

1. Download the script
2. Add a container that will wrap the waveform
3. Upload a music (or write it down straight inside the JS script)
4. Let it work!

# Notes 
A. For a better experience, it is highly recommanded to use AJAX when uploading

B. The CSS can be customized. Just add the waveform properties you want
