export default function Footer() {
    return (
        <footer className="bg-navbar-grey text-sm p-6">
            <div className="max-w-6xl mx-auto px-4 flex justify-center items-center text-center">
                <span>Connor Buckley © {new Date().getFullYear()}</span>
            </div>
        </footer>
    );
}
