# **Links**

## **Overview**

An interactive 3D experience built with Three.js, JavaScript, and TypeScript where users can open multiple browser windows. The application detects window positioning in real-time and renders dynamic particle interactions between them, creating a visually connected experience across screens.

## **Features**

- Multi-Window Detection:\*\* Tracks the position of multiple browser windows relative to each other.
- **3D Particle System:** Renders interactive particles that respond to window movement.
- **Real-Time Interaction:** Particles flow between windows based on proximity.
- **Responsive Design:** Adapts to different screen sizes and window arrangements.
- **Customizable Effects:** Adjust particle density, colors, and behavior.

For in-depth feature specification, see ./devlog

## **Technologies Used**

- **Frontend:** Three.js, TypeScript, JavaScript
- **Build Tools:** Vite
- **Window Management:** Window API and event system localStorage
- **Deployment:** GitHub Pages

## **How It Works**

- The application uses the **Window Management API** to detect open windows.
- An event system implemented in localStorage assures interaction between different windows
- Three.js renders a **3D particle system** that responds to window positions.
- Particles **flow between windows** creating a seamless visual connection.

## **Screenshots / GIFs**

_(Optional: Add visuals showing the multi-window interaction)_
