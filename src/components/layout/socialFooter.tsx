import Link from "next/link"
import { Github, Linkedin, Globe, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface SocialFooterProps {
    className?: string
    iconSize?: number
    showText?: boolean
}

const SocialFooter = ({ className, iconSize = 18, showText = false }: SocialFooterProps) => {
    const socialLinks = [
        {
            name: "LinkedIn",
            url: `${process.env.NEXT_PUBLIC_LINKEDIN}`,
            icon: Linkedin,
            color: "hover:text-[#0077B5]",
        },
        {
            name: "GitHub",
            url: `${process.env.NEXT_PUBLIC_GITHUB}`,
            icon: Github,
            color: "hover:text-[#333]",
        },
        {
            name: "Portafolio",
            url: `${process.env.NEXT_PUBLIC_PORTFOLIO}`,
            icon: Globe,
            color: "hover:text-primary",
        },
        {
            name: "Email",
            url: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
            icon: Mail,
            color: "hover:text-[#D44638]",
        },
    ]

    return (
        <div className={cn("flex flex-wrap justify-center gap-4 py-2", className)}>
            {socialLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "flex items-center gap-1 text-muted-foreground transition-colors",
                        link.color,
                        "hover:scale-110",
                    )}
                    title={link.name}
                >
                    <link.icon size={iconSize} />
                    {showText && <span className="text-sm">{link.name}</span>}
                </Link>
            ))}
            <div className="w-full text-center text-xs text-muted-foreground mt-2">
                © 2025 Sistema de Ventas
            </div>
        </div>
    )
}

export default SocialFooter;