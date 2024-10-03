import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const Background3D = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Set up scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Create sports balls
        const ballModels = [
            '/models/soccer_ball.FBX',
            '/models/basketball.fbx',
            '/models/tennis_ball.fbx',
            '/models/baseball.fbx',
        ];

        const balls = [];
        const numBalls = 30;
        const loader = new FBXLoader();

        const loadBalls = async () => {
            for (let i = 0; i < numBalls; i++) {
                const modelPath = ballModels[Math.floor(Math.random() * ballModels.length)];
                try {
                    const object = await loader.loadAsync(modelPath);
                    object.scale.set(0.01, 0.01, 0.01); // Adjust scale as needed

                    // Position balls around the edges
                    let x, y, z;
                    do {
                        x = (Math.random() - 0.5) * 12;
                        y = (Math.random() - 0.5) * 12;
                        z = (Math.random() - 0.5) * 12;
                    } while (Math.abs(x) < 3 && Math.abs(y) < 3); // Keep balls away from center

                    object.position.set(x, y, z);
                    object.userData = { originalScale: object.scale.clone() };
                    scene.add(object);
                    balls.push(object);
                } catch (error) {
                    console.error('Error loading model:', error);
                }
            }
        };

        loadBalls();

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Set up camera
        camera.position.z = 5;

        // Raycaster for mouse interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            balls.forEach(ball => {
                ball.rotation.x += 0.005;
                ball.rotation.y += 0.005;
                
                // Add subtle floating motion
                ball.position.y += Math.sin(Date.now() * 0.001 + ball.position.x) * 0.002;
            });
            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Handle mouse move for hover effect
        const handleMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(balls, true);

            balls.forEach(ball => {
                if (intersects.find(intersect => intersect.object === ball || ball.children.includes(intersect.object))) {
                    ball.scale.lerp(ball.userData.originalScale.clone().multiplyScalar(1.2), 0.1);
                } else {
                    ball.scale.lerp(ball.userData.originalScale, 0.1);
                }
            });
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Handle click for enlarging balls
        const handleClick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(balls, true);

            if (intersects.length > 0) {
                const ball = intersects[0].object.parent || intersects[0].object;
                ball.scale.multiplyScalar(1.5);
                setTimeout(() => {
                    ball.scale.copy(ball.userData.originalScale);
                }, 300);
            }
        };
        window.addEventListener('click', handleClick);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default Background3D;