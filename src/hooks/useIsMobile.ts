import { useState, useEffect } from "react"

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640) // sm = 640px en Tailwind
        }

        handleResize() // Detecta el tamaño en la primera renderización
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return isMobile
}

export default useIsMobile
