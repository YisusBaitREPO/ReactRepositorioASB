export async function obtenerCursos() {
    try {
        const respuesta = await fetch("/DATA/cursosASB.json");

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los cursos");
        }

        const cursos = await respuesta.json();

        return cursos;

    } catch (error) {
        console.error("Error al obtener los cursos:", error);
        return [];
    }
}