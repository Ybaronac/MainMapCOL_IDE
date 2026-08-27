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
    etcJson: DANE_URL,

    // Mapa de las ETC
    etcMap: DANE_URL,

    // Otros estudios relacionados con el IDE
    ideStudies: DANE_URL,

    // Artículos y publicaciones
    publications: DANE_URL,

    // Libros y documentos
    documents: DANE_URL,
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
