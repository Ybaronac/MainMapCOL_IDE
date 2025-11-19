//Configuracion de colores de las graficas, yearSlider, legend y mapa

export const labels = ["IDE General", "Disponibilidad", "Accesibilidad", "Adaptabilidad", "Aceptabilidad"];
//export const years = [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
export const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
export const traficLightColours = ['#cc3232','#fcc000','#2dc937'];

//Colores Prod  
export const generalColours = ['#000e2a', '#9f318f', '#532476', '#ffc611', '#007ca8'];
export const yearSliderGeneralColours = ['#3e7eff', '#d881cc', '#be94de', '#ffdd73', '#6dd9ff'];
export const generalIDEColours = ['#8cb2ff', '#6598ff', '#3e7eff', '#1664ff', '#004fee','#0042c7', '#0035a0', '#002878', '#001b51', '#000e2a'];
export const availabilityColours = ['#f9eaf6', '#ebbde4', '#e19fd8', '#d881cc', '#cf63bf','#c645b3', '#ae369c', '#902c82', '#722367', '#541a4c'];
export const accessibilityColours = ['#f5eefa', '#e3d0f1', '#d0b2e7', '#be94de', '#ac75d5','#9a57cc', '#883bc1', '#7332a3', '#5e2985', '#481f67'];
export const acceptabilityColours = ['#fffae9', '#fff0c2', '#ffe79a', '#ffdd73', '#ffd44c','#ffcb25', '#ffc611', '#fcc000', '#d5a200', '#ae8400'];
export const adaptabilityColours = ['#e3f8ff', '#bcedff', '#94e3ff', '#6dd9ff', '#46cfff','#1fc4ff', '#00b6f6', '#0099cf', '#007ca8', '#005f81'];

// Límites de rangos para los colores del semáforo
export const colorRangeLimits = {
  red: { min: 0, max: 50 },
  yellow: { min: 51, max: 75 },
  green: { min: 76, max: 100 }
};       

//Colores Test
/*
export const generalColours = ['#0fe397', '#ff4a35', '#28d4ff', '#fded20', '#7c16fa'];
export const yearSliderGeneralColours = ['#84f8ce', '#ffa297', '#8ae8ff', '#fef695', '#c89cfd'];
export const generalIDEColours = ['#cffceb', '#a9fadd', '#84f8ce', '#4df4b7', '#15f1a1','#0dd38a', '#0aae72', '#08895a', '#066441', '#043f29'];
export const availabilityColours = ['#ffe8e6', '#ffc5be', '#ffa297', '#ff7f70', '#ff5c49','#ff3821', '#e61800', '#be1400', '#971000', '#700c00'];
export const accessibilityColours = ['#d9f7ff', '#b1efff', '#8ae8ff', '#63e0ff', '#28d4ff','#00bdec', '#009ec5', '#007e9e', '#005f76', '#003f4f'];
export const acceptabilityColours = ['#fffde2', '#fefabc', '#fef695', '#fef36e', '#fdf047','#fdeb0d', '#e0d002', '#b9ac02', '#928801', '#6b6401'];
export const adaptabilityColours = ['#f3e9ff', '#ddc3fe', '#c89cfd', '#b276fc', '#9c50fb','#8729fa', '#7105f7', '#6004d1', '#4e04aa', '#3d0384'];
*/