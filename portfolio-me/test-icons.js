const si = require('./node_modules/react-icons/si/index.js');
const icons = ['SiReact', 'SiNextdotjs', 'SiTypescript', 'SiJavascript', 'SiHtml5', 'SiTailwindcss', 'SiNodedotjs', 'SiExpress', 'SiFastapi', 'SiFlask', 'SiSocketdotio', 'SiPostgresql', 'SiMongodb', 'SiPrisma', 'SiDocker', 'SiPytorch', 'SiOpencv', 'SiPython', 'SiGit', 'SiVercel', 'SiPostman'];
const missing = icons.filter(icon => !si[icon]);
console.log('Missing icons:', missing);
