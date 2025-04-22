import SocialFooter from "./socialFooter";

const DashboardSocialFooter = () => {
    return (
        <div className="border-t py-6 mt-8 w-full">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center justify-center gap-4 text-center">
                <p className="text-sm text-muted-foreground text-center">
                    Desarrollado por Piero Llanos - Desarrollador Full Stack
                </p>
                <SocialFooter iconSize={20} />
            </div>
        </div>
    );
};

export default DashboardSocialFooter;
