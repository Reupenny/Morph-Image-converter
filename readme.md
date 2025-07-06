# Morph - Image Converter

Morph is a desktop application built with Electron and React that allows users to easily convert and resize images. It provides a simple and intuitive interface for handling various image manipulation tasks.

## Features

- **Image Conversion**: Convert images between different formats PNG, JPEG, WebP.
- **Image Resizing**: Resize images to custom dimensions or predefined presets.
- **Compression**: Optimize image file sizes while maintaining quality.
- **User-Friendly Interface**: A clean and intuitive UI built with React.
- **Cross-Platform**: Will be available on macOS Windows & Linux.

## Technologies Used

- **Electron**: For building cross-platform desktop applications.
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **image-resize-compress**: A library for image resizing and compression.

## Installation

As the app is currently in early development there is no official released version.

If you would like to try the app follow the steps below.

### Clone the repository

```bash
git clone https://github.com/Reupenny/Image-converter.git
cd Image-converter/App
```

### Install dependencies

```bash
npm install
```

## Usage

### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

This will start the Vite development server and the Electron application.

### Production Build

To build the application for production:

```bash
npm run build
```

This will create a `dist` folder with the web build.

To package the app:

```bash
npx electron-builder  
```

 This packages the Electron application into `release-builds` directory. Which you can then run like any other app on your computer.

## License

Distributed under the MIT License. See `LICENSE` for more information.
