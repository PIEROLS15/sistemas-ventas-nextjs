import { useState, useEffect } from "react";
import { Identification } from "@/types/sales";

const useIdentification = () => {
    const [identification, setIdentifications] = useState<Identification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Función para obtener identificaciones
    const fetchIdentification = async () => {
        try {
            const response = await fetch("/api/identification");
            if (!response.ok) {
                throw new Error("Error al obtener las identificaciones");
            }
            const data = await response.json();
            setIdentifications(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocurrió un error desconocido");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIdentification();
    }, []);

    return { identification, loading, error, fetchIdentification };
};

export default useIdentification;