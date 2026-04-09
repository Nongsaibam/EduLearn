'use client';
import { Toaster as Sonner } from 'sonner';
const Toaster = ({ ...props }) => {
    const theme = typeof document !== "undefined" && document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    return (<Sonner theme={theme} className="toaster group" style={{
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)',
        }} {...props}/>);
};
export { Toaster };
