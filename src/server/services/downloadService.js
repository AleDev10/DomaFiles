import { downloadClient } from "../clients/downloadClient";

export async function downloadService(uri) {
    try {
        const uriDeco = decodeURIComponent(uri)

        const base24 = await downloadClient(uriDeco);
        
    } catch (error) {
        console.error("Erro ao tratar download");
    }
}