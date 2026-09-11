/**
 * Configuration file for external resource links
 * 
 * Update these URLs when the final links are available.
 * All links currently point to DANE as placeholder.
 */

const DANE_URL = "https://www.dane.gov.co";

export const RESOURCE_LINKS = {
    // Datos relacionados con las ETC
    etcData: DANE_URL,

    // Json de las ETC
    etcJson: "https://gist.github.com/Ybaronac/746580a6fca0405c7ec3b049393cb399",

    // Mapa de las ETC
    etcMap: DANE_URL,

    // Otros estudios relacionados con el IDE
    ideStudies: DANE_URL,

    // Artículos y publicaciones
    publications: DANE_URL,

    // Libros y documentos
    documents: DANE_URL,

    // Otros estudios relacionados
    study1: "https://doi.org/10.36737/01230425.v0.n34.2018.1880",
    study2: "https://hdl.handle.net/1992/48001",

};

/**
 * Helper function to get a resource link
 * @param {string} resourceKey - Key from RESOURCE_LINKS
 * @returns {string} The URL for the resource
 */
export const getResourceLink = (resourceKey) => {
    return RESOURCE_LINKS[resourceKey] || DANE_URL;
};

export default RESOURCE_LINKS;
