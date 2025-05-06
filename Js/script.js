// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Chat widget toggle
const fab = document.getElementById('fab');
const chatWidget = document.getElementById('chat-widget');
const closeChat = document.getElementById('close-chat');

fab?.addEventListener('click', () => {
  chatWidget.classList.toggle('hidden');
});

closeChat?.addEventListener('click', () => {
  chatWidget.classList.add('hidden');
});

// Back to top button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop?.classList.remove('hidden');
  } else {
    backToTop?.classList.add('hidden');
  }
});

// Smooth scrolling for all anchor links with href="#..."
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const yOffset = -80;
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});


// Particles background
function createParticles() {
  const container = document.getElementById('particles-container');
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 3 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    container?.appendChild(particle);
    animateParticle(particle);
  }
}

function animateParticle(particle) {
  const duration = Math.random() * 20000 + 10000;
  const delay = Math.random() * 5000;
  gsap.to(particle, {
    x: `${Math.random() * 200 - 100}px`,
    y: `${Math.random() * 200 - 100}px`,
    duration,
    delay,
    ease: "sine.inOut",
    onComplete: () => {
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      animateParticle(particle);
    }
  });
}

createParticles();

// 3D background with Three.js
function initThreeJS() {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.IcosahedronGeometry(0.5, 0);
  const material = new THREE.MeshPhongMaterial({
    color: 0x4ade80,
    emissive: 0x0,
    specular: 0x111111,
    shininess: 30,
    transparent: true,
    opacity: 0.8,
    wireframe: true
  });

  const devices = [];
  for (let i = 0; i < 8; i++) {
    const device = new THREE.Mesh(geometry, material.clone());
    device.position.x = (Math.random() - 0.5) * 10;
    device.position.y = (Math.random() - 0.5) * 10;
    device.position.z = (Math.random() - 0.5) * 10;
    device.material.color.setHSL(Math.random(), 0.7, 0.5);
    const scale = Math.random() * 0.5 + 0.5;
    device.scale.set(scale, scale, scale);
    scene.add(device);
    devices.push(device);
  }

  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  function animate() {
    requestAnimationFrame(animate);
    devices.forEach(device => {
      device.rotation.x += 0.01;
      device.rotation.y += 0.01;
      device.position.y += Math.sin(Date.now() * 0.001 + device.position.x) * 0.001;
    });
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

window.addEventListener('load', initThreeJS);